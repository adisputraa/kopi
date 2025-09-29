import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import * as UserRepository from '../repositories/users.repository';
import { LoginRequest, RegisterRequest } from '../schemas/auth.schema';
import { createApiError } from '../utils/apiError';
import { HttpStatus } from '../utils/httpStatus';

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

  return UserRepository.createUser({
    username,
    name,
    email,
    password: hashedPassword,
  });
}

export async function loginService(data: LoginRequest) {
  const { username, password} = data;

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
    { expiresIn: "24h"}
  );

  return { token };
}