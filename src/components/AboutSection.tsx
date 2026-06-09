import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Compass, Sparkles, Milestone, Feather, Award, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import AnimateCounter from './AnimateCounter';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language];

  return (
    <div className="bg-white py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Narrative Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          
          {/* Visual Canvas Block */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative space-y-4"
          >
            <div className="aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden shadow-xl border border-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80" 
                alt="KUKA HOME Designer sketch room" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.9]"
              />
              {/* Abs Floating Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-neutral-950/90 text-white p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-neutral-800">
                <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest block mb-1">{t.custom.designLabsTitle}</span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {t.custom.designLabsText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Narrative Info Block */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <TypewriterText 
                text={t.custom.ourHeritageBadge}
                className="text-red-600 text-xs font-black uppercase tracking-widest block"
              />
              <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
                <TypewriterText 
                  text={t.about.title}
                  delay={0.15}
                />
              </h2>
              <p className="text-sm md:text-lg text-neutral-500 font-medium">
                <TypewriterParagraph 
                  text={t.about.subtitle}
                  delay={0.4}
                />
              </p>
            </div>

            <div className="space-y-5 text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              <p>{t.about.desc1}</p>
              <p>{t.about.desc2}</p>
            </div>

            {/* Custom mini columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                  <Feather className="w-5 h-5 mx-auto" />
                </div>
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm">{t.custom.lightweightAestheticsTitle}</h4>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">{t.custom.lightweightAestheticsDesc}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 mx-auto" />
                </div>
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm">{t.custom.isoCertifiedTitle}</h4>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">{t.custom.isoCertifiedDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Philosophy Segment */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 md:mt-32 bg-neutral-950 text-white rounded-3xl p-8 md:p-16 border border-neutral-900 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-10 shrink-0 select-none pointer-events-none translate-x-12 -translate-y-12">
            <Compass className="w-96 h-96 text-white" />
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="max-w-3xl space-y-6 relative z-10"
          >
            <TypewriterText 
              text={t.custom.spatialCognitionBadge}
              className="text-red-500 text-xs font-black uppercase tracking-widest block"
            />
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
              <TypewriterText 
                text={t.about.philosophyTitle}
                delay={0.15}
              />
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              <TypewriterParagraph 
                text={t.about.philosophyDesc}
                delay={0.4}
              />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-900 text-xs">
              <div>
                <span className="text-neutral-500 block font-bold uppercase tracking-wider mb-1">{t.custom.lumbarScienceTitle}</span>
                <p className="text-neutral-400 font-light">
                  <AnimateCounter value={105} start={1} suffix="-degree" /> {t.custom.lumbarScienceDesc}
                </p>
              </div>
              <div>
                <span className="text-neutral-500 block font-bold uppercase tracking-wider mb-1">{t.custom.hygieneFirstTitle}</span>
                <p className="text-neutral-400 font-light">{t.custom.hygieneFirstDesc}</p>
              </div>
              <div>
                <span className="text-neutral-500 block font-bold uppercase tracking-wider mb-1">{t.custom.durabilityScaleTitle}</span>
                <p className="text-neutral-400 font-light">
                  {t.custom.durabilityScaleDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cohesive Milestone Timeline */}
        <div className="mt-20 md:mt-32 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto space-y-2"
          >
            <span className="text-xs font-black text-red-600 uppercase tracking-widest">{t.custom.timelineSubtitle}</span>
            <h3 className="text-2xl md:text-3xl font-black text-neutral-950 tracking-tight">
              {t.custom.timelineTitle}
            </h3>
          </motion.div>

          <div className="relative border-l-2 border-neutral-100 ml-4 md:ml-24 max-w-4xl space-y-12 md:space-y-16">
            
            {/* Checkpoint 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-red-600 group-hover:bg-red-600 transition-colors" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <span className="font-mono text-xl font-bold tracking-tight text-red-600 md:col-span-1">1982</span>
                <div className="md:col-span-3 space-y-1">
                  <h4 className="font-extrabold text-neutral-900 text-lg">
                    {t.custom.milestone1982Title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {t.custom.milestone1982Desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Checkpoint 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-red-600 group-hover:bg-red-600 transition-colors" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <span className="font-mono text-xl font-bold tracking-tight text-red-600 md:col-span-1">2008</span>
                <div className="md:col-span-3 space-y-1">
                  <h4 className="font-extrabold text-neutral-900 text-lg">
                    {t.custom.milestone2008Title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {t.custom.milestone2008Desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Checkpoint 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-red-600 group-hover:bg-red-600 transition-colors" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <span className="font-mono text-xl font-bold tracking-tight text-red-600 md:col-span-1">2026</span>
                <div className="md:col-span-3 space-y-1">
                  <h4 className="font-extrabold text-neutral-900 text-lg">
                    {t.custom.milestone2026Title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {t.custom.milestone2026Desc}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
