import React, { useState, useEffect } from 'react';
import { Product, Language, NavTab } from '../types';
import { products } from '../products';
import { translations } from '../translations';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Award, Shield, Truck, Heart, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AnimateCounter from './AnimateCounter';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface HomeSectionProps {
  language: Language;
  onSelectProduct: (product: Product) => void;
  setCurrentTab: (tab: NavTab) => void;
}

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80",
    title: {
      uz: "Siz izlagan komfortli shohona hayot",
      kz: "Сіз іздеген жайлылық пен сән",
      ru: "Комфорт и роскошь, которые вы заслужили",
      en: "Luxurious Living Re-invented For You",
      zh: "名门致感 · 传奇舒适 · 经典传承"
    },
    subtitle: {
      uz: "Eksklyuziv burchak divanlari va krovatlar kolleksiyasi",
      kz: "Эксклюзивті дивандар мен кереуеттер топтамасы",
      ru: "Эксклюзивная коллекция дизайнерских диванов и спален",
      en: "Exclusive Italian Leather Sofas & Deep Sleeping Beds",
      zh: "顾家家居高定真皮沙发套 light luxury dining spaces"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1920&q=80",
    title: {
      uz: "Minimalizm va ergonomika uyg'unligi",
      kz: "Минимализм мен эргономика үйлесімі",
      ru: "Гармония минимализма и эргономики",
      en: "The Aesthetics of Pure Ergonomic Geometry",
      zh: "意式轻奢 · 领航国际前沿美学设计"
    },
    subtitle: {
      uz: "Milanning ilg'or arxitektorlari loyihasi asosida",
      kz: "Миланның жетекші архитекторларының жобасы",
      ru: "Создано по чертежам ведущих миланских архитекторов",
      en: "Conceived by world-leading Milanese industrial designers",
      zh: "联手欧洲殿堂级设计师 演绎现代纯粹空间设计"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80",
    title: {
      uz: "Yashash makoningiz mukammalligi",
      kz: "Өмір сүру кеңістігінің мінсіздігі",
      ru: "Совершенство вашего пространства",
      en: "A Masterpiece Anchoring Your Modern Home",
      zh: "高定人居 · 顾藏天工之作"
    },
    subtitle: {
      uz: "Har bir chokida 44 yillik sinchkov mahorat",
      kz: "Әр тігісінде 44 жылдық шеберлік махаббаты",
      ru: "44 года технологического перфекционизма в каждом шве",
      en: "Crafted with 44 years of rigorous luxury perfectionism",
      zh: "44年纯正匠心工艺 构筑至尊名门空间秩序"
    }
  }
];

export default function HomeSection({ language, onSelectProduct, setCurrentTab }: HomeSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = translations[language];

  // Slide interval rotation
  useEffect(() => {
    const rotate = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(rotate);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slideImages.length);
  };

  const newArrivals = products.filter(p => p.newArrival);

  return (
    <div className="bg-white">
      
      {/* Dynamic Slide Hero with Overlay Animations */}
      <section className="relative h-[480px] md:h-[650px] w-full overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slideImages[activeSlide].url} 
                alt="KUKA HOME Carousel" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />

        {/* Content Box */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white font-sans">
            <div className="max-w-3xl space-y-4">
              <motion.div
                key={`badge-${activeSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/95 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded shadow-md"
              >
                <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-amber-300" />
                <span>KUKA HOME • EXCLUSIVE WORLDWIDE</span>
              </motion.div>

              <motion.h1 
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-none text-white drop-shadow-sm font-sans"
              >
                {slideImages[activeSlide].title[language]}
              </motion.h1>

              <motion.p 
                key={`sub-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-xl text-neutral-200 font-light tracking-wide max-w-2xl leading-relaxed"
              >
                {slideImages[activeSlide].subtitle[language]}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <button
                  type="button"
                  id="hero-see-catalog-btn"
                  onClick={() => setCurrentTab('furniture')}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.custom.catalogBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('showrooms')}
                  className="px-6 py-3.5 bg-neutral-900/60 hover:bg-neutral-900/90 text-white border border-neutral-700 font-bold text-xs uppercase tracking-widest rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.custom.showroomBtn}</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide navigation controls */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-red-600/80 text-white transition-colors cursor-pointer hidden sm:block border border-white/5"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-red-600/80 text-white transition-colors cursor-pointer hidden sm:block border border-white/5"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* dots navigation indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {slideImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              className={`w-3.5 h-1.5 rounded-full transition-all cursor-pointer ${
                activeSlide === i ? 'bg-red-600 w-8' : 'bg-white/40 hover:bg-white/75'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Modern High-End Stats Widget Section */}
      <section className="bg-neutral-950 py-12 md:py-16 text-white border-b border-neutral-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-14"
          >
            <TypewriterText 
              text={t.custom.globalStatsBadge}
              className="text-xs text-red-500 font-black tracking-widest uppercase inline-block"
            />
            <h2 className="text-2xl md:text-3xl font-black text-white">
              <TypewriterText 
                text={t.home.brandHeadline}
                delay={0.15}
              />
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              <TypewriterParagraph 
                text={t.custom.globalStatsSub}
                delay={0.4}
              />
            </p>
          </motion.div>

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
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-neutral-900/30 p-8 rounded-2xl border border-neutral-900"
          >
            {/* Stat Item Premium 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.94, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 group"
            >
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
                <AnimateCounter value={44} start={1} className="text-red-500 font-extrabold" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-neutral-300 uppercase tracking-widest block mt-1">
                {t.stats.years}
              </p>
            </motion.div>

            {/* Stat Item Premium 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.94, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 group"
            >
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
                <AnimateCounter value={3000} start={100} className="text-red-500 font-extrabold" />
                <span className="text-neutral-500 text-2xl md:text-3xl font-bold">+</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-neutral-300 uppercase tracking-widest block mt-1">
                {t.stats.models}
              </p>
            </motion.div>

            {/* Stat Item Premium 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.94, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 group"
            >
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
                <AnimateCounter value={3} start={1} className="text-red-500 font-extrabold" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-neutral-300 uppercase tracking-widest block mt-1">
                {t.stats.showrooms}
              </p>
            </motion.div>

            {/* Stat Item Premium 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.94, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 group"
            >
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
                <AnimateCounter value={20000} start={1000} className="text-red-500 font-extrabold" />
                <span className="text-neutral-500 text-2xl md:text-3xl font-bold">+</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-neutral-300 uppercase tracking-widest block mt-1">
                {t.stats.clients}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Showroom Shelf */}
      <section className="py-16 md:py-24 font-sans bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
          >
            <div>
              <TypewriterText 
                text={t.custom.newProductsTrendBadge}
                className="text-red-600 text-xs font-black uppercase tracking-wider block mb-1"
              />
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                <TypewriterText 
                  text={t.home.newProducts}
                  delay={0.15}
                />
              </h2>
            </div>
            <motion.button
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              type="button"
              onClick={() => setCurrentTab('furniture')}
              className="text-neutral-900 hover:text-red-600 transition-colors font-semibold text-sm uppercase tracking-wider flex items-center gap-1.5 cursor-pointer pb-1 border-b border-neutral-300 hover:border-red-600"
            >
              <span>{t.custom.allFurnitureBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group h-full"
              >
                {/* Image panel */}
                <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                  <span className="absolute top-4 left-4 bg-red-600/90 text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md z-10">
                    {t.custom.newArrivalBadge}
                  </span>
                  <img 
                    src={product.images[0]} 
                    alt={product.model} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/10 transition-colors" />
                </div>

                {/* Info Text */}
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-red-600 font-bold bg-red-50/70 px-2 py-0.5 rounded">
                      {product.category === 'sofa' ? t.furniture.categorySofa : product.category === 'bed' ? t.furniture.categoryBed : product.category === 'dining' ? t.furniture.categoryDining : t.furniture.categoryLounge}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      {product.dimensions}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-900 leading-snug group-hover:text-red-600 transition-colors">
                    {product.model}
                  </h3>

                  <p className="text-xs text-neutral-500 font-light leading-relaxed flex-grow line-clamp-2">
                    {product.info[language]}
                  </p>

                  <div className="pt-4 border-t border-neutral-150 flex justify-between items-center bg-white">
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-bold">{t.custom.estimatedValueLabel}</span>
                      <span className="text-lg font-extrabold text-neutral-950 font-mono">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="bg-neutral-900 hover:bg-red-600 text-white p-2.5 rounded-lg transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold"
                    >
                      <span>{t.furniture.quickView}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Elegant Benefit Grid with Localized Text */}
      <section className="py-20 md:py-28 font-sans bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20"
          >
            <TypewriterText 
              text={t.custom.advantagesBadge}
              className="text-xs font-black uppercase text-red-600 tracking-widest pl-2 border-l border-red-600 inline-block"
            />
            <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              <TypewriterText 
                text={t.custom.whyKukaTitle}
                delay={0.15}
              />
            </h2>
            <p className="text-sm text-neutral-500 font-light max-w-lg mx-auto leading-relaxed">
              <TypewriterParagraph 
                text={t.custom.whyKukaDesc}
                delay={0.4}
              />
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {/* Benefit Card 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4 hover:border-red-500 transition-colors"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">{t.home.benefit1Title}</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">{t.home.benefit1Desc}</p>
            </motion.div>

            {/* Benefit Card 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4 hover:border-red-500 transition-colors"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">{t.home.benefit2Title}</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">{t.home.benefit2Desc}</p>
            </motion.div>

            {/* Benefit Card 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4 hover:border-red-500 transition-colors"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">{t.home.benefit3Title}</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">{t.home.benefit3Desc}</p>
            </motion.div>

            {/* Benefit Card 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4 hover:border-red-500 transition-colors"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">{t.home.benefit4Title}</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">{t.home.benefit4Desc}</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Luxury Promo Banner with Actions */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 font-sans border-t border-neutral-100 bg-neutral-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80" 
            alt="Interior Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.25]"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-6 relative z-10"
        >
          <span className="text-xs text-red-500 font-black tracking-widest uppercase">
            {t.custom.vipOfferBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {t.custom.vipOfferTitle}
          </h2>
          <p className="text-sm md:text-lg font-light text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {t.custom.vipOfferDesc}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 font-black text-xs uppercase tracking-widest rounded-lg shadow-xl cursor-pointer transition-all"
            >
              {t.custom.vipOfferBtn}
            </button>
            <a
              href="tel:+998909844014"
              className="px-8 py-3.5 bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-700 font-black text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-all inline-flex items-center gap-2 font-mono"
            >
              <span>+998 (90) 984-40-14</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
