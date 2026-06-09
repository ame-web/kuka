import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, text, language } = req.body;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const tgMsg = `👤 User-${String(sessionId).slice(0, 4)} (${String(language).toUpperCase()})\nSession: ${sessionId}\n\n${text}\n\n⚠️ (Sent via Vercel Serverless. To reply, an external Database like Redis is required.)`;
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: tgMsg,
        })
      });

      if (!response.ok) {
        console.error('Failed to send to TG:', await response.text());
      }
    } catch (err) {
      console.error("Telegram error:", err);
    }
  }

  // Always return an error so the frontend triggers the smart auto-reply fallback!
  // This is a hack for Serverless environments without a DB for polling.
  return res.status(501).json({ error: "Polling not supported on Serverless. Trigger local fallback." });
}
