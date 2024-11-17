import express from "express";
import { login, register, getCurrentUser,refreshAccessToken } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

// Routes d'authentification
authRouter.post("/register",  register);
authRouter.post("/login",  login);
authRouter.post('/refresh-token', refreshAccessToken);
authRouter.get("/me", authenticateToken, getCurrentUser);
export default authRouter;

