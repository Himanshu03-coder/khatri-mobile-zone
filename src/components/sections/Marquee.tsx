import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface MarqueeProps {
  text?: string
}

export const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const { t } = useLanguage()

  const defaultItems = [
    t('marquee.item1', '📱 iPhone 16 Pro Max in Stock'),
    t('marquee.item2', '🔥 Samsung Galaxy S25 Ultra Available'),
    t('marquee.item3', '💳 Easy EMI with Bajaj Finserv, IDFC, HDB, Poonawalla & DMI'),
    t('marquee.item4', '✅ Certified 100% Genuine Sealed Units'),
    t('marquee.item5', '🔄 Instant Old Phone Exchange Evaluation'),
    t('marquee.item6', '🎁 Free Screen Guard & Case Setup'),
    t('marquee.item7', '📍 Palika Bazar, Fatehabad, Haryana'),
  ]

  const items = text
    ? text.split(/[•|]/).map(item => item.trim()).filter(Boolean)
    : defaultItems

  const all = [...items, ...items]

  return (
    <div className="framer-marquee-bar py-2.5 border-b border-[#1a1a1a]">
      <div className="framer-marquee-track">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[12px] sm:text-[13px] font-medium text-[#999999] tracking-tight px-4 sm:px-6"
          >
            <span>{item}</span>
            <span className="ml-4 sm:ml-6 text-[#262626] select-none">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
