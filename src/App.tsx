import React, { useState, useEffect } from 'react';
import { NavTab, Language, Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import FurnitureSection from './components/FurnitureSection';
import ShowroomsSection from './components/ShowroomsSection';
import VideosSection from './components/VideosSection';
import VacancySection from './components/VacancySection';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';
import { translations } from './translations';
import { products } from './products';
import { Check, X, Shield, ShoppingBag, Eye, Heart, Compass, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [language, setLanguage] = useState<Language>('uz');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Custom modal image selector
  const [modalImageIdx, setModalImageIdx] = useState(0);

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setModalImageIdx(0);
    }
  };
  
  // Custom fabric selection options
  const [selectedFabric, setSelectedFabric] = useState('Ivory Cream');

  // Interactive checkout consultation form
  const [modalFormData, setModalFormData] = useState({ name: '', phone: '' });
  const [modalPreorderSuccess, setModalPreorderSuccess] = useState(false);
  
  // Chat assistance display triggers
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Set selected model index to zero when chosen modal product shifts
  useEffect(() => {
    if (selectedProduct) {
      setModalImageIdx(0);
      setModalPreorderSuccess(false);
      setModalFormData({ name: '', phone: '' });
      setSelectedFabric('Ivory Cream');
    }
  }, [selectedProduct]);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handlePreorderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name.trim() || !modalFormData.phone.trim()) return;

    // Simulate pre-order logging
    setModalPreorderSuccess(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setModalPreorderSuccess(false);
    }, 4000);
  };

  const currentT = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 font-sans selection:bg-red-600 selection:text-white antialiased">
      
      {/* Upper Navigation Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        language={language} 
        setLanguage={setLanguage} 
        onOpenChat={handleOpenChat}
      />

      {/* Primary Section Canvas */}
      <main className="flex-grow pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            {currentTab === 'home' && (
              <HomeSection 
                language={language} 
                onSelectProduct={setSelectedProduct} 
                setCurrentTab={setCurrentTab}
              />
            )}
            {currentTab === 'about' && (
              <AboutSection language={language} />
            )}
            {currentTab === 'furniture' && (
              <FurnitureSection 
                language={language} 
                onSelectProduct={setSelectedProduct} 
              />
            )}
            {currentTab === 'showrooms' && (
              <ShowroomsSection language={language} />
            )}
            {currentTab === 'videos' && (
              <VideosSection language={language} />
            )}
            {currentTab === 'vacancy' && (
              <VacancySection language={language} />
            )}
            {currentTab === 'contact' && (
              <ContactSection language={language} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Tailored Footer */}
      <Footer setCurrentTab={setCurrentTab} language={language} />

      {/* Smart Chatbot Integration */}
      <ChatWidget 
        language={language} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
        onProductClick={handleProductClick}
      />

      {/* Luxury Quick View Lightbox Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-neutral-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-neutral-150 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative my-8"
            >
              
              {/* Abs Close Button */}
              <button
                type="button"
                id="close-quick-view-btn"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 text-neutral-500 hover:text-red-600 flex items-center justify-center transition-all z-20 cursor-pointer"
                aria-label="Close dialogue"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>

              {/* LEFT COLUMN: Gallery & Thumbnails (cols 6) */}
              <div className="lg:col-span-6 p-6 md:p-8 bg-neutral-50 border-r border-neutral-100 flex flex-col justify-between space-y-4">
                
                {/* Main Selected Image */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/40 shadow-inner relative">
                  <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md z-10 select-none">
                    {language === 'uz' ? "KUKA Premium karkas" : "IMPACT-TESTED"}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={modalImageIdx}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.7 }}
                      transition={{ duration: 0.2 }}
                      src={selectedProduct.images[modalImageIdx]} 
                      alt={selectedProduct.model} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Micro Thumbnails Row */}
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      id={`thumb-${idx}`}
                      onClick={() => setModalImageIdx(idx)}
                      className={`w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        modalImageIdx === idx 
                          ? 'border-red-600 scale-95 shadow-md' 
                          : 'border-transparent hover:border-neutral-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail view" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Mini guarantee badge */}
                <div className="pt-2 border-t border-neutral-200/50 flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase tracking-wider select-none">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>German OKIN Actuators</span>
                  <span>•</span>
                  <span>44 Years Legacy</span>
                </div>

              </div>

              {/* RIGHT COLUMN: Details & Action form (cols 6) */}
              <div className="lg:col-span-6 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[85vh] lg:max-h-none space-y-6">
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-red-600 bg-red-50/70 px-2.5 py-1 rounded uppercase tracking-wider inline-block">
                    {selectedProduct.category === 'sofa' ? currentT.furniture.categorySofa : selectedProduct.category === 'bed' ? currentT.furniture.categoryBed : selectedProduct.category === 'dining' ? currentT.furniture.categoryDining : currentT.furniture.categoryLounge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight leading-tight">
                    {selectedProduct.model}
                  </h3>
                  <p className="text-xs font-mono font-bold text-neutral-400">
                    {currentT.furniture.dimensions}: <span className="text-neutral-700">{selectedProduct.dimensions}</span>
                  </p>
                </div>

                {/* Dynamic Material Information */}
                <div className="space-y-1.5 bg-neutral-50 p-4 rounded-xl border border-neutral-150">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-widest">{currentT.furniture.material}</span>
                  <p className="text-xs text-neutral-700 font-semibold leading-relaxed">
                    {selectedProduct.material[language]}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-widest">{language === 'uz' ? "Tavsif" : "EXHIBIT NARRATIVE"}</span>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed whitespace-pre-line">
                    {selectedProduct.info[language]}
                  </p>
                </div>

                {/* Custom Color/Fabric Switcher Circles */}
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-widest">
                    {language === 'uz' ? "Mato ruxsatnomalari" : "Bespoke color options"} : <strong className="text-neutral-900 font-semibold">{selectedFabric}</strong>
                  </span>
                  <div className="flex gap-2.5">
                    {[
                      { name: 'Ivory Cream', color: '#FDFBF7', imageIdx: 0 },
                      { name: 'Camel Nappa', color: '#C19A6B', imageIdx: 1 },
                      { name: 'Forest Velvet', color: '#1B4D3E', imageIdx: 2 },
                      { name: 'Obsidian Black', color: '#171717', imageIdx: 3 }
                    ].map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        id={`fabric-btn-${opt.name.replace(' ', '-')}`}
                        onClick={() => {
                          setSelectedFabric(opt.name);
                          if (selectedProduct && selectedProduct.images.length > 0) {
                            const targetIdx = opt.imageIdx % selectedProduct.images.length;
                            setModalImageIdx(targetIdx);
                          }
                        }}
                        style={{ backgroundColor: opt.color }}
                        className={`w-8 h-8 rounded-full border border-neutral-300 shadow-sm relative transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center`}
                        title={opt.name}
                      >
                        {selectedFabric === opt.name && (
                          <Check className={`w-4 h-4 mx-auto ${opt.name === 'Ivory Cream' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-Order / Pre-Consultation Interactive Form Block */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col space-y-4">
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest font-black text-neutral-400">{language === 'uz' ? "Kelishilgan taxminiy narx" : "ESTIMATED SHOWROOM RETAIL"}</span>
                      <span className="text-2xl font-black font-mono tracking-tight text-neutral-950">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {modalPreorderSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-1.5"
                    >
                      <p className="text-emerald-900 font-bold text-xs">{currentT.vacancy.applySuccess}</p>
                      <p className="text-[9px] uppercase tracking-widest text-emerald-600 font-bold">Showroom lead logged securely.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handlePreorderSubmit} className="space-y-3">
                      <span className="block text-[10px] uppercase font-black text-red-600 tracking-wider">
                        {language === 'uz' ? "Ushbu modelga buyurtma yoki konsultatsiya olish" : "Reserve design allocation"}
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          name="name"
                          value={modalFormData.name}
                          onChange={(e) => setModalFormData(p => ({ ...p, name: e.target.value }))}
                          required
                          placeholder={currentT.common.name}
                          className="px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-600 text-xs font-semibold bg-white"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={modalFormData.phone}
                          onChange={(e) => setModalFormData(p => ({ ...p, phone: e.target.value }))}
                          required
                          placeholder={translations[language].vacancy.formPhonePlaceholder}
                          className="px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-600 text-xs font-semibold bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        id="preorder-submit-btn"
                        className="w-full py-3 bg-neutral-900 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{language === 'uz' ? "Konsultatsiya buyurtirish" : "Initiate allocation request"}</span>
                      </button>
                    </form>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
