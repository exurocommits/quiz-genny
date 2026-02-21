import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/user/profile
 * Get current user profile
 */
router.get('/profile', userController.getProfile);

/**
 * PUT /api/user/profile
 * Update user profile
 */
router.put('/profile', userController.updateProfile);

/**
 * GET /api/user/usage
 * Get usage statistics
 */
router.get('/usage', userController.getUsageStats);

/**
 * GET /api/user/quizzes
 * Get user's quizzes
 */
router.get('/quizzes', userController.getUserQuizzes);

/**
 * DELETE /api/user/account
 * Delete user account (requires password confirmation)
 */
router.delete('/account', userController.deleteAccount);

export default router;
