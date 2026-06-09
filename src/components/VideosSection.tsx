import React, { useState } from 'react';
import { Language, VideoItem } from '../types';
import { videoGallery } from '../products';
import { translations } from '../translations';
import { Play, X, Clock, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface VideosSectionProps {
  language: Language;
}

export default function VideosSection({ language }: VideosSectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const t = translations[language];

  return (
    <div className="bg-white py-16 md:py-24 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <TypewriterText 
            text={language === 'uz' ? "Media Galereya" : "CINEMATIC EXHIBITS"}
            className="text-xs font-black text-red-600 uppercase tracking-widest pl-2 border-l border-red-600 block w-max mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            <TypewriterText 
              text={t.videos.title}
              delay={0.15}
            />
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            <TypewriterParagraph 
              text={t.videos.subtitle}
              delay={0.4}
            />
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoGallery.map((v, index) => (
            <motion.div 
              key={v.id}
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-neutral-50 rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group"
            >
              {/* Thumbnail Play Panel */}
              <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                <img 
                  src={v.thumbnail} 
                  alt={v.title[language]} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                />
                
                {/* Visual Glow Play Orb */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/15 transition-all">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(v)}
                    className="w-16 h-16 rounded-full bg-white text-red-600 flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 active:scale-95 duration-300"
                    aria-label={`Play ${v.title[language]}`}
                  >
                    <Play className="w-6 h-6 ml-1.5 fill-current" />
                  </button>
                </div>

                {/* Duration Tag */}
                <span className="absolute bottom-4 right-4 bg-neutral-950/80 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm tracking-widest flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>{v.duration}</span>
                </span>
                
                <span className="absolute top-4 left-4 bg-red-600/95 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>KUKA CINEMA</span>
                </span>
              </div>

              {/* Title Description */}
              <div className="p-6 space-y-3 flex-grow">
                <h3 className="text-lg font-extrabold text-neutral-900 leading-snug group-hover:text-red-600 transition-colors">
                  {v.title[language]}
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {t.custom.videoSectionDesc}
                </p>
                <div className="pt-4 border-t border-neutral-150 flex items-center justify-between text-neutral-400 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px]">
                    4K ULTRA HD
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(v)}
                    className="text-neutral-900 hover:text-red-500 transition-colors font-bold uppercase tracking-wider text-xs flex items-center gap-1.5"
                  >
                    <span>{t.videos.playVideo}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Pop-Up Box */}
        <AnimatePresence>
          {activeVideo && (
            <div className="fixed inset-0 bg-neutral-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-black rounded-3xl w-full max-w-4xl aspect-video overflow-hidden border border-neutral-800 shadow-2xl"
              >
                {/* Closer Button */}
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-red-600 flex items-center justify-center backdrop-blur-md transition-all z-25 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Video Play Area */}
                <iframe
                  title={`YouTube Player - ${activeVideo.title[language]}`}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
