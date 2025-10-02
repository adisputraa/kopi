import { error } from 'console';
// src/controllers/auth.controller.ts
import { Request, Response } from "express";

import * as AuthService from "../services/auth.service";
import { LoginRequest, RegisterRequest } from "../schemas/auth.schema";
import { ForgotPasswordRequest, ResetPasswordRequest } from "../schemas/auth.schema";
import { isApiError } from "../utils/apiError";
import { HttpStatus } from "../utils/httpStatus";
import { createLogger } from "../utils/logger";

export async function registerController(req: Request, res: Response) {
  const logger = createLogger("register-controller");
  try {
    const { username, email, password, name} = req.body;
    const result = await AuthService.registerService(username, email, password, name);
    
    return res.status(HttpStatus.CREATED).json({
      message: "Registrasi berhasil",
      data: result,
    });
  } catch (error) {
    if (isApiError(error)) {
      logger.warn("Register attempt failed", { error });
      return res.status(error.statusCode).json({ message: error.message });
    }
    logger.error("Internal server error on register", { error });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

export async function loginController(req: Request<{}, {}, LoginRequest>, res: Response) {
  const logger = createLogger("login-controller");
  try {
    const { username, password} = req.body;
    const result = await AuthService.loginService(username, password);
    
    return res.status(HttpStatus.OK).json({
      message: "Login berhasil",
      data: result
    });
  } catch (error) {
    if (isApiError(error)) {
      logger.warn("Login attempt failed", { error });
      return res.status(error.statusCode).json({ message: error.message });
    }
    logger.error("Internal server error on login", { error });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

export async function forgotPasswordController(req:Request<{}, {}, ForgotPasswordRequest>, res: Response) {
  const logger = createLogger("forgot-password-controller")
  try{
    const { email } = req.body;
    await AuthService.forgotPasswordService(email);
    return res.status(HttpStatus.OK).json({
      message: "Tautan reset password sudah dikirim ke email Anda."
    });
  } catch (error) {
    logger.error("Internal server error on forgot password", { error });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error"
    });
  }
}

export async function resetPasswordController(req: Request<{}, {}, ResetPasswordRequest>, res: Response) {
  const logger = createLogger("reset-password-controller")
  try {
    const { token, password } = req.body;
    await AuthService.resetPasswordService(token, password);
    return res.status(HttpStatus.OK).json({
      message: "Password berhasil direset"
    });
  } catch (error) {
    if (isApiError(error)) {
      logger.warn("Reset password attempt failed", {error})
      return res.status(error.statusCode).json({
        message: error.message
      });
    }
    logger.error('Internal Server error on reset password', { error })
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error"
    });
  }
}