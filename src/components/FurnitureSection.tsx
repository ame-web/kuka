import React, { useState, useMemo } from 'react';
import { Product, Language } from '../types';
import { translations } from '../translations';
import { Search, ChevronDown, Check, SlidersHorizontal, Grid3X3, ArrowUpDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TypewriterText, TypewriterParagraph } from './TypewriterText';

interface FurnitureSectionProps {
  language: Language;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

type CategoryFilter = 'all' | 'sofa' | 'bed' | 'dining' | 'lounge';
type SortOption = 'popular' | 'price-asc' | 'price-desc';

export default function FurnitureSection({ language, onSelectProduct, products }: FurnitureSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const t = translations[language];

  const categoriesList: { id: CategoryFilter; label: string }[] = useMemo(() => [
    { id: 'all', label: t.common.all },
    { id: 'sofa', label: t.furniture.categorySofa },
    { id: 'bed', label: t.furniture.categoryBed },
    { id: 'dining', label: t.furniture.categoryDining },
    { id: 'lounge', label: t.furniture.categoryLounge }
  ], [t]);

  const sortOptionsList: { id: SortOption; label: string }[] = useMemo(() => [
    { id: 'popular', label: t.furniture.sortPopular },
    { id: 'price-asc', label: t.furniture.sortPriceAsc },
    { id: 'price-desc', label: t.furniture.sortPriceDesc }
  ], [t]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.model.toLowerCase().includes(q) || 
        (p.info[language] && p.info[language].toLowerCase().includes(q)) ||
        (p.material[language] && p.material[language].toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, language]);

  const activeSortLabel = sortOptionsList.find(o => o.id === sortBy)?.label || t.furniture.sortPopular;

  return (
    <div className="bg-white py-16 md:py-24 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <TypewriterText 
            text={language === 'uz' ? "Premium Katalog" : "MASTERPIECE OVERVIEW"}
            className="text-xs font-black text-red-600 uppercase tracking-widest pl-2 border-l border-red-600 block w-max mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            <TypewriterText 
              text={t.furniture.title}
              delay={0.15}
            />
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            <TypewriterParagraph 
              text={t.furniture.subtitle}
              delay={0.4}
            />
          </p>
        </div>

        {/* Dashboard Tools (Search, Tabs, Sort) */}
        <div className="bg-neutral-50 rounded-2xl p-4 md:p-6 border border-neutral-200/60 mb-10 space-y-4">
          
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Box */}
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                id="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.common.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm font-medium transition-all"
              />
            </div>

            {/* Sorting controls */}
            <div className="relative font-sans text-left shrink-0">
              <span className="text-xs text-neutral-400 font-medium mr-2">{t.furniture.sortLabel}:</span>
              <button
                type="button"
                id="sort-dropdown-btn"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                <span>{activeSortLabel}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isSortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-neutral-100 py-1.5 z-20 text-xs font-semibold ring-1 ring-black/5 uppercase tracking-wider"
                    >
                      {sortOptionsList.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.id);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-red-50/50 hover:text-red-600 transition-colors ${
                            sortBy === opt.id ? 'text-red-600 bg-red-50/20 font-bold' : 'text-neutral-700'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-red-600 font-bold" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-1.5 border-t border-neutral-200/60 pt-4">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`cat-filter-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-neutral-600 border border-neutral-205/60 hover:bg-neutral-100 hover:text-red-600'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Counter of search matches */}
        <div className="flex justify-between items-center text-xs text-neutral-500 font-medium mb-6">
          <span className="font-mono bg-neutral-100 px-3 py-1 rounded border border-neutral-200/30">
            {t.custom.matchesCount}: {filteredProducts.length}{language === 'uz' ? ' ta' : ''}
          </span>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.custom.activeFiltersLabel}</span>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
            <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h4 className="font-extrabold text-neutral-600 text-base">{t.furniture.noProducts}</h4>
            <p className="text-xs text-neutral-400 font-light mt-1">
              {t.custom.adjustSpellingDesc}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group h-full relative"
              >
                {/* Image and Badges */}
                <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {p.featured && (
                      <span className="bg-red-600/90 text-white font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                        FEATURED
                      </span>
                    )}
                    {p.newArrival && (
                      <span className="bg-amber-500/95 text-white font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                        NEW
                      </span>
                    )}
                  </div>
                  <img
                    src={p.images[0]}
                    alt={p.model}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/5 transition-colors" />
                </div>

                {/* Text Content */}
                <div className="p-6 flex flex-col flex-grow space-y-3.5 bg-white">
                  
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[9px] uppercase tracking-widest text-red-600 font-bold bg-red-50 px-2.5 py-0.5 rounded">
                      {p.category === 'sofa' ? t.furniture.categorySofa : p.category === 'bed' ? t.furniture.categoryBed : p.category === 'dining' ? t.furniture.categoryDining : t.furniture.categoryLounge}
                    </span>
                    <span className="text-xs tracking-tight font-mono text-neutral-400 font-semibold">
                      {p.dimensions}
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-neutral-900 leading-snug group-hover:text-red-600 transition-colors">
                    {p.model}
                  </h3>

                  <div className="space-y-1">
                    <span className="block text-[8px] uppercase tracking-widest font-extrabold text-neutral-400">{t.furniture.material}</span>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-1">
                      {p.material[language]}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2 pb-2">
                    {p.info[language]}
                  </p>

                  {/* Pricing and Action bottom Bar */}
                  <div className="pt-4 border-t border-neutral-100 flex justify-between items-center bg-white mt-auto">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest font-extrabold text-neutral-400">{t.custom.estimatedUnitPriceLabel}</span>
                      <span className="text-xl font-bold font-mono tracking-tight text-neutral-950">
                        ${p.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="bg-neutral-950 hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest px-4 py-3 rounded-lg transition-colors cursor-pointer shadow-sm shadow-black/10"
                    >
                      {t.furniture.quickView}
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
