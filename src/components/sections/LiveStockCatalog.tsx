import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import type { Product } from './ProductCard'
import { useLanguage } from '@/context/LanguageContext'

interface StoreSettings {
  whatsappNumber?: string
}

interface LiveStockCatalogProps {
  products?: Product[]
  storeSettings?: StoreSettings
}

const BRANDS = ['All', 'Apple', 'Samsung', 'OnePlus', 'Vivo', 'OPPO', 'Realme', 'Xiaomi', 'Nothing']
const CONDITION_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Seal Pack', value: 'NEW_SEAL_PACK' },
  { label: 'Open Box', value: 'OPEN_BOX' },
  { label: 'Pre-Owned', value: 'PRE_OWNED' },
]

export const LiveStockCatalog: React.FC<LiveStockCatalogProps> = ({ products = [], storeSettings }) => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBrand =
        selectedBrand === 'All' || p.brand.toLowerCase() === selectedBrand.toLowerCase()

      const matchesCondition =
        selectedCondition === 'All' ||
        (p.condition &&
          (p.condition === selectedCondition ||
            p.condition.toLowerCase().includes(selectedCondition.toLowerCase())))

      return matchesSearch && matchesBrand && matchesCondition
    })

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [products, searchQuery, selectedBrand, selectedCondition, sortBy])

  return (
    <section
      id="stock"
      aria-labelledby="stock-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
              {t('stock.eyebrow', 'Live Inventory')}
            </div>
            <h2
              id="stock-heading"
              className="text-[28px] sm:text-[44px] font-medium tracking-[-1.5px] sm:tracking-[-2px] leading-[1.05] text-white"
            >
              {t('stock.title', 'Verified Stock In Fatehabad.')}
            </h2>
          </div>
          <div className="text-[13px] sm:text-[14px] text-[#999999] tabular-nums">
            {filteredProducts.length} {t('stock.count', 'devices available today')}
          </div>
        </div>

        {/* Filter Toolbar using Framer tab-pill system */}
        <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-4 sm:p-5 mb-8 sm:mb-10 flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <label htmlFor="stock-search" className="sr-only">
              {t('stock.search_placeholder', 'Search by model, brand, or specs...')}
            </label>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] text-sm" aria-hidden="true">
              🔍
            </span>
            <input
              id="stock-search"
              type="text"
              placeholder={t('stock.search_placeholder', 'Search by model, brand, or specs...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="framer-input !pl-10 !py-3 !text-[14px] min-h-[44px]"
            />
          </div>

          {/* Brand Tabs (Horizontally swipable on mobile web) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
            <span className="text-[12px] font-medium text-[#999999] mr-1 flex-shrink-0">
              {t('stock.brand', 'Brand:')}
            </span>
            {BRANDS.map(brand => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`tab-pill text-[12px] sm:text-[13px] !py-2 !px-3.5 flex-shrink-0 min-h-[36px] ${
                  selectedBrand === brand ? 'tab-pill-selected' : ''
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Condition + Sort row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1a1a1a]">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[12px] font-medium text-[#999999] mr-1 flex-shrink-0">
                {t('stock.condition', 'Condition:')}
              </span>
              {CONDITION_OPTIONS.map(cond => (
                <button
                  key={cond.value}
                  type="button"
                  onClick={() => setSelectedCondition(cond.value)}
                  className={`tab-pill text-[11px] sm:text-[12px] !py-1.5 !px-2.5 flex-shrink-0 ${
                    selectedCondition === cond.value ? 'tab-pill-selected' : ''
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0">
              <label htmlFor="stock-sort" className="text-[12px] font-medium text-[#999999]">
                {t('stock.sort', 'Sort by:')}
              </label>
              <select
                id="stock-sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#141414] border border-[#262626] rounded-[8px] text-[13px] text-white py-1.5 px-3 outline-none focus:border-[#0099ff] cursor-pointer min-h-[38px]"
              >
                <option value="featured">{t('stock.sort_featured', 'Featured First')}</option>
                <option value="price-asc">{t('stock.sort_asc', 'Price: Low to High')}</option>
                <option value="price-desc">{t('stock.sort_desc', 'Price: High to Low')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: 1-col on tiny mobile, 2-col on standard mobile, 3-col tablet, 4-col desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                storeSettings={storeSettings}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-10 sm:p-16 text-center">
            <div className="text-4xl mb-3 opacity-40">📱</div>
            <h3 className="text-[18px] font-medium text-white mb-2">
              {t('stock.empty_title', 'No matching handsets found')}
            </h3>
            <p className="text-[14px] text-[#999999] max-w-md mx-auto mb-6">
              {t(
                'stock.empty_desc',
                'Try clearing your filters or contact us directly on WhatsApp to check incoming stock.'
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedBrand('All')
                setSelectedCondition('All')
              }}
              className="btn-secondary !text-[13px] !py-2.5 !px-5"
            >
              {t('stock.reset_btn', 'Reset Filters')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default LiveStockCatalog
