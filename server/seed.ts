import db from './database.js';
import crypto from 'crypto';

console.log('🌱 Seeding database...');

const generateId = () => crypto.randomUUID();

// Seed store settings
const existingSettings = db.prepare('SELECT id FROM StoreSettings WHERE id = ?').get('singleton');
if (!existingSettings) {
  db.prepare(`
    INSERT INTO StoreSettings (id, shopName, tagline, aboutDescription, marqueeText, address, mapsLink, 
      phonePrimary, phoneSecondary, whatsappNumber, email, openingHours, weeklyOff, 
      instagramUrl, facebookUrl, youtubeUrl, whatsappChannelUrl, adminPassword)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'singleton',
    'Khatri Mobile Zone',
    'Your Trusted Mobile Partner',
    'Established in 2015, Khatri Mobile Zone has been Fatehabad\'s most trusted destination for premium smartphones, accessories, and exceptional customer service. We believe in building relationships, not just transactions. Every device we sell undergoes rigorous quality checks, and our expert staff ensures you find the perfect phone for your needs and budget. Visit our store at Palika Bazar for a hands-on experience with the latest flagships from Apple, Samsung, OnePlus, Vivo, Xiaomi, and more.',
    '🔥 Diwali Dhamaka! Up to 40% OFF on all Smartphones | 📱 New iPhone 15 Series in Stock | 💳 Zero Down Payment EMI Available | 🔄 Best Exchange Value for Your Old Phone',
    'Shop No. 12, Palika Bazar, Fatehabad, Haryana 125050',
    'https://maps.app.goo.gl/KhatriMobileZoneFatehabad',
    '+91-9876543210',
    '+91-9876543211',
    '919876543210',
    'khatrimobilezone@email.com',
    'Mon-Sat: 10:00 AM - 9:00 PM | Sun: Closed',
    'Sunday',
    'https://instagram.com/khatrimobilezone',
    'https://facebook.com/khatrimobilezone',
    'https://youtube.com/@khatrimobilezone',
    'https://whatsapp.com/channel/khatrimobilezone',
    'khatri@2024'
  );
  console.log('✅ Store settings created');
} else {
  console.log('✅ Store settings already exist');
}

// Seed products
const products = [
  {
    id: generateId(),
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '8GB',
    storage: '256GB',
    colors: 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium',
    highlight: 'A17 Pro Chip | 48MP Main Camera | Titanium Design | Action Button',
    originalPrice: 15990000,
    offerPrice: 14490000,
    discountTag: '₹15,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '8GB',
    storage: '128GB',
    colors: 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium',
    highlight: 'A17 Pro Chip | 48MP Main Camera | Titanium Design | Action Button',
    originalPrice: 13490000,
    offerPrice: 12490000,
    discountTag: '₹10,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '12GB',
    storage: '512GB',
    colors: 'Titanium Gray, Titanium Black, Titanium Violet, Titanium Yellow',
    highlight: 'Snapdragon 8 Gen 3 | 200MP Camera | 100x Space Zoom | S Pen Included',
    originalPrice: 13999900,
    offerPrice: 12499900,
    discountTag: '₹15,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Samsung Galaxy S24+',
    brand: 'Samsung',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '12GB',
    storage: '256GB',
    colors: 'Onyx Black, Marble Gray, Cobalt Violet, Amber Yellow',
    highlight: 'Exynos 2400 | 50MP Triple Camera | 4900mAh Battery | 7 Years Updates',
    originalPrice: 9999900,
    offerPrice: 8999900,
    discountTag: '₹10,000 OFF',
    stockStatus: 'LIMITED_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'OnePlus 12',
    brand: 'OnePlus',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '16GB',
    storage: '512GB',
    colors: 'Flowy Emerald, Silky Black',
    highlight: 'Snapdragon 8 Gen 3 | Hasselblad Camera | 100W SuperVOOC | 5400mAh Battery',
    originalPrice: 6999900,
    offerPrice: 6499900,
    discountTag: 'Hot Deal',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1701041545889-7a6c35a61f5f?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'OnePlus 12R',
    brand: 'OnePlus',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '16GB',
    storage: '256GB',
    colors: 'Cool Blue, Iron Gray',
    highlight: 'Snapdragon 8 Gen 2 | 5500mAh Battery | 100W SuperVOOC | 120Hz ProXDR Display',
    originalPrice: 4299900,
    offerPrice: 3999900,
    discountTag: '₹3,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1701041545889-7a6c35a61f5f?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '16GB',
    storage: '512GB',
    colors: 'Asteroid Black, Startrail Blue',
    highlight: 'Dimensity 9300 | Zeiss 1-inch Sensor | 100W FlashCharge | IP68',
    originalPrice: 8999900,
    offerPrice: 8499900,
    discountTag: 'Exchange Bonus ₹5000',
    stockStatus: 'IN_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Vivo V30 Pro',
    brand: 'Vivo',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '12GB',
    storage: '512GB',
    colors: 'Andaman Blue, Classic Black',
    highlight: 'Dimensity 8200 | Zeiss Triple Camera | 80W FlashCharge | 120Hz 3D Curved Screen',
    originalPrice: 4199900,
    offerPrice: 3799900,
    discountTag: '₹4,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '16GB',
    storage: '512GB',
    colors: 'White, Black',
    highlight: 'Snapdragon 8 Gen 3 | Leica Summilux Lens | 1-inch Sensor | 90W HyperCharge',
    originalPrice: 9999900,
    offerPrice: 9499900,
    discountTag: '₹5,000 OFF',
    stockStatus: 'LIMITED_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Xiaomi 14',
    brand: 'Xiaomi',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '12GB',
    storage: '512GB',
    colors: 'Jade Green, Black, White',
    highlight: 'Snapdragon 8 Gen 3 | Leica Triple Camera | 90W HyperCharge | 120Hz Display',
    originalPrice: 6499900,
    offerPrice: 5999900,
    discountTag: '₹5,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Samsung Galaxy Z Fold 5',
    brand: 'Samsung',
    type: 'SMARTPHONE',
    condition: 'NEW_SEAL_PACK',
    ram: '12GB',
    storage: '512GB',
    colors: 'Icy Blue, Phantom Black, Cream',
    highlight: 'Snapdragon 8 Gen 2 | 7.6" Foldable Display | S Pen Support | IPX8',
    originalPrice: 15499900,
    offerPrice: 13999900,
    discountTag: '₹15,000 OFF',
    stockStatus: 'LIMITED_STOCK',
    featured: 1,
    imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'iPhone 14',
    brand: 'Apple',
    type: 'SMARTPHONE',
    condition: 'OPEN_BOX',
    ram: '6GB',
    storage: '128GB',
    colors: 'Blue, Purple, Midnight, Starlight, Red',
    highlight: 'A15 Bionic | Dual Camera System | Ceramic Shield | Face ID',
    originalPrice: 6990000,
    offerPrice: 5890000,
    discountTag: 'Open Box Deal',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'OnePlus Buds Pro 2',
    brand: 'OnePlus',
    type: 'AUDIO',
    condition: 'NEW_SEAL_PACK',
    ram: null,
    storage: null,
    colors: 'Arbor Green, Obsidian Black',
    highlight: 'MelodyBoost Dual Drivers | 48dB ANC | 39hr Battery | LHDC 4.0',
    originalPrice: 1199900,
    offerPrice: 999900,
    discountTag: '₹2,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Samsung Galaxy Watch 6 Classic',
    brand: 'Samsung',
    type: 'SMARTWATCH',
    condition: 'NEW_SEAL_PACK',
    ram: null,
    storage: '16GB',
    colors: 'Black, Silver',
    highlight: 'Rotating Bezel | Wear OS 4 | BioActive Sensor | Sapphire Crystal',
    originalPrice: 3699900,
    offerPrice: 3299900,
    discountTag: '₹4,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
  {
    id: generateId(),
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    type: 'SMARTWATCH',
    condition: 'NEW_SEAL_PACK',
    ram: null,
    storage: '64GB',
    colors: 'Midnight, Starlight, Silver, Pink, Red',
    highlight: 'S9 SiP | Double Tap | 2000 nits Display | Carbon Neutral',
    originalPrice: 4190000,
    offerPrice: 3890000,
    discountTag: '₹3,000 OFF',
    stockStatus: 'IN_STOCK',
    featured: 0,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
];

const insertProduct = db.prepare(`
  INSERT INTO Product (id, name, brand, type, condition, ram, storage, colors, highlight, 
    originalPrice, offerPrice, discountTag, stockStatus, featured, imageUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((products) => {
  for (const product of products) {
    const existing = db.prepare('SELECT id FROM Product WHERE id = ?').get(product.id);
    if (!existing) {
      insertProduct.run(
        product.id,
        product.name,
        product.brand,
        product.type,
        product.condition,
        product.ram,
        product.storage,
        product.colors,
        product.highlight,
        product.originalPrice,
        product.offerPrice,
        product.discountTag,
        product.stockStatus,
        product.featured,
        product.imageUrl
      );
    }
  }
});

insertMany(products);
console.log('✅ Products seeded');

// Seed gallery images
const galleryImages = [
  { id: generateId(), url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80', caption: 'Khatri Mobile Zone Storefront', category: 'STOREFRONT', order: 1 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80', caption: 'Premium Smartphone Display Wall', category: 'INTERIOR', order: 2 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80', caption: 'Customer Experience Zone', category: 'INTERIOR', order: 3 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80', caption: 'Happy Customer with New iPhone', category: 'HAPPY_CUSTOMERS', order: 4 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1200&q=80', caption: 'Accessories & Audio Section', category: 'INTERIOR', order: 5 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1522735338363-cc7313be2ace?w=1200&q=80', caption: 'Festival Offer Posters', category: 'OFFERS', order: 6 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&q=80', caption: 'Repair & Service Counter', category: 'INTERIOR', order: 7 },
  { id: generateId(), url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80', caption: 'Diwali Sale Decoration', category: 'OFFERS', order: 8 },
];

const insertGallery = db.prepare(`
  INSERT INTO GalleryImage (id, url, caption, category, "order")
  VALUES (?, ?, ?, ?, ?)
`);

const insertManyGallery = db.transaction((images) => {
  for (const img of images) {
    const existing = db.prepare('SELECT id FROM GalleryImage WHERE id = ?').get(img.id);
    if (!existing) {
      insertGallery.run(img.id, img.url, img.caption, img.category, img.order);
    }
  }
});

insertManyGallery(galleryImages);
console.log('✅ Gallery images seeded');

console.log('✅ Database seeded successfully!');