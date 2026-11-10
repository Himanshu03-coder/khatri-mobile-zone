const API_BASE = '/api'

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// Store Settings
export const storeApi = {
  get: () => fetchApi<StoreSettings>('/store'),
  update: (data: Partial<StoreSettings>) => fetchApi<StoreSettings>('/store', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  auth: (password: string) => fetchApi<{ success: boolean }>('/admin/auth', {
    method: 'POST',
    body: JSON.stringify({ password }),
  }),
}

// Products
export const productsApi = {
  getAll: (params?: ProductFilters) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }
    return fetchApi<{ products: Product[]; total: number }>(`/products?${searchParams.toString()}`)
  },
  getFeatured: () => fetchApi<Product[]>('/products/featured'),
  getById: (id: string) => fetchApi<Product>(`/products/${id}`),
  create: (formData: FormData) => fetchApi<Product>('/products', {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  }),
  update: (id: string, formData: FormData) => fetchApi<Product>(`/products/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {},
  }),
  updateStock: (id: string, stockStatus: string) => fetchApi<Product>(`/products/${id}/stock`, {
    method: 'PATCH',
    body: JSON.stringify({ stockStatus }),
  }),
  delete: (id: string) => fetchApi<{ success: boolean }>(`/products/${id}`, {
    method: 'DELETE',
  }),
  bulkDelete: (ids: string[]) => fetchApi<{ success: boolean; count: number }>('/products/bulk-delete', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  }),
  getFilterOptions: () => fetchApi<FilterOptions>('/products/filters/options'),
}

// Gallery
export const galleryApi = {
  getAll: () => fetchApi<GalleryImage[]>('/gallery'),
  create: (formData: FormData) => fetchApi<GalleryImage>('/gallery', {
    method: 'POST',
    body: formData,
    headers: {},
  }),
  update: (id: string, formData: FormData) => fetchApi<GalleryImage>(`/gallery/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {},
  }),
  reorder: (images: { id: string; order: number }[]) => fetchApi<{ success: boolean }>('/gallery/reorder', {
    method: 'PATCH',
    body: JSON.stringify({ images }),
  }),
  delete: (id: string) => fetchApi<{ success: boolean }>(`/gallery/${id}`, {
    method: 'DELETE',
  }),
  bulkDelete: (ids: string[]) => fetchApi<{ success: boolean; count: number }>('/gallery/bulk-delete', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  }),
}

// WhatsApp
export const whatsappApi = {
  getLink: (productId: string) => fetchApi<{ url: string; message: string }>(`/whatsapp-link/${productId}`),
}

// Types
export interface StoreSettings {
  id: string
  shopName: string
  tagline: string
  aboutDescription: string | null
  marqueeText: string
  address: string
  mapsLink: string
  phonePrimary: string
  phoneSecondary: string | null
  whatsappNumber: string
  email: string
  openingHours: string
  weeklyOff: string
  instagramUrl: string
  facebookUrl: string
  youtubeUrl: string
  whatsappChannelUrl: string
  adminPassword: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  brand: string
  type: string
  condition: string
  ram: string | null
  storage: string | null
  colors: string
  highlight: string | null
  originalPrice: number
  offerPrice: number
  discountTag: string | null
  stockStatus: string
  featured: boolean | number
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface GalleryImage {
  id: string
  url: string
  caption: string | null
  category: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  brands: string[]
  types: string[]
  rams: string[]
  storages: string[]
  conditions: string[]
}

export interface ProductFilters {
  search?: string
  type?: string
  brand?: string
  ram?: string
  storage?: string
  condition?: string
  stockStatus?: string
  featured?: boolean
  minPrice?: number
  maxPrice?: number
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'discount'
  page?: number
  limit?: number
}