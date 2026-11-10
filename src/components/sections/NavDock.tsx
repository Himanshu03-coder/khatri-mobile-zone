import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cleanPhoneDigits } from '@/utils/helpers'

interface StoreSettings {
  whatsappNumber?: string
  phone?: string
}

interface NavDockProps {
  storeSettings?: StoreSettings
}

export const NavDock: React.FC<NavDockProps> = ({ storeSettings }) => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const whatsapp = cleanPhoneDigits(storeSettings?.whatsappNumber)
  const cleanPhone = cleanPhoneDigits(storeSettings?.phone, whatsapp)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <aside
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-[#141414]/95 backdrop-blur-md border border-[#262626] rounded-full p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 shadow-[0_12px_36px_rgba(0,0,0,0.65)] max-w-[94vw] sm:max-w-none"
      aria-label="Quick Mobile Actions"
    >
      {/* Primary White Pill WhatsApp CTA - Min 44px tap height on mobile */}
      <a
        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Khatri Mobile Zone! I want to check available devices and best offers.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary !py-2.5 !px-4 sm:!px-5 text-[12px] sm:text-[13px] min-h-[40px] flex items-center gap-1.5"
      >
        <span aria-hidden="true">💬</span>
        <span>WhatsApp</span>
      </a>

      {/* Direct Call Button (Crucial for mobile users) */}
      <a
        href={`tel:+${cleanPhone}`}
        className="btn-secondary !py-2 !px-3 text-[12px] sm:text-[13px] min-h-[40px] flex items-center gap-1"
        title="Call Store"
      >
        <span aria-hidden="true">📞</span>
        <span className="hidden xs:inline">Call</span>
      </a>

      {/* Stock Jump */}
      <a
        href="/#stock"
        onClick={e => {
          e.preventDefault()
          if (location.pathname === '/') {
            document.querySelector('#stock')?.scrollIntoView({ behavior: 'smooth' })
          } else {
            navigate('/#stock')
          }
        }}
        className="btn-secondary !py-2 !px-3 text-[12px] sm:text-[13px] min-h-[40px] hidden sm:inline-flex"
      >
        Stock
      </a>

      <div className="w-px h-5 bg-[#262626] mx-0.5" />

      {/* Circular Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c1c1c] text-[#999999] hover:text-white flex items-center justify-center text-[13px] transition-colors active:scale-95 flex-shrink-0"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </aside>
  )
}

export default NavDock
