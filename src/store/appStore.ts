import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreSettings {
  shopName: string;
  tagline: string;
  aboutDescription: string | null;
  marqueeText: string;
  address: string;
  mapsLink: string;
  phonePrimary: string;
  phoneSecondary: string | null;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  weeklyOff: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappChannelUrl: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  condition: string;
  ram: string | null;
  storage: string | null;
  colors: string;
  highlight: string | null;
  originalPrice: number;
  offerPrice: number;
  discountTag: string | null;
  stockStatus: string;
  featured: boolean | number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  storeSettings: StoreSettings | null;
  products: Product[];
  featuredProducts: Product[];
  galleryImages: GalleryImage[];
  filterOptions: {
    brands: string[];
    types: string[];
    rams: string[];
    storages: string[];
    conditions: string[];
  };
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setStoreSettings: (settings: StoreSettings) => void;
  setProducts: (products: Product[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setGalleryImages: (images: GalleryImage[]) => void;
  setFilterOptions: (options: AppState['filterOptions']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Gallery actions
  addGalleryImage: (image: GalleryImage) => void;
  updateGalleryImage: (id: string, data: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGalleryImages: (images: GalleryImage[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      storeSettings: null,
      products: [],
      featuredProducts: [],
      galleryImages: [],
      filterOptions: {
        brands: [],
        types: [],
        rams: [],
        storages: [],
        conditions: [],
      },
      isLoading: false,
      error: null,
      
      setStoreSettings: (settings) => set({ storeSettings: settings }),
      setProducts: (products) => set({ products }),
      setFeaturedProducts: (products) => set({ featuredProducts: products }),
      setGalleryImages: (images) => set({ galleryImages: images }),
      setFilterOptions: (options) => set({ filterOptions: options }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      addProduct: (product) => set((state) => ({ 
        products: [product, ...state.products] 
      })),
      updateProduct: (id, data) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...data } : p),
        featuredProducts: state.featuredProducts.map(p => p.id === id ? { ...p, ...data } : p),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id),
        featuredProducts: state.featuredProducts.filter(p => p.id !== id),
      })),
      
      addGalleryImage: (image) => set((state) => ({ 
        galleryImages: [...state.galleryImages, image].sort((a, b) => a.order - b.order) 
      })),
      updateGalleryImage: (id, data) => set((state) => ({
        galleryImages: state.galleryImages.map(img => img.id === id ? { ...img, ...data } : img).sort((a, b) => a.order - b.order),
      })),
      deleteGalleryImage: (id) => set((state) => ({
        galleryImages: state.galleryImages.filter(img => img.id !== id),
      })),
      reorderGalleryImages: (images) => set({ galleryImages: images }),
    }),
    {
      name: 'khatri-mobile-zone-store',
      partialize: (state) => ({
        storeSettings: state.storeSettings,
      }),
    }
  )
);