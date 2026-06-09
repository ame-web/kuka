import React from 'react';
import { NavTab, Language } from '../types';
import { translations } from '../translations';
import { Phone, MapPin, Clock, ArrowUpRight, Shield, Award } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: NavTab) => void;
  language: Language;
}

export default function Footer({ setCurrentTab, language }: FooterProps) {
  const t = translations[language];

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <button 
              type="button"
              id="footer-logo-btn"
              onClick={() => handleTabChange('home')} 
              className="flex items-center text-left"
            >
              <svg className="h-10 w-auto" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="48" rx="4" fill="#E50012" />
                <text x="8" y="33" fill="white" fontSize="26" fontWeight="800" letterSpacing="1.5">KUKA</text>
                <text x="98" y="32" fill="white" fontSize="12" fontWeight="400" letterSpacing="4">HOME</text>
                <line x1="90" y1="12" x2="90" y2="36" stroke="white" strokeWidth="1" opacity="0.4" />
              </svg>
            </button>
            <p className="text-sm font-medium text-neutral-300 leading-relaxed max-w-xs">
              {t.home.brandSub}
            </p>
            <div className="flex items-center gap-3 text-red-500 font-semibold text-xs uppercase tracking-wide">
              <Shield className="w-4 h-4" />
              <span>{t.home.benefit1Title}</span>
              <span className="text-neutral-700">•</span>
              <Award className="w-4 h-4 text-amber-500" />
              <span>44 {t.stats.years}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-3">
              {t.custom.homePagesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'about', label: t.nav.about },
                { id: 'furniture', label: t.nav.furniture },
                { id: 'showrooms', label: t.nav.showrooms },
                { id: 'videos', label: t.nav.videos },
                { id: 'vacancy', label: t.nav.vacancy },
                { id: 'contact', label: t.nav.contact }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleTabChange(link.id as NavTab)}
                    className="hover:text-white transition-colors py-0.5 text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-700 hover:text-red-500 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-3">
              {t.common.phone}
            </h4>
            <div className="space-y-3.5">
              <a 
                href="tel:+998909844014" 
                className="block text-xl md:text-2xl font-black text-white hover:text-red-500 transition-colors font-mono tracking-tight"
              >
                +998 (90) 984-40-14
              </a>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{t.showrooms.workingHours}</span>
                </div>
                <p className="font-mono text-xs pl-6 text-neutral-400">09:00 – 18:00 ({t.custom.everydayLabel})</p>
              </div>
              <div className="space-y-1 text-sm pt-1">
                <div className="flex items-start gap-2 text-neutral-300">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{t.contact.addressTitle}</span>
                </div>
                <p className="text-xs pl-6 text-neutral-400 leading-relaxed">
                  {translations[language].showrooms.title}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Badges */}
          <div className="space-y-5">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-3">
              {t.custom.paymentMethodsTitle}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 text-xs font-bold">
              {/* PAYME */}
              <div id="payment-badge-payme" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#00AECC" />
                    <rect x="12" y="14" width="16" height="12" rx="2" fill="white" />
                    <line x1="12" y1="19" x2="28" y2="19" stroke="#00AECC" strokeWidth="2" />
                    <circle cx="16" cy="22" r="1" fill="#00AECC" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">PAYME</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">Online</span>
                </div>
              </div>

              {/* CLICK */}
              <div id="payment-badge-click" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#00A550" />
                    <path d="M14 20a4 4 0 014-4h4a4 4 0 110 8h-4a4 4 0 01-4-4z" stroke="white" strokeWidth="2" />
                    <path d="M18 20h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M24 16l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">CLICK</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">Instant</span>
                </div>
              </div>

              {/* UZUM */}
              <div id="payment-badge-uzum" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#7C3AED" />
                    <circle cx="16" cy="18" r="3.5" fill="white" />
                    <circle cx="24" cy="18" r="3.5" fill="white" />
                    <circle cx="20" cy="24" r="3.5" fill="white" />
                    <path d="M20 11c-1.2 2-1 3.5 0 4" stroke="#D8B4FE" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">UZUM</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">Market</span>
                </div>
              </div>

              {/* HUMO */}
              <div id="payment-badge-humo" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#EA580C" />
                    <path d="M12 21c4.5-.8 9-4 11.2-8.5 1.5-3 .8-6-1.5-6 .8 1.5 0 3-1.5 3.8-2.2 1-4.5.8-6-1.5s-.8-3 1-3.8c1.5-.8 3.8 0 5 1.8 1.5-1.5 3.8-2 5.5-1.5 2.5.5 4.5 2.2 5.2 5.2.4 3-1 6.5-3 8.5-3 3-5.5 3.5-8.2 3.5H13.5" fill="white" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">HUMO</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">National</span>
                </div>
              </div>

              {/* UZCARD */}
              <div id="payment-badge-uzcard" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#0052C4" />
                    <path d="M14 14v7c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5v-7" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <path d="M23 18l4-4" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">UZCARD</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">Card</span>
                </div>
              </div>

              {/* VISA */}
              <div id="payment-badge-visa" className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 cursor-default select-none group h-12">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#1A1F71" />
                    <path d="M10 14l2.5 12h2.2l1.3-12h-2.5c-.2 0-.4.1-.5.3l-1.3 6.3-.5-6.3c-.1-.2-.3-.3-.5-.3h-1.2zm8 0l2 12h2.2l-2-12H18zm7.5 4.5c0-1.2-1.8-1.4-1.8-2.1v-.5c0-.4.3-.5.9-.5h1.8v1.2c.4-.2.8-.3 1.2-.3h.2L28 14h-2.1c-1.3 0-2.3.8-2.3 1.8 0 1.5 2 1.6 2 2.6V19c0 .4-.4.6-1 .6h-1.8l-.1-1.2h-1.2l.1 1.2h2.2c1.4 0 2.3-.8 2.3-1.8zm6.5-4.5H30c-.5 0-.9.4-.9.9l-1 9.1a.9.9 0 00.9.9h2.2c.5 0 .9-.4.9-.9l1-9.1a.9.9 0 00-.9-.9z" fill="white" />
                    <path d="M11.5 14h2.2l.6-3h-2.2a.6.6 0 00-.6.6" fill="#F59E0B" />
                  </svg>
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-white text-[11px] font-extrabold tracking-wider font-sans leading-none">VISA</span>
                  <span className="text-[8px] text-neutral-500 font-semibold tracking-tight mt-0.5 leading-none">Global</span>
                </div>
              </div>
            </div>
            
            {/* Social channels branding */}
            <div className="flex items-center gap-3 pt-2 border-t border-neutral-900 text-neutral-500">
              <span className="text-xs font-semibold">{t.custom.socialChannelsLabel}:</span>
              <span className="flex items-center gap-2 text-neutral-300 text-xs">
                <a href="https://www.instagram.com/kam1lov_1?igsh=MW5qcGplOXQ1aTI0aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Instagram</a>
                <span>•</span>
                <a href="https://t.me/kam1lov_1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Telegram</a>
              </span>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <div>
            <p>{t.common.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
