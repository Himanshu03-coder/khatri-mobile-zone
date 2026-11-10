import React from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { useStoreInfo } from '@/hooks/useStoreInfo'

export default function PrivacyPolicyPage() {
  const { store } = useStoreInfo()

  const sections = [
    {
      title: '1. Overview & Digital Catalog Model',
      body: [
        `${store.storeName} ("we", "our", "us") operates this website as a live inventory catalog and customer inquiry platform for our retail store located at ${store.address}.`,
        'We do not run an online shopping cart or accept credit card, debit card, net-banking, or UPI payments directly through this website.',
      ],
    },
    {
      title: '2. Information You Voluntarily Provide',
      body: [
        'When you fill out an inquiry form on our Contact page or Home page, the details you enter (such as your name, preferred smartphone model, inquiry purpose, and optional message) are formatted locally in your browser to open a WhatsApp message directly to our official store WhatsApp number.',
        'We do not automatically store form submissions inside an external marketing database without your interaction. Any chat messages, phone calls, or emails you initiate are used strictly to respond with stock availability, price quotes, trade-in estimates, or EMI eligibility guidance.',
      ],
    },
    {
      title: '3. Local Browser Storage & Language Preferences',
      body: [
        'This website stores your selected regional language preference (such as English, Hindi, Punjabi, Haryanvi, Rajasthani, or Urdu) inside your browser localStorage under the key "kmz_lang" solely to preserve your reading preference across visits.',
        'We do not deploy invasive third-party advertising trackers or sell browsing profiles to third parties.',
      ],
    },
    {
      title: '4. Financing Partners & In-Store KYC',
      body: [
        'EMI and consumer finance facilities offered through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance are processed exclusively in person at our Fatehabad store.',
        'We never ask for Aadhaar numbers, PAN details, bank account numbers, OTPs, or KYC uploads through this website. Any financing KYC shared inside the store is governed by the privacy policy of the selected RBI-regulated lender or bank.',
      ],
    },
    {
      title: '5. Old Phone Exchange Verification',
      body: [
        'For device buybacks or exchange trade-ins conducted in store, standard verification (IMEI check and government ID inspection as required under local retail compliance rules) is carried out physically at the counter.',
      ],
    },
    {
      title: '6. Third-Party Links & Services',
      body: [
        'Our pages contain links to external services including WhatsApp (wa.me), Google Maps, Instagram, Facebook, and YouTube. Once you leave our website, your interactions are governed by the privacy policies of those respective platforms.',
      ],
    },
    {
      title: '7. Your Rights & Contact for Privacy Queries',
      body: [
        `If you would like us to delete past inquiry correspondence or have questions about how we handle customer information, please contact us by email at ${store.email}, call ${store.phone}, or visit us at ${store.address}.`,
      ],
    },
  ]

  return (
    <SiteLayout
      eyebrow="Legal & Privacy · Last Updated: November 2026"
      title="Privacy Policy."
      subtitle={`How ${store.storeName} respects your privacy and handles inquiry details, browser preferences, and in-store financing information.`}
      breadcrumbLabel="Privacy Policy"
      pageMeta={{
        title: `Privacy Policy | ${store.storeName} Fatehabad`,
        description: `Read the Privacy Policy for Khatri Mobile Zone in Fatehabad, Haryana. Learn how we handle WhatsApp inquiries, language preferences, and in-store EMI KYC.`,
        path: '/privacy-policy',
        schemaType: 'WebPage',
        breadcrumbLabel: 'Privacy Policy',
      }}
    >
      <section className="py-14 sm:py-20 border-b border-[#1a1a1a]">
        <div className="container-site max-w-4xl flex flex-col gap-5">
          {sections.map(sec => (
            <article key={sec.title} className="framer-card p-6 sm:p-8">
              <h2 className="text-[19px] sm:text-[22px] font-medium tracking-tight text-white mb-3">
                {sec.title}
              </h2>
              <div className="flex flex-col gap-3 text-[14px] sm:text-[15px] text-[#999999] leading-[1.6]">
                {sec.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#999999]">
            <span>Related documents:</span>
            <div className="flex items-center gap-4">
              <Link to="/terms-and-conditions" className="link-blue">
                Terms &amp; Conditions →
              </Link>
              <Link to="/contact" className="link-blue">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
