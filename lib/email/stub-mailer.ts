/**
 * Stub mailer: logs instead of sending. Swap for a real provider (Resend,
 * Nodemailer, etc.) by replacing the body of `sendMail` — the call sites
 * elsewhere in the app don't need to change.
 */
export async function sendMail(params: {
  to: string;
  subject: string;
  body: string;
}) {
  console.log(`[stub-mailer] To: ${params.to} | Subject: ${params.subject}\n${params.body}`);
}
