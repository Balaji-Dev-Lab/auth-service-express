import { Router } from "express";

const authRouter = Router();

import validationMiddleware from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authHandler } from "./auth.handler.js";

authRouter.post(
  "/register",
  validationMiddleware(registerSchema),
  authHandler.register,
);

authRouter.post("/login", validationMiddleware(loginSchema), authHandler.login);

// authRouter.post("/forgot-password");

// authRouter.post("/reset-password");

export default authRouter;
