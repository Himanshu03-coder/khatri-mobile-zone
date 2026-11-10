import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import GlobalNav from '@/components/sections/GlobalNav'
import Marquee from '@/components/sections/Marquee'
import Hero from '@/components/sections/Hero'
import FeaturedDeals from '@/components/sections/FeaturedDeals'
import LiveStockCatalog from '@/components/sections/LiveStockCatalog'
import FinancingPartners from '@/components/sections/FinancingPartners'
import BentoGrid from '@/components/sections/BentoGrid'
import Gallery from '@/components/sections/Gallery'
import FAQSection from '@/components/sections/FAQSection'
import Contact from '@/components/sections/Contact'
import NavDock from '@/components/sections/NavDock'
import Footer from '@/components/sections/Footer'
import SeoHead from '@/components/seo/SeoHead'
import BrandLogo from '@/components/ui/BrandLogo'
import { productsApi, storeApi, galleryApi } from '@/api/client'
import { useAppStore } from '@/store/appStore'
import { sanitizeStoreCopy } from '@/utils/helpers'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const {
    storeSettings,
    products,
    featuredProducts,
    galleryImages,
    setStoreSettings,
    setProducts,
    setFeaturedProducts,
    setGalleryImages,
    setFilterOptions,
    setLoading,
    setError,
  } = useAppStore()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [storeRes, productsRes, featuredRes, galleryRes, filtersRes] = await Promise.all([
        storeApi.get(),
        productsApi.getAll({ limit: 50 }),
        productsApi.getFeatured(),
        galleryApi.getAll(),
        productsApi.getFilterOptions(),
      ])

      setStoreSettings(storeRes)
      setProducts(productsRes.products)
      setFeaturedProducts(featuredRes)
      setGalleryImages(galleryRes)
      setFilterOptions(filtersRes)
    } catch (error) {
      console.error('Failed to load store data', error)
      setError('Failed to load store data')
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }, [setStoreSettings, setProducts, setFeaturedProducts, setGalleryImages, setFilterOptions, setLoading, setError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Smoothly scroll to section hash when arriving from subpages (e.g. /#stock)
  useEffect(() => {
    if (!isLoading && location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 60)
      }
    }
  }, [isLoading, location.hash])

  // Build a consistent storeSettings object for components
  const store = {
    storeName: sanitizeStoreCopy(storeSettings?.shopName) || 'Khatri Mobile Zone',
    whatsappNumber: storeSettings?.whatsappNumber ?? '919416749202',
    address: storeSettings?.address ? sanitizeStoreCopy(storeSettings.address) : undefined,
    phone: storeSettings?.phonePrimary ?? storeSettings?.whatsappNumber,
    email: storeSettings?.email,
    openingHours: storeSettings?.openingHours,
    heroTagline:
      sanitizeStoreCopy(storeSettings?.tagline) || 'Flagship phones at honest prices.',
    marqueeText: storeSettings?.marqueeText ? sanitizeStoreCopy(storeSettings.marqueeText) : undefined,
    mapsLink: storeSettings?.mapsLink,
    instagramUrl: storeSettings?.instagramUrl,
    facebookUrl: storeSettings?.facebookUrl,
    youtubeUrl: storeSettings?.youtubeUrl,
  }

  // Adapt store Product type → component Product type (DB stores amounts in paise)
  const adaptProducts = (ps: typeof products) => ps.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: Math.round(((p as any).offerPrice ?? (p as any).price ?? 0) / 100),
    originalPrice: (p as any).originalPrice
      ? Math.round((p as any).originalPrice / 100)
      : undefined,
    ram: p.ram ?? undefined,
    storage: p.storage ?? undefined,
    condition: p.condition,
    color: p.colors,
    imageUrl: p.imageUrl ?? undefined,
    inStock: String((p as any).stockStatus || '').toUpperCase() !== 'OUT_OF_STOCK',
    stockCount: String((p as any).stockStatus || '').toUpperCase() === 'LIMITED_STOCK' ? 1 : 5,
    featured: Boolean(p.featured),
  }))

  // Adapt GalleryImage type
  const adaptGallery = (imgs: typeof galleryImages) => imgs.map(img => ({
    id: img.id,
    imageUrl: (img as any).url ?? (img as any).imageUrl ?? '',
    caption: img.caption ?? undefined,
    category: img.category,
  }))

  const adaptedAllProducts = adaptProducts(products)
  const adaptedFeaturedProducts = adaptProducts(featuredProducts)

  // Loading screen — Framer dark canvas #090909
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090909]">
        <div className="flex flex-col items-center gap-4">
          <BrandLogo className="w-12 h-12 animate-pulse" />
          <p className="text-[13px] font-medium text-[#999999] tracking-tight">
            Loading Khatri Mobile Zone…
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoHead mode="home" storeSettings={store} products={adaptedAllProducts} />
      <div className="min-h-screen bg-[#090909] text-white antialiased selection:bg-[#0099ff]/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        {/* Sticky top nav (56px) */}
        <GlobalNav storeSettings={store} />

        {/* Announcement marquee */}
        <div className="mt-[56px]">
          <Marquee text={store.marqueeText} />
        </div>

        <main id="main-content">
          {/* Hero */}
          <Hero storeSettings={store} />

          {/* Featured deals carousel */}
          <FeaturedDeals products={adaptedFeaturedProducts} storeSettings={store} />

          {/* Live stock catalog — full mobile-responsive grid */}
          <LiveStockCatalog products={adaptedAllProducts} storeSettings={store} />

          {/* Financing Partners: Bajaj, IDFC, HDB, Poonawalla, DMI */}
          <FinancingPartners whatsappNumber={store.whatsappNumber} />

          {/* Benefits & Value Proposition */}
          <BentoGrid />

          {/* Gallery */}
          <Gallery images={adaptGallery(galleryImages)} />

          {/* Buyer FAQ (matched to FAQPage JSON-LD schema) */}
          <FAQSection />

          {/* Contact + Enquiry Form */}
          <Contact storeSettings={store} />
        </main>

        {/* Footer */}
        <Footer storeSettings={store} />

        {/* Floating bottom dock for mobile thumb access */}
        <NavDock storeSettings={store} />
      </div>
    </>
  )
}
