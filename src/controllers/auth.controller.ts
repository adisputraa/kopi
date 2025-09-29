// src/controllers/auth.controller.ts
import { Request, Response } from "express";

import * as AuthService from "../services/auth.service";
import { LoginRequest, RegisterRequest } from "../schemas/auth.schema";
import { isApiError } from "../utils/apiError";
import { HttpStatus } from "../utils/httpStatus";
import { createLogger } from "../utils/logger";

export async function registerController(req: Request<{}, {}, RegisterRequest>, res: Response) {
  const logger = createLogger("register-controller");
  try {
    const result = await AuthService.registerService(req.body);
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
    const result = await AuthService.loginService(req.body);
    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    if (isApiError(error)) {
      logger.warn("Login attempt failed", { error });
      return res.status(error.statusCode).json({ message: error.message });
    }
    logger.error("Internal server error on login", { error });
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}