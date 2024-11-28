import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, requestPasswordReset, handleResetPassword, updatePassword } from '../controllers/userController.js';
import { addRequestValidator, updateValidator, deleteRequestValidator, getByIdValidator } from '../validators/userValidator.js';
import { authorizeRole,authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes to manage users
router.post('/user', authenticateToken, addRequestValidator, createUser);
router.get('/user', authenticateToken, getAllUsers);
router.get('/user/:id', authenticateToken, getByIdValidator, getUserById);
router.put('/user/:id', authenticateToken, updateValidator, updateUser);
router.delete('/user/:id', authenticateToken, authorizeRole('ADMIN'), deleteRequestValidator, deleteUser);

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', handleResetPassword);
router.put('/profile/:id/password', updatePassword);

export default router;
