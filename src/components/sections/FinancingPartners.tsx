import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface FinancingPartnersProps {
  whatsappNumber?: string
}

interface Partner {
  id: string
  name: string
  subtitle: string
  badgeText: string
  accentColor: string
  logoSvg: React.ReactNode
}

export const FinancingPartners: React.FC<FinancingPartnersProps> = ({ whatsappNumber = '919416749202' }) => {
  const { t } = useLanguage()
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '') || '919416749202'

  const partners: Partner[] = [
    {
      id: 'bajaj',
      name: 'Bajaj Finserv',
      subtitle: 'Instant Paperless EMI',
      badgeText: 'Instant Approval',
      accentColor: '#005596',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" fill="none">
          <circle cx="50" cy="50" r="48" fill="#005596" />
          <path
            d="M32 25H54C62.8 25 70 30.2 70 38C70 43.6 66.2 47.8 60.5 49.5C67.5 51.5 72 56.5 72 63C72 71.5 64 77 54 77H32V25ZM43 35V46H52C56 46 59 43.5 59 40.5C59 37.5 56 35 52 35H43ZM43 55V67H53C57.5 67 61 64.5 61 61C61 57.5 57.5 55 53 55H43Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 'idfc',
      name: 'IDFC FIRST Bank',
      subtitle: 'Smart Consumer Loans',
      badgeText: 'Low Down Payment',
      accentColor: '#9D1D27',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" fill="none">
          <rect width="100" height="100" rx="20" fill="#9D1D27" />
          <path
            d="M26 28H36V72H26V28ZM44 28H58C69 28 76 34.5 76 43.5C76 52.5 69 59 58 59H44V28ZM54 36.5V50.5H58C63 50.5 66.5 47.5 66.5 43.5C66.5 39.5 63 36.5 58 36.5H54ZM62 61L75 72H63L51 61H62Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 'hdb',
      name: 'HDB Financial Services',
      subtitle: 'HDFC Bank Group Company',
      badgeText: 'Fast Disbursal',
      accentColor: '#004A80',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" fill="none">
          <rect width="100" height="100" rx="20" fill="#004A80" />
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fill="#FFCC00"
            fontSize="34"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            letterSpacing="-1"
          >
            HDB
          </text>
        </svg>
      ),
    },
    {
      id: 'poonawalla',
      name: 'Poonawalla Fincorp',
      subtitle: 'Quick Digital EMI',
      badgeText: 'Minimal Docs',
      accentColor: '#6B2C91',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" fill="none">
          <rect width="100" height="100" rx="20" fill="#6B2C91" />
          <circle cx="50" cy="50" r="32" stroke="#FFB81C" strokeWidth="6" fill="none" />
          <path
            d="M42 34H54C60 34 64 37 64 42.5C64 48 60 51 54 51H42V34ZM48 40V46.5H53.5C55.5 46.5 57.5 45 57.5 42.5C57.5 40 55.5 40 53.5 40H48ZM42 51H48V66H42V51Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 'dmi',
      name: 'DMI Finance',
      subtitle: 'Digital Smartphone Financing',
      badgeText: 'Pre-Approved Offers',
      accentColor: '#0A74B8',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" fill="none">
          <rect width="100" height="100" rx="20" fill="#0E1B2E" stroke="#0A74B8" strokeWidth="3" />
          <path d="M22 32H40C52 32 58 39 58 50C58 61 52 68 40 68H22V32Z" fill="#00D2C4" />
          <path d="M30 40H38C44 40 48 44 48 50C48 56 44 60 38 60H30V40Z" fill="#0E1B2E" />
          <text
            x="76"
            y="65"
            textAnchor="middle"
            fill="white"
            fontSize="26"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            MI
          </text>
        </svg>
      ),
    },
  ]

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[12px] font-medium text-[#999999] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" />
            {t('finance.eyebrow', 'Authorized Lending Partners')}
          </div>
          <h2
            id="partners-heading"
            className="text-[32px] sm:text-[46px] font-medium tracking-[-1.5px] sm:tracking-[-2.5px] leading-[1.05] text-white mb-4"
          >
            {t('finance.title', 'Flexible Financing & Easy EMI.')}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#999999] leading-[1.4] tracking-tight">
            {t(
              'finance.desc',
              'We partner with India’s leading consumer finance companies. Get instant on-the-spot approval with minimal documents.'
            )}
          </p>
        </div>

        {/* Partners Grid (Mobile-First: 1-col on tiny screens, 2-col on mobile, 3-col tablet, 5-col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map(partner => (
            <div
              key={partner.id}
              className="bg-[#141414] border border-[#262626] rounded-[18px] p-5 flex flex-col justify-between hover:border-[#383838] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span role="img" aria-label={`${partner.name} logo`}>
                    {partner.logoSvg}
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#1c1c1c] text-[11px] font-medium text-[#999999] border border-[#262626]">
                    {partner.badgeText}
                  </span>
                </div>
                <h3 className="text-[17px] font-medium tracking-tight text-white mb-1 group-hover:text-white transition-colors">
                  {partner.name}
                </h3>
                <p className="text-[13px] text-[#999999] leading-tight mb-4">
                  {partner.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#0099ff]">
                  Available in Store
                </span>
                <span className="text-sm text-[#999999] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help Banner for Mobile */}
        <div className="mt-8 bg-[#141414] border border-[#262626] rounded-[18px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#262626] flex items-center justify-center text-xl flex-shrink-0">
              ⚡
            </div>
            <div>
              <div className="text-[15px] font-medium text-white tracking-tight">
                {t('finance.approval_time', '5-Minute Instant Approval in Store')}
              </div>
              <div className="text-[13px] text-[#999999]">
                {t('finance.docs', 'Only Aadhaar & Bank Details Required')}
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hi! I want to check my EMI eligibility with Bajaj / IDFC / HDB / Poonawalla / DMI Finance.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto text-center !py-2.5 !px-5 text-[13px]"
          >
            Check EMI Eligibility
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinancingPartners
