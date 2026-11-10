import React, { useEffect } from 'react'
import BrandLogo from '@/components/ui/BrandLogo'
import { useAppStore } from '@/store/appStore'
import { cleanPhoneDigits, sanitizeStoreCopy } from '@/utils/helpers'

export type ErrorStatusCode = 404 | 500

interface ErrorPageProps {
  statusCode?: ErrorStatusCode
  error?: Error | null
  onReset?: () => void
}

const ERROR_CONFIG: Record<
  ErrorStatusCode,
  {
    badge: string
    badgeDotColor: string
    headline: string
    description: string
    accentGlowClass: string
  }
> = {
  404: {
    badge: 'Error 404 · Page Not Found',
    badgeDotColor: 'bg-[#0099ff]',
    headline: 'This page could not be found.',
    description:
      'The link may be outdated or mistyped. Explore our live smartphone stock in Fatehabad or message us directly on WhatsApp.',
    accentGlowClass: 'from-[#0099ff]/15 via-[#6a4cf5]/10 to-transparent',
  },
  500: {
    badge: 'Error 500 · Unexpected Server Error',
    badgeDotColor: 'bg-[#ff5577]',
    headline: 'Something went wrong on our end.',
    description:
      'We encountered a temporary technical issue loading this view. Try refreshing the page, or reach our Fatehabad store directly on WhatsApp or phone.',
    accentGlowClass: 'from-[#ff5577]/15 via-[#ff7a3d]/10 to-transparent',
  },
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 404,
  error,
  onReset,
}) => {
  const storeSettings = useAppStore(state => state.storeSettings)
  const storeName = sanitizeStoreCopy(storeSettings?.shopName) || 'Khatri Mobile Zone'
  const whatsapp = cleanPhoneDigits(storeSettings?.whatsappNumber)
  const phone = cleanPhoneDigits(storeSettings?.phonePrimary, whatsapp)
  const config = ERROR_CONFIG[statusCode]

  useEffect(() => {
    document.title = `${statusCode} — ${statusCode === 404 ? 'Page Not Found' : 'Server Error'} | ${storeName}`
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [statusCode, storeName])

  const handleTryAgain = () => {
    if (onReset) {
      onReset()
      return
    }
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white antialiased flex flex-col justify-between selection:bg-[#0099ff]/30 relative overflow-hidden">
      {/* Subtle top ambient radial glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b ${config.accentGlowClass} blur-3xl opacity-70`}
      />

      {/* Minimal Header */}
      <header className="relative z-10 border-b border-[#1a1a1a] bg-[#090909]/80 backdrop-blur-md">
        <div className="container-site h-[56px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-white group">
            <BrandLogo className="w-7 h-7 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-medium text-[15px] tracking-[-0.3px]">{storeName}</span>
          </a>

          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${storeName}! I need assistance on your website.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 text-[12px] sm:text-[13px]"
          >
            WhatsApp Support
          </a>
        </div>
      </header>

      {/* Main Centered Error Card */}
      <main id="main-content" className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl framer-card p-6 sm:p-10 text-center flex flex-col items-center">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#262626] text-[12px] font-medium text-[#999999] mb-6">
            <span className={`w-2 h-2 rounded-full ${config.badgeDotColor}`} aria-hidden="true" />
            <span>{config.badge}</span>
          </div>

          {/* Large Framer Display Number */}
          <div
            className="text-[72px] sm:text-[108px] font-semibold tracking-[-4px] leading-none text-white tabular-nums mb-4 select-none"
            aria-hidden="true"
          >
            {statusCode}
          </div>

          <h1 className="text-[26px] sm:text-[38px] font-medium tracking-[-1.2px] sm:tracking-[-2px] leading-[1.1] text-white mb-4">
            {config.headline}
          </h1>

          <p className="text-[14px] sm:text-[16px] text-[#999999] leading-[1.5] tracking-tight max-w-lg mb-8">
            {config.description}
          </p>

          {/* Action Buttons — Mobile First >=44px tap targets */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            {statusCode === 500 ? (
              <button
                type="button"
                onClick={handleTryAgain}
                className="btn-primary !py-3 !px-6 text-[14px] min-h-[44px] justify-center cursor-pointer"
              >
                Try Again / Reload
              </button>
            ) : (
              <a
                href="/"
                className="btn-primary !py-3 !px-6 text-[14px] min-h-[44px] justify-center"
              >
                Back to Home
              </a>
            )}

            {statusCode === 500 ? (
              <a
                href="/"
                className="btn-secondary !py-3 !px-6 text-[14px] min-h-[44px] justify-center"
              >
                Return Home
              </a>
            ) : (
              <a
                href="/#stock"
                className="btn-secondary !py-3 !px-6 text-[14px] min-h-[44px] justify-center"
              >
                Browse Live Stock
              </a>
            )}

            <a
              href="/contact"
              className="btn-secondary !py-3 !px-6 text-[14px] min-h-[44px] justify-center"
            >
              Contact Us
            </a>
          </div>

          {/* Direct Store Helpline Fallback */}
          <div className="w-full pt-6 mt-8 border-t border-[#202020] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#999999]">
            <span>Palika Bazar, Fatehabad</span>
            <span aria-hidden="true">•</span>
            <a href={`tel:+${phone}`} className="hover:text-white transition-colors">
              Call Store
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-blue"
            >
              Message on WhatsApp →
            </a>
          </div>

          {/* Optional dev diagnostics */}
          {import.meta.env.DEV && error?.message && (
            <details className="mt-6 w-full text-left bg-[#090909] border border-[#262626] rounded-[12px] p-4">
              <summary className="text-[12px] font-medium text-[#999999] cursor-pointer">
                Technical error details (dev mode)
              </summary>
              <pre className="mt-2 text-[11px] font-mono text-[#ff5577] overflow-x-auto whitespace-pre-wrap break-words">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-[#1a1a1a] py-6">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#777777]">
          <span>© {new Date().getFullYear()} {storeName}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const NotFoundPage: React.FC = () => <ErrorPage statusCode={404} />

export const ServerErrorPage: React.FC<{
  error?: Error | null
  onReset?: () => void
}> = ({ error, onReset }) => <ErrorPage statusCode={500} error={error} onReset={onReset} />

export default ErrorPage
