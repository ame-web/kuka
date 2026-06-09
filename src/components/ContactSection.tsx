import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  language: Language;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const t = translations[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitError(t.custom.submitErrorFields);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setIsSubmitSuccess(true);
        setSubmitError('');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitError(data.error || 'Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white py-16 md:py-24 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black text-red-600 uppercase tracking-widest pl-2 border-l border-red-600 block w-max mx-auto">
            {t.custom.contactBadge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2 Cols row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Details side (Col 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                {t.custom.communicationLineTitle}
              </h3>
              <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                {t.custom.communicationLineDesc}
              </p>
            </div>

            <div className="space-y-5 text-sm">
              {/* Phone item */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">{t.custom.showroomHotlineLabel}</span>
                  <a href="tel:+998909844014" className="text-lg font-black text-neutral-900 hover:text-red-600 transition-colors font-mono tracking-tight block">
                    +998 (90) 984-40-14
                  </a>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">улица Гавхар, 124/1, Ташкент</p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">Corporate Email</span>
                  <a href="mailto:info@kukahome.uz" className="text-neutral-800 hover:text-red-500 font-bold transition-colors font-mono text-sm block">
                    info@kukahome.uz
                  </a>
                  <p className="text-xs text-neutral-400 font-light mt-0.5 font-sans">Checked by managers hourly</p>
                </div>
              </div>

              {/* Working hours item */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red-600 mx-auto" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block mb-0.5">{t.showrooms.workingHours}</span>
                  <p className="text-neutral-800 font-semibold text-sm">{t.showrooms.workingHours}: 09:00 – 18:00</p>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">{t.custom.noLunchBreakLabel}</p>
                </div>
              </div>

            </div>

            {/* Social connections panel */}
            <div className="pt-6 border-t border-neutral-100 flex items-center gap-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{t.custom.digitalChannelsLabel}:</span>
              <div className="flex items-center gap-3 text-neutral-500 text-sm font-semibold">
                <a href="https://www.instagram.com/kam1lov_1?igsh=MW5qcGplOXQ1aTI0aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">Instagram</a>
                <span>•</span>
                <a href="https://t.me/kam1lov_1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Telegram</a>
              </div>
            </div>

          </div>

          {/* Form Side (Col 7) */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-3xl border border-neutral-200/60 p-6 md:p-10 shadow-sm relative">
            <span className="absolute top-4 right-4 text-[9px] font-black text-red-600 bg-red-100 r-px px-2.5 py-0.5 rounded shadow-sm z-10">
              FAST CONTACT
            </span>
            <div className="space-y-4 mb-8">
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 leading-tight">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                {t.custom.designConsultDesc}
              </p>
            </div>

            {isSubmitSuccess ? (
              /* Success layout box */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center space-y-4 bg-emerald-50 border border-emerald-100 rounded-2xl"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckSquare className="w-7 h-7 mx-auto" />
                </div>
                <h4 className="text-emerald-900 font-black text-lg">
                  {t.contact.formSuccess}
                </h4>
                <p className="text-xs text-emerald-600 font-semibold tracking-wider uppercase">
                  CRM LOGGED • CALL MANAGER INITIATED
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitSuccess(false)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                >
                  {t.custom.writeAnotherMessageLabel}
                </button>
              </motion.div>
            ) : (
              /* Standard consultation form */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full name input */}
                <div className="space-y-1">
                  <label htmlFor="con-name" className="text-xs font-bold uppercase text-neutral-600 tracking-wider">
                    {t.common.name} *
                  </label>
                  <input
                    type="text"
                    id="con-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t.vacancy.formNamePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* Telephone input */}
                <div className="space-y-1">
                  <label htmlFor="con-phone" className="text-xs font-bold uppercase text-neutral-600 tracking-wider">
                    {t.common.phone} *
                  </label>
                  <input
                    type="tel"
                    id="con-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+998 (__) ___-__-__"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* Message text area */}
                <div className="space-y-1">
                  <label htmlFor="con-message" className="text-xs font-bold uppercase text-neutral-600 tracking-wider">
                    {t.common.message} *
                  </label>
                  <textarea
                    id="con-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder={t.custom.fastContactMessagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg border border-red-100">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  id="submit-contact-form-btn"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-red-600/15"
                >
                  <span>{t.contact.sendBtn}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
