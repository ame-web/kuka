import React from 'react';
import { Language } from '../types';
import { showrooms } from '../products';
import { translations } from '../translations';
import { MapPin, Phone, Clock, Compass, Navigation2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface ShowroomsSectionProps {
  language: Language;
}

export default function ShowroomsSection({ language }: ShowroomsSectionProps) {
  const t = translations[language];

  return (
    <div className="bg-neutral-50 py-16 md:py-24 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <TypewriterText 
            text={language === 'uz' ? "Mo'ljallar" : "FLAGSHIP GALLERIES"}
            className="text-xs font-black text-red-600 uppercase tracking-widest pl-2 border-l border-red-600 block w-max mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            <TypewriterText 
              text={t.showrooms.title}
              delay={0.15}
            />
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            <TypewriterParagraph 
              text={t.showrooms.subtitle}
              delay={0.4}
            />
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="space-y-16">
          {showrooms.map((sr, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={sr.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-neutral-200/60 shadow-md p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden"
              >
                {/* Text and contacts side (cols 5) */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white bg-red-600 px-3 py-1 rounded uppercase tracking-wider inline-block">
                      {sr.id} • {
                        language === 'zh'
                          ? "旗舰级生活馆"
                          : language === 'ru'
                          ? "Флагманский салон"
                          : language === 'kz'
                          ? "Флагмандық салон"
                          : language === 'uz'
                          ? "Flagman salon"
                          : "Flagship Store"
                      }
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-neutral-900 leading-snug">
                      {sr.title[language]}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm md:text-base">
                    
                    {/* Address block */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">
                          {
                            language === 'zh'
                              ? "展厅地址"
                              : language === 'ru'
                              ? "Адрес"
                              : language === 'kz'
                              ? "Мекенжай"
                              : language === 'uz'
                              ? "Manzil"
                              : "Address"
                          }
                        </span>
                        <p className="text-neutral-800 font-medium leading-relaxed">{sr.address[language]}</p>
                      </div>
                    </div>

                    {/* Phone block */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">{t.showrooms.phone}</span>
                        <a href={`tel:${sr.phone.replace(/[^0-9+]/g, '')}`} className="text-red-600 font-bold hover:underline font-mono">
                          {sr.phone}
                        </a>
                      </div>
                    </div>

                    {/* Hours block */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">{t.showrooms.workingHours}</span>
                        <p className="text-neutral-700 font-semibold">{sr.workingHours[language]}</p>
                      </div>
                    </div>

                  </div>

                  {/* Navigator redirection button */}
                  <div className="pt-2">
                    <a
                      href={sr.yandexMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2 w-max shadow hover:shadow-lg cursor-pointer"
                    >
                      <Navigation2 className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{t.showrooms.yandexNav}</span>
                    </a>
                  </div>

                  {/* Highlights checklist */}
                  <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {
                          language === 'zh'
                            ? "专属免费私家车位"
                            : language === 'ru'
                            ? "Бесплатная парковка"
                            : language === 'kz'
                            ? "Тегін жеке автотұрақ"
                            : language === 'uz'
                            ? "Tekinga bepul turargoh"
                            : "Free Private Parking"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {
                          language === 'zh'
                            ? "一对一尊享3D方案"
                            : language === 'ru'
                            ? "Индивидуальный 3D дизайн"
                            : language === 'kz'
                            ? "Жеке 3D дизайн-жоба"
                            : language === 'uz'
                            ? "Individual 3D loyiha"
                            : "Bespoke 3D Layout"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {
                          language === 'zh'
                            ? "全球名贵面料选配库"
                            : language === 'ru'
                            ? "Каталог премиум-тканей"
                            : language === 'kz'
                            ? "Мата үлгілерінің таңдауы"
                            : language === 'uz'
                            ? "Keng matolar kutubxonasi"
                            : "Sample Fabric Library"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {
                          language === 'zh'
                            ? "顶奢名流精致茶歇"
                            : language === 'ru'
                            ? "Элитный Кофе-бар"
                            : language === 'kz'
                            ? "Премиум кофе-зона"
                            : language === 'uz'
                            ? "Elite Qahva xizmati"
                            : "Elite Coffee Lounge"
                        }
                      </span>
                    </div>
                  </div>

                </div>

                {/* Map integration side (cols 7) */}
                <div className={`lg:col-span-7 h-[300px] sm:h-[420px] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-inner relative flex ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  {/* Map Embed Frame representation */}
                  <iframe 
                    title={`Google Map representation of ${sr.title[language]}`}
                    src={sr.mapEmbedUrl} 
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen={true}
                    loading="lazy"
                  />

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
