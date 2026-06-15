import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

interface ServerMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  actionButton?: {
    text: string;
    url: string;
  };
  productPreview?: {
    image: string;
    price: number;
    model: string;
  };
}

// In-memory store for sessions and messages mapping
const chats: Record<string, ServerMessage[]> = {}; 
const messageToSession: Record<number, string> = {}; 

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Minimal Telegram fetch utility
const sendTelegramMessage = async (chatId: string, text: string, options: any = {}) => {
  if (!TELEGRAM_BOT_TOKEN) return null;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        ...options
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Telegram send error:", error);
    return null;
  }
};

import productsHandler from "./api/products";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat/send", async (req, res) => {
    const { sessionId, text, language = 'uz' } = req.body;
    if (!sessionId || !text) {
      return res.status(400).json({ error: "Missing sessionId or text" });
    }

    if (!chats[sessionId]) {
      chats[sessionId] = [];
    }

    const userMsg: ServerMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    chats[sessionId].push(userMsg);

    // Forward to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const tgRes = await sendTelegramMessage(
          TELEGRAM_CHAT_ID, 
          `👤 User-${sessionId.slice(0, 4)} (${language.toUpperCase()})\nSession: ${sessionId}\n\n${text}`
        );
        if (tgRes?.ok) {
          messageToSession[tgRes.result.message_id] = sessionId;
        }
      } catch (err) {
        console.error("Telegram error:", err);
      }
    } else {
      // If Telegram is not configured, return an error so the frontend fallback kicks in
      return res.status(503).json({ error: "Telegram bot not configured yet on the backend" });
    }

    // Auto-Responder Free Rule-Based Engine
    const lowerText = text.toLowerCase();
    let autoReply = "";

    const replies: Record<string, Record<string, string>> = {
      uz: {
        price: "Avtomatik javob: Murojaatingiz uchun rahmat! Narxlar va to'lov shartlari bo'yicha menejerimiz tez orada sizga javob yozadi.",
        location: "Avtomatik javob: Bizning asosiy ko'rgazma zalimiz manzili: Toshkent sh., Gavxar ko'chasi, 124/1. KUKA HOME ko'rgazmalar zali. Haritalar orqali yo'nalishlar 'SHOWROOMLAR' bo'limida ham ko'rsatilgan. Menejerimiz qo'shimcha lokatsiyani tashlab beradi.",
        brand: "Avtomatik javob: KUKA HOME - premium klassdagi xalqaro mebel brendi bo'lib, o'z ichiga zamonaviy dizayn va qulaylikni mujassam etgan. Mutaxassislarimiz batafsil malumot bilan tez orada sizga aloqaga chiqishadi."
      },
      ru: {
        price: "Автоответ: Спасибо за обращение! Наш менеджер скоро ответит вам по поводу цен и условий оплаты.",
        location: "Автоответ: Наш главный выставочный зал находится по адресу: улица Гавхар, 124/1, Ташкент. Салон KUKA HOME. Маршрут также доступен в разделе 'ШОУРУМЫ'. Наш менеджер дополнительно отправит вам локацию.",
        brand: "Автоответ: KUKA HOME - международный мебельный бренд премиум-класса, сочетающий в себе современный дизайн и комфорт. Наши специалисты скоро свяжутся с вами."
      },
      en: {
        price: "Auto-reply: Thank you for reaching out! Our manager will reply shortly regarding prices and payment terms.",
        location: "Auto-reply: Our main showroom is located at: 124/1 Gavkhar Street, Tashkent. KUKA HOME showroom. Directions are also available in the 'SHOWROOMS' section. Our manager can drop a location pin for you.",
        brand: "Auto-reply: KUKA HOME is a premium international furniture brand. Our specialists will contact you shortly with detailed information."
      },
      kk: {
        price: "Автоматты жауап: Хабарласқаныңызға рақмет! Біздің менеджер бағалар мен төлем шарттары туралы жақында жауап береді.",
        location: "Автоматты жауап: Біздің негізгі көрме залымыз: Ташкент қ., Гавхар көшесі, 124/1. KUKA HOME көрме залы. Менеджеріміз сізге локация жібереді.",
        brand: "Автоматты жауап: KUKA HOME - заманауи дизайн мен жайлылықты біріктіретін халықаралық премиум жиһаз бренді. Мамандарыміз жақын арада байланысады."
      },
      zh: {
        price: "自动回复：感谢您的联系！我们的经理将很快回复您有关价格和付款条件的信息。",
        location: "自动回复：我们的主要展厅位于：塔什干市 Gavkhar路 124/1。KUKA HOME 展厅。我们的经理可以为您发送具体位置。",
        brand: "自动回复：KUKA HOME 是一个高端国际家具品牌，融合了现代设计与舒适感。我们的专家将很快与您联系以提供详细信息。"
      }
    };

    let productPreview: { id: string; image: string; price: number; model: string; } | undefined;
    if (lowerText.includes('736') || lowerText.includes('milanese')) {
      productPreview = { id: 'BY-736B', image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80", price: 4100, model: "BY.736B Milanese" };
    } else if (lowerText.includes('6033') || lowerText.includes('legenda')) {
      productPreview = { id: 'BY-6033', image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80", price: 3450, model: "BY.6033 Legenda" };
    } else if (lowerText.includes('700') || lowerText.includes('gravity')) {
      productPreview = { id: 'BY-700', image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80", price: 2100, model: "BY.700 Smart Gravity" };
    } else if (lowerText.includes('8105') || lowerText.includes('sienna')) {
      productPreview = { id: 'BY-8105', image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80", price: 2900, model: "BY.8105 Sienna Crown" };
    } else if (lowerText.includes('5020') || lowerText.includes('verona')) {
      productPreview = { id: 'BY-5020', image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=1200&q=80", price: 3200, model: "BY.5020 Verona Cloud" };
    } else if (lowerText.includes('4042') || lowerText.includes('capital')) {
      productPreview = { id: 'BY-4042', image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80", price: 1850, model: "BY.4042 Capital Table" };
    } else if (lowerText.includes('1022') || lowerText.includes('shell')) {
      productPreview = { id: 'BY-1022', image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80", price: 850, model: "BY.1022 Shell Lounge" };
    }

    const isPrice = !!productPreview || lowerText.includes("narx") || lowerText.includes("qancha") || lowerText.includes("nech pul") || lowerText.includes("nechpul") || lowerText.includes("how much") || lowerText.includes("price") || lowerText.includes("цена") || lowerText.includes("сколько") || lowerText.includes("баға") || lowerText.includes("多少钱") || lowerText.includes("价格") || lowerText.includes("费用");
    const isLoc = lowerText.includes("manzil") || lowerText.includes("lokatsiya") || lowerText.includes("qayerda") || lowerText.includes("location") || lowerText.includes("locatsiya") || lowerText.includes("address") || lowerText.includes("адрес") || lowerText.includes("локация") || lowerText.includes("мекенжай") || lowerText.includes("地址") || lowerText.includes("位置");
    const isBrand = lowerText.includes("kuka") || lowerText.includes("brend") || lowerText.includes("qanday mebel") || lowerText.includes("katalog") || lowerText.includes("бренд") || lowerText.includes("каталог") || lowerText.includes("brand") || lowerText.includes("品牌") || lowerText.includes("家具");

    const langReplies = replies[language] || replies['en'];

    let actionButton: { text: string; url: string; } | undefined;

    if (isPrice) {
      autoReply = productPreview 
        ? `${langReplies.price.replace('Narxlar va to\'lov', 'Ushbu model (' + productPreview.model + ') narxi va to\'lov').replace('цен и условий', 'цены на ' + productPreview.model + ' и условий').replace('prices and', 'the price of ' + productPreview.model + ' and')}`
        : langReplies.price;
    } else if (isLoc) {
      autoReply = langReplies.location;
      actionButton = {
        text: language === 'zh' ? '使用 YANDEX 地图导航' : language === 'ru' ? 'Открыть в Яндекс Картах' : 'Yandex Xaritada Ochish',
        url: 'https://yandex.com/maps/?text=KUKA+HOME+Tashkent'
      };
    } else if (isBrand) {
      autoReply = langReplies.brand;
    }

    if (autoReply) {
      setTimeout(() => {
        if (chats[sessionId]) {
          chats[sessionId].push({
            id: `auto-reply-${Date.now()}`,
            sender: 'bot',
            text: autoReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionButton,
            productPreview
          });
        }
      }, 1500); // 1.5 seconds delay for natural feel
    }

    res.json({ success: true, message: userMsg });
  });

  app.get("/api/chat/poll", (req, res) => {
    const { sessionId } = req.query;
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: "Missing sessionId" });
    }
    
    if (!chats[sessionId]) {
      chats[sessionId] = [];
    }

    res.json({ messages: chats[sessionId] });
  });

  app.get("/api/products", async (req, res) => {
    try {
      await productsHandler(req, res);
    } catch (error) {
      console.error("Sanity proxy error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, phone, message } = req.body;
    
    if (!name || !phone || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const plainPhone = phone.replace(/\D/g, '');
        const text = `📝 *New Contact Form Submission*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:*\n${message}\n\n[Message on Telegram](https://t.me/+${plainPhone})`;
        await sendTelegramMessage(TELEGRAM_CHAT_ID, text, { parse_mode: 'Markdown', disable_web_page_preview: true });
        return res.json({ success: true });
      } catch (err) {
        console.error("Telegram contact form error:", err);
        return res.status(500).json({ error: "Failed to send message to Telegram" });
      }
    } else {
      return res.status(503).json({ error: "Telegram bot not configured" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
