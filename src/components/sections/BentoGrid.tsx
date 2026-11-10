import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export const BentoGrid: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
            {t('why.eyebrow', 'Our Commitment')}
          </div>
          <h2
            id="why-heading"
            className="text-[28px] sm:text-[48px] font-medium tracking-[-1.5px] sm:tracking-[-2.5px] leading-[1.05] text-white mb-4"
          >
            {t('why.title', 'Built for buyers who demand certainty.')}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#999999] leading-[1.4] tracking-tight">
            {t(
              'why.desc',
              'Located in Fatehabad with transparent device testing, official manufacturer bills, and complimentary setup.'
            )}
          </p>
        </div>

        {/* Bento Grid with Framer signature Gradient Spotlight Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Large Atmospheric Violet Spotlight (Spans 2 columns) */}
          <div className="md:col-span-2 spotlight-card-violet flex flex-col justify-between min-h-[260px] sm:min-h-[300px] p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-[12px] font-medium tracking-tight mb-5 backdrop-blur-md">
                {t('why.emi_badge', 'Financing Options')}
              </span>
              <h3 className="text-[24px] sm:text-[32px] font-medium leading-[1.1] tracking-[-1px] text-white mb-3">
                {t('why.emi_title', 'Instant Easy EMI on All Flagships.')}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-white/85 max-w-lg leading-[1.4] tracking-tight">
                {t(
                  'why.emi_desc',
                  'Choose from Bajaj Finserv, IDFC FIRST Bank, HDB Financial, Poonawalla Fincorp, or DMI Finance. Get your dream phone home in minutes.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <a href="#partners" className="text-[13px] font-medium text-white/95 underline underline-offset-4 cursor-pointer">
                View all financing partners & documents →
              </a>
            </div>
          </div>

          {/* Card 2: Charcoal Surface Card */}
          <div className="framer-card flex flex-col justify-between p-6">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#262626] flex items-center justify-center text-xl mb-5">
                🛡️
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-medium tracking-tight text-white mb-2">
                {t('why.genuine_title', '100% Genuine Sealed Pack')}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#999999] leading-[1.4] tracking-tight">
                {t(
                  'why.genuine_desc',
                  'Zero unboxed or grey units. Every handset has official GST billing and brand warranty across India.'
                )}
              </p>
            </div>
            <div className="pt-5 border-t border-[#1a1a1a] text-[12px] text-[#999999]">
              Verified serials on brand portal
            </div>
          </div>

          {/* Card 3: Charcoal Surface Card */}
          <div className="framer-card flex flex-col justify-between p-6">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#262626] flex items-center justify-center text-xl mb-5">
                🎁
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-medium tracking-tight text-white mb-2">
                {t('why.setup_title', 'Complimentary Data & Protection Setup')}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#999999] leading-[1.4] tracking-tight">
                {t(
                  'why.setup_desc',
                  'Free tempered glass, case fitting, and safe WhatsApp & phone data transfer done by our team.'
                )}
              </p>
            </div>
            <div className="pt-5 border-t border-[#1a1a1a] text-[12px] text-[#999999]">
              Ready to use on the spot
            </div>
          </div>

          {/* Card 4: Atmospheric Sunset-Orange Spotlight (Spans 2 columns) */}
          <div className="md:col-span-2 spotlight-card-orange flex flex-col justify-between min-h-[260px] sm:min-h-[300px] p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-[12px] font-medium tracking-tight mb-5 backdrop-blur-md">
                {t('why.exchange_badge', 'Exchange Trade-In')}
              </span>
              <h3 className="text-[24px] sm:text-[32px] font-medium leading-[1.1] tracking-[-1px] text-white mb-3">
                {t('why.exchange_title', 'Top Old Phone Exchange Value.')}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-white/90 max-w-lg leading-[1.4] tracking-tight">
                {t(
                  'why.exchange_desc',
                  'Bring any working smartphone. We run a fair hardware test and deduct the amount immediately on the spot.'
                )}
              </p>
            </div>
            <div className="pt-6">
              <a
                href="#contact"
                className="text-[13px] font-medium text-white underline underline-offset-4 cursor-pointer"
              >
                Calculate estimated trade-in value →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
