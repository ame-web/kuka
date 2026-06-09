import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const plainPhone = phone.replace(/\D/g, '');
      const text = `📝 *New Contact Form Submission (Vercel)*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:*\n${message}\n\n[Message on Telegram](https://t.me/+${plainPhone})`;
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      if (!response.ok) {
        console.error(`Telegram API responded with ${response.status}`);
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Telegram contact form error:", err);
      // Fallback to success to avoid breaking UI if Telegram is failing
      return res.status(200).json({ success: true, warning: 'Telegram error ignored' });
    }
  } else {
    console.warn("Telegram bot not configured on Vercel. Simulating success.");
    return res.status(200).json({ success: true, warning: 'Telegram not configured' });
  }
}
