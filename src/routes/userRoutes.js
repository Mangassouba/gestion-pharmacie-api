import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { addRequestValidator, updateValidator, deleteRequestValidator, getByIdValidator } from '../validators/userValidator.js';
import { authorizeRole,authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes to manage users
router.post('/user', authenticateToken, addRequestValidator, createUser);
router.get('/user', authenticateToken, getAllUsers);
router.get('/user/:id', authenticateToken, getByIdValidator, getUserById);
router.put('/user/:id', authenticateToken, updateValidator, updateUser);
router.delete('/user/:id', authenticateToken, authorizeRole('ADMIN'), deleteRequestValidator, deleteUser);

export default router;
