import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import LanguageSelector from '@/components/ui/LanguageSelector'
import BrandLogo from '@/components/ui/BrandLogo'
import { cleanPhoneDigits } from '@/utils/helpers'

interface StoreSettings {
  storeName?: string
  whatsappNumber?: string
  phone?: string
}

interface GlobalNavProps {
  storeSettings?: StoreSettings
}

export const GlobalNav: React.FC<GlobalNavProps> = ({ storeSettings }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const whatsapp = cleanPhoneDigits(storeSettings?.whatsappNumber)

  const navLinks = [
    { label: t('nav.deals', 'Deals'), href: '/#deals' },
    { label: t('nav.stock', 'Live Stock'), href: '/#stock' },
    { label: t('nav.partners', 'Financing'), href: '/#partners' },
    { label: t('nav.faq', 'FAQ'), href: '/#faq' },
    { label: t('nav.about', 'About Us'), href: '/about' },
    { label: t('nav.visit', 'Contact'), href: '/contact' },
  ]

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const hash = href.slice(1)
      if (location.pathname === '/') {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(href)
      }
      return
    }
    navigate(href)
  }

  return (
    <>
      <header className="framer-top-nav">
        <div className="container-site flex items-center justify-between h-full">
          {/* Brand Wordmark */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 text-white group flex-shrink-0"
          >
            <BrandLogo className="w-7 h-7 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-medium text-[15px] tracking-[-0.3px] text-white">
              {storeSettings?.storeName ?? 'Khatri Mobile Zone'}
            </span>
          </Link>

          {/* Desktop Center Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => {
              const isActive = !link.href.startsWith('/#') && location.pathname === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`framer-nav-link text-[13px] ${isActive ? '!text-white font-medium' : ''}`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop Right CTAs: Language + Charcoal pill + White pill */}
          <div className="hidden sm:flex items-center gap-2.5">
            <LanguageSelector variant="nav" />

            <a
              href="/#stock"
              onClick={e => {
                e.preventDefault()
                handleNavClick('/#stock')
              }}
              className="btn-secondary text-[13px] !py-2 !px-3.5"
            >
              {t('nav.browse', 'Browse Stock')}
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi! I want to enquire about mobiles at Khatri Mobile Zone.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[13px] !py-2 !px-4"
            >
              {t('nav.whatsapp', 'WhatsApp Us')}
            </a>
          </div>

          {/* Mobile Right: Language Flag + WhatsApp button + Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSelector variant="nav" />

            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi! I want to enquire about mobiles.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[12px] !py-1.5 !px-3"
            >
              WhatsApp
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1 text-white bg-[#141414] border border-[#262626] rounded-full active:scale-95"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`block w-4 h-[1.5px] bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-[2.7px]' : ''}`} />
              <span className={`block w-4 h-[1.5px] bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-[2.7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Touch-optimized with big tap targets and language picker) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <div className="absolute inset-0 bg-[#090909]/85 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[56px] left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#141414] border-b border-[#262626] p-5 flex flex-col gap-4 shadow-2xl">
            {/* Language Selection Grid on Mobile Drawer */}
            <div className="pb-3 border-b border-[#1a1a1a]">
              <LanguageSelector variant="mobile" />
            </div>

            {/* Nav list */}
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-[16px] font-medium text-[#999999] hover:text-white py-2.5 px-3 rounded-[10px] hover:bg-[#1c1c1c] transition-colors"
              >
                {t('nav.store', 'Home')}
              </Link>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="text-[16px] font-medium text-[#999999] hover:text-white py-2.5 px-3 rounded-[10px] hover:bg-[#1c1c1c] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/privacy-policy"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-[#777777] hover:text-white py-2 px-3 rounded-[10px] hover:bg-[#1c1c1c] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-[#777777] hover:text-white py-2 px-3 rounded-[10px] hover:bg-[#1c1c1c] transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>

            <div className="divider-hairline my-1" />

            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi! I want to enquire about mobiles.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center !py-3 text-[14px]"
            >
              {t('nav.whatsapp', 'WhatsApp Us')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default GlobalNav
