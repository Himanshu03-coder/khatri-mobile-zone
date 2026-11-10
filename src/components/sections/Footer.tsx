import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import BrandLogo from '@/components/ui/BrandLogo'
import { cleanPhoneDigits } from '@/utils/helpers'

interface StoreSettings {
  storeName?: string
  address?: string
  phone?: string
  whatsappNumber?: string
  email?: string
  openingHours?: string
  mapsLink?: string
}

interface FooterProps {
  storeSettings?: StoreSettings
}

interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

export const Footer: React.FC<FooterProps> = ({ storeSettings }) => {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()
  const whatsapp = cleanPhoneDigits(storeSettings?.whatsappNumber)
  const rawPhone = storeSettings?.phone ?? storeSettings?.whatsappNumber ?? '+91 9416749202'
  const cleanPhone = cleanPhoneDigits(rawPhone, whatsapp)
  const displayPhone = rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`

  const handleHashLink = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('/#')) return
    e.preventDefault()
    const hash = href.slice(1)
    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(href)
    }
  }

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'Flagship Handsets',
      links: [
        { label: 'Apple iPhone Fatehabad', href: '/#stock' },
        { label: 'Samsung Galaxy Series', href: '/#stock' },
        { label: 'OnePlus Flagships', href: '/#stock' },
        { label: 'Vivo V & X Series', href: '/#stock' },
        { label: 'Xiaomi & Nothing Phones', href: '/#stock' },
        { label: 'Smartwatches & Audio', href: '/#stock' },
      ],
    },
    {
      title: 'Finance & Services',
      links: [
        { label: 'Bajaj Finserv EMI', href: '/#partners' },
        { label: 'IDFC FIRST Bank EMI', href: '/#partners' },
        { label: 'HDB Financial Services', href: '/#partners' },
        { label: 'Poonawalla Fincorp', href: '/#partners' },
        { label: 'DMI Finance', href: '/#partners' },
        { label: 'Old Phone Exchange', href: '/#why' },
      ],
    },
    {
      title: 'Company & Legal',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Buyer FAQ', href: '/#faq' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      ],
    },
    {
      title: 'Store & Support',
      links: [
        { label: storeSettings?.address || 'Palika Bazar, Fatehabad', href: '/contact' },
        { label: storeSettings?.openingHours || 'Mon–Sat: 10:00 AM – 9:00 PM', href: '/contact' },
        { label: `WhatsApp: +${whatsapp}`, href: `https://wa.me/${whatsapp}`, isExternal: true },
        { label: `Call: ${displayPhone}`, href: `tel:+${cleanPhone}`, isExternal: true },
        {
          label: 'Google Maps Directions',
          href: storeSettings?.mapsLink || 'https://maps.google.com/?q=Palika+Bazar+Fatehabad+Haryana',
          isExternal: true,
        },
        { label: 'Admin Portal', href: '/admin' },
      ],
    },
  ]

  return (
    <footer className="bg-[#090909] text-[#999999] py-14 sm:py-16 border-t border-[#1a1a1a]">
      <div className="container-site">
        {/* Top Grid: Wordmark Left + 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#1a1a1a]">
          {/* Brand info */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2.5 text-white w-fit">
              <BrandLogo className="w-7 h-7" />
              <span className="font-medium text-[15px] tracking-tight">
                {storeSettings?.storeName ?? 'Khatri Mobile Zone'}
              </span>
            </Link>
            <p className="text-[13px] text-[#999999] leading-[1.4] tracking-tight">
              {t(
                'footer.tagline',
                'Fatehabad’s trusted smartphone store. Genuine GST-billed devices, honest prices, instant WhatsApp support.'
              )}
            </p>
          </div>

          {/* Columns */}
          {columns.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[13px] font-medium text-white tracking-tight mb-3">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.isExternal || link.href.startsWith('http') || link.href.startsWith('tel:') ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[12px] sm:text-[13px] text-[#999999] hover:text-white transition-colors duration-150 leading-tight block py-0.5"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('/#') ? (
                      <a
                        href={link.href}
                        onClick={e => handleHashLink(e, link.href)}
                        className="text-[12px] sm:text-[13px] text-[#999999] hover:text-white transition-colors duration-150 leading-tight block py-0.5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[12px] sm:text-[13px] text-[#999999] hover:text-white transition-colors duration-150 leading-tight block py-0.5"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#999999] text-center sm:text-left">
          <div>
            © {currentYear} {storeSettings?.storeName ?? 'Khatri Mobile Zone'}. {t('footer.rights', 'All rights reserved.')}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
