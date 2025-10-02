import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import cryto from "crypto";

import * as UserRepository from '../repositories/users.repository';
import * as PasswordResetRepository from "../repositories/passwordReset.repository"
import { LoginRequest, RegisterRequest } from '../schemas/auth.schema';
import { createApiError } from '../utils/apiError';
import { HttpStatus } from '../utils/httpStatus';
import { sendPasswordResetEmail } from "../utils/sendEmail";

export async function registerService(
  username: string,
  email: string,
  password: string,
  name: string
) {
  const existingUserByUsername = await UserRepository.findUserByUsername(username);
  if (existingUserByUsername) {
    throw createApiError("Username sudah terdaftar", HttpStatus.CONFLICT);
  }
  const existingUserByEmail = await UserRepository.findUserByEmail(email);
  if (existingUserByEmail) {
    throw createApiError("Email sudah terdaftar", HttpStatus.CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return UserRepository.createUser(
    username,
    name,
    email,
    hashedPassword
  );
}

export async function loginService(username: string, password: string) {

  const user = await UserRepository.findUserByUsername(username);
  if (!user) {
    throw createApiError("Username atau password salah", HttpStatus.UNAUTHORIZED);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw createApiError("Username atau password salah", HttpStatus.UNAUTHORIZED);
  }

  const payload = {
    id: user.id,
    role: user.role
  }

  const token = jwt.sign(
    payload,
    process.env.SECRET_JWT_TOKEN as string,
    { expiresIn: "30m"}
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.SECRET_JWT_REFRESH_TOKEN as string,
    { expiresIn: "7d"}
  )
  console.log("JWT_TOKEN:", process.env.SECRET_JWT_TOKEN);
  console.log("JWT_REFRESH_TOKEN:", process.env.SECRET_JWT_REFRESH_TOKEN);


  return { token, refreshToken };
}

export async function forgotPasswordService(email:string) {

  const user = await UserRepository.findUserByEmail(email);
  if (!user) {
    return;
  }
  
  const resetToken = cryto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

  await PasswordResetRepository.createResetToken(user.id, resetToken, expiresAt);

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  console.log(">> SENDING PASSWORD RESET EMAIL TO:", user.email, "URL:", resetUrl);
  await sendPasswordResetEmail(user.email, resetUrl);
}

export async function resetPasswordService(token:string, password:string) {
  const savedToken = await PasswordResetRepository.findResetToken(token);
  if (!savedToken) {
    throw createApiError("Token tidak valid", HttpStatus.BAD_REQUEST);
  }

  if (new Date() > savedToken.expiresAt) {
    throw createApiError("Token sudah kadaluwarsa", HttpStatus.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserRepository.updateUserPassword(savedToken.userId, hashedPassword);

  await PasswordResetRepository.deleteResetToken(savedToken.id);
}