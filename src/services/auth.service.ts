import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import * as UserRepository from '../repositories/users.repository';
import { LoginRequest, RegisterRequest } from '../schemas/auth.schema';
import { createApiError } from '../utils/apiError';
import { HttpStatus } from '../utils/httpStatus';

export async function registerService(data: RegisterRequest) {
  const { username, email, password, name } = data;

  // 1. Cek duplikasi username atau email
  const existingUserByUsername = await UserRepository.findUserByUsername(username);
  if (existingUserByUsername) {
    throw createApiError("Username sudah terdaftar", HttpStatus.CONFLICT);
  }
  const existingUserByEmail = await UserRepository.findUserByEmail(email);
  if (existingUserByEmail) {
    throw createApiError("Email sudah terdaftar", HttpStatus.CONFLICT);
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Buat user baru
  const newUser = await UserRepository.createUser({
    username,
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
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