import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(5).max(20),
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{8,}$/),
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Format email tidak valid"),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token tidak boleh kosong"),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{8,}$/, "Password tidak valid"),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;