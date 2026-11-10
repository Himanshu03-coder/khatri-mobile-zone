import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getConditionLabel } from '@/utils/helpers'

export interface Product {
  id: string | number
  name: string
  brand: string
  model?: string
  price: number
  originalPrice?: number
  ram?: string
  storage?: string
  condition?: string
  color?: string
  imageUrl?: string
  inStock?: boolean
  stockCount?: number
  featured?: boolean
}

interface StoreSettings {
  whatsappNumber?: string
}

interface ProductCardProps {
  product: Product
  storeSettings?: StoreSettings
  variant?: 'default' | 'horizontal'
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, storeSettings, variant = 'default' }) => {
  const { t } = useLanguage()
  const rawWhatsapp = storeSettings?.whatsappNumber ?? '919416749202'
  const whatsapp = rawWhatsapp.replace(/[^0-9]/g, '') || '919416749202'
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price)
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const readableCondition = product.condition ? getConditionLabel(product.condition) : undefined
  const altText = `${product.brand} ${product.name}${product.storage ? ` ${product.storage}` : ''}${readableCondition ? ` (${readableCondition})` : ''} smartphone at Khatri Mobile Zone Fatehabad`

  const specsText = [product.ram, product.storage, product.color].filter(Boolean).join(' · ')
  const waMessage = encodeURIComponent(
    `Hi Khatri Mobile Zone! I am interested in ${product.brand} ${product.name}${specsText ? ` (${specsText})` : ''} listed at ${formatINR(product.price)}. Is it available in stock today?`
  )
  const waLink = `https://wa.me/${whatsapp}?text=${waMessage}`

  if (variant === 'horizontal') {
    return (
      <article className="framer-product-card !flex-row items-center p-3 gap-3 sm:gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[12px] bg-[#0d0d0d] border border-[#262626] flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={altText}
              width={96}
              height={96}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-xl sm:text-2xl opacity-40" aria-hidden="true">📱</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] tracking-tight">{product.brand}</div>
          <h3 className="text-[14px] sm:text-[15px] font-medium text-white truncate tracking-tight">{product.name}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[15px] sm:text-[16px] font-medium text-white tabular-nums">{formatINR(product.price)}</span>
            {hasDiscount && (
              <span className="text-[11px] sm:text-[12px] text-[#999999] line-through tabular-nums">{formatINR(product.originalPrice!)}</span>
            )}
          </div>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${product.brand} ${product.name} on WhatsApp`}
          className="btn-primary !py-2 !px-3 sm:!px-4 text-[12px] sm:text-[13px] flex-shrink-0 min-h-[38px]"
        >
          {t('stock.btn_enquire', 'Enquire')}
        </a>
      </article>
    )
  }

  return (
    <article className="framer-product-card group relative flex flex-col h-full">
      {/* Product Image Canvas */}
      <div className="relative aspect-[4/3] bg-[#0c0c0c] border-b border-[#1a1a1a] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={altText}
            width={400}
            height={300}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="text-3xl sm:text-4xl opacity-30 select-none" aria-hidden="true">📱</div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          {product.featured && (
            <span className="px-2 py-0.5 rounded-[4px] bg-white text-black text-[10px] sm:text-[11px] font-medium tracking-tight">
              Featured
            </span>
          )}
          {hasDiscount && discountPct > 0 && (
            <span className="px-2 py-0.5 rounded-[4px] bg-[#1c1c1c] text-[#ff7a3d] border border-[#ff7a3d]/20 text-[10px] sm:text-[11px] font-medium tracking-tight">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Stock Status indicator */}
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#141414] border border-[#262626] text-[10px] sm:text-[11px] text-[#999999]">
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock !== false ? 'bg-[#22c55e]' : 'bg-[#ff5577]'}`} />
            {product.inStock !== false ? t('stock.in_stock', 'In Stock') : t('stock.sold_out', 'Sold Out')}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] tracking-tight uppercase mb-0.5">
            {product.brand}
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-medium tracking-tight text-white mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Specs Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {product.ram && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#1c1c1c] text-[#999999] text-[10px] sm:text-[11px] border border-[#262626]">
                {product.ram}
              </span>
            )}
            {product.storage && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#1c1c1c] text-[#999999] text-[10px] sm:text-[11px] border border-[#262626]">
                {product.storage}
              </span>
            )}
            {readableCondition && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-[#1c1c1c] text-[#999999] text-[10px] sm:text-[11px] border border-[#262626]">
                {readableCondition}
              </span>
            )}
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight tabular-nums">
              {formatINR(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-[12px] sm:text-[13px] text-[#999999] line-through tabular-nums">
                {formatINR(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button: Minimum 44px tap target height on mobile */}
        <a
          href={product.inStock !== false ? waLink : '#'}
          target={product.inStock !== false ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={
            product.inStock !== false
              ? `Check ${product.brand} ${product.name} deal on WhatsApp`
              : `${product.brand} ${product.name} is sold out`
          }
          className={`btn-primary w-full text-center text-[13px] !py-3 min-h-[44px] justify-center ${
            product.inStock === false ? 'opacity-40 pointer-events-none' : ''
          }`}
        >
          {product.inStock !== false ? t('stock.btn_enquire', 'WhatsApp Deal') : t('stock.sold_out', 'Sold Out')}
        </a>
      </div>
    </article>
  )
}

export default ProductCard
