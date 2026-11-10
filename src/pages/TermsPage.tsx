import React from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { useStoreInfo } from '@/hooks/useStoreInfo'

export default function TermsPage() {
  const { store } = useStoreInfo()

  const clauses = [
    {
      title: '1. Website Scope & Catalog Information',
      body: [
        `By accessing this website, you agree to these Terms and Conditions governing informational browsing and inquiry submissions for ${store.storeName} (${store.address}).`,
        'Displayed prices (in Indian Rupees ₹), color options, storage configurations, promotional tags, and stock indicators (In Stock, Limited Stock, Sold Out) are updated regularly but remain subject to real-time in-store availability and confirmation via WhatsApp or in person.',
      ],
    },
    {
      title: '2. No Online Checkout or Binding Contract',
      body: [
        'This website does not offer online payments, automated order booking, or e-commerce cart checkout. A purchase becomes final only upon billing at our store counter (or confirmed arrangement with our staff) with an official GST tax invoice.',
      ],
    },
    {
      title: '3. Product Authenticity & Manufacturer Warranty',
      body: [
        'All smartphones marked "Brand New Seal Pack" are genuine factory-sealed units backed by official manufacturer warranty valid at authorized brand service centers across India, subject to the brand’s warranty terms.',
        'Devices listed as "Open Box" or "Pre-Owned" undergo multi-point hardware verification before sale, and their exact box contents and warranty coverage are transparently explained prior to billing.',
      ],
    },
    {
      title: '4. Financing & EMI Terms',
      body: [
        'Consumer financing and EMI options facilitated through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance depend on applicant credit eligibility, KYC verification, down-payment requirements, and terms set solely by the lending partner.',
        `${store.storeName} assists in submitting in-store applications but does not guarantee loan approval or determine interest/processing charges.`,
      ],
    },
    {
      title: '5. Old Phone Exchange Policy',
      body: [
        'Any exchange quote shared via WhatsApp or phone is an initial estimate based on user-described condition. The final trade-in deduction is determined strictly after physical hardware, display, battery, and IMEI verification at our Palika Bazar store.',
        'Customers exchanging a device must confirm rightful ownership and present valid government ID for mandatory retail compliance.',
      ],
    },
    {
      title: '6. Pricing Errors & Revisions',
      body: [
        'In the event of a typographical error in specifications or pricing on the catalog, we reserve the right to clarify the accurate store price prior to invoicing.',
      ],
    },
    {
      title: '7. Governing Law & Contact',
      body: [
        'These terms are governed by the laws of India, with jurisdiction in Fatehabad, Haryana.',
        `For questions regarding billing, warranty support, or these terms, contact us at ${store.phone}, email ${store.email}, or visit ${store.address}.`,
      ],
    },
  ]

  return (
    <SiteLayout
      eyebrow="Terms of Use · Last Updated: November 2026"
      title="Terms & Conditions."
      subtitle={`Clear guidelines for catalog pricing, GST warranty coverage, in-store EMI financing, and smartphone exchange at ${store.storeName}.`}
      breadcrumbLabel="Terms & Conditions"
      pageMeta={{
        title: `Terms & Conditions | ${store.storeName} Fatehabad`,
        description: `Read the Terms and Conditions for Khatri Mobile Zone in Palika Bazar, Fatehabad covering smartphone pricing, GST invoices, EMI partners, and old phone exchange.`,
        path: '/terms-and-conditions',
        schemaType: 'WebPage',
        breadcrumbLabel: 'Terms & Conditions',
      }}
    >
      <section className="py-14 sm:py-20 border-b border-[#1a1a1a]">
        <div className="container-site max-w-4xl flex flex-col gap-5">
          {clauses.map(clause => (
            <article key={clause.title} className="framer-card p-6 sm:p-8">
              <h2 className="text-[19px] sm:text-[22px] font-medium tracking-tight text-white mb-3">
                {clause.title}
              </h2>
              <div className="flex flex-col gap-3 text-[14px] sm:text-[15px] text-[#999999] leading-[1.6]">
                {clause.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#999999]">
            <span>Related documents:</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="link-blue">
                Privacy Policy →
              </Link>
              <Link to="/about" className="link-blue">
                About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
