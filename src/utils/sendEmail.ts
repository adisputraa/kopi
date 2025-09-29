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
