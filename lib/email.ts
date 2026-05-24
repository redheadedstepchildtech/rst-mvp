import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await resend.emails.send({
      from: "RST <noreply@rst-tech.org>",
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}
