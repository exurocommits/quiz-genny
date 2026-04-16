import { Router, Request, Response } from 'express';
import db from '../lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';

const router = Router();

const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

const SESSION_DURATION_HOURS = 24;

function createSession(userId: string): { token: string; expires_at: string; id: string } {
  const id = crypto.randomUUID();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();
  db.prepare('INSERT INTO session (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)').run(id, userId, token, expiresAt);
  return { token, expires_at: expiresAt, id };
}

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = signupSchema.parse(req.body);
    const { email, password, fullName } = validated;

    const existing = db.prepare('SELECT id FROM user WHERE email = ?').get(email);
    if (existing) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const userId = crypto.randomUUID();
    const hash = bcrypt.hashSync(password, 10);

    db.prepare('INSERT INTO user (id, email, password_hash, full_name, tier, usage_quota, monthly_quota) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
      userId, email, hash, fullName, 'free', 0, 1
    );

    res.status(201).json({
      user: { id: userId, email, tier: 'free', usageQuota: 0, monthlyQuota: 1 },
      session: null,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = loginSchema.parse(req.body);
    const { email, password } = validated;

    const user = db.prepare('SELECT * FROM user WHERE email = ?').get(email) as any;
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const session = createSession(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        tier: user.tier || 'free',
        usageQuota: user.usage_quota || 0,
        monthlyQuota: user.monthly_quota || 1,
      },
      session: {
        access_token: session.token,
        refresh_token: session.token,
        expires_in: SESSION_DURATION_HOURS * 3600,
      },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to sign in' });
    }
  }
});

router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.substring(7);
    if (token) {
      db.prepare('DELETE FROM session WHERE token = ?').run(token);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to sign out' });
  }
});

router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      res.status(400).json({ error: 'Refresh token required' });
      return;
    }

    const session = db.prepare('SELECT * FROM session WHERE token = ?').get(refresh_token) as any;
    if (!session || new Date(session.expires_at) < new Date()) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    // Extend session
    const newExpires = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();
    db.prepare('UPDATE session SET expires_at = ? WHERE id = ?').run(newExpires, session.id);

    res.json({
      access_token: session.token,
      refresh_token: session.token,
      expires_in: SESSION_DURATION_HOURS * 3600,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

router.post('/verify-email', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ error: 'Token required' });
      return;
    }

    const row = db.prepare('SELECT * FROM email_verification_token WHERE token = ?').get(token) as any;
    if (!row || new Date(row.expires_at) < new Date()) {
      res.status(400).json({ error: 'Invalid or expired token' });
      return;
    }

    db.prepare('DELETE FROM email_verification_token WHERE token = ?').run(token);
    db.prepare("UPDATE user SET email_verified = 1, updated_at = datetime('now') WHERE id = ?").run(row.user_id);

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

router.post('/reset-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email required' });
      return;
    }

    const user = db.prepare('SELECT id FROM user WHERE email = ?').get(email);
    if (!user) {
      // Don't reveal whether email exists
      res.json({ message: 'Password reset email sent' });
      return;
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    db.prepare('INSERT INTO password_reset_token (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, user.id, expiresAt);

    console.log(`[reset-password] Token for ${email}: ${token}`);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});

router.post('/update-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.substring(7);
    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const { password } = req.body;
    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' });
      return;
    }

    const session = db.prepare('SELECT * FROM session WHERE token = ?').get(token) as any;
    if (!session || new Date(session.expires_at) < new Date()) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    const hash = bcrypt.hashSync(password, 10);
    db.prepare("UPDATE user SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(hash, session.user_id);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

export default router;
