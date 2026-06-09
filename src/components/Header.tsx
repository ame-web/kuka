import React, { useState } from 'react';
import { NavTab, Language } from '../types';
import { translations } from '../translations';
import { 
  Menu, X, Globe, ChevronDown, Check, Phone, MessageSquare,
  Home, Info, MapPin, LayoutGrid, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenChat: () => void;
}

const mobileNavLabels: Record<Language, Record<Exclude<NavTab, 'videos'>, string>> = {
  uz: {
    home: "Bosh sa...",
    about: "Biz haqi...",
    showrooms: "Manzil",
    furniture: "Mebellar",
    vacancy: "Vakansiya",
    contact: "Aloqa"
  },
  ru: {
    home: "Главная",
    about: "О нас",
    showrooms: "Адрес",
    furniture: "Мебель",
    vacancy: "Вакансии",
    contact: "Контакты"
  },
  en: {
    home: "Home",
    about: "About",
    showrooms: "Location",
    furniture: "Furniture",
    vacancy: "Vacancy",
    contact: "Contact"
  },
  kz: {
    home: "Басты бет",
    about: "Біз туралы",
    showrooms: "Мекенжай",
    furniture: "Жиһаз",
    vacancy: "Бос орындар",
    contact: "Контактілер"
  },
  zh: {
    home: "首页",
    about: "关于我们",
    showrooms: "展厅地址",
    furniture: "高定家具",
    vacancy: "加入我们",
    contact: "联系我们"
  }
};

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文 (繁體)', flag: '🇨🇳' }
];

export default function Header({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenChat
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = translations[language];

  const menuItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'furniture', label: t.nav.furniture },
    { id: 'showrooms', label: t.nav.showrooms },
    { id: 'videos', label: t.nav.videos },
    { id: 'vacancy', label: t.nav.vacancy },
    { id: 'contact', label: t.nav.contact }
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Upper Info Banner */}
      <div className="bg-neutral-950 text-neutral-400 text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-neutral-900 z-50 relative font-sans">
        <div className="flex items-center gap-4">
          <a href="tel:+998909844014" className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span className="font-semibold text-neutral-300 font-mono">+998 (90) 984-40-14</span>
          </a>
          <span className="hidden sm:inline text-neutral-600 font-light">|</span>
          <span className="hidden sm:inline font-light text-neutral-400">
            {t.showrooms.workingHours}: <span className="text-neutral-300 font-mono">09:00 - 18:00</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={onOpenChat}
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 font-medium bg-red-950/20 px-2 py-0.5 rounded border border-red-900/40"
          >
            <MessageSquare className="w-3 h-3" />
            <span>{t.custom.consultantOnlineBadge}</span>
          </button>
        </div>
      </div>

      {/* Main Premium White Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 z-40 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Logo SVG matching KUKA HOME brand */}
          <button 
            type="button"
            id="header-logo"
            onClick={() => handleTabChange('home')} 
            className="flex items-center gap-2 text-left shrink-0 cursor-pointer"
          >
            <svg 
              className="h-9 w-auto" 
              viewBox="0 0 160 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="160" height="48" rx="4" fill="#E50012" />
              <text 
                x="8" 
                y="33" 
                fill="white" 
                fontSize="26" 
                fontWeight="800" 
                fontFamily="'Montserrat', 'Inter', sans-serif" 
                letterSpacing="1.5"
              >
                KUKA
              </text>
              <text 
                x="98" 
                y="32" 
                fill="white" 
                fontSize="12" 
                fontWeight="400" 
                fontFamily="'Montserrat', 'Inter', sans-serif" 
                letterSpacing="4"
              >
                HOME
              </text>
              <line x1="90" y1="12" x2="90" y2="36" stroke="white" strokeWidth="1" opacity="0.4" />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabChange(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-md ${
                    isActive 
                      ? 'text-red-600 bg-red-50/50' 
                      : 'text-neutral-700 hover:text-red-600 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderTab"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher and Mobile Toggle Button */}
          <div className="flex items-center gap-3">
            
            {/* Elegant Language Selector */}
            <div className="relative font-sans text-left">
              <button
                type="button"
                id="lang-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer text-sm font-medium text-neutral-800"
              >
                <Globe className="w-4 h-4 text-neutral-500" />
                <span className="font-mono text-xs uppercase font-bold text-neutral-600">
                  {currentLangObj.code}
                </span>
                <span>{currentLangObj.flag}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsLangDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white border border-neutral-100 py-1.5 z-20 text-sm font-medium ring-1 ring-black/5"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-red-50/50 hover:text-red-600 transition-colors ${
                            language === lang.code 
                              ? 'text-red-600 bg-red-50/20 font-semibold' 
                              : 'text-neutral-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {language === lang.code && (
                            <Check className="w-4 h-4 text-red-600" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      {/* Premium Floating Bottom Navigation Dock for Mobile/Tablets */}
      <div className="md:hidden fixed bottom-5 left-4 right-4 z-[45] mx-auto max-w-xl font-sans">
        <div className="bg-white/95 backdrop-blur-md rounded-[20px] shadow-[0px_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200/50 flex justify-between items-center px-1.5 py-2.5">
          {[
            { id: 'home', icon: Home },
            { id: 'about', icon: Info },
            { id: 'showrooms', icon: MapPin },
            { id: 'furniture', icon: LayoutGrid },
            { id: 'vacancy', icon: FileText },
            { id: 'contact', icon: MessageSquare }
          ].map((item) => {
            const isActive = currentTab === item.id;
            const IconComponent = item.icon;
            const label = mobileNavLabels[language][item.id as Exclude<NavTab, 'videos'>];

            return (
              <button
                key={item.id}
                type="button"
                id={`bottom-nav-link-${item.id}`}
                onClick={() => handleTabChange(item.id as NavTab)}
                className="flex flex-col items-center justify-center flex-1 min-w-0 transition-transform py-0.5 relative cursor-pointer active:scale-95"
              >
                <div className={`transition-all duration-200 mb-0.5 ${isActive ? 'scale-110 text-red-600' : 'text-neutral-400 hover:text-neutral-700'}`}>
                  <IconComponent className="w-5 h-5 mx-auto" strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span 
                  className={`text-[9px] truncate max-w-full tracking-tighter text-center leading-none ${
                    isActive 
                      ? 'text-red-600 font-extrabold font-sans' 
                      : 'text-neutral-500 font-medium font-sans'
                  }`}
                >
                  {label}
                </span>

                {/* Micro active layout capsule line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeMobileIndicator"
                    className="absolute bottom-[-6px] w-5 h-0.5 bg-red-600 rounded-full" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
