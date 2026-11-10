import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import crypto from 'crypto'
import db from './database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3005

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'))
    }
  }
})

// Helper: Format price in paise to ₹
const formatPrice = (paise: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(paise / 100)
}

// Helper: Generate UUID
const generateId = () => crypto.randomUUID()

// ==================== STORE SETTINGS API ====================
app.get('/api/store', async (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM StoreSettings WHERE id = ?').get('singleton')
    if (!settings) {
      return res.status(404).json({ error: 'Store settings not found' })
    }
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch store settings' })
  }
})

app.put('/api/store', async (req, res) => {
  try {
    const data = req.body
    const fields = Object.keys(data).filter(k => k !== 'id' && k !== 'createdAt')
    const values = fields.map(f => data[f])
    values.push('singleton')
    
    db.prepare(`
      UPDATE StoreSettings SET 
        ${fields.map(f => `${f} = ?`).join(', ')}, 
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(...values)
    
    const updated = db.prepare('SELECT * FROM StoreSettings WHERE id = ?').get('singleton')
    res.json(updated)
  } catch (error) {
    console.error('Update store error:', error)
    res.status(500).json({ error: 'Failed to update store settings' })
  }
})

// Admin auth
app.post('/api/admin/auth', async (req, res) => {
  try {
    const { password } = req.body
    const settings = db.prepare('SELECT adminPassword FROM StoreSettings WHERE id = ?').get('singleton') as { adminPassword: string } | undefined
    if (settings?.adminPassword === password) {
      res.json({ success: true })
    } else {
      res.status(401).json({ error: 'Invalid password' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Auth failed' })
  }
})

// ==================== PRODUCTS API ====================
app.get('/api/products', async (req, res) => {
  try {
    const { 
      type, brand, ram, storage, condition, stockStatus, featured, search, 
      minPrice, maxPrice, sortBy, limit, offset 
    } = req.query

    let whereClause = 'WHERE 1=1'
    const params: any[] = []

    if (type) {
      whereClause += ' AND type = ?'
      params.push(type)
    }
    if (brand) {
      whereClause += ' AND brand = ?'
      params.push(brand)
    }
    if (ram) {
      whereClause += ' AND ram = ?'
      params.push(ram)
    }
    if (storage) {
      whereClause += ' AND storage = ?'
      params.push(storage)
    }
    if (condition) {
      whereClause += ' AND condition = ?'
      params.push(condition)
    }
    if (stockStatus) {
      whereClause += ' AND stockStatus = ?'
      params.push(stockStatus)
    }
    if (featured === 'true') {
      whereClause += ' AND featured = 1'
    }
    if (minPrice) {
      whereClause += ' AND offerPrice >= ?'
      params.push(parseInt(String(minPrice)))
    }
    if (maxPrice) {
      whereClause += ' AND offerPrice <= ?'
      params.push(parseInt(String(maxPrice)))
    }
    if (search) {
      whereClause += ' AND (name LIKE ? OR brand LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    let orderClause = 'ORDER BY createdAt DESC'
    if (sortBy === 'price-asc') orderClause = 'ORDER BY offerPrice ASC'
    else if (sortBy === 'price-desc') orderClause = 'ORDER BY offerPrice DESC'
    else if (sortBy === 'discount') orderClause = 'ORDER BY ((originalPrice - offerPrice) * 100.0 / originalPrice) DESC'

    // Get total count
    const totalStmt = db.prepare(`SELECT COUNT(*) as count FROM Product ${whereClause}`)
    const total = totalStmt.get(...params) as { count: number }

    // Get products with pagination
    let limitClause = ''
    if (limit) {
      limitClause = 'LIMIT ?'
      params.push(parseInt(String(limit)))
    }
    if (offset) {
      limitClause += ' OFFSET ?'
      params.push(parseInt(String(offset)))
    }

    const products = db.prepare(`
      SELECT * FROM Product ${whereClause} ${orderClause} ${limitClause}
    `).all(...params)

    res.json({ products, total: total.count })
  } catch (error) {
    console.error('Fetch products error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.get('/api/products/featured', async (req, res) => {
  try {
    const products = db.prepare(`
      SELECT * FROM Product 
      WHERE featured = 1 AND stockStatus != 'OUT_OF_STOCK'
      ORDER BY createdAt DESC 
      LIMIT 10
    `).all()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products' })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM Product WHERE id = ?').get(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const data = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : data.imageUrl

    const id = generateId()
    db.prepare(`
      INSERT INTO Product (id, name, brand, type, condition, ram, storage, colors, highlight, 
        originalPrice, offerPrice, discountTag, stockStatus, featured, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.brand,
      data.type,
      data.condition || 'NEW_SEAL_PACK',
      data.ram || null,
      data.storage || null,
      data.colors,
      data.highlight || null,
      parseInt(data.originalPrice),
      parseInt(data.offerPrice),
      data.discountTag || null,
      data.stockStatus || 'IN_STOCK',
      data.featured === 'true' ? 1 : 0,
      imageUrl
    )

    const product = db.prepare('SELECT * FROM Product WHERE id = ?').get(id)
    res.status(201).json(product)
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const data = req.body
    const updateData: any = { ...data }
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`
    }
    
    // Convert numeric fields
    if (data.originalPrice) updateData.originalPrice = parseInt(data.originalPrice)
    if (data.offerPrice) updateData.offerPrice = parseInt(data.offerPrice)
    if (data.featured !== undefined) updateData.featured = data.featured === 'true' ? 1 : 0

    const fields = Object.keys(updateData).filter(k => k !== 'id' && k !== 'createdAt')
    const values = fields.map(f => updateData[f])
    values.push(req.params.id)
    
    db.prepare(`
      UPDATE Product SET 
        ${fields.map(f => `${f} = ?`).join(', ')}, 
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(...values)

    const product = db.prepare('SELECT * FROM Product WHERE id = ?').get(req.params.id)
    res.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

app.patch('/api/products/:id/stock', async (req, res) => {
  try {
    const { stockStatus } = req.body
    db.prepare('UPDATE Product SET stockStatus = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(stockStatus, req.params.id)
    const product = db.prepare('SELECT * FROM Product WHERE id = ?').get(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock status' })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  try {
    db.prepare('DELETE FROM Product WHERE id = ?').run(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

app.post('/api/products/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'IDs array required' })
    }
    const deleteStmt = db.prepare('DELETE FROM Product WHERE id = ?')
    const transaction = db.transaction((idList: string[]) => {
      for (const id of idList) {
        deleteStmt.run(id)
      }
    })
    transaction(ids)
    res.json({ success: true, count: ids.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk delete products' })
  }
})

// Get filter options
app.get('/api/products/filters/options', async (req, res) => {
  try {
    const brands = db.prepare('SELECT DISTINCT brand FROM Product ORDER BY brand').all() as { brand: string }[]
    const types = db.prepare('SELECT DISTINCT type FROM Product ORDER BY type').all() as { type: string }[]
    const rams = db.prepare('SELECT DISTINCT ram FROM Product WHERE ram IS NOT NULL ORDER BY ram').all() as { ram: string }[]
    const storages = db.prepare('SELECT DISTINCT storage FROM Product WHERE storage IS NOT NULL ORDER BY storage').all() as { storage: string }[]
    const conditions = db.prepare('SELECT DISTINCT condition FROM Product ORDER BY condition').all() as { condition: string }[]

    res.json({
      brands: brands.map(b => b.brand),
      types: types.map(t => t.type),
      rams: rams.map(r => r.ram).filter(Boolean),
      storages: storages.map(s => s.storage).filter(Boolean),
      conditions: conditions.map(c => c.condition),
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filter options' })
  }
})

// ==================== GALLERY API ====================
app.get('/api/gallery', async (req, res) => {
  try {
    const images = db.prepare('SELECT * FROM GalleryImage ORDER BY "order" ASC').all()
    res.json(images)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' })
  }
})

app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    const data = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : data.url

    const id = generateId()
    db.prepare(`
      INSERT INTO GalleryImage (id, url, caption, category, "order")
      VALUES (?, ?, ?, ?, ?)
    `).run(id, imageUrl, data.caption || null, data.category || 'INTERIOR', parseInt(data.order) || 0)

    const image = db.prepare('SELECT * FROM GalleryImage WHERE id = ?').get(id)
    res.status(201).json(image)
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload gallery image' })
  }
})

app.put('/api/gallery/:id', upload.single('image'), async (req, res) => {
  try {
    const data = req.body
    const updateData: any = { ...data }
    
    if (req.file) {
      updateData.url = `/uploads/${req.file.filename}`
    }
    if (data.order) updateData.order = parseInt(data.order)

    const fields = Object.keys(updateData).filter(k => k !== 'id' && k !== 'createdAt')
    const values = fields.map(f => updateData[f])
    values.push(req.params.id)
    
    db.prepare(`
      UPDATE GalleryImage SET 
        ${fields.map(f => `"${f}" = ?`).join(', ')}, 
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(...values)

    const image = db.prepare('SELECT * FROM GalleryImage WHERE id = ?').get(req.params.id)
    res.json(image)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gallery image' })
  }
})

app.patch('/api/gallery/reorder', async (req, res) => {
  try {
    const { images } = req.body // array of { id, order }
    const updateOrder = db.prepare('UPDATE GalleryImage SET "order" = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    const transaction = db.transaction((imgs) => {
      for (const img of imgs) {
        updateOrder.run(img.order, img.id)
      }
    })
    transaction(images)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder gallery' })
  }
})

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    db.prepare('DELETE FROM GalleryImage WHERE id = ?').run(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery image' })
  }
})

app.post('/api/gallery/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'IDs array required' })
    }
    const deleteStmt = db.prepare('DELETE FROM GalleryImage WHERE id = ?')
    const transaction = db.transaction((idList: string[]) => {
      for (const id of idList) {
        deleteStmt.run(id)
      }
    })
    transaction(ids)
    res.json({ success: true, count: ids.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk delete gallery images' })
  }
})

// ==================== WHATSAPP HELPER ====================
app.get('/api/whatsapp-link/:productId', async (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM Product WHERE id = ?').get(req.params.productId) as any
    const settings = db.prepare('SELECT * FROM StoreSettings WHERE id = ?').get('singleton') as any
    
    if (!product || !settings) {
      return res.status(404).json({ error: 'Product or settings not found' })
    }

    const { name, ram, storage, colors, offerPrice } = product
    const message = `Hi Khatri Mobile Zone! I saw the ${name} (${ram || 'N/A'} / ${storage || 'N/A'}) listed at ${formatPrice(offerPrice)} on your website. Is this still available in stock?`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`
    
    res.json({ url: whatsappUrl, message })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate WhatsApp link' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API 404 fallback
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', statusCode: 404 })
})

// Global 500 error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err)
  if (res.headersSent) return next(err)
  res.status(err?.status || 500).json({
    error: err?.message || 'Internal server error',
    statusCode: err?.status || 500,
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})