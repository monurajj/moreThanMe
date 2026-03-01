/**
 * Brevo (formerly Sendinblue) email client.
 * Sender email must be verified in your Brevo account.
 */

const API_URL = "https://api.brevo.com/v3/smtp/email";

export interface SendEmailOptions {
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  sender?: { email: string; name: string };
}

export async function sendEmail(options: SendEmailOptions): Promise<{ messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "unitedforgood2025@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "More Than Me";

  if (!apiKey) {
    return { error: "BREVO_API_KEY is not configured" };
  }

  const body = {
    sender: options.sender || { email: senderEmail, name: senderName },
    to: options.to,
    subject: options.subject,
    htmlContent: options.htmlContent,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.message || `Brevo API error: ${res.status}` };
  }

  const data = await res.json().catch(() => ({}));
  return { messageId: data.messageId };
}
