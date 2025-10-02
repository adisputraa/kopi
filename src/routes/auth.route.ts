// src/routes/auth.route.ts
import express from "express";

import * as Middleware from "../middlewares/validator.middleware";
import * as Controller from "../controllers/auth.controller";
import * as Schema from "../schemas/auth.schema";

const router = express.Router();

router.post("/register", Middleware.validateRequest(Schema.registerSchema, "body"), Controller.registerController);
router.post("/login", Middleware.validateRequest(Schema.loginSchema, "body"), Controller.loginController);
router.post("/forgot-password", Middleware.validateRequest(Schema.forgotPasswordSchema, "body"), Controller.forgotPasswordController);
router.post("/reset-password", Middleware.validateRequest(Schema.resetPasswordSchema, "body"), Controller.resetPasswordController);

export default router;