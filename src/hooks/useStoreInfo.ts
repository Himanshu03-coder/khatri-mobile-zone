import { useEffect } from 'react'
import { storeApi } from '@/api/client'
import { useAppStore } from '@/store/appStore'
import { sanitizeStoreCopy } from '@/utils/helpers'

export interface NormalizedStoreInfo {
  storeName: string
  tagline: string
  aboutDescription: string
  marqueeText?: string
  address: string
  mapsLink: string
  phone: string
  phoneSecondary: string
  whatsappNumber: string
  email: string
  openingHours: string
  weeklyOff: string
  instagramUrl: string
  facebookUrl: string
  youtubeUrl: string
  whatsappChannelUrl: string
}

const DEFAULT_ABOUT =
  'Established in 2015, Khatri Mobile Zone has been Fatehabad’s trusted store for genuine factory-sealed smartphones, transparent trade-in exchanges, and instant EMI financing from India’s leading lending partners.'

export function useStoreInfo() {
  const { storeSettings, setStoreSettings } = useAppStore()

  useEffect(() => {
    if (!storeSettings) {
      storeApi
        .get()
        .then(res => setStoreSettings(res))
        .catch(() => {
          // Fallback defaults below cover offline/initial renders cleanly
        })
    }
  }, [storeSettings, setStoreSettings])

  const store: NormalizedStoreInfo = {
    storeName: sanitizeStoreCopy(storeSettings?.shopName) || 'Khatri Mobile Zone',
    tagline: sanitizeStoreCopy(storeSettings?.tagline) || 'Flagship phones at honest prices.',
    aboutDescription: sanitizeStoreCopy(storeSettings?.aboutDescription) || DEFAULT_ABOUT,
    marqueeText: storeSettings?.marqueeText ? sanitizeStoreCopy(storeSettings.marqueeText) : undefined,
    address: sanitizeStoreCopy(storeSettings?.address) || 'Store No. 12, Palika Bazar, Fatehabad, Haryana 125050',
    mapsLink: storeSettings?.mapsLink || 'https://maps.google.com/?q=Palika+Bazar+Fatehabad+Haryana',
    phone: storeSettings?.phonePrimary || '+91 9416749202',
    phoneSecondary: storeSettings?.phoneSecondary || '+91 9588390006',
    whatsappNumber: storeSettings?.whatsappNumber || '919416749202',
    email: storeSettings?.email || 'vinodkmr289@gmail.com',
    openingHours: storeSettings?.openingHours || 'Mon–Sat: 10:00 AM – 9:00 PM | Sun: Closed',
    weeklyOff: storeSettings?.weeklyOff || 'Sunday',
    instagramUrl: storeSettings?.instagramUrl || 'https://instagram.com/khatrimobilezone',
    facebookUrl: storeSettings?.facebookUrl || 'https://facebook.com/khatrimobilezone',
    youtubeUrl: storeSettings?.youtubeUrl || 'https://youtube.com/@khatrimobilezone',
    whatsappChannelUrl: storeSettings?.whatsappChannelUrl || '',
  }

  return { store, hasLoaded: Boolean(storeSettings) }
}
