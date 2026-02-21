import { Response } from 'express';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import type { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: {
    id: string;
    email: string;
    tier: 'free' | 'pro' | 'team';
    usage_quota: number;
    monthly_quota: number;
    full_name?: string;
    stripe_customer_id?: string;
  };
}

// Validation schemas
const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
});

const upgradeTierSchema = z.object({
  tier: z.enum(['pro', 'team']),
});

/**
 * Get user profile
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json({
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      tier: profile.tier,
      usageQuota: profile.usage_quota,
      monthlyQuota: profile.monthly_quota,
      stripeCustomerId: profile.stripe_customer_id,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const validated = updateProfileSchema.parse(req.body);

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        full_name: validated.fullName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      tier: profile.tier,
      usageQuota: profile.usage_quota,
      monthlyQuota: profile.monthly_quota,
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

/**
 * Get usage statistics
 */
export const getUsageStats = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Get quiz count for current month
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .gte('created_at', firstDayOfMonth.toISOString());

    res.json({
      quizzesThisMonth: count || 0,
      usageQuota: req.user.usage_quota,
      monthlyQuota: req.user.monthly_quota,
      tier: req.user.tier,
      remainingQuota: Math.max(0, req.user.monthly_quota - req.user.usage_quota),
    });
  } catch (error) {
    console.error('Get usage stats error:', error);
    res.status(500).json({ error: 'Failed to fetch usage stats' });
  }
};

/**
 * Get user's quizzes
 */
export const getUserQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({
      quizzes,
      count: quizzes?.length || 0,
      offset,
      limit,
    });
  } catch (error) {
    console.error('Get user quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

/**
 * Delete user account
 */
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const { password } = req.body;

    if (!password) {
      res.status(400).json({ error: 'Password required to delete account' });
      return;
    }

    // Verify password by attempting to sign in
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: req.user.email,
      password,
    });

    if (authError) {
      res.status(400).json({ error: 'Incorrect password' });
      return;
    }

    // Delete user's quizzes
    await supabase.from('quizzes').delete().eq('user_id', req.user.id);

    // Delete user's Stripe subscription (if exists)
    if (req.user.stripe_customer_id) {
      // TODO: Cancel Stripe subscription
      console.log('Would cancel Stripe subscription for customer:', req.user.stripe_customer_id);
    }

    // Delete user profile
    await supabase.from('profiles').delete().eq('id', req.user.id);

    // Delete auth user
    await supabase.auth.admin.deleteUser(req.user.id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

/**
 * Link Stripe customer ID to user
 */
export const linkStripeCustomer = async (
  stripeCustomerId: string,
  userId: string
): Promise<void> => {
  await supabase
    .from('profiles')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId);
};

export default {
  getProfile,
  updateProfile,
  getUsageStats,
  getUserQuizzes,
  deleteAccount,
  linkStripeCustomer,
};
