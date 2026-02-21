module.exports = {
  sendEmail: async ({ to, subject, html }) => {
    console.log('[notify] email ->', to, subject);
    // integrate SendGrid/Mailgun etc.
    return { ok: true };
  },
  sendSMS: async ({ to, text }) => {
    console.log('[notify] sms ->', to, text);
    // integrate Twilio etc.
    return { ok: true };
  },
  sendPush: async ({ userId, payload }) => {
    console.log('[notify] push ->', userId, payload);
    return { ok: true };
  }
};
