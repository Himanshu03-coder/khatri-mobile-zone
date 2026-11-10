export const formatPrice = (paise: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100);
};

export const formatPriceCompact = (paise: number): string => {
  const rupees = paise / 100;
  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toFixed(1)}Cr`;
  }
  if (rupees >= 100000) {
    return `₹${(rupees / 100000).toFixed(1)}L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees);
};

export const calculateDiscount = (original: number, offer: number): number => {
  if (original <= 0) return 0;
  return Math.round(((original - offer) / original) * 100);
};

export const getStockStatusColor = (status: string): string => {
  switch (status) {
    case 'IN_STOCK':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'LIMITED_STOCK':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'OUT_OF_STOCK':
      return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
};

export const getStockStatusLabel = (status: string): string => {
  switch (status) {
    case 'IN_STOCK':
      return 'In Stock';
    case 'LIMITED_STOCK':
      return 'Limited Stock';
    case 'OUT_OF_STOCK':
      return 'Out of Stock';
    default:
      return 'Unknown';
  }
};

export const getConditionLabel = (condition: string): string => {
  switch (condition) {
    case 'NEW_SEAL_PACK':
      return 'Brand New Seal Pack';
    case 'OPEN_BOX':
      return 'Open Box';
    case 'PRE_OWNED':
      return 'Pre-Owned';
    case 'CERTIFIED_PRE_OWNED':
      return 'Certified Pre-Owned';
    default:
      return condition;
  }
};

export const getConditionColor = (condition: string): string => {
  switch (condition) {
    case 'NEW_SEAL_PACK':
      return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    case 'OPEN_BOX':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'PRE_OWNED':
      return 'text-violet-400 bg-violet-400/10 border-violet-400/20';
    case 'CERTIFIED_PRE_OWNED':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
};

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'SMARTPHONE':
      return 'Smartphone';
    case 'TABLET':
      return 'Tablet';
    case 'SMARTWATCH':
      return 'Smartwatch';
    case 'AUDIO':
      return 'Audio';
    case 'ACCESSORY':
      return 'Accessory';
    case 'WEARABLE':
      return 'Wearable';
    default:
      return type;
  }
};

export const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'SMARTPHONE':
      return '📱';
    case 'TABLET':
      return '📟';
    case 'SMARTWATCH':
      return '⌚';
    case 'AUDIO':
      return '🎧';
    case 'ACCESSORY':
      return '🔌';
    case 'WEARABLE':
      return '👕';
    default:
      return '📦';
  }
};

export const generateWhatsAppLink = (
  phoneNumber: string,
  productName: string,
  ram: string | null,
  storage: string | null,
  color: string,
  offerPrice: number
): string => {
  const message = `Hi Khatri Mobile Zone! I saw the ${productName} (${ram || 'N/A'} / ${storage || 'N/A'}, ${color}) listed at ${formatPrice(offerPrice)} on your website. Is this still available in stock?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const sanitizeStoreCopy = (text?: string | null): string => {
  if (!text) return '';
  return text
    .replace(/\bshowrooms?\b/gi, 'store')
    .replace(/\bShop\s+No\.?/gi, 'Store No.')
    .replace(/\bshops?\b/gi, 'store')
    .replace(/0%\s*EMI/gi, 'Easy EMI')
    .replace(/No[-\s]?Cost\s*EMI/gi, 'Easy EMI');
};

export const cleanPhoneDigits = (phone?: string | null, fallback = '919416749202'): string => {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  return digits || fallback;
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};