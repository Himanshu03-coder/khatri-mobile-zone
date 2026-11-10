import React, { useState } from 'react'
import SiteLayout from '@/components/layout/SiteLayout'
import { useStoreInfo } from '@/hooks/useStoreInfo'
import { cleanPhoneDigits } from '@/utils/helpers'

export default function ContactPage() {
  const { store } = useStoreInfo()
  const whatsapp = cleanPhoneDigits(store.whatsappNumber)
  const primaryDigits = cleanPhoneDigits(store.phone)
  const secondaryDigits = store.phoneSecondary ? cleanPhoneDigits(store.phoneSecondary, '') : ''

  const [customerName, setCustomerName] = useState('')
  const [phoneModel, setPhoneModel] = useState('')
  const [inquiryType, setInquiryType] = useState('New Sealed Pack Smartphone')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = [
      `Hello ${store.storeName}!`,
      '',
      `Name: ${customerName}`,
      `Desired Model: ${phoneModel || 'General Inquiry'}`,
      `Purpose: ${inquiryType}`,
      notes.trim() ? `Message: ${notes.trim()}` : null,
      '',
      'Please confirm stock availability, pricing & EMI details.',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <SiteLayout
      eyebrow="Direct Support · Palika Bazar, Fatehabad"
      title="Contact Khatri Mobile Zone."
      subtitle="Reach out directly on WhatsApp, call our store helpline, or visit us at Palika Bazar in Fatehabad for live hands-on device checks and EMI assistance."
      breadcrumbLabel="Contact Us"
      pageMeta={{
        title: `Contact Us | ${store.storeName} Fatehabad — Address, Phone & WhatsApp`,
        description: `Contact Khatri Mobile Zone at Palika Bazar, Fatehabad, Haryana 125050. Call ${store.phone}, message on WhatsApp, or check opening hours and directions.`,
        path: '/contact',
        schemaType: 'ContactPage',
        breadcrumbLabel: 'Contact Us',
      }}
    >
      <section className="py-14 sm:py-20 border-b border-[#1a1a1a]">
        <div className="container-site max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Store Details Column */}
            <div className="flex flex-col gap-4">
              <div className="framer-card p-6">
                <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1.5">
                  Store Address
                </div>
                <address className="not-italic text-[16px] font-medium text-white leading-snug mb-3">
                  {store.address}
                </address>
                <a
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-blue text-[13px] font-medium inline-flex items-center gap-1 min-h-[36px]"
                >
                  Open in Google Maps ↗
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="framer-card p-5">
                  <div className="text-[11px] font-medium text-[#999999] uppercase tracking-wider mb-1.5">
                    Phone Helpline
                  </div>
                  <a
                    href={`tel:+${primaryDigits}`}
                    className="text-[15px] font-medium text-white hover:text-[#0099ff] transition-colors block py-1"
                  >
                    {store.phone}
                  </a>
                  {secondaryDigits && (
                    <a
                      href={`tel:+${secondaryDigits}`}
                      className="text-[14px] text-[#999999] hover:text-white transition-colors block py-1"
                    >
                      {store.phoneSecondary}
                    </a>
                  )}
                </div>

                <div className="framer-card p-5">
                  <div className="text-[11px] font-medium text-[#999999] uppercase tracking-wider mb-1.5">
                    Email Support
                  </div>
                  <a
                    href={`mailto:${store.email}`}
                    className="text-[14px] font-medium text-white hover:text-[#0099ff] transition-colors break-all block py-1"
                  >
                    {store.email}
                  </a>
                </div>
              </div>

              <div className="framer-card p-6">
                <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1.5">
                  Opening Hours
                </div>
                <p className="text-[15px] font-medium text-white mb-1">{store.openingHours}</p>
                {store.weeklyOff && (
                  <p className="text-[13px] text-[#999999]">Weekly Off: {store.weeklyOff}</p>
                )}
              </div>

              {/* Social & Channels */}
              <div className="framer-card p-6">
                <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-3">
                  Connect Online
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2.5 !px-4 text-[13px] min-h-[42px]"
                  >
                    WhatsApp Chat
                  </a>
                  {store.instagramUrl && (
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2.5 !px-4 text-[13px] min-h-[42px]"
                    >
                      Instagram
                    </a>
                  )}
                  {store.facebookUrl && (
                    <a
                      href={store.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2.5 !px-4 text-[13px] min-h-[42px]"
                    >
                      Facebook
                    </a>
                  )}
                  {store.youtubeUrl && (
                    <a
                      href={store.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2.5 !px-4 text-[13px] min-h-[42px]"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Form */}
            <div className="framer-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-[22px] sm:text-[26px] font-medium tracking-tight text-white mb-2">
                  Send a Quick Inquiry
                </h2>
                <p className="text-[14px] text-[#999999] leading-[1.45] mb-6">
                  Prefer messaging? Fill out this short form and open a pre-filled WhatsApp chat with our Fatehabad team.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="contact-page-name" className="block text-[13px] font-medium text-[#999999] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-page-name"
                      type="text"
                      required
                      placeholder="e.g. Sahil Khatri"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="framer-input min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-model" className="block text-[13px] font-medium text-[#999999] mb-1.5">
                      Smartphone or Accessory Model
                    </label>
                    <input
                      id="contact-page-model"
                      type="text"
                      required
                      placeholder="e.g. iPhone 15 Pro 256GB or Galaxy S24 Ultra"
                      value={phoneModel}
                      onChange={e => setPhoneModel(e.target.value)}
                      className="framer-input min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-purpose" className="block text-[13px] font-medium text-[#999999] mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      id="contact-page-purpose"
                      value={inquiryType}
                      onChange={e => setInquiryType(e.target.value)}
                      className="framer-input cursor-pointer min-h-[44px]"
                    >
                      <option value="New Sealed Pack Smartphone">New Sealed Pack Smartphone</option>
                      <option value="Easy EMI (Bajaj, IDFC, HDB, Poonawalla, DMI)">
                        Easy EMI (Bajaj, IDFC, HDB, Poonawalla, DMI)
                      </option>
                      <option value="Old Phone Exchange Valuation">Old Phone Exchange Valuation</option>
                      <option value="Open Box / Smartwatches & Audio">Open Box / Smartwatches &amp; Audio</option>
                      <option value="Customer Support & Warranty Query">Customer Support &amp; Warranty Query</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-page-notes" className="block text-[13px] font-medium text-[#999999] mb-1.5">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      id="contact-page-notes"
                      rows={3}
                      placeholder="Preferred color, RAM/storage variant, or old phone model for exchange..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="framer-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full !py-3.5 text-[14px] min-h-[44px] justify-center mt-2"
                  >
                    Send via WhatsApp →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
