import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface StoreSettings {
  storeName?: string
  whatsappNumber?: string
  heroTagline?: string
}

interface HeroProps {
  storeSettings?: StoreSettings
}

export const Hero: React.FC<HeroProps> = ({ storeSettings }) => {
  const { t } = useLanguage()
  const rawWhatsapp = storeSettings?.whatsappNumber ?? '919416749202'
  const whatsapp = rawWhatsapp.replace(/[^0-9]/g, '') || '919416749202'
  const storeName = storeSettings?.storeName ?? 'Khatri Mobile Zone'
  const tagline = storeSettings?.heroTagline ?? t('hero.tagline', 'Flagship phones at honest prices.')

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center bg-[#090909] pt-16 pb-20 sm:pt-20 sm:pb-24 overflow-hidden border-b border-[#1a1a1a]"
    >
      <div className="container-site relative z-10 flex flex-col items-center text-center px-4">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] mb-6 sm:mb-8 max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse flex-shrink-0" aria-hidden="true" />
          <span className="text-[12px] sm:text-[13px] font-medium text-[#999999] tracking-tight truncate">
            {t('hero.badge', 'Live Inventory · Fatehabad, Haryana')}
          </span>
        </div>

        {/* Poster Headline with extreme negative tracking on desktop, scaled on mobile */}
        <h1
          id="hero-heading"
          className="text-[38px] sm:text-[64px] md:text-[84px] font-medium tracking-[-2px] sm:tracking-[-4px] leading-[1.0] sm:leading-[0.95] text-white max-w-4xl mx-auto mb-5 sm:mb-6"
        >
          {storeName}.
          <br />
          <span className="text-[#999999] font-normal">{tagline}</span>
        </h1>

        {/* Lead subhead paragraph */}
        <p className="text-[15px] sm:text-[19px] font-normal leading-[1.4] tracking-tight text-[#999999] max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          {t(
            'hero.desc',
            'Fatehabad’s trusted store for genuine GST-billed Apple iPhone, Samsung Galaxy, OnePlus, Vivo & Xiaomi smartphones, old phone exchange, and instant EMI financing.'
          )}
        </p>

        {/* CTA Pills: Touch targets >= 44px for mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none mb-14 sm:mb-20">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi! I want to enquire about smartphone pricing and stock availability.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-3.5 !px-7 !text-[15px] min-h-[44px] justify-center text-center"
          >
            {t('hero.whatsapp_cta', 'WhatsApp Instant Inquiry')}
          </a>
          <a
            href="#stock"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#stock')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-secondary !py-3.5 !px-7 !text-[15px] min-h-[44px] justify-center text-center"
          >
            {t('hero.browse_cta', 'Explore Live Stock')}
          </a>
        </div>

        {/* Trust Row: 2-col on mobile, 4-col on desktop, NO "0% EMI" */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          {[
            {
              metric: t('hero.stat1_metric', '100%'),
              label: t('hero.stat1_label', 'Factory Sealed Pack'),
              desc: t('hero.stat1_desc', 'Official GST bill & brand warranty'),
            },
            {
              metric: t('hero.stat2_metric', 'Instant EMI'),
              label: t('hero.stat2_label', 'Multiple Partners'),
              desc: t('hero.stat2_desc', 'Bajaj, IDFC, HDB, Poonawalla & DMI'),
            },
            {
              metric: t('hero.stat3_metric', '₹ Instant'),
              label: t('hero.stat3_label', 'Old Phone Exchange'),
              desc: t('hero.stat3_desc', 'Highest trade-in valuation in town'),
            },
            {
              metric: t('hero.stat4_metric', '10+ Yrs'),
              label: t('hero.stat4_label', 'Trusted Legacy'),
              desc: t('hero.stat4_desc', 'Serving 5,000+ local customers'),
            },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-[#141414] border border-[#262626] rounded-[15px] p-3.5 sm:p-5 flex flex-col justify-between"
            >
              <div className="text-[20px] sm:text-[24px] font-medium tracking-tight text-white mb-1.5 tabular-nums">
                {stat.metric}
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-medium text-white tracking-tight mb-0.5 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-[12px] text-[#999999] leading-tight">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
