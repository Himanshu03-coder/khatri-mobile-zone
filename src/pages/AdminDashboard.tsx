'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, Image, Settings, LogOut, Eye, 
  Plus, Search, Filter, Download, Upload,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Trash2, Edit,
  MoreVertical, Check, X, AlertCircle,
  BarChart, ShoppingBag, Users, DollarSign,
  Share2, MessageCircle,
  ArrowRight, MapPin, Instagram, Facebook, Youtube
} from 'lucide-react'
import { cn } from '@/utils/helpers'
import BrandLogo from '@/components/ui/BrandLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { productsApi } from '@/api/client'
import { galleryApi } from '@/api/client'
import { storeApi } from '@/api/client'
import { formatPrice, getStockStatusLabel, getConditionLabel, getTypeLabel, cn as cnUtil } from '@/utils/helpers'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'gallery' | 'settings'>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  
  // Inventory state
  const [products, setProducts] = useState<any[]>([])
  const [inventoryLoading, setInventoryLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStock, setSelectedStock] = useState('')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [productForm, setProductForm] = useState(initialProductForm())
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [showAddImage, setShowAddImage] = useState(false)
  const [editingImage, setEditingImage] = useState<any | null>(null)
  const [imageForm, setImageForm] = useState(initialImageForm())
  const [imageUpload, setImageUpload] = useState<File | null>(null)
  const [productImageUpload, setProductImageUpload] = useState<File | null>(null)

  // Settings state
  const [storeSettings, setStoreSettings] = useState<any>(null)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)

  // Keep private admin dashboard out of search engine indexes
  useEffect(() => {
    document.title = 'Admin Portal | Khatri Mobile Zone'
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  // Load data on auth
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  const loadAllData = async () => {
    try {
      const [storeRes, productsRes, galleryRes] = await Promise.all([
        storeApi.get(),
        productsApi.getAll({ limit: 100 }),
        galleryApi.getAll(),
      ])
      setStoreSettings(storeRes)
      setProducts(productsRes.products)
      setGalleryImages(galleryRes)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setInventoryLoading(false)
      setGalleryLoading(false)
      setSettingsLoading(false)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    try {
      await storeApi.auth(password)
      setIsAuthenticated(true)
    } catch (error: any) {
      setAuthError(error.message || 'Invalid password')
    }
  }

  // Product form handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    
    // Validation
    const errors: Record<string, string> = {}
    if (!productForm.name.trim()) errors.name = 'Product name is required'
    if (!productForm.brand.trim()) errors.brand = 'Brand is required'
    if (!productForm.type) errors.type = 'Type is required'
    if (productForm.originalPrice <= 0) errors.originalPrice = 'Original price must be > 0'
    if (productForm.offerPrice <= 0) errors.offerPrice = 'Offer price must be > 0'
    if (productForm.offerPrice > productForm.originalPrice) errors.offerPrice = 'Offer price cannot exceed original price'
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(productForm).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value))
        }
      })
      if (productImageUpload) {
        formData.append('image', productImageUpload)
      }

      if (editingProduct) {
        await productsApi.update(editingProduct.id, formData)
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p))
        toast.success('Product updated successfully')
      } else {
        const newProduct = await productsApi.create(formData)
        setProducts(prev => [newProduct, ...prev])
        toast.success('Product added successfully')
      }
      setShowAddProduct(false)
      setEditingProduct(null)
      setProductForm(initialProductForm())
      setProductImageUpload(null)
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await productsApi.delete(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success('Product deleted')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product')
    }
  }

  const handleBulkDeleteProducts = async (ids: string[]) => {
    if (!ids.length) return
    if (!confirm(`Are you sure you want to delete ${ids.length} selected products? This action cannot be undone.`)) return
    try {
      await productsApi.bulkDelete(ids)
      setProducts(prev => prev.filter(p => !ids.includes(p.id)))
      toast.success(`${ids.length} products deleted successfully`)
    } catch (error: any) {
      try {
        await Promise.all(ids.map(id => productsApi.delete(id)))
        setProducts(prev => prev.filter(p => !ids.includes(p.id)))
        toast.success(`${ids.length} products deleted successfully`)
      } catch (fallbackError: any) {
        toast.error(error.message || 'Failed to delete selected products')
      }
    }
  }

  const handleBulkDeleteImages = async (ids: string[]) => {
    if (!ids.length) return
    if (!confirm(`Are you sure you want to delete ${ids.length} selected gallery photos?`)) return
    try {
      await galleryApi.bulkDelete(ids)
      setGalleryImages(prev => prev.filter(img => !ids.includes(img.id)))
      toast.success(`${ids.length} images deleted successfully`)
    } catch (error: any) {
      try {
        await Promise.all(ids.map(id => galleryApi.delete(id)))
        setGalleryImages(prev => prev.filter(img => !ids.includes(img.id)))
        toast.success(`${ids.length} images deleted successfully`)
      } catch {
        toast.error('Failed to delete selected images')
      }
    }
  }

  const handleStockToggle = async (product: any) => {
    const statuses = ['IN_STOCK', 'LIMITED_STOCK', 'OUT_OF_STOCK']
    const currentIndex = statuses.indexOf(product.stockStatus)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]
    try {
      await productsApi.updateStock(product.id, nextStatus)
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stockStatus: nextStatus } : p))
      toast.success(`Stock updated to ${getStockStatusLabel(nextStatus)}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update stock')
    }
  }

  // Image form handlers
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(imageForm).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value))
        }
      })
      if (imageUpload) {
        formData.append('image', imageUpload)
      }

      if (editingImage) {
        await galleryApi.update(editingImage.id, formData)
        setGalleryImages(prev => prev.map(img => img.id === editingImage.id ? { ...img, ...imageForm } : img))
        toast.success('Gallery image updated')
      } else {
        const newImage = await galleryApi.create(formData)
        setGalleryImages(prev => [...prev, newImage].sort((a, b) => a.order - b.order))
        toast.success('Gallery image added')
      }
      setShowAddImage(false)
      setEditingImage(null)
      setImageForm(initialImageForm())
      setImageUpload(null)
    } catch (error: any) {
      toast.error(error.message || 'Failed to save image')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Delete this gallery image?')) return
    try {
      await galleryApi.delete(id)
      setGalleryImages(prev => prev.filter(img => img.id !== id))
      toast.success('Image deleted')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete image')
    }
  }

  const handleReorderImages = async () => {
    try {
      await galleryApi.reorder(galleryImages.map((img, index) => ({ id: img.id, order: index })))
      toast.success('Gallery reordered')
    } catch (error: any) {
      toast.error(error.message || 'Failed to reorder')
    }
  }

  // Settings handlers
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingSettings(true)
    try {
      await storeApi.update(storeSettings)
      toast.success('Settings saved successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings')
    } finally {
      setSavingSettings(false)
    }
  }

  // Helpers
  function initialProductForm() {
    return {
      name: '',
      brand: '',
      type: 'SMARTPHONE',
      condition: 'NEW_SEAL_PACK',
      ram: '',
      storage: '',
      colors: '',
      highlight: '',
      originalPrice: 0,
      offerPrice: 0,
      discountTag: '',
      stockStatus: 'IN_STOCK',
      featured: false,
      imageUrl: '',
    }
  }

  function initialImageForm() {
    return {
      caption: '',
      category: 'INTERIOR',
      order: galleryImages.length,
      url: '',
    }
  }

  const editProduct = (product: any) => {
    setEditingProduct(product)
    setProductForm({
      ...product,
      featured: product.featured === 1 || product.featured === true,
      ram: product.ram || '',
      storage: product.storage || '',
      imageUrl: product.imageUrl || '',
    })
    setShowAddProduct(true)
  }

  const editImage = (image: any) => {
    setEditingImage(image)
    setImageForm({
      caption: image.caption || '',
      category: image.category,
      order: image.order,
      url: image.url || '',
    })
    setShowAddImage(true)
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || p.type === selectedType
    const matchesStock = !selectedStock || p.stockStatus === selectedStock
    return matchesSearch && matchesType && matchesStock
  })

  // Auth screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
        <motion.div
          className="glass rounded-2xl p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <BrandLogo className="w-14 h-14 mx-auto" />
            </div>
            <h1 className="font-display text-2xl font-bold gradient-text">Admin Portal</h1>
            <p className="text-slate-400 mt-2">Khatri Mobile Zone</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-400/10 border border-rose-400/20 rounded-lg text-rose-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </div>
            )}
            <Input
              label="Admin Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
            <Button type="submit" className="group">
              <span>Access Dashboard</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
          
          <p className="text-center text-xs text-slate-500 mt-6">
            Default password: <code className="text-slate-400 font-mono">khatri@2024</code>
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Top Bar */}
      <header className="glass border-b border-metallic-border/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo className="w-9 h-9" />
            <div>
              <h1 className="font-display text-xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Khatri Mobile Zone</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
              <Eye className="w-4 h-4 mr-1" />
              View Site
            </a>
            <Button variant="ghost-cyan" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="border-t border-metallic-border/30 px-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-t-xl transition-all whitespace-nowrap',
                  'relative',
                  activeTab === tab.id
                    ? 'text-cyan-400 bg-cyan-400/5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-metallic/50'
                )}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-t-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ background: 'linear-gradient(135deg, #00f5ff, #b44bff)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <DashboardStats 
              products={products} 
              galleryImages={galleryImages} 
              storeSettings={storeSettings}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            />
          )}
          {activeTab === 'inventory' && (
            <InventoryManager
              products={filteredProducts}
             
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
              showAddProduct={showAddProduct}
              setShowAddProduct={setShowAddProduct}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              productForm={productForm}
              setProductForm={setProductForm}
              formErrors={formErrors}
              productImageUpload={productImageUpload}
              setProductImageUpload={setProductImageUpload}
              isSubmitting={isSubmitting}
              handleProductSubmit={handleProductSubmit}
              handleDeleteProduct={handleDeleteProduct}
              handleBulkDeleteProducts={handleBulkDeleteProducts}
              handleStockToggle={handleStockToggle}
              editProduct={editProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            />
          )}
          {activeTab === 'gallery' && (
            <GalleryManager
              images={galleryImages}
             
              showAddImage={showAddImage}
              setShowAddImage={setShowAddImage}
              editingImage={editingImage}
              setEditingImage={setEditingImage}
              imageForm={imageForm}
              setImageForm={setImageForm}
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              isSubmitting={isSubmitting}
              handleImageSubmit={handleImageSubmit}
              handleDeleteImage={handleDeleteImage}
              handleBulkDeleteImages={handleBulkDeleteImages}
              handleReorderImages={handleReorderImages}
              editImage={editImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsManager
              storeSettings={storeSettings}
             
              saving={savingSettings}
              handleSubmit={handleSettingsSubmit}
              setStoreSettings={setStoreSettings}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// Import toast
import { toast } from 'react-hot-toast'

// Dashboard Stats Component
function DashboardStats({ products, galleryImages, storeSettings }: any) {
  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'cyan', change: '+12%' },
    { label: 'Featured Items', value: products.filter((p: any) => p.featured).length, icon: BarChart, color: 'amber', change: '+3' },
    { label: 'Low Stock Alerts', value: products.filter((p: any) => p.stockStatus === 'LIMITED_STOCK').length, icon: AlertCircle, color: 'deal', change: 'âš ï¸' },
    { label: 'Out of Stock', value: products.filter((p: any) => p.stockStatus === 'OUT_OF_STOCK').length, icon: X, color: 'violet', change: '0' },
    { label: 'Gallery Images', value: galleryImages.length, icon: Image, color: 'green', change: '+5' },
    { label: 'Brands', value: [...new Set(products.map((p: any) => p.brand))].length, icon: ShoppingBag, color: 'deal', change: '+2' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-slate-400">Real-time store metrics & quick actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="dark-outline">
            <Download className="w-4 h-4 mr-1" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass rounded-2xl p-6 border border-metallic-border/50 hover:border-cyan-400/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn('p-3 rounded-xl', `bg-${stat.color}-400/10 text-${stat.color}-400`)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-metallic text-slate-400">
                {stat.change}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Add Product', icon: Plus, action: () => {} },
              { label: 'Upload Photo', icon: Upload, action: () => {} },
              { label: 'Update Prices', icon: DollarSign, action: () => {} },
              { label: 'Manage Gallery', icon: Image, action: () => {} },
            ].map((action) => (
              <Button key={action.label} variant="dark-outline" className="flex flex-col items-center gap-1 py-4">
                <action.icon className="w-5 h-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-amber-400" />
            Store Info
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Store Name</span>
              <span className="font-medium">{storeSettings?.shopName || 'Khatri Mobile Zone'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phone</span>
              <span className="font-medium">{storeSettings?.phonePrimary || '+91-9876543210'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">WhatsApp</span>
              <span className="font-medium text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Address</span>
              <span className="font-medium text-right max-w-[200px] truncate">{storeSettings?.address || 'Palika Bazar, Fatehabad'}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Inventory Manager Component
function InventoryManager(props: any) {
  const { products, ...rest } = props
  const types = ['SMARTPHONE', 'TABLET', 'SMARTWATCH', 'AUDIO', 'ACCESSORY', 'WEARABLE']
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = !rest.searchQuery || 
      p.name.toLowerCase().includes(rest.searchQuery.toLowerCase()) || 
      p.brand.toLowerCase().includes(rest.searchQuery.toLowerCase())
    const matchesType = !rest.selectedType || p.type === rest.selectedType
    const matchesStock = !rest.selectedStock || p.stockStatus === rest.selectedStock
    return matchesSearch && matchesType && matchesStock
  })

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p: any) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Inventory Manager</h2>
          <p className="text-slate-400">{products.length} products • {products.filter((p: any) => p.featured).length} featured</p>
        </div>
        <Button onClick={() => rest.setShowAddProduct(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Bulk Delete Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-[#1c1c1c] border border-[#ff5577]/40 rounded-[14px] p-3.5 mb-5 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5577] animate-pulse" />
            <span className="text-sm font-medium text-white">
              {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-[#999999] hover:text-white px-2 py-1"
            >
              Clear Selection
            </button>
            <button
              onClick={async () => {
                await rest.handleBulkDeleteProducts(selectedIds)
                setSelectedIds([])
              }}
              className="btn-primary !bg-[#ff5577] !text-white !py-1.5 !px-3.5 text-xs flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <Card variant="glass" className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Input
            label="Search"
            placeholder="Search products..."
            value={rest.searchQuery}
            onChange={(e) => rest.setSearchQuery(e.target.value)}
           
          />
          <Select
            label="Category"
            options={types.map(t => ({ value: t, label: getTypeLabel(t) }))}
            value={rest.selectedType}
            onChange={(e) => rest.setSelectedType(e.target.value)}
            placeholder="All Categories"
          />
          <Select
            label="Stock Status"
            options={[
              { value: 'IN_STOCK', label: 'In Stock' },
              { value: 'LIMITED_STOCK', label: 'Limited Stock' },
              { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
            ]}
            value={rest.selectedStock}
            onChange={(e) => rest.setSelectedStock(e.target.value)}
            placeholder="All Stock"
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card variant="glass">
        {false ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-slate-100 mb-1">No products found</h3>
            <p className="text-slate-400">Add your first product to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-metallic-border/30 text-left text-sm font-medium text-slate-400">
                  <th className="p-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length} 
                      onChange={handleSelectAll} 
                      className="w-4 h-4 rounded accent-[#0099ff] cursor-pointer" 
                    />
                  </th>
                  <th className="p-4">Product</th>
                  <th className="p-4 hidden md:table-cell">Brand</th>
                  <th className="p-4 hidden lg:table-cell">Type</th>
                  <th className="p-4 hidden lg:table-cell">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className={`border-b border-metallic-border/20 hover:bg-metallic/30 transition-colors ${selectedIds.includes(product.id) ? 'bg-[#1c1c1c]/60' : ''}`}>
                    <td className="p-4 w-12 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(product.id)} 
                        onChange={() => handleSelectOne(product.id)} 
                        className="w-4 h-4 rounded accent-[#0099ff] cursor-pointer" 
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80'} 
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-slate-100">{product.name}</p>
                          <p className="text-xs text-slate-400">{product.ram || ''} {product.storage || ''} â€¢ {getConditionLabel(product.condition)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">{product.brand}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge variant="muted">{getTypeLabel(product.type)}</Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold font-mono gradient-text-cyan">{formatPrice(product.offerPrice)}</span>
                        <span className="text-slate-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={product.stockStatus === 'IN_STOCK' ? 'green' : product.stockStatus === 'LIMITED_STOCK' ? 'amber' : 'deal'} 
                       
                      >
                        {getStockStatusLabel(product.stockStatus)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={product.featured ? 'amber' : 'muted'}>
                        {product.featured ? 'â˜… Featured' : 'Normal'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost-cyan" 
                          
                          onClick={() => rest.handleStockToggle(product)}
                          className="p-2"
                        >
                          <span className="sr-only">Toggle Stock</span>
                          <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: product.stockStatus === 'IN_STOCK' ? 'rgba(0,255,136,0.2)' : product.stockStatus === 'LIMITED_STOCK' ? 'rgba(255,184,0,0.2)' : 'rgba(255,51,102,0.2)' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.stockStatus === 'IN_STOCK' ? '#00ff88' : product.stockStatus === 'LIMITED_STOCK' ? '#ffb800' : '#ff3366' }} />
                          </span>
                        </Button>
                        <Button variant="ghost-cyan" onClick={() => rest.editProduct(product)} className="p-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost-cyan" onClick={() => rest.handleDeleteProduct(product.id)} className="p-2 text-rose-400 hover:bg-rose-400/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={rest.showAddProduct || !!rest.editingProduct}
        onClose={() => {
          rest.setShowAddProduct(false)
          rest.setEditingProduct(null)
          rest.setProductForm(rest.initialProductForm())
          rest.setProductImageUpload(null)
        }}
        title={rest.editingProduct ? 'Edit Product' : 'Add New Product'}
       
      >
        <form onSubmit={rest.handleProductSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input label="Product Name" value={rest.productForm.name} onChange={(e) => rest.setProductForm({...rest.productForm, name: e.target.value})} error={rest.formErrors.name} required />
            <Select label="Brand" options={['Apple', 'Samsung', 'OnePlus', 'Vivo', 'Xiaomi', 'Realme', 'Motorola', 'Other'].map(b => ({ value: b, label: b }))} value={rest.productForm.brand} onChange={(e) => rest.setProductForm({...rest.productForm, brand: e.target.value})} error={rest.formErrors.brand} />
            
            <Select label="Type" options={types.map(t => ({ value: t, label: getTypeLabel(t) }))} value={rest.productForm.type} onChange={(e) => rest.setProductForm({...rest.productForm, type: e.target.value})} />
            <Select label="Condition" options={[
              { value: 'NEW_SEAL_PACK', label: 'Brand New Seal Pack' },
              { value: 'OPEN_BOX', label: 'Open Box' },
              { value: 'PRE_OWNED', label: 'Pre-Owned' },
              { value: 'CERTIFIED_PRE_OWNED', label: 'Certified Pre-Owned' },
            ]} value={rest.productForm.condition} onChange={(e) => rest.setProductForm({...rest.productForm, condition: e.target.value})} />
            
            <Input label="RAM (e.g., 8GB, 12GB)" value={rest.productForm.ram} onChange={(e) => rest.setProductForm({...rest.productForm, ram: e.target.value})} placeholder="8GB" />
            <Input label="Storage (e.g., 128GB, 256GB)" value={rest.productForm.storage} onChange={(e) => rest.setProductForm({...rest.productForm, storage: e.target.value})} placeholder="128GB" />
            
            <Input label="Colors (comma separated)" value={rest.productForm.colors} onChange={(e) => rest.setProductForm({...rest.productForm, colors: e.target.value})} placeholder="Black, Blue, Silver" />
            <Input label="Highlight / Extra Note" value={rest.productForm.highlight} onChange={(e) => rest.setProductForm({...rest.productForm, highlight: e.target.value})} placeholder="Free Adapter, 5G Ready, Battery 100%" />
            
            <Input label="Original Price (â‚¹)" type="number" value={rest.productForm.originalPrice} onChange={(e) => rest.setProductForm({...rest.productForm, originalPrice: parseInt(e.target.value) || 0})} error={rest.formErrors.originalPrice} required />
            <Input label="Offer Price (â‚¹)" type="number" value={rest.productForm.offerPrice} onChange={(e) => rest.setProductForm({...rest.productForm, offerPrice: parseInt(e.target.value) || 0})} error={rest.formErrors.offerPrice} required />
            
            <Input label="Discount Tag" value={rest.productForm.discountTag} onChange={(e) => rest.setProductForm({...rest.productForm, discountTag: e.target.value})} placeholder="â‚¹5,000 OFF, Hot Deal, Exchange Bonus" />
            <Select label="Stock Status" options={[
              { value: 'IN_STOCK', label: 'In Stock' },
              { value: 'LIMITED_STOCK', label: 'Limited Stock' },
              { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
            ]} value={rest.productForm.stockStatus} onChange={(e) => rest.setProductForm({...rest.productForm, stockStatus: e.target.value})} />
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rest.productForm.featured}
                  onChange={(e) => rest.setProductForm({...rest.productForm, featured: e.target.checked})}
                  className="w-4 h-4 rounded border-metallic-border bg-obsidian-light text-cyan-400 focus:ring-cyan-400"
                />
                <span className="text-sm text-slate-300">Feature on Homepage</span>
              </label>
            </div>
            
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Product Image</label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-obsidian-light border border-metallic-border/50 flex-shrink-0">
                  {rest.productImageUpload ? (
                    <img src={URL.createObjectURL(rest.productImageUpload)} alt="Preview" className="w-full h-full object-cover" />
                  ) : rest.productForm.imageUrl ? (
                    <img src={rest.productForm.imageUrl} alt="Current" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="btn-secondary size-sm cursor-pointer">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && rest.setProductImageUpload(e.target.files[0])} className="hidden" />
                  </label>
                  <Input label="Or Image URL" value={rest.productForm.imageUrl} onChange={(e) => rest.setProductForm({...rest.productForm, imageUrl: e.target.value})} placeholder="https://example.com/image.jpg" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-metallic-border/30">
            <Button type="button" variant="dark-outline" onClick={() => {
              rest.setShowAddProduct(false)
              rest.setEditingProduct(null)
              rest.setProductForm(rest.initialProductForm())
              rest.setProductImageUpload(null)
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {rest.editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// Gallery Manager Component
function GalleryManager(props: any) {
  const { images, ...rest } = props
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(images.map((img: any) => img.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Gallery Manager</h2>
          <p className="text-slate-400">{images.length} images</p>
        </div>
        <div className="flex items-center gap-3">
          {images.length > 0 && (
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer px-3 py-1.5 bg-[#141414] border border-[#262626] rounded-lg">
              <input 
                type="checkbox" 
                checked={images.length > 0 && selectedIds.length === images.length} 
                onChange={handleSelectAll} 
                className="w-4 h-4 rounded accent-[#0099ff] cursor-pointer" 
              />
              <span>Select All</span>
            </label>
          )}
          <Button onClick={() => rest.setShowAddImage(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Image
          </Button>
        </div>
      </div>

      {/* Bulk Delete Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-[#1c1c1c] border border-[#ff5577]/40 rounded-[14px] p-3.5 mb-5 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5577] animate-pulse" />
            <span className="text-sm font-medium text-white">
              {selectedIds.length} {selectedIds.length === 1 ? 'image' : 'images'} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-[#999999] hover:text-white px-2 py-1"
            >
              Clear Selection
            </button>
            <button
              onClick={async () => {
                await rest.handleBulkDeleteImages(selectedIds)
                setSelectedIds([])
              }}
              className="btn-primary !bg-[#ff5577] !text-white !py-1.5 !px-3.5 text-xs flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      )}

      {false ? (
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading gallery...</p>
        </div>
      ) : images.length === 0 ? (
        <Card variant="glass" className="p-12 text-center">
          <Image className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-slate-100 mb-1">No gallery images</h3>
          <p className="text-slate-400 mb-6">Upload your first store photo</p>
          <Button onClick={() => rest.setShowAddImage(true)} className="gap-2">
            <Upload className="w-4 h-4" />
            Add Image
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {images.map((image: any, index: number) => (
            <Card key={image.id} variant="glass" className={`p-4 flex items-center gap-4 ${selectedIds.includes(image.id) ? 'border-[#0099ff]/50 bg-[#1c1c1c]/70' : ''}`}>
              <div className="w-6 text-center" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(image.id)} 
                  onChange={() => handleSelectOne(image.id)} 
                  className="w-4 h-4 rounded accent-[#0099ff] cursor-pointer" 
                />
              </div>
              <div className="w-8 flex-shrink-0 text-center text-slate-400 font-mono text-sm">{index + 1}</div>
              <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-obsidian-light flex-shrink-0">
                <img src={image.url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-100 truncate">{image.caption || 'Untitled'}</p>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                  <Badge variant="muted">{image.category}</Badge>
                  <span>Order: {image.order}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost-cyan" onClick={() => rest.handleReorderImages} disabled={index === 0} className="p-2">
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost-cyan" onClick={() => rest.handleReorderImages} disabled={index === images.length - 1} className="p-2">
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost-cyan" onClick={() => rest.editImage(image)} className="p-2">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost-cyan" onClick={() => rest.handleDeleteImage(image.id)} className="p-2 text-rose-400 hover:bg-rose-400/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Image Modal */}
      <Modal
        isOpen={rest.showAddImage || !!rest.editingImage}
        onClose={() => {
          rest.setShowAddImage(false)
          rest.setEditingImage(null)
          rest.setImageForm(rest.initialImageForm())
          rest.setImageUpload(null)
        }}
        title={rest.editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
       
      >
        <form onSubmit={rest.handleImageSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Image Upload</label>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-obsidian-light border border-metallic-border/50 flex-shrink-0">
                {rest.imageUpload ? (
                  <img src={URL.createObjectURL(rest.imageUpload)} alt="Preview" className="w-full h-full object-cover" />
                ) : rest.imageForm.url ? (
                  <img src={rest.imageForm.url} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="btn-secondary size-sm cursor-pointer">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload Image
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && rest.setImageUpload(e.target.files[0])} className="hidden" />
                </label>
                <Input label="Or Image URL" value={rest.imageForm.url} onChange={(e) => rest.setImageForm({...rest.imageForm, url: e.target.value})} placeholder="https://example.com/image.jpg" />
              </div>
            </div>
          </div>
          
          <Input label="Caption" value={rest.imageForm.caption} onChange={(e) => rest.setImageForm({...rest.imageForm, caption: e.target.value})} placeholder="Khatri Mobile Zone Storefront" />
          
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" options={[
              { value: 'STOREFRONT', label: 'Storefront' },
              { value: 'INTERIOR', label: 'Interior' },
              { value: 'HAPPY_CUSTOMERS', label: 'Happy Customers' },
              { value: 'OFFERS', label: 'Offers & Events' },
            ]} value={rest.imageForm.category} onChange={(e) => rest.setImageForm({...rest.imageForm, category: e.target.value})} />
            <Input label="Display Order" type="number" value={rest.imageForm.order} onChange={(e) => rest.setImageForm({...rest.imageForm, order: parseInt(e.target.value) || 0})} />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-metallic-border/30">
            <Button type="button" variant="dark-outline" onClick={() => {
              rest.setShowAddImage(false)
              rest.setEditingImage(null)
              rest.setImageForm(rest.initialImageForm())
              rest.setImageUpload(null)
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {rest.editingImage ? 'Update Image' : 'Add Image'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// Settings Manager Component
function SettingsManager(props: any) {
  const { storeSettings, saving, handleSubmit, setStoreSettings } = props

  if (false || !storeSettings) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Loading settings...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Store Settings</h2>
          <p className="text-slate-400">Manage store information, contact details & social links</p>
        </div>
      </div>

      {/* Basic Info */}
      <Card variant="glass" className="p-6">
        <h3 className="font-semibold text-slate-100 mb-5 flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Store Name" value={storeSettings.shopName} onChange={(e) => setStoreSettings({...storeSettings, shopName: e.target.value})} />
          <Input label="Tagline" value={storeSettings.tagline} onChange={(e) => setStoreSettings({...storeSettings, tagline: e.target.value})} />
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">About Description</label>
            <textarea
              value={storeSettings.aboutDescription || ''}
              onChange={(e) => setStoreSettings({...storeSettings, aboutDescription: e.target.value})}
              className="w-full bg-obsidian-light border border-metallic-border rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 min-h-[100px] resize-none"
              placeholder="Tell customers about your store..."
            />
          </div>
          <Input label="Marquee Text (Top Announcement Bar)" value={storeSettings.marqueeText} onChange={(e) => setStoreSettings({...storeSettings, marqueeText: e.target.value})} />
        </div>
      </Card>

      {/* Contact Info */}
      <Card variant="glass" className="p-6">
        <h3 className="font-semibold text-slate-100 mb-5 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          Contact & Location
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Address" value={storeSettings.address} onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})} />
          <Input label="Google Maps Link" value={storeSettings.mapsLink} onChange={(e) => setStoreSettings({...storeSettings, mapsLink: e.target.value})} placeholder="https://maps.app.goo.gl/..." />
          <Input label="Primary Phone" value={storeSettings.phonePrimary} onChange={(e) => setStoreSettings({...storeSettings, phonePrimary: e.target.value})} placeholder="+91-9876543210" />
          <Input label="Secondary Phone" value={storeSettings.phoneSecondary || ''} onChange={(e) => setStoreSettings({...storeSettings, phoneSecondary: e.target.value})} placeholder="+91-9876543211" />
          <Input label="WhatsApp Number (with country code)" value={storeSettings.whatsappNumber} onChange={(e) => setStoreSettings({...storeSettings, whatsappNumber: e.target.value})} placeholder="919876543210" />
          <Input label="Email" type="email" value={storeSettings.email} onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})} placeholder="store@email.com" />
          <Input label="Opening Hours" value={storeSettings.openingHours} onChange={(e) => setStoreSettings({...storeSettings, openingHours: e.target.value})} placeholder="Mon-Sat: 10:00 AM - 9:00 PM | Sun: Closed" />
          <Input label="Weekly Off" value={storeSettings.weeklyOff} onChange={(e) => setStoreSettings({...storeSettings, weeklyOff: e.target.value})} placeholder="Sunday" />
        </div>
      </Card>

      {/* Social Media */}
      <Card variant="glass" className="p-6">
        <h3 className="font-semibold text-slate-100 mb-5 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-violet-400" />
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Instagram URL" value={storeSettings.instagramUrl} onChange={(e) => setStoreSettings({...storeSettings, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." />
          <Input label="Facebook URL" value={storeSettings.facebookUrl} onChange={(e) => setStoreSettings({...storeSettings, facebookUrl: e.target.value})} placeholder="https://facebook.com/..." />
          <Input label="YouTube URL" value={storeSettings.youtubeUrl} onChange={(e) => setStoreSettings({...storeSettings, youtubeUrl: e.target.value})} placeholder="https://youtube.com/..." />
          <Input label="WhatsApp Channel URL" value={storeSettings.whatsappChannelUrl} onChange={(e) => setStoreSettings({...storeSettings, whatsappChannelUrl: e.target.value})} placeholder="https://whatsapp.com/channel/..." />
        </div>
      </Card>

      {/* Security */}
      <Card variant="glass" className="p-6 border-rose-400/20">
        <h3 className="font-semibold text-slate-100 mb-5 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          Security
        </h3>
        <Input label="Admin Password" type="password" value={storeSettings.adminPassword} onChange={(e) => setStoreSettings({...storeSettings, adminPassword: e.target.value})} placeholder="Enter new password" />
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" className="gap-2 min-w-[200px]">
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}



