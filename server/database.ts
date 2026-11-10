import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../dev.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS StoreSettings (
    id TEXT PRIMARY KEY DEFAULT 'singleton',
    shopName TEXT DEFAULT 'Khatri Mobile Zone',
    tagline TEXT DEFAULT 'Your Trusted Mobile Partner',
    aboutDescription TEXT,
    marqueeText TEXT DEFAULT '🔥 Diwali Dhamaka! Up to 40% OFF on all Smartphones | 📱 New iPhone 15 Series in Stock | 💳 Zero Down Payment EMI Available | 🔄 Best Exchange Value for Your Old Phone',
    address TEXT DEFAULT 'Shop No. 12, Palika Bazar, Fatehabad, Haryana 125050',
    mapsLink TEXT DEFAULT 'https://maps.app.goo.gl/KhatriMobileZoneFatehabad',
    phonePrimary TEXT DEFAULT '+91-9876543210',
    phoneSecondary TEXT DEFAULT '+91-9876543211',
    whatsappNumber TEXT DEFAULT '919876543210',
    email TEXT DEFAULT 'khatrimobilezone@email.com',
    openingHours TEXT DEFAULT 'Mon-Sat: 10:00 AM - 9:00 PM | Sun: Closed',
    weeklyOff TEXT DEFAULT 'Sunday',
    instagramUrl TEXT DEFAULT 'https://instagram.com/khatrimobilezone',
    facebookUrl TEXT DEFAULT 'https://facebook.com/khatrimobilezone',
    youtubeUrl TEXT DEFAULT 'https://youtube.com/@khatrimobilezone',
    whatsappChannelUrl TEXT DEFAULT 'https://whatsapp.com/channel/khatrimobilezone',
    adminPassword TEXT DEFAULT 'khatri@2024',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS Product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    type TEXT NOT NULL,
    condition TEXT DEFAULT 'NEW_SEAL_PACK',
    ram TEXT,
    storage TEXT,
    colors TEXT NOT NULL,
    highlight TEXT,
    originalPrice INTEGER NOT NULL,
    offerPrice INTEGER NOT NULL,
    discountTag TEXT,
    stockStatus TEXT DEFAULT 'IN_STOCK',
    featured INTEGER DEFAULT 0,
    imageUrl TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS GalleryImage (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    caption TEXT,
    category TEXT DEFAULT 'INTERIOR',
    "order" INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_product_type ON Product(type);
  CREATE INDEX IF NOT EXISTS idx_product_brand ON Product(brand);
  CREATE INDEX IF NOT EXISTS idx_product_featured ON Product(featured);
  CREATE INDEX IF NOT EXISTS idx_product_stock ON Product(stockStatus);
  CREATE INDEX IF NOT EXISTS idx_gallery_order ON GalleryImage("order");
`);

console.log('✅ Database initialized successfully!');

export default db;