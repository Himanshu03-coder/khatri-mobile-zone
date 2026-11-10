import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const FAQSection: React.FC = () => {
  const { t } = useLanguage()
  const [openId, setOpenId] = useState<string | null>('q1')

  const faqs: FAQItem[] = [
    {
      id: 'q1',
      question: t(
        'faq.q1',
        'Which smartphone brands are available at Khatri Mobile Zone in Fatehabad?'
      ),
      answer: t(
        'faq.a1',
        'We stock 100% genuine Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme, and Nothing smartphones, along with certified smartwatches and audio gear at Palika Bazar, Fatehabad.'
      ),
    },
    {
      id: 'q2',
      question: t('faq.q2', 'Which EMI and financing partners are accepted at the store?'),
      answer: t(
        'faq.a2',
        'You can get fast in-store EMI approval through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance using just your Aadhaar card and bank details.'
      ),
    },
    {
      id: 'q3',
      question: t('faq.q3', 'Can I exchange my old phone for a new flagship smartphone?'),
      answer: t(
        'faq.a3',
        'Yes. Bring your working old smartphone for a transparent hardware check at our Palika Bazar store, and we deduct the trade-in value immediately from your new phone price.'
      ),
    },
    {
      id: 'q4',
      question: t('faq.q4', 'Do smartphones include an official GST bill and brand warranty?'),
      answer: t(
        'faq.a4',
        'Every brand-new sealed handset includes an official GST invoice and pan-India manufacturer warranty. Select Open Box devices also pass a full multi-point hardware check.'
      ),
    },
    {
      id: 'q5',
      question: t('faq.q5', 'Where is Khatri Mobile Zone located and how can I check live stock?'),
      answer: t(
        'faq.a5',
        'Visit us at Palika Bazar, Fatehabad, Haryana 125050 (Mon–Sat, 10:00 AM to 9:00 PM) or tap WhatsApp Deal on any listed model for real-time price and color confirmation.'
      ),
    },
  ]

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site max-w-4xl">
        <div className="mb-10 sm:mb-12">
          <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
            {t('faq.eyebrow', 'Buyer Guide & FAQ')}
          </div>
          <h2
            id="faq-heading"
            className="text-[28px] sm:text-[44px] font-medium tracking-[-1.5px] sm:tracking-[-2px] leading-[1.05] text-white mb-3"
          >
            {t('faq.title', 'Frequently Asked Questions.')}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#999999] leading-[1.45] tracking-tight max-w-2xl">
            {t(
              'faq.desc',
              'Everything you need to know about buying smartphones, instant EMI partners, and phone exchange at Khatri Mobile Zone in Fatehabad.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(item => {
            const isOpen = openId === item.id
            const panelId = `faq-panel-${item.id}`
            return (
              <article
                key={item.id}
                className="bg-[#141414] border border-[#262626] rounded-[16px] overflow-hidden transition-colors hover:border-[#383838]"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left min-h-[52px] cursor-pointer"
                  >
                    <span className="text-[15px] sm:text-[17px] font-medium tracking-tight text-white leading-snug">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 rounded-full bg-[#1c1c1c] border border-[#262626] flex items-center justify-center text-[#999999] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-45 text-white' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-[14px] sm:text-[15px] text-[#999999] leading-[1.55] tracking-tight border-t border-[#1e1e1e]"
                  >
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
