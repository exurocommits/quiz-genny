import { Response } from 'express';
import db from '../lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: {
    id: string;
    email: string;
    tier: 'free' | 'pro' | 'team';
    usageQuota: number;
    monthlyQuota: number;
    usage_quota?: number;
    monthly_quota?: number;
    full_name?: string;
    stripe_customer_id?: string;
  };
}

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
});

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Authentication required' }); return; }

    const user = db.prepare('SELECT * FROM user WHERE id = ?').get(req.user.id) as any;
    if (!user) { res.status(404).json({ error: 'Profile not found' }); return; }

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      tier: user.tier,
      usageQuota: user.usage_quota,
      monthlyQuota: user.monthly_quota,
      stripeCustomerId: user.stripe_customer_id,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Authentication required' }); return; }

    const validated = updateProfileSchema.parse(req.body);
    db.prepare("UPDATE user SET full_name = ?, updated_at = datetime('now') WHERE id = ?")
      .run(validated.fullName, req.user.id);

    const user = db.prepare('SELECT * FROM user WHERE id = ?').get(req.user.id) as any;
    res.json({
      id: user.id, email: user.email, fullName: user.full_name,
      tier: user.tier, usageQuota: user.usage_quota, monthlyQuota: user.monthly_quota,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
};

export const getUsageStats = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Authentication required' }); return; }

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const count = (db.prepare("SELECT COUNT(*) as c FROM quiz WHERE user_id = ? AND created_at >= ?")
      .get(req.user.id, firstDayOfMonth.toISOString()) as any).c;

    res.json({
      quizzesThisMonth: count || 0,
      usageQuota: req.user.usage_quota || 0,
      monthlyQuota: req.user.monthly_quota || 1,
      tier: req.user.tier,
      remainingQuota: Math.max(0, (req.user.monthly_quota || 1) - (req.user.usage_quota || 0)),
    });
  } catch (error) {
    console.error('Get usage stats error:', error);
    res.status(500).json({ error: 'Failed to fetch usage stats' });
  }
};

export const getUserQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Authentication required' }); return; }

    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const quizzes = db.prepare('SELECT * FROM quiz WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?')
      .all(req.user.id, limit, offset) as any[];

    res.json({ quizzes, count: quizzes.length, offset, limit });
  } catch (error) {
    console.error('Get user quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Authentication required' }); return; }

    const { password } = req.body;
    if (!password) { res.status(400).json({ error: 'Password required to delete account' }); return; }

    const user = db.prepare('SELECT * FROM user WHERE id = ?').get(req.user.id) as any;
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      res.status(400).json({ error: 'Incorrect password' });
      return;
    }

    db.prepare('DELETE FROM quiz WHERE user_id = ?').run(req.user.id);
    db.prepare('DELETE FROM session WHERE user_id = ?').run(req.user.id);

    if (user.stripe_customer_id) {
      console.log('Would cancel Stripe subscription for customer:', user.stripe_customer_id);
    }

    db.prepare('DELETE FROM user WHERE id = ?').run(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

export const linkStripeCustomer = async (stripeCustomerId: string, userId: string): Promise<void> => {
  db.prepare('UPDATE user SET stripe_customer_id = ? WHERE id = ?').run(stripeCustomerId, userId);
};

export default { getProfile, updateProfile, getUsageStats, getUserQuizzes, deleteAccount, linkStripeCustomer };
