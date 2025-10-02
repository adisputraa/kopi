import { transporter } from "../configs/nodemailer.js";

export async function sendVerificationEmailExample(email: string, url: string) {
  await transporter.sendMail({
    from: "<no-reply@example.com>",
    to: email,
    subject: "[APP NAME] - Subject",
    html: `
      <p>Welcome to [APP NAME],</p>

      <p>Please verify your email by clicking the link below:</p>

      <p>
        <a href="${url}" target="_blank">Verify My Email</a>
      </p>
      
      <p>This link will expire in 5 minutes.</p>
      <br/>
      <p>Regards,<br/>[APP NAME] Team</p>
    `,
  });
}


export async function sendPasswordResetEmail(email:string, url:string) {
  await transporter.sendMail({
    from: '"Kopi Kafe" <no-reply@kopikafe.com>',
    to: email,
    subject: "Reset Password Akun Kopi Kafe Anda",
    html: `
      <p>Halo,</p>
      <p>Kami menerima permintaan untuk mereset password akun Anda. Silakan klik tautan di bawah ini:</p>
      <p>
        <a href="${url}" target="_blank">Reset Password Saya</a>
      </p>
      <p>Tautan ini akan kedaluwarsa dalam 15 menit.</p>
      <br/>
      <p>Jika Anda tidak merasa meminta ini, abaikan saja email ini.</p>
      <p>Terima kasih,<br/>Tim Kopi Kafe</p>
    `,
  });
  console.log(">> SENDING PASSWORD RESET EMAIL TO:", email, "URL:", url);
}