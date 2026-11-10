import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import type { LanguageOption } from '@/context/LanguageContext'

interface LanguageSelectorProps {
  variant?: 'nav' | 'mobile' | 'dock'
  className?: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'nav', className = '' }) => {
  const { languages, currentLanguageOption, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1">
          Select Language / भाषा चुनें
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {languages.map((lang: LanguageOption) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-[10px] text-[13px] font-medium border transition-all ${
                currentLanguageOption.code === lang.code
                  ? 'bg-white text-black border-white shadow-sm'
                  : 'bg-[#141414] text-[#999999] border-[#262626] hover:text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="truncate">{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#141414] border border-[#262626] text-[#999999] hover:text-white hover:border-[#383838] transition-all text-[13px] font-medium"
        aria-label="Select Language"
      >
        <span>{currentLanguageOption.flag}</span>
        <span className="hidden sm:inline">{currentLanguageOption.nativeName}</span>
        <span className="text-[10px] text-[#999999] ml-0.5">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-[15px] bg-[#141414] border border-[#262626] shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-1.5 z-[150] overflow-hidden">
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#666666] border-b border-[#1a1a1a]">
            North Indian Languages
          </div>
          {languages.map((lang: LanguageOption) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-left text-[13px] transition-colors ${
                currentLanguageOption.code === lang.code
                  ? 'bg-[#1c1c1c] text-white font-medium'
                  : 'text-[#999999] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </div>
              <span className="text-[11px] text-[#666666]">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
