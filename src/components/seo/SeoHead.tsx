import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export interface SeoStoreInfo {
  storeName?: string
  address?: string
  phone?: string
  whatsappNumber?: string
  email?: string
  openingHours?: string
  instagramUrl?: string
  facebookUrl?: string
  youtubeUrl?: string
  mapsLink?: string
}

export interface SeoProductItem {
  id: string | number
  name: string
  brand: string
  price: number
  originalPrice?: number
  ram?: string
  storage?: string
  condition?: string
  imageUrl?: string
  inStock?: boolean
}

export interface SeoPageMeta {
  title: string
  description: string
  path: string
  schemaType?: 'AboutPage' | 'ContactPage' | 'WebPage'
  breadcrumbLabel?: string
  keywords?: string
}

interface SeoHeadProps {
  mode?: 'home' | 'page' | 'admin'
  pageMeta?: SeoPageMeta
  storeSettings?: SeoStoreInfo
  products?: SeoProductItem[]
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attrName, attrValue)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function SeoHead({ mode = 'home', pageMeta, storeSettings, products = [] }: SeoHeadProps) {
  const { t, language } = useLanguage()

  useEffect(() => {
    const origin = window.location.origin
    const storeName = storeSettings?.storeName || 'Khatri Mobile Zone'
    const phone = storeSettings?.phone || '+91 9416749202'
    const email = storeSettings?.email || 'vinodkmr289@gmail.com'
    const address = storeSettings?.address || 'Store No. 12, Palika Bazar, Fatehabad, Haryana 125050'

    if (mode === 'admin') {
      document.title = `Admin Portal | ${storeName}`
      upsertMeta('name', 'robots', 'noindex, nofollow')
      upsertMeta(
        'name',
        'description',
        `Inventory, gallery, and store configuration portal for ${storeName}.`
      )
      upsertLink('canonical', `${origin}/admin`)
      return
    }

    const defaultTitle = `${storeName} Fatehabad — Smartphones, EMI & Exchange`
    const defaultDescription =
      'Buy genuine GST-billed Apple iPhone, Samsung Galaxy, OnePlus, Vivo & Xiaomi phones at Khatri Mobile Zone, Palika Bazar, Fatehabad. Easy EMI & instant exchange.'
    const defaultKeywords =
      'Khatri Mobile Zone, Khatri Mobile Zone Fatehabad, mobile store in Fatehabad, smartphone store Palika Bazar Fatehabad, Apple iPhone Fatehabad, Samsung Galaxy Fatehabad, OnePlus Fatehabad, Vivo Xiaomi smartphones Haryana, mobile EMI Fatehabad, Bajaj Finserv mobile EMI Fatehabad, IDFC FIRST Bank phone loan, HDB Financial Services EMI, Poonawalla Fincorp mobile finance, DMI Finance EMI, old phone exchange Fatehabad, genuine GST bill mobile phone'

    const isSubpage = mode === 'page' && pageMeta
    const title = isSubpage ? pageMeta.title : defaultTitle
    const description = isSubpage ? pageMeta.description : defaultDescription
    const canonicalUrl = isSubpage ? `${origin}${pageMeta.path}` : `${origin}/`
    const keywords = isSubpage && pageMeta.keywords ? pageMeta.keywords : defaultKeywords

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
    upsertMeta('name', 'keywords', keywords)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', storeName)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', `${origin}/og-image.png`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', `${origin}/og-image.png`)
    upsertLink('canonical', canonicalUrl)

    const sameAsLinks = [
      storeSettings?.instagramUrl,
      storeSettings?.facebookUrl,
      storeSettings?.youtubeUrl,
    ].filter((u): u is string => Boolean(u && u.startsWith('http')))

    const localBusinessNode: Record<string, unknown> = {
      '@type': ['MobilePhoneStore', 'LocalBusiness'],
      '@id': `${origin}/#store`,
      name: storeName,
      url: origin,
      image: `${origin}/og-image.png`,
      description: defaultDescription,
      foundingDate: '2015',
      priceRange: 'INR 9,999 - 1,60,000',
      currenciesAccepted: 'INR',
      paymentAccepted:
        'Cash, UPI, Credit Card, Debit Card, Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, DMI Finance',
      telephone: phone,
      email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: 'Fatehabad',
        addressRegion: 'Haryana',
        postalCode: '125050',
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '21:00',
        },
      ],
      areaServed: ['Fatehabad', 'Tohana', 'Ratia', 'Bhattu Kalan', 'Sirsa', 'Hisar'],
      hasMap:
        storeSettings?.mapsLink || 'https://maps.google.com/?q=Palika+Bazar+Fatehabad+Haryana',
      sameAs: sameAsLinks,
    }

    const websiteNode: Record<string, unknown> = {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: `${storeName} Fatehabad`,
      publisher: { '@id': `${origin}/#store` },
      inLanguage: ['en-IN', 'hi-IN', 'pa-IN', 'ur-IN'],
    }

    const graph: Record<string, unknown>[] = [localBusinessNode, websiteNode]

    if (isSubpage) {
      graph.push({
        '@type': pageMeta.schemaType || 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { '@id': `${origin}/#website` },
        about: { '@id': `${origin}/#store` },
      })

      if (pageMeta.breadcrumbLabel) {
        graph.push({
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${origin}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageMeta.breadcrumbLabel,
              item: canonicalUrl,
            },
          ],
        })
      }
    } else {
      const faqEntities = [
        {
          q: t('faq.q1', 'Which smartphone brands are available at Khatri Mobile Zone in Fatehabad?'),
          a: t(
            'faq.a1',
            'We stock 100% genuine Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme, and Nothing smartphones, along with certified smartwatches and audio gear at Palika Bazar, Fatehabad.'
          ),
        },
        {
          q: t('faq.q2', 'Which EMI and financing partners are accepted at the store?'),
          a: t(
            'faq.a2',
            'You can get fast in-store EMI approval through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance using just your Aadhaar card and bank details.'
          ),
        },
        {
          q: t('faq.q3', 'Can I exchange my old phone for a new flagship smartphone?'),
          a: t(
            'faq.a3',
            'Yes. Bring your working old smartphone for a transparent hardware check at our Palika Bazar store, and we deduct the trade-in value immediately from your new phone price.'
          ),
        },
        {
          q: t('faq.q4', 'Do smartphones include an official GST bill and brand warranty?'),
          a: t(
            'faq.a4',
            'Every brand-new sealed handset includes an official GST invoice and pan-India manufacturer warranty. Select Open Box devices also pass a full multi-point hardware check.'
          ),
        },
        {
          q: t('faq.q5', 'Where is Khatri Mobile Zone located and how can I check live stock?'),
          a: t(
            'faq.a5',
            'Visit us at Palika Bazar, Fatehabad, Haryana 125050 (Mon–Sat, 10:00 AM to 9:00 PM) or tap WhatsApp Deal on any listed model for real-time price and color confirmation.'
          ),
        },
      ]

      graph.push({
        '@type': 'FAQPage',
        '@id': `${origin}/#faq`,
        mainEntity: faqEntities.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      })

      const seenNames = new Set<string>()
      const topProducts = products
        .filter(p => {
          const key = `${p.brand}-${p.name}`.toLowerCase()
          if (seenNames.has(key) || !p.price || p.price <= 0) return false
          seenNames.add(key)
          return true
        })
        .slice(0, 15)

      if (topProducts.length > 0) {
        graph.push({
          '@type': 'ItemList',
          '@id': `${origin}/#catalog`,
          name: `${storeName} Live Smartphone Stock in Fatehabad`,
          numberOfItems: topProducts.length,
          itemListElement: topProducts.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Product',
              name: `${p.brand} ${p.name}${p.storage ? ` (${p.storage})` : ''}`,
              brand: { '@type': 'Brand', name: p.brand },
              image: p.imageUrl?.startsWith('http')
                ? p.imageUrl
                : p.imageUrl
                  ? `${origin}${p.imageUrl}`
                  : `${origin}/og-image.png`,
              description: `${p.brand} ${p.name}${p.ram ? `, ${p.ram} RAM` : ''}${p.storage ? `, ${p.storage} Storage` : ''} available at ${storeName}, Palika Bazar, Fatehabad with GST invoice and easy EMI.`,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price: Math.round(p.price),
                availability:
                  p.inStock !== false
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                itemCondition:
                  p.condition === 'NEW_SEAL_PACK' || p.condition === 'Brand New Seal Pack'
                    ? 'https://schema.org/NewCondition'
                    : 'https://schema.org/UsedCondition',
                seller: { '@id': `${origin}/#store` },
              },
            },
          })),
        })
      }
    }

    const ldJson = {
      '@context': 'https://schema.org',
      '@graph': graph,
    }

    let script = document.getElementById('seo-structured-data') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ldJson)
  }, [mode, pageMeta, storeSettings, products, language, t])

  return null
}

export default SeoHead
