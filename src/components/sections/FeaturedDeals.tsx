import React, { useRef, useState } from 'react'
import ProductCard from './ProductCard'
import type { Product } from './ProductCard'
import { useLanguage } from '@/context/LanguageContext'

interface StoreSettings {
  whatsappNumber?: string
}

interface FeaturedDealsProps {
  products?: Product[]
  storeSettings?: StoreSettings
}

export const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ products = [], storeSettings }) => {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const featured = products.filter(p => p.featured || (p.originalPrice && p.originalPrice > p.price))
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 8)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = direction === 'left' ? -300 : 300
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  if (displayProducts.length === 0) return null

  return (
    <section
      id="deals"
      aria-labelledby="deals-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        {/* Header with Title and Framer circular icon controls */}
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
              {t('deals.eyebrow', 'Limited Offers')}
            </div>
            <h2
              id="deals-heading"
              className="text-[28px] sm:text-[44px] font-medium tracking-[-1.5px] sm:tracking-[-2px] leading-[1.05] text-white"
            >
              {t('deals.title', 'Flagship Spotlight Deals.')}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="btn-icon-circular disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="btn-icon-circular disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel containing an Atmospheric Gradient Tile + Product Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Framer signature atmospheric gradient spotlight card */}
          <div className="flex-none w-[280px] sm:w-[340px] snap-start spotlight-card-violet flex flex-col justify-between p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-[11px] sm:text-[12px] font-medium tracking-tight mb-5 backdrop-blur-md">
                {t('deals.card_badge', 'Special Offer')}
              </span>
              <h3 className="text-[24px] sm:text-[30px] font-medium leading-[1.1] tracking-[-1px] text-white mb-3">
                {t('deals.card_title', 'Upgrade Your Smartphone Today.')}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-white/80 leading-[1.4] tracking-tight">
                {t(
                  'deals.card_desc',
                  'Get up to ₹15,000 off on exchange, plus flexible financing with zero paper hassle.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <a
                href="#stock"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#stock')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary !py-2.5 !px-5 text-[13px] w-full sm:w-auto text-center"
              >
                {t('deals.card_btn', 'View Eligible Devices →')}
              </a>
            </div>
          </div>

          {/* Product cards in horizontal swipe */}
          {displayProducts.map(product => (
            <div key={product.id} className="flex-none w-[240px] sm:w-[280px] snap-start">
              <ProductCard product={product} storeSettings={storeSettings} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedDeals
