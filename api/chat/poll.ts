import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Stateless Vercel environment has no in-memory chats array.
  // We return empty messages so the frontend doesn't crash on Vercel.
  res.json({ messages: [] });
}
