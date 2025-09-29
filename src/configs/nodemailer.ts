import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.EMAIL_SECURE),
  auth: {
    user: process.env.EMAIL_AUTH_EMAIL,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
});
