import express from "express";
import { login, register } from "../controllers/authController.js";
// import { register, login } from "../middlewares/authMiddleware.js";
// import {
//   registerValidator,
//   loginValidator,
// } from "../validators/authValidator.js";

const authRouter = express.Router();

// Routes d'authentification
authRouter.post("/register",  register);
authRouter.post("/login",  login);

export default authRouter;

