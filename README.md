# Khatri Mobile Zone - Premium Mobile Showroom Website

A complete, production-ready full-stack promotional web application and Admin CMS for a premier mobile retail showroom "Khatri Mobile Zone" in Fatehabad, Haryana.

## 🚀 Features

### Public Frontend
- **Hero Section** - Kinetic typography, animated headline, 3D floating phone showcase with parallax scroll
- **Live Announcement Marquee** - Dynamic scrolling ticker controlled from backend
- **Featured Hot Deals** - Horizontal scroll with 3D tilt cards, discount badges
- **Live Stock Catalog** - Real-time search, multi-filter system (Type, Brand, RAM, Storage, Condition, Price), infinite scroll
- **Product Cards** - High-res images, color swatches, price comparison, stock status, WhatsApp/CTA buttons
- **Bento Grid** - Animated service highlight cards (EMI, Exchange, Warranty, Setup, Accessories)
- **Photo Gallery** - Masonry grid with lightbox, category filters
- **Contact Section** - Dynamic store info, Google Maps embed, WhatsApp/Call buttons
- **Floating Nav Dock** - Quick jump to sections, scroll-to-top
- **Smooth Scrolling** - Lenis + GSAP ScrollTrigger + Framer Motion

### Admin Dashboard (/admin)
- **Dashboard** - Stats overview, quick actions
- **Inventory Manager** - Full CRUD for products with image upload, variants, pricing, stock status
- **Gallery Manager** - Upload/reorder/delete showroom photos with captions
- **Store Settings** - Edit all shop metadata (name, contact, hours, social links, marquee text, password)

### Technical Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis, Lucide Icons
- **Backend**: Express.js, better-sqlite3 (persistent local DB), Multer for file uploads
- **Database**: SQLite with 15+ seeded products, gallery images, store settings
- **State**: Zustand with persistence, React Query for server state
- **Auth**: Simple password protection for admin panel

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# Install dependencies
npm install

# Seed database with sample data
npm run db:seed

# Start development servers (client + server)
npm run dev
```

### Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Panel: http://localhost:3000/admin (password: `khatri@2024`)

### Production Build
```bash
npm run build
npm run start
```

## 📁 Project Structure
```
khatri-mobile-zone/
├── public/                 # Static assets
├── server/                 # Backend API
│   ├── index.ts           # Express server + API routes
│   ├── database.ts        # SQLite database setup
│   └── seed.ts            # Database seeding script
├── src/
│   ├── api/               # API client
│   ├── components/
│   │   ├── providers/     # Lenis, etc.
│   │   ├── sections/      # Page sections
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── store/             # Zustand store
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript types
│   └── utils/             # Helper functions
├── prisma/                # Prisma schema (optional)
└── package.json
```

## 🎨 Design System

### Colors
- **Obsidian**: `#060608` (Background)
- **Charcoal**: `#111116` (Surfaces)
- **Metallic**: `#2a2a35` (Borders)
- **Cyan**: `#00f5ff` (Primary accent)
- **Violet**: `#b44bff` (Secondary accent)
- **Amber**: `#ffb800` (Warning/Highlight)
- **Emerald**: `#00ff88` (Success)
- **Rose**: `#ff3366` (Error/Danger)

### Typography
- **Display**: Syne (Headlines)
- **Body**: Space Grotesk (UI text)
- **Mono**: JetBrains Mono (Prices, codes)

## 📱 API Endpoints

### Store Settings
- `GET /api/store` - Get store settings
- `PUT /api/store` - Update store settings
- `POST /api/admin/auth` - Admin authentication

### Products
- `GET /api/products` - List products (with filters, pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (multipart/form-data)
- `PUT /api/products/:id` - Update product
- `PATCH /api/products/:id/stock` - Toggle stock status
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/filters/options` - Get filter options
- `GET /api/whatsapp-link/:productId` - Generate WhatsApp link

### Gallery
- `GET /api/gallery` - List gallery images
- `POST /api/gallery` - Upload image
- `PUT /api/gallery/:id` - Update image
- `PATCH /api/gallery/reorder` - Reorder images
- `DELETE /api/gallery/:id` - Delete image

## 🔐 Admin Access
- URL: `/admin`
- Default Password: `khatri@2024`
- Changeable in Settings tab

## 🌱 Seed Data Includes
- 15 products (iPhone 15 Pro Max, Galaxy S24 Ultra, OnePlus 12, Vivo X100 Pro, Xiaomi 14 Ultra, etc.)
- 8 gallery images (storefront, interior, customers, offers)
- Complete store settings (address, phones, WhatsApp, social media, hours)

## 📝 License
MIT License - Feel free to use for your own mobile retail business!

---

Built with ❤️ for Khatri Mobile Zone, Fatehabad