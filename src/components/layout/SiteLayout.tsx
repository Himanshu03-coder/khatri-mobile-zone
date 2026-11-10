import React from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '@/components/sections/GlobalNav'
import Footer from '@/components/sections/Footer'
import NavDock from '@/components/sections/NavDock'
import SeoHead from '@/components/seo/SeoHead'
import type { SeoPageMeta } from '@/components/seo/SeoHead'
import { useStoreInfo } from '@/hooks/useStoreInfo'

interface SiteLayoutProps {
  children: React.ReactNode
  pageMeta: SeoPageMeta
  eyebrow: string
  title: string
  subtitle: string
  breadcrumbLabel: string
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({
  children,
  pageMeta,
  eyebrow,
  title,
  subtitle,
  breadcrumbLabel,
}) => {
  const { store } = useStoreInfo()

  return (
    <div className="min-h-screen bg-[#090909] text-white antialiased selection:bg-[#0099ff]/30 flex flex-col">
      <SeoHead mode="page" pageMeta={pageMeta} storeSettings={store} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <GlobalNav storeSettings={store} />

      <main id="main-content" className="flex-1 pt-[56px]">
        {/* Page Header Banner */}
        <section className="py-14 sm:py-20 border-b border-[#1a1a1a] bg-[#090909]">
          <div className="container-site max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#999999]">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {breadcrumbLabel}
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[12px] font-medium text-[#999999] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" aria-hidden="true" />
              {eyebrow}
            </div>

            <h1 className="text-[32px] sm:text-[52px] font-medium tracking-[-1.5px] sm:tracking-[-2.5px] leading-[1.05] text-white mb-4">
              {title}
            </h1>
            <p className="text-[15px] sm:text-[18px] text-[#999999] leading-[1.45] tracking-tight max-w-2xl">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Page Body */}
        {children}
      </main>

      <Footer storeSettings={store} />
      <NavDock storeSettings={store} />
    </div>
  )
}

export default SiteLayout
