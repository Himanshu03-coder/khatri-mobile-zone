import React from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { useStoreInfo } from '@/hooks/useStoreInfo'
import { cleanPhoneDigits } from '@/utils/helpers'

export default function AboutPage() {
  const { store } = useStoreInfo()
  const whatsapp = cleanPhoneDigits(store.whatsappNumber)

  const pillars = [
    {
      badge: 'Authenticity',
      title: '100% Factory Sealed Pack & Official GST Billing',
      description:
        'Every brand-new smartphone, smartwatch, and audio accessory sold at Khatri Mobile Zone includes an official GST invoice and valid pan-India manufacturer warranty.',
      meta: 'Zero grey-market units • Serial-verified stock',
    },
    {
      badge: 'Financing Partners',
      title: 'Instant In-Store EMI Approval',
      description:
        'Upgrade effortlessly through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance with fast Aadhaar and bank verification.',
      meta: 'Approval in minutes • Minimal documentation',
    },
    {
      badge: 'Trade-In Program',
      title: 'Transparent Old Phone Exchange Value',
      description:
        'Bring your existing smartphone for a fair, on-the-spot hardware inspection at our Palika Bazar store and deduct its value directly from your upgrade.',
      meta: 'Instant price deduction • Honest assessment',
    },
    {
      badge: 'White-Glove Setup',
      title: 'Complimentary Data Transfer & Protection',
      description:
        'Our in-store specialists help transfer your WhatsApp chats, contacts, and photos safely to your new handset, along with complimentary screen protection setup.',
      meta: 'Ready to use before you step out',
    },
  ]

  const brands = [
    'Apple iPhone',
    'Samsung Galaxy',
    'OnePlus',
    'Vivo',
    'Xiaomi',
    'OPPO',
    'Realme',
    'Nothing',
  ]

  return (
    <SiteLayout
      eyebrow="Established 2015 · Fatehabad, Haryana"
      title={`About ${store.storeName}.`}
      subtitle="Serving Fatehabad, Tohana, Ratia, Sirsa, and nearby communities since 2015 with genuine flagship smartphones, honest guidance, and instant local support."
      breadcrumbLabel="About Us"
      pageMeta={{
        title: `About Us | ${store.storeName} Fatehabad — Trusted Mobile Store Since 2015`,
        description:
          'Learn about Khatri Mobile Zone in Palika Bazar, Fatehabad (Est. 2015). 100% genuine GST-billed Apple, Samsung, OnePlus, Vivo & Xiaomi phones, exchange, and instant EMI.',
        path: '/about',
        schemaType: 'AboutPage',
        breadcrumbLabel: 'About Us',
      }}
    >
      {/* Story & Spotlight Metrics */}
      <section className="py-14 sm:py-20 border-b border-[#1a1a1a]">
        <div className="container-site max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 framer-card p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-medium tracking-tight text-white mb-4">
                  Built on long-term trust in Fatehabad.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#999999] leading-[1.6] tracking-tight mb-4">
                  {store.aboutDescription}
                </p>
                <p className="text-[15px] sm:text-[16px] text-[#999999] leading-[1.6] tracking-tight">
                  Whether you are picking up an Apple iPhone, a Samsung Galaxy flagship, an Open Box value deal, or upgrading through flexible monthly EMI, every device goes through clear pricing and attentive after-sales assistance.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {brands.map(brand => (
                  <span
                    key={brand}
                    className="px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#262626] text-[12px] text-white/90 font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div className="spotlight-card-violet p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-[12px] font-medium mb-6 backdrop-blur-md">
                  Since 2015
                </span>
                <div className="space-y-5">
                  <div>
                    <div className="text-[34px] font-semibold tracking-tight text-white tabular-nums leading-none">
                      5,000+
                    </div>
                    <div className="text-[13px] text-white/80 mt-1">Happy customers across Haryana</div>
                  </div>
                  <div>
                    <div className="text-[34px] font-semibold tracking-tight text-white tabular-nums leading-none">
                      5 Partners
                    </div>
                    <div className="text-[13px] text-white/80 mt-1">Bajaj, IDFC, HDB, Poonawalla &amp; DMI</div>
                  </div>
                  <div>
                    <div className="text-[34px] font-semibold tracking-tight text-white tabular-nums leading-none">
                      100%
                    </div>
                    <div className="text-[13px] text-white/80 mt-1">Genuine GST-billed devices</div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/#stock"
                  className="btn-primary w-full justify-center !py-3 text-[13px] min-h-[44px]"
                >
                  Explore Live Stock →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-14 sm:py-20 border-b border-[#1a1a1a]">
        <div className="container-site max-w-4xl">
          <h2 className="text-[26px] sm:text-[36px] font-medium tracking-[-1.5px] text-white mb-8">
            Why buyers choose Khatri Mobile Zone.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map(item => (
              <article
                key={item.title}
                className="framer-card p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-[6px] bg-[#1c1c1c] border border-[#262626] text-[11px] font-medium text-[#0099ff] mb-3">
                    {item.badge}
                  </span>
                  <h3 className="text-[18px] font-medium tracking-tight text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#999999] leading-[1.5]">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e1e1e] text-[12px] text-[#777777]">
                  {item.meta}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 sm:py-20">
        <div className="container-site max-w-4xl">
          <div className="spotlight-card-orange p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-[24px] sm:text-[30px] font-medium tracking-[-1px] text-white mb-2">
                Visit us in Palika Bazar, Fatehabad.
              </h2>
              <p className="text-[14px] sm:text-[15px] text-white/90 max-w-lg leading-[1.45]">
                {store.address} • {store.openingHours}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Khatri Mobile Zone! I would like to know more about your current smartphone offers.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-3 !px-5 text-[13px] min-h-[44px] justify-center"
              >
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="btn-secondary !bg-black/40 !border-white/25 !text-white !py-3 !px-5 text-[13px] min-h-[44px] justify-center"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
