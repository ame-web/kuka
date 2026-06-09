import React, { useState } from 'react';
import { Language, Vacancy } from '../types';
import { vacancies } from '../products';
import { translations } from '../translations';
import { Briefcase, CreditCard, Clock, CheckCircle2, X, Send, Award, FileText, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface VacancySectionProps {
  language: Language;
}

export default function VacancySection({ language }: VacancySectionProps) {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const t = translations[language];

  const handleOpenForm = (vac: Vacancy) => {
    setSelectedVacancy(vac);
    setFormData({ name: '', phone: '', message: '' });
    setIsSubmitSuccess(false);
    setSubmitError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError(t.vacancy.applyError);
      return;
    }

    // Mock successful submit
    setIsSubmitSuccess(true);
    setSubmitError('');
    setFormData({ name: '', phone: '', message: '' });
    setTimeout(() => {
      setSelectedVacancy(null);
      setIsSubmitSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-neutral-50 py-16 md:py-24 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <TypewriterText 
            text={
              language === 'zh'
                ? "顾家家居官方直签诚聘"
                : language === 'ru'
                ? "Карьера и Возможности"
                : language === 'kz'
                ? "Мансап және Мүмкіндіктер"
                : language === 'uz'
                ? "Karyera va Imkoniyatlar"
                : "Recruiting & Opportunities"
            }
            className="text-xs font-black text-red-600 uppercase tracking-widest pl-2 border-l border-red-600 block w-max mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            <TypewriterText 
              text={t.vacancy.title}
              delay={0.15}
            />
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            <TypewriterParagraph 
              text={t.vacancy.subtitle}
              delay={0.4}
            />
          </p>
        </div>

        {/* Vacancies Stack */}
        <div className="max-w-4xl mx-auto space-y-8">
          {vacancies.map((v, idx) => (
            <motion.div 
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 space-y-6"
            >
              {/* Job Header Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-100">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded uppercase tracking-wider block w-max">
                    {v.id} • {v.department[language]}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {v.title[language]}
                  </h3>
                </div>
                
                <button
                  type="button"
                  id={`apply-btn-${v.id}`}
                  onClick={() => handleOpenForm(v)}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  {t.common.apply}
                </button>
              </div>

              {/* Job parameters grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-neutral-500">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-neutral-400" />
                  <span>{t.vacancy.salary}: <strong className="text-neutral-800 font-semibold">{v.salary[language]}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{t.vacancy.experience}: <strong className="text-neutral-800 font-semibold">{v.experience[language]}</strong></span>
                </div>
              </div>

              {/* Requirements and Responsibilities columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Requirements side */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
                    {t.vacancy.requirements}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500">
                    {v.requirements[language].map((req, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities side */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
                    {t.vacancy.responsibilities}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500">
                    {v.responsibilities[language].map((resp, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-relaxed">
                        <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Modal Popup */}
        <AnimatePresence>
          {selectedVacancy && (
            <div className="fixed inset-0 bg-neutral-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm font-sans">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-neutral-100 shadow-2xl p-6 md:p-8 space-y-6 relative"
              >
                
                {/* Close Button */}
                <button
                  type="button"
                  id="close-vacancy-modal-btn"
                  onClick={() => setSelectedVacancy(null)}
                  className="absolute top-5 right-5 p-1 rounded-full text-neutral-400 hover:text-red-600 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header text */}
                <div className="space-y-1.5 pr-8">
                  <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    {
                      language === 'zh'
                        ? "顾家家居官方直签诚聘"
                        : language === 'ru'
                        ? "Подайте заявку с уверенностью"
                        : language === 'kz'
                        ? "Сеніммен өтінім беріңіз"
                        : language === 'uz'
                        ? "Ishonch bilan topshiring"
                        : "Apply with confidence"
                    }
                  </span>
                  <p className="text-xs text-neutral-400 font-bold">{selectedVacancy.department[language]}</p>
                  <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                    {selectedVacancy.title[language]}
                  </h3>
                </div>

                {isSubmitSuccess ? (
                  /* Success feedback block */
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-10 text-center space-y-4 bg-emerald-50 border border-emerald-100 rounded-2xl"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="w-8 h-8 mx-auto" strokeWidth={2} />
                    </div>
                    <h4 className="text-emerald-900 font-extrabold text-base px-4">
                      {t.vacancy.applySuccess}
                    </h4>
                    <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-widest">
                      KUKA HR RECRUITMENT • EN ROUTE
                    </p>
                  </motion.div>
                ) : (
                  /* Standard form element */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Full Name field */}
                    <div className="space-y-1">
                      <label htmlFor="vac-name" className="text-xs font-bold uppercase text-neutral-600 tracking-wider flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-red-600" />
                        <span>{t.common.name}</span>
                      </label>
                      <input
                        type="text"
                        id="vac-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t.vacancy.formNamePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Phone field */}
                    <div className="space-y-1">
                      <label htmlFor="vac-phone" className="text-xs font-bold uppercase text-neutral-600 tracking-wider flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-red-600" />
                        <span>{t.common.phone}</span>
                      </label>
                      <input
                        type="tel"
                        id="vac-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder={t.vacancy.formPhonePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Resume/Message summary */}
                    <div className="space-y-1">
                      <label htmlFor="vac-message" className="text-xs font-bold uppercase text-neutral-600 tracking-wider">
                        {t.vacancy.formResume}
                      </label>
                      <textarea
                        id="vac-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all"
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100 flex items-center gap-1.5">
                        <span>{submitError}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      id="submit-vacancy-form-btn"
                      className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-950 active:bg-neutral-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>{t.common.send}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                  </form>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
