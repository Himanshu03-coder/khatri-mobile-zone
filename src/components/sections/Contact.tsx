import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface StoreSettings {
  storeName?: string
  address?: string
  phone?: string
  whatsappNumber?: string
  email?: string
  openingHours?: string
  mapsLink?: string
}

interface ContactProps {
  storeSettings?: StoreSettings
}

export const Contact: React.FC<ContactProps> = ({ storeSettings }) => {
  const { t } = useLanguage()
  const rawWhatsapp = storeSettings?.whatsappNumber ?? '919416749202'
  const whatsapp = rawWhatsapp.replace(/[^0-9]/g, '') || '919416749202'
  const rawPhone = storeSettings?.phone ?? rawWhatsapp
  const telHref = `tel:+${rawPhone.replace(/[^0-9]/g, '')}`
  const displayPhone = rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`
  const [customerName, setCustomerName] = useState('')
  const [phoneModel, setPhoneModel] = useState('')
  const [inquiryType, setInquiryType] = useState('New Smartphone Purchase')

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hello Khatri Mobile Zone!\n\nName: ${customerName}\nDevice: ${phoneModel || 'General Inquiry'}\nInquiry: ${inquiryType}\n\nPlease share price, stock availability & EMI schemes.`
    )
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank')
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Location Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
                {t('contact.eyebrow', 'Visit Our Center')}
              </div>
              <h2
                id="contact-heading"
                className="text-[28px] sm:text-[46px] font-medium tracking-[-1.5px] sm:tracking-[-2px] leading-[1.05] text-white mb-4 sm:mb-6"
              >
                {t('contact.title', 'Experience Phones In Person.')}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#999999] leading-[1.4] tracking-tight max-w-md mb-8 sm:mb-10">
                {t(
                  'contact.desc',
                  'Hold the device, test camera sensors, and get friendly advice. Walk-ins always welcome.'
                )}
              </p>

              {/* Location metadata cards */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-[15px] bg-[#141414] border border-[#262626]">
                  <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1">
                    {t('contact.location_title', 'Store Address')}
                  </div>
                  <address className="not-italic text-[14px] sm:text-[15px] text-white font-medium mb-1">
                    {storeSettings?.address || 'Palika Bazar, Fatehabad, Haryana 125050'}
                  </address>
                  <a
                    href={storeSettings?.mapsLink || 'https://maps.google.com/?q=Palika+Bazar+Fatehabad+Haryana'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-blue text-[13px] inline-flex items-center gap-1"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 rounded-[15px] bg-[#141414] border border-[#262626]">
                    <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1">
                      {t('contact.hours_title', 'Opening Hours')}
                    </div>
                    <div className="text-[14px] text-white font-medium">
                      {storeSettings?.openingHours || t('contact.hours_val', '10:00 AM – 9:00 PM (All 7 Days)')}
                    </div>
                  </div>

                  <div className="p-4 rounded-[15px] bg-[#141414] border border-[#262626]">
                    <div className="text-[11px] sm:text-[12px] font-medium text-[#999999] uppercase tracking-wider mb-1">
                      {t('contact.helpline_title', 'Direct Contact')}
                    </div>
                    <a href={telHref} className="text-[14px] text-white font-medium hover:text-[#0099ff] block">
                      {displayPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="framer-card p-6 sm:p-8">
            <h3 className="text-[20px] sm:text-[22px] font-medium tracking-tight text-white mb-2">
              {t('contact.form_title', 'Fast WhatsApp Consultation')}
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[#999999] leading-tight mb-6">
              {t('contact.form_desc', 'Fill your details and our team will reply immediately with exact pricing.')}
            </p>

            <form onSubmit={handleConsultation} className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[13px] font-medium text-[#999999] mb-1.5 tracking-tight">
                  {t('contact.form_name', 'Your Name')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Sahil Khatri"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="framer-input min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="contact-model" className="block text-[13px] font-medium text-[#999999] mb-1.5 tracking-tight">
                  {t('contact.form_phone', 'Desired Device / Model')}
                </label>
                <input
                  id="contact-model"
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro 256GB or Galaxy S24 Ultra"
                  value={phoneModel}
                  onChange={e => setPhoneModel(e.target.value)}
                  className="framer-input min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="contact-purpose" className="block text-[13px] font-medium text-[#999999] mb-1.5 tracking-tight">
                  {t('contact.form_purpose', 'Inquiry Purpose')}
                </label>
                <select
                  id="contact-purpose"
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="framer-input cursor-pointer min-h-[44px]"
                >
                  <option value="New Smartphone Purchase">New Sealed Pack Smartphone</option>
                  <option value="EMI & Financing (Bajaj, IDFC, HDB, Poonawalla, DMI)">
                    Easy EMI / Finance (Bajaj, IDFC, HDB, Poonawalla, DMI)
                  </option>
                  <option value="Old Phone Exchange Trade-In">Old Phone Exchange Trade-In</option>
                  <option value="Accessories & Protection">Screen Guard & Accessories</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary w-full !py-3.5 !text-[14px] min-h-[44px] mt-2 justify-center"
              >
                {t('contact.form_submit', 'Start WhatsApp Chat')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
