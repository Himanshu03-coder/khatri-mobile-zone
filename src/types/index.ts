import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface Product {
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
  featured: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  id: string;
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
  adminPassword: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  brands: string[];
  types: string[];
  rams: string[];
  storages: string[];
  conditions: string[];
}

export interface ProductFilters {
  search?: string;
  type?: string;
  brand?: string;
  ram?: string;
  storage?: string;
  condition?: string;
  stockStatus?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'discount';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  error?: string;
}