import express from 'express';
import { login } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// Login route
authRouter.post('/login', login);

// Example of a protected route
authRouter.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route', user: req.user });
});

export default authRouter;
