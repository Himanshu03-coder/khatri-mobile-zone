import React, { useState } from 'react'

export interface GalleryImage {
  id: string | number
  imageUrl: string
  caption?: string
  category?: string
}

interface GalleryProps {
  images?: GalleryImage[]
}

const GALLERY_CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: 'Storefront', value: 'STOREFRONT' },
  { label: 'Interior', value: 'INTERIOR' },
  { label: 'Happy Customers', value: 'HAPPY_CUSTOMERS' },
  { label: 'Offers', value: 'OFFERS' },
]

export const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category?.toUpperCase() === activeCategory.toUpperCase())

  if (images.length === 0) return null

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 sm:py-24 bg-[#090909] border-b border-[#1a1a1a]"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#999999] uppercase tracking-wider mb-2">
              Visual Preview
            </div>
            <h2
              id="gallery-heading"
              className="text-[28px] sm:text-[44px] font-medium tracking-[-1.5px] sm:tracking-[-2px] leading-[1.05] text-white"
            >
              Inside Khatri Mobile Zone, Fatehabad.
            </h2>
          </div>

          {/* Category Tabs (Horizontally swipable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`tab-pill text-[12px] sm:text-[13px] !py-1.5 !px-3 flex-shrink-0 ${
                  activeCategory === cat.value ? 'tab-pill-selected' : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {filteredImages.map(img => (
              <figure
                key={img.id}
                onClick={() => setLightboxImage(img)}
                className="break-inside-avoid mb-3 sm:mb-4 group relative overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#141414] border border-[#262626] cursor-zoom-in transition-transform duration-200 hover:-translate-y-1"
              >
                <img
                  src={img.imageUrl}
                  alt={
                    img.caption
                      ? `${img.caption} — Khatri Mobile Zone Palika Bazar Fatehabad`
                      : 'Khatri Mobile Zone Palika Bazar Fatehabad mobile store display'
                  }
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <figcaption className="p-2.5 sm:p-3 bg-[#141414] border-t border-[#1a1a1a]">
                    <p className="text-[12px] sm:text-[13px] text-[#999999] tracking-tight line-clamp-1">
                      {img.caption}
                    </p>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#999999] text-[14px]">
            No photographs available under this category.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] bg-[#090909]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#141414] border border-[#262626] text-white flex items-center justify-center hover:bg-[#1c1c1c] transition-colors"
          >
            ✕
          </button>
          <div
            className="max-w-4xl max-h-[85vh] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#141414] border border-[#262626]"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.caption || 'Khatri Mobile Zone Palika Bazar Fatehabad'}
              className="w-full max-h-[75vh] object-contain"
            />
            {lightboxImage.caption && (
              <div className="p-3 sm:p-4 bg-[#141414] text-center text-[13px] sm:text-[14px] text-[#999999] border-t border-[#1a1a1a]">
                {lightboxImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
