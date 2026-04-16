import { Request, Response, NextFunction } from 'express';
import db from '../lib/db';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        tier: 'free' | 'pro' | 'team';
        usageQuota: number;
        monthlyQuota: number;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7);
    const session = db.prepare('SELECT * FROM session WHERE token = ?').get(token) as any;

    if (!session || new Date(session.expires_at) < new Date()) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    const user = db.prepare('SELECT * FROM user WHERE id = ?').get(session.user_id) as any;
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      tier: user.tier || 'free',
      usageQuota: user.usage_quota || 0,
      monthlyQuota: user.monthly_quota || 1,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    const session = db.prepare('SELECT * FROM session WHERE token = ?').get(token) as any;

    if (session && new Date(session.expires_at) >= new Date()) {
      const user = db.prepare('SELECT * FROM user WHERE id = ?').get(session.user_id) as any;
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          tier: user.tier || 'free',
          usageQuota: user.usage_quota || 0,
          monthlyQuota: user.monthly_quota || 1,
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      const resetTime = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', resetTime.toString());
      res.status(429).json({ error: 'Too many requests', retryAfter: resetTime });
      return;
    }

    record.count++;
    next();
  };
};

export const requireTier = (minTier: 'free' | 'pro' | 'team') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    const tiers = { free: 0, pro: 1, team: 2 };
    if (tiers[req.user.tier] < tiers[minTier]) {
      res.status(403).json({ error: 'Upgrade required', currentTier: req.user.tier, requiredTier: minTier });
      return;
    }
    next();
  };
};

export default authenticate;
