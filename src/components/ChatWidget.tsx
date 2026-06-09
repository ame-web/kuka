import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { MessageSquare, X, Send, User, ChevronRight, Clock, Star, Heart, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWidgetProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  actionButton?: {
    text: string;
    url: string;
  };
  productPreview?: {
    id: string;
    image: string;
    price: number;
    model: string;
  };
}

interface ChatWidgetProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onProductClick?: (productId: string) => void;
}

export default function ChatWidget({ language, isOpen, onClose, onOpen, onProductClick }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectingAgent, setConnectingAgent] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Initialize with localized welcome message and create a session
  useEffect(() => {
    // Only generate session if not exists
    if (!sessionId) {
      setSessionId(`sess-${Math.random().toString(36).substring(2, 10)}`);
    }

    setMessages([
      {
        id: 'initial',
        sender: 'bot',
        text: t.chat.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language, t.chat.welcome, sessionId]);

  // Polling mechanism
  useEffect(() => {
    if (!sessionId || !isOpen) return;
    
    let interval: ReturnType<typeof setInterval>;

    const pollMessages = async () => {
      try {
        const res = await fetch(`/api/chat/poll?sessionId=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(prev => {
              // merge existing initial message + backend messages
              const initialMessage = prev.find(m => m.id === 'initial');
              const newMessages = initialMessage ? [initialMessage, ...data.messages] : data.messages;
              
              // Only update if length changed or we want a simpler equality check
              if (newMessages.length !== prev.length) {
                return newMessages;
              }
              return prev;
            });
            setIsTyping(false); // If we received a reply, stop typing indicator
          }
        }
      } catch (e) {
         // silently ignore polling errors
      }
    };

    interval = setInterval(pollMessages, 2500);
    return () => clearInterval(interval);
  }, [sessionId, isOpen]);

  // Handle scroll to bottom when messages are updated
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const generateSmartAutoReply = (userInput: string): { text: string; productPreview?: any } => {
    const q = userInput.toLowerCase();
    
    let productPreview: { id: string; image: string; price: number; model: string; } | undefined;
    if (q.includes('736') || q.includes('milanese')) {
      productPreview = { id: 'BY-736B', image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80", price: 4100, model: "BY.736B Milanese" };
    } else if (q.includes('6033') || q.includes('legenda')) {
      productPreview = { id: 'BY-6033', image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80", price: 3450, model: "BY.6033 Legenda" };
    } else if (q.includes('700') || q.includes('gravity')) {
      productPreview = { id: 'BY-700', image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80", price: 2100, model: "BY.700 Smart Gravity" };
    } else if (q.includes('8105') || q.includes('sienna')) {
      productPreview = { id: 'BY-8105', image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80", price: 2900, model: "BY.8105 Sienna Crown" };
    } else if (q.includes('5020') || q.includes('verona')) {
      productPreview = { id: 'BY-5020', image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=1200&q=80", price: 3200, model: "BY.5020 Verona Cloud" };
    } else if (q.includes('4042') || q.includes('capital')) {
      productPreview = { id: 'BY-4042', image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80", price: 1850, model: "BY.4042 Capital Table" };
    } else if (q.includes('1022') || q.includes('shell')) {
      productPreview = { id: 'BY-1022', image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80", price: 850, model: "BY.1022 Shell Lounge" };
    }

    if (language === 'uz') {
      if (q.includes('manzil') || q.includes('showroom') || q.includes('salon') || q.includes('adres') || q.includes('yunusobod') || q.includes('labzak') || q.includes('gavxar')) {
        return { text: "Bizning Toshkentda muhtasham showroomimiz bor:\n1) Gavxar ko'chasi 124/1 (+998 90 984-40-14). Sizni kutib qolamiz!" };
      }
      if (productPreview || q.includes('narx') || q.includes('qancha') || q.includes('bahosi') || q.includes('dollar') || q.includes('sofa') || q.includes('divan') || q.includes('nech pul') || q.includes('nechpul')) {
        let text = "Premium divan va krovatlarimiz narxi loyiha va olchamiga qarab $1250 dan $4100 gacha hisoblanadi. Payme, Click va bank kartalari orqali to'lovlar qabul qilinadi.";
        if (productPreview) {
          text = `Ushbu model (${productPreview.model}) narxi va to'lov shartlari bo'yicha menejerimiz tez orada sizga javob yozadi.`;
        }
        return { text, productPreview };
      }
      if (q.includes('etkazish') || q.includes('dostavka') || q.includes('yetkazish')) {
        return { text: "KUKA HOME o'z xaridorlari uchun butun Toshkent bo'ylab elita yetkazib berish va bepul yig'ib berish (assembly) xizmatini mutlaqo bepul taqdim etadi!" };
      }
      if (q.includes('ish vaqti') || q.includes('soat') || q.includes('vaqt')) {
        return { text: "Showroomlarimiz har kuni haftada 7 kun davomida soat 09:00 dan 18:00 gacha tanaffussiz xizmak ko'rsatishadi." };
      }
      return { text: "So'rovingiz qabul qilindi. Sizni batafsil ma'lumotlar bilan bog'lash uchun haqiqiy operator konsultantga ulaymi?" };
    } else if (language === 'kz') {
      if (q.includes('мекенжай') || q.includes('салон') || q.includes('шоурум') || q.includes('жұмыс') || q.includes('юнусабад') || q.includes('гавхар')) {
        return { text: "Біздің Ташкентте үлкен көрме залымыз (шоурум) жұмыс істейді:\n1) Гавхар көшесі, 124/1 (+998 90 984-40-14). Күтеміз!" };
      }
      if (productPreview || q.includes('баға') || q.includes('қанша') || q.includes('диван') || q.includes('төсек') || q.includes('құны')) {
        let text = "KUKA HOME премиум жиһаздарының бағасы таңдалған модель мен көлемге байланысты $1250-дан $4100-ға дейін болады. Click, Payme және қолма-қол төлемдерді қабылдаймыз.";
        if (productPreview) {
          text = `Осы модельдің (${productPreview.model}) бағасы және төлем шарттары бойынша менеджеріміз жақында сізге жауап береді.`;
        }
        return { text, productPreview };
      }
      if (q.includes('жеткізу') || q.includes('құрастыру')) {
        return { text: "KUKA HOME сіздің үйіңізге дейін премиум жеткізуді және Ташкент бойынша жиһазды кәсіби құрастыруды толықтай ТЕГІН жүзеге асырады!" };
      }
      if (q.includes('уақыт') || q.includes('сағат') || q.includes('жұмыс')) {
        return { text: "Көрме залдарымыз күн сайын сағат 09:00-ден 18:00-ге дейін үзіліссіз ашық." };
      }
      return { text: "Сұранысыңыз қабылданды. Сізге жауап беру үшін тікелей кеңесші-операторға қосайын ба?" };
    } else if (language === 'zh') {
      if (q.includes('地址') || q.includes('生活馆') || q.includes('展厅') || q.includes('在哪') || q.includes('位置')) {
        return { text: "我们在塔什干设有旗舰生活馆：\n1) Gavkhar路 124/1 (电话: +998 90 984-40-14). 欢迎您莅临品鉴！" };
      }
      if (productPreview || q.includes('价格') || q.includes('多少钱') || q.includes('沙发') || q.includes('床') || q.includes('餐桌')) {
        let text = "我们的尊享高定沙发及主卧床具系列价格在 $1250 至 $4100 之间（根据软包布艺或皮质方案定制）。支持当地 Click, Payme 以及国际 Visa 信用卡支付。";
        if (productPreview) {
          text = `关于该模型（${productPreview.model}）的价格和付款条件，我们的经理将很快回复您。`;
        }
        return { text, productPreview };
      }
      if (q.includes('配送') || q.includes('送货') || q.includes('安装')) {
        return { text: "KUKA HOME 顾家家居专为塔什干尊客提供全城免费高端专车送货及大师级上门整装搭建服务！" };
      }
      if (q.includes('时间') || q.includes('营业') || q.includes('几点')) {
        return { text: "尊享生活馆营业时间为每日 09:00 - 18:00 (含周末，午间无休)。" };
      }
      return { text: "已为您登记诉求。是否需要立即为您呼叫展厅首席高定设计师在线接待？" };
    } else if (language === 'ru') {
      if (q.includes('адрес') || q.includes('салон') || q.includes('шоурум') || q.includes('юнусабад') || q.includes('лабзак') || q.includes('гавхар')) {
        return { text: "В Ташкенте работает наш флагманский автосалон:\n1) улица Гавхар, 124/1, Ташкент (+998 90 984-40-14). Ждем вас в гости!" };
      }
      if (productPreview || q.includes('цена') || q.includes('сколько') || q.includes('диван') || q.includes('кресло') || q.includes('кровать')) {
        let text = "Стоимость премиальной мебели KUKA HOME варьируется от $1250 до $4100 в зависимости от модели и комплектации. Есть возможность оплаты через Click, Payme и терминалы.";
        if (productPreview) {
           text = `Наш менеджер скоро ответит вам по поводу цены на ${productPreview.model} и условий оплаты.`;
        }
        return { text, productPreview };
      }
      if (q.includes('доставка') || q.includes('сборка')) {
        return { text: "Мы предоставляем премиальную доставку до дома и профессиональную сборку мебели в пределах всего Ташкента абсолютно БЕСПЛАТНО!" };
      }
      if (q.includes('время') || q.includes('работа')) {
        return { text: "Наши двери открыты ежедневно с 09:00 до 18:00 без обеденных перерывов." };
      }
      return { text: "Ваш запрос понятен. Если хотите, я могу подключить живого дежурного консультанта прямо сейчас?" };
    } else {
      // Default English
      if (q.includes('address') || q.includes('location') || q.includes('showroom') || q.includes('where')) {
        return { text: "We operate a grand gallery in Tashkent:\n1) 124/1 Gavkhar Street, Tashkent (Phone: +998 90 984-40-14). Highly welcome!" };
      }
      if (productPreview || q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('money')) {
        let text = "Our modern luxury couches and masterbeds range from $1250 to $4100. We accept local Click, Payme, and international Visa cards.";
        if (productPreview) {
          text = `Our manager will reply to you soon regarding the price of ${productPreview.model} and payment conditions.`;
        }
        return { text, productPreview };
      }
      if (q.includes('delivery') || q.includes('shipping') || q.includes('assemble')) {
        return { text: "For all Tashkent clients, KUKA HOME provides white-glove home delivery and expert structural assembly completely direct and free of charge!" };
      }
      return { text: "Thank you for reaching out. Would you like to connect directly to our luxury showroom specialist counselor right now?" };
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    
    // Optimistic UI update
    const tempId = `temp-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: tempId,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, text: userText, language })
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      // Fallback to smart auto-reply if backend offline
      setTimeout(() => {
        setIsTyping(false);
        const { text: botReplyText, productPreview } = generateSmartAutoReply(userText);
        const botMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          sender: 'bot',
          text: botReplyText,
          productPreview,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 1200);
    }
  };

  // Connect manager specialist callback loop
  const triggerConnectSpecialist = () => {
    setConnectingAgent(true);
    setIsTyping(true);

    setTimeout(() => {
      setConnectingAgent(false);
      setIsTyping(false);
      const agentMsg: ChatMessage = {
        id: `agent-joined-${Date.now()}`,
        sender: 'agent',
        text: t.chat.agentConnected + (
          language === 'zh'
            ? " 感谢您对顾家家居的关注。我是您的专属线上美学顾问，很高兴能为您详细定制专属的空间搭配与选配包方案！"
            : language === 'uz'
            ? " Kompaniyamizga qiziqish bildirganingizdan juda xursandmiz. Men sizning interyer va qulaylik sirlari bo'yicha maslahatchingizman!"
            : language === 'kz'
            ? " Көрсеткен қызығушылығыңызға рақмет. Мен сізге біздің маталар мен премиум жиһаздар таңдауын жасауға немесе салонымызға жеке тур ұйымдастыруға көмектесемін!"
            : language === 'ru'
            ? " Спасибо за проявленный интерес. Я с удовольствием проконсультирую вас по выбору ткани, комплектации и помогу составить индивидуальный дизайн-проект!"
            : " Delighted to connect. I will guide you through our customized fabrics or arrange a private tour of our showroom!"
        ),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 2000);
  };

  return (
    <>
      {/* Floating launcher trigger circle */}
      <div ref={widgetRef} className="fixed md:bottom-6 md:right-6 bottom-24 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              id="chat-widget-launcher-btn"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={onOpen}
              className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-red-650/40 cursor-pointer transform hover:scale-105 active:scale-95 transition-all relative group"
            >
              {/* Pulsing visual halo */}
              <span className="absolute inset-0 rounded-full border border-red-600 animate-ping opacity-35" />
              <MessageSquare className="w-6 h-6 mx-auto group-hover:rotate-6 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Chat Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-[300px] sm:w-[360px] h-[380px] sm:h-[500px] max-h-[65vh] sm:max-h-[75vh] bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden flex flex-col font-sans"
            >
              
              {/* Structured Header */}
              <div className="bg-neutral-950 text-white px-5 py-4 flex justify-between items-center border-b border-neutral-900 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white font-extrabold text-center flex items-center justify-center font-sans tracking-wider border border-white/10 shrink-0">
                    <span className="mx-auto leading-none">K</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-wide">{t.chat.title}</h4>
                    <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{t.chat.subtitle} ({t.chat.statusOnline})</span>
                    </span>
                  </div>
                </div>
                
                {/* Close Trigger */}
                <button
                  type="button"
                  id="chat-widget-close-btn"
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Feed Content Screen */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-neutral-50/70 select-text">
                {messages.map((m) => {
                  const isUser = m.sender === 'user';
                  const isAgent = m.sender === 'agent';
                  return (
                    <div 
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                        isUser 
                          ? 'bg-neutral-900 text-white rounded-tr-none' 
                          : isAgent
                            ? 'bg-red-50 border border-red-100 text-neutral-900 rounded-tl-none font-semibold'
                            : 'bg-white border border-neutral-200 text-neutral-800 rounded-tl-none'
                      }`}>
                        {/* If formatted multiline text */}
                        <p className="whitespace-pre-line">{m.text}</p>
                        {m.productPreview && (
                          <div 
                            className={`mt-3 bg-white p-2 border border-neutral-100 rounded-lg shadow-sm ${onProductClick ? 'cursor-pointer hover:border-red-200 hover:shadow-md transition-all' : ''}`}
                            onClick={() => {
                              if (onProductClick && m.productPreview) {
                                onProductClick(m.productPreview.id);
                              }
                            }}
                          >
                            <img 
                              src={m.productPreview.image} 
                              alt={m.productPreview.model} 
                              className="w-full h-32 object-cover rounded-md mb-2" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-[11px] font-bold text-neutral-900 mb-0.5">{m.productPreview.model}</div>
                            <div className="text-[12px] font-mono text-red-600">${m.productPreview.price}</div>
                          </div>
                        )}
                        {m.actionButton && (
                          <a 
                            href={m.actionButton.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-lg text-[11px] font-bold tracking-wide transition-colors"
                          >
                            <Navigation className="w-3.5 h-3.5 text-orange-400" fill="currentColor" />
                            {m.actionButton.text}
                          </a>
                        )}
                      </div>
                      <span className="text-[9px] text-neutral-400 font-mono mt-1 font-semibold pl-1.5 pr-1.5">
                        {m.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex flex-col items-start">
                    <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm flex items-center justify-center gap-1 max-w-[85%]">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    {connectingAgent && (
                      <span className="text-[9px] text-red-500 font-bold mt-1 uppercase tracking-widest pl-1">
                        {t.chat.agentConnecting}
                      </span>
                    )}
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Specialist Redirect Link Button inside active feed */}
              {messages.length > 1 && !connectingAgent && !messages.some(m => m.sender === 'agent') && (
                <div className="px-4 py-2 bg-neutral-900 text-white overflow-hidden shrink-0 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className="text-neutral-400">
                    {
                      language === 'zh'
                        ? "是否邀请定制顾问在线规划？"
                        : language === 'ru'
                        ? "Подключить специалиста?"
                        : language === 'kz'
                        ? "Маманмен байланысу керек пе?"
                        : language === 'uz'
                        ? "Konsultantga ulanasizmi?"
                        : "Connect specialist?"
                    }
                  </span>
                  <button
                    type="button"
                    onClick={triggerConnectSpecialist}
                    className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[10px] font-black transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>
                      {
                        language === 'zh'
                          ? "在线呼叫"
                          : language === 'ru'
                          ? "ДА"
                          : language === 'kz'
                          ? "ҚОСЫЛУ"
                          : language === 'uz'
                          ? "Ulanish"
                          : "Join"
                      }
                    </span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Chat Form Footer */}
              <form 
                onSubmit={handleSendMessage}
                className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  id="chat-message-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.chat.inputPlaceholder}
                  className="flex-grow px-3.5 py-2.5 rounded-full border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 text-xs font-semibold"
                />
                <button
                  type="submit"
                  id="chat-message-submit-btn"
                  className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 mx-auto" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
