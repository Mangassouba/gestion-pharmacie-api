import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { addRequestValidator, updateValidator, deleteRequestValidator, getByIdValidator } from '../validators/userValidator.js';

const router = express.Router();

// Routes to manage users
router.post('/user',addRequestValidator, createUser);
router.get('/user', getAllUsers);
router.get('/user/:id',getByIdValidator, getUserById);
router.put('/user/:id',updateValidator, updateUser);
router.delete('/user/:id',deleteRequestValidator, deleteUser);

export default router;
