import React, { createContext, useContext, useState, useEffect } from 'react'

export type LanguageCode = 'en' | 'hi' | 'pa' | 'hr' | 'raj' | 'ur'

export interface LanguageOption {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🌾' },
  { code: 'hr', name: 'Haryanvi', nativeName: 'हरियाणवी', flag: '🚜' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी', flag: '🏰' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '📜' },
]

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    'nav.store': 'Store',
    'nav.deals': 'Deals',
    'nav.stock': 'Live Stock',
    'nav.partners': 'Financing',
    'nav.why': 'Benefits',
    'nav.gallery': 'Gallery',
    'nav.visit': 'Contact',
    'nav.about': 'About Us',
    'nav.faq': 'FAQ',
    'nav.browse': 'Browse Stock',
    'nav.whatsapp': 'WhatsApp Us',

    // Hero
    'hero.badge': 'Live Inventory · Fatehabad, Haryana',
    'hero.title': 'Khatri Mobile Zone.',
    'hero.tagline': 'Flagship phones at honest prices.',
    'hero.desc': 'The curated destination for genuine sealed flagships, transparent exchange valuations, and instant EMI financing from top partners. In-store pickup or WhatsApp ordering.',
    'hero.whatsapp_cta': 'WhatsApp Instant Inquiry',
    'hero.browse_cta': 'Explore Live Stock',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'Factory Sealed Pack',
    'hero.stat1_desc': 'Official GST bill & brand warranty',
    'hero.stat2_metric': 'Instant EMI',
    'hero.stat2_label': 'Multiple Partners',
    'hero.stat2_desc': 'Bajaj, IDFC, HDB, Poonawalla & DMI',
    'hero.stat3_metric': '₹ Instant',
    'hero.stat3_label': 'Old Phone Exchange',
    'hero.stat3_desc': 'Highest trade-in valuation in town',
    'hero.stat4_metric': '10+ Yrs',
    'hero.stat4_label': 'Trusted Legacy',
    'hero.stat4_desc': 'Serving 5,000+ local customers',

    // Marquee
    'marquee.item1': '📱 iPhone 16 Pro Max in Stock',
    'marquee.item2': '🔥 Samsung Galaxy S25 Ultra Available',
    'marquee.item3': '💳 Easy EMI with Bajaj Finserv, IDFC, HDB, Poonawalla & DMI',
    'marquee.item4': '✅ Certified 100% Genuine Sealed Units',
    'marquee.item5': '🔄 Instant Old Phone Exchange Evaluation',
    'marquee.item6': '🎁 Free Screen Guard & Case Setup',
    'marquee.item7': '📍 Palika Bazar, Fatehabad, Haryana',

    // Deals
    'deals.eyebrow': 'Limited Offers',
    'deals.title': 'Flagship Spotlight Deals.',
    'deals.card_badge': 'Special Offer',
    'deals.card_title': 'Upgrade Your Smartphone Today.',
    'deals.card_desc': 'Get up to ₹15,000 off on exchange, plus flexible financing with zero paper hassle.',
    'deals.card_btn': 'View Eligible Devices →',

    // Financing Partners
    'finance.eyebrow': 'Authorized Lending Partners',
    'finance.title': 'Flexible Financing & Easy EMI.',
    'finance.desc': 'We partner with India’s leading consumer finance companies. Get instant on-the-spot approval with minimal documents.',
    'finance.approval_time': '5-Minute Instant Approval in Store',
    'finance.docs': 'Only Aadhaar & Bank Details Required',

    // Stock
    'stock.eyebrow': 'Live Inventory',
    'stock.title': 'Verified Stock In Fatehabad.',
    'stock.count': 'devices available today',
    'stock.search_placeholder': 'Search by model, brand, or specs...',
    'stock.brand': 'Brand:',
    'stock.condition': 'Condition:',
    'stock.sort': 'Sort by:',
    'stock.sort_featured': 'Featured First',
    'stock.sort_asc': 'Price: Low to High',
    'stock.sort_desc': 'Price: High to Low',
    'stock.in_stock': 'In Stock',
    'stock.sold_out': 'Sold Out',
    'stock.btn_enquire': 'WhatsApp Deal',
    'stock.empty_title': 'No matching handsets found',
    'stock.empty_desc': 'Try clearing your filters or contact us directly on WhatsApp to check incoming stock.',
    'stock.reset_btn': 'Reset Filters',

    // Bento / Benefits
    'why.eyebrow': 'Our Commitment',
    'why.title': 'Built for buyers who demand certainty.',
    'why.desc': 'Located in Fatehabad with transparent device testing, official manufacturer bills, and complimentary setup.',
    'why.emi_badge': 'Financing Options',
    'why.emi_title': 'Instant Easy EMI on All Flagships.',
    'why.emi_desc': 'Choose from Bajaj Finserv, IDFC FIRST Bank, HDB Financial, Poonawalla Fincorp, or DMI Finance. Get your dream phone home in minutes.',
    'why.genuine_title': '100% Genuine Sealed Pack',
    'why.genuine_desc': 'Zero unboxed or grey units. Every handset has official GST billing and brand warranty across India.',
    'why.setup_title': 'Complimentary Data & Protection Setup',
    'why.setup_desc': 'Free tempered glass, case fitting, and safe WhatsApp & phone data transfer done by our team.',
    'why.exchange_badge': 'Exchange Trade-In',
    'why.exchange_title': 'Top Old Phone Exchange Value.',
    'why.exchange_desc': 'Bring any working smartphone. We run a fair hardware test and deduct the amount immediately on the spot.',

    // Contact
    'contact.eyebrow': 'Visit Our Center',
    'contact.title': 'Experience Phones In Person.',
    'contact.desc': 'Hold the device, test camera sensors, and get friendly advice. Walk-ins always welcome.',
    'contact.location_title': 'Store Address',
    'contact.hours_title': 'Opening Hours',
    'contact.hours_val': '10:00 AM – 9:00 PM (All 7 Days)',
    'contact.helpline_title': 'Direct Contact',
    'contact.form_title': 'Fast WhatsApp Consultation',
    'contact.form_desc': 'Fill your details and our team will reply immediately with exact pricing.',
    'contact.form_name': 'Your Name',
    'contact.form_phone': 'Desired Device / Model',
    'contact.form_purpose': 'Inquiry Purpose',
    'contact.form_submit': 'Start WhatsApp Chat',

    // Footer
    'footer.tagline': 'Fatehabad’s trusted smartphone store. Genuine GST-billed devices, honest prices, instant WhatsApp support.',
    'footer.rights': 'All rights reserved.',

    // FAQ
    'faq.eyebrow': 'Buyer Guide & FAQ',
    'faq.title': 'Frequently Asked Questions.',
    'faq.desc': 'Everything you need to know about buying smartphones, instant EMI partners, and phone exchange at Khatri Mobile Zone in Fatehabad.',
    'faq.q1': 'Which smartphone brands are available at Khatri Mobile Zone in Fatehabad?',
    'faq.a1': 'We stock 100% genuine Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme, and Nothing smartphones, along with certified smartwatches and audio gear at Palika Bazar, Fatehabad.',
    'faq.q2': 'Which EMI and financing partners are accepted at the store?',
    'faq.a2': 'You can get fast in-store EMI approval through Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp, and DMI Finance using just your Aadhaar card and bank details.',
    'faq.q3': 'Can I exchange my old phone for a new flagship smartphone?',
    'faq.a3': 'Yes. Bring your working old smartphone for a transparent hardware check at our Palika Bazar store, and we deduct the trade-in value immediately from your new phone price.',
    'faq.q4': 'Do smartphones include an official GST bill and brand warranty?',
    'faq.a4': 'Every brand-new sealed handset includes an official GST invoice and pan-India manufacturer warranty. Select Open Box devices also pass a full multi-point hardware check.',
    'faq.q5': 'Where is Khatri Mobile Zone located and how can I check live stock?',
    'faq.a5': 'Visit us at Palika Bazar, Fatehabad, Haryana 125050 (Mon–Sat, 10:00 AM to 9:00 PM) or tap WhatsApp Deal on any listed model for real-time price and color confirmation.',
  },

  hi: {
    // Nav
    'nav.store': 'होम',
    'nav.deals': 'ऑफर',
    'nav.stock': 'स्टॉक',
    'nav.partners': 'फाइनेंस',
    'nav.why': 'सुविधाएं',
    'nav.gallery': 'गैलरी',
    'nav.visit': 'संपर्क',
    'nav.about': 'हमारे बारे में',
    'nav.faq': 'सवाल-जवाब',
    'nav.browse': 'स्टॉक देखें',
    'nav.whatsapp': 'व्हाट्सएप करें',

    // Hero
    'hero.badge': 'लाइव स्टॉक · फतेहाबाद, हरियाणा',
    'hero.title': 'खत्री मोबाइल ज़ोन.',
    'hero.tagline': 'फ्लैगशिप फोन, सही और वाजिब दाम पर।',
    'hero.desc': '100% सील पैक ओरिजिनल स्मार्टफोन, पुराने फोन का सबसे ज्यादा एक्सचेंज रेट और आसान ईएमआई। दुकान पर आएं या सीधे व्हाट्सएप से मंगाएं।',
    'hero.whatsapp_cta': 'व्हाट्सएप पर बात करें',
    'hero.browse_cta': 'सभी मोबाइल देखें',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'ओरिजिनल सील पैक',
    'hero.stat1_desc': 'पक्के बिल और कंपनी वारंटी के साथ',
    'hero.stat2_metric': 'आसान EMI',
    'hero.stat2_label': 'टॉप फाइनेंस पार्टनर्स',
    'hero.stat2_desc': 'बजाज, IDFC, HDB, पूनावाला व DMI',
    'hero.stat3_metric': 'तुरंत ₹ कैश',
    'hero.stat3_label': 'पुराना फोन एक्सचेंज',
    'hero.stat3_desc': 'फतेहाबाद में सबसे बढ़िया कीमत',
    'hero.stat4_metric': '10+ साल',
    'hero.stat4_label': 'भरोसेमंद सेवा',
    'hero.stat4_desc': '5,000+ से अधिक संतुष्ट ग्राहक',

    // Marquee
    'marquee.item1': '📱 आईफोन 16 प्रो मैक्स स्टॉक में उपलब्ध',
    'marquee.item2': '🔥 सैमसंग गैलेक्सी S25 अल्ट्रा उपलब्ध',
    'marquee.item3': '💳 आसान किस्तों पर फोन: बजाज, IDFC, HDB, पूनावाला और DMI',
    'marquee.item4': '✅ 100% असली सील पैक हैंडसेट',
    'marquee.item5': '🔄 पुराने फोन की सबसे ज्यादा एक्सचेंज वैल्यू',
    'marquee.item6': '🎁 मुफ्त टेम्पर्ड ग्लास और बैक कवर सेटअप',
    'marquee.item7': '📍 पालिका बाजार, फतेहाबाद, हरियाणा',

    // Deals
    'deals.eyebrow': 'खास छूट',
    'deals.title': 'धमाकेदार फ्लैगशिप ऑफर्स।',
    'deals.card_badge': 'विशेष ऑफर',
    'deals.card_title': 'आज ही अपना फोन अपग्रेड करें।',
    'deals.card_desc': 'पुराने फोन के बदले ₹15,000 तक की छूट, साथ में आसान किस्तों की सुविधा।',
    'deals.card_btn': 'ऑफर वाले फोन देखें →',

    // Financing Partners
    'finance.eyebrow': 'फाइनेंस सुविधाएं',
    'finance.title': 'आसान किस्तों पर ले जाएं कोई भी स्मार्टफोन।',
    'finance.desc': 'भारत की सबसे बड़ी फाइनेंस कंपनियों के साथ तुरंत अप्रूवल। सिर्फ 5 मिनट में आसान किस्तों पर फोन ले जाएं।',
    'finance.approval_time': 'दुकान पर सिर्फ 5 मिनट में अप्रूवल',
    'finance.docs': 'सिर्फ आधार कार्ड व बैंक खाते की जरूरत',

    // Stock
    'stock.eyebrow': 'लाइव स्टॉक',
    'stock.title': 'फतेहाबाद में उपलब्ध फोन।',
    'stock.count': 'फोन अभी तैयार हैं',
    'stock.search_placeholder': 'मॉडल या ब्रांड का नाम लिखें (जैसे iPhone 15, S24)...',
    'stock.brand': 'ब्रांड:',
    'stock.condition': 'कंडीशन:',
    'stock.sort': 'क्रमबद्ध करें:',
    'stock.sort_featured': 'खास फोन पहले',
    'stock.sort_asc': 'कीमत: कम से ज्यादा',
    'stock.sort_desc': 'कीमत: ज्यादा से कम',
    'stock.in_stock': 'स्टॉक में है',
    'stock.sold_out': 'बिक चुका है',
    'stock.btn_enquire': 'व्हाट्सएप पर पूछें',
    'stock.empty_title': 'कोई फोन नहीं मिला',
    'stock.empty_desc': 'कृपया फिल्टर हटाएं या सीधे व्हाट्सएप पर नए आने वाले स्टॉक की जानकारी लें।',
    'stock.reset_btn': 'फिल्टर हटाएं',

    // Bento / Benefits
    'why.eyebrow': 'हमारी खासियत',
    'why.title': 'फतेहाबाद के समझदार ग्राहकों की पहली पसंद।',
    'why.desc': 'हाथ में फोन चलाकर देखें, असली बिल लें और साथ में पूरा डेटा ट्रांसफर करवाएं।',
    'why.emi_badge': 'आसान किस्तें',
    'why.emi_title': 'सभी मोबाइलों पर आसान EMI।',
    'why.emi_desc': 'बजाज फिनसर्व, IDFC फर्स्ट बैंक, HDB, पूनावाला फिनकॉर्प और DMI फाइनेंस से तुरंत किस्त करवाएं।',
    'why.genuine_title': '100% असली सील पैक',
    'why.genuine_desc': 'कोई पुराना या डिब्बा खुला फोन नहीं। हर फोन पर जीएसटी बिल और पूरे भारत में कंपनी वारंटी।',
    'why.setup_title': 'डेटा ट्रांसफर व कवर बिल्कुल मुफ्त',
    'why.setup_desc': 'स्क्रीन गार्ड, बैक कवर और पुराने फोन का सारा डेटा नए फोन में हमारे कारीगर फ्री में डालते हैं।',
    'why.exchange_badge': 'एक्सचेंज ऑफर',
    'why.exchange_title': 'पुराने फोन की सबसे अच्छी कीमत।',
    'why.exchange_desc': 'अपना पुराना फोन लाएं, सही चेक करवाएं और नए फोन की कीमत में तुरंत पैसे कम करवाएं।',

    // Contact
    'contact.eyebrow': 'पधारें',
    'contact.title': 'दुकान पर पधारें या मैसेज करें।',
    'contact.desc': 'फोन हाथ में पकड़ें, कैमरा चेक करें और संतुष्ट होकर खरीदें। आपका हमेशा स्वागत है।',
    'contact.location_title': 'दुकान का पता',
    'contact.hours_title': 'खुलने का समय',
    'contact.hours_val': 'सुबह 10:00 से रात 9:00 बजे (सातों दिन)',
    'contact.helpline_title': 'सीधा फोन करें',
    'contact.form_title': 'तुरंत व्हाट्सएप पूछताछ',
    'contact.form_desc': 'अपनी पसंद का फोन लिखें, हम तुरंत सही कीमत और उपलब्धता बताएंगे।',
    'contact.form_name': 'आपका नाम',
    'contact.form_phone': 'कौन सा मोबाइल चाहिए',
    'contact.form_purpose': 'पूछताछ का विषय',
    'contact.form_submit': 'व्हाट्सएप चैट शुरू करें',

    // Footer
    'footer.tagline': 'फतेहाबाद का भरोसेमंद मोबाइल ठिकाना। पक्का बिल, सही दाम, हमेशा आपकी सेवा में।',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',

    // FAQ
    'faq.eyebrow': 'खरीदारी गाइड',
    'faq.title': 'अक्सर पूछे जाने वाले सवाल।',
    'faq.desc': 'फतेहाबाद में स्मार्टफोन खरीदने, आसान EMI पार्टनर्स और पुराने फोन एक्सचेंज से जुड़े जरूरी सवालों के जवाब।',
    'faq.q1': 'फतेहाबाद में खत्री मोबाइल ज़ोन पर कौन से मोबाइल ब्रांड उपलब्ध हैं?',
    'faq.a1': 'पालका बाजार, फतेहाबाद में Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme और Nothing के साथ स्मार्टवॉच व ऑडियो प्रोडक्ट्स उपलब्ध हैं।',
    'faq.q2': 'स्टोर पर कौन-कौन से EMI और फाइनेंस पार्टनर उपलब्ध हैं?',
    'faq.a2': 'आप Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp और DMI Finance के जरिए आधार कार्ड व बैंक खाते से तुरंत EMI अप्रूवल पा सकते हैं।',
    'faq.q3': 'क्या मैं अपना पुराना फोन एक्सचेंज कर सकता हूं?',
    'faq.a3': 'जी हां, अपना पुराना फोन लेकर आएं। हम पारदर्शी चेक के बाद तुरंत उसकी कीमत नए फोन के बिल में कम कर देते हैं।',
    'faq.q4': 'क्या हर फोन के साथ पक्का GST बिल और वारंटी मिलती है?',
    'faq.a4': 'हर नए सील पैक फोन पर पक्का GST बिल और पूरे भारत में मान्य कंपनी वारंटी मिलती है।',
    'faq.q5': 'खत्री मोबाइल ज़ोन का पता और समय क्या है?',
    'faq.a5': 'पालका बाजार, फतेहाबाद, हरियाणा 125050 (सोमवार से शनिवार, सुबह 10 से रात 9 बजे तक)। किसी भी मॉडल की लाइव कीमत के लिए सीधे WhatsApp करें।',
  },

  pa: {
    // Nav
    'nav.store': 'ਹੋਮ',
    'nav.deals': 'ਆਫਰ',
    'nav.stock': 'ਸਟਾਕ',
    'nav.partners': 'ਫਾਈਨਾਂਸ',
    'nav.why': 'ਸਹੂਲਤਾਂ',
    'nav.gallery': 'ਗੈਲਰੀ',
    'nav.visit': 'ਸੰਪਰਕ',
    'nav.about': 'ਸਾਡੇ ਬਾਰੇ',
    'nav.faq': 'ਸਵਾਲ-ਜਵਾਬ',
    'nav.browse': 'ਸਟਾਕ ਵੇਖੋ',
    'nav.whatsapp': 'ਵਟਸਐਪ ਕਰੋ',

    // Hero
    'hero.badge': 'ਲਾਈਵ ਸਟਾਕ · ਫਤਿਹਾਬਾਦ, ਹਰਿਆਣਾ',
    'hero.title': 'ਖੱਤਰੀ ਮੋਬਾਈਲ ਜ਼ੋਨ.',
    'hero.tagline': 'ਫਲੈਗਸ਼ਿਪ ਫੋਨ, ਸਹੀ ਅਤੇ ਵਾਜਬ ਰੇਟ ਤੇ।',
    'hero.desc': '100% ਅਸਲੀ ਸੀਲ ਪੈਕ ਸਮਾਰਟਫੋਨ, ਪੁਰਾਣੇ ਫੋਨ ਦਾ ਸਭ ਤੋਂ ਵੱਧ ਮੁੱਲ ਅਤੇ ਸੌਖੀਆਂ ਕਿਸ਼ਤਾਂ। ਦੁਕਾਨ ਤੇ ਆਓ ਜਾਂ ਸਿੱਧਾ ਵਟਸਐਪ ਤੇ ਮੰਗਵਾਓ।',
    'hero.whatsapp_cta': 'ਵਟਸਐਪ ਤੇ ਗੱਲ ਕਰੋ',
    'hero.browse_cta': 'ਸਾਰੇ ਫੋਨ ਵੇਖੋ',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'ਅਸਲੀ ਸੀਲ ਪੈਕ',
    'hero.stat1_desc': 'ਪੱਕੇ ਬਿੱਲ ਅਤੇ ਕੰਪਨੀ ਵਾਰੰਟੀ ਨਾਲ',
    'hero.stat2_metric': 'ਸੌਖੀ ਕਿਸ਼ਤ',
    'hero.stat2_label': 'ਫਾਈਨਾਂਸ ਪਾਰਟਨਰ',
    'hero.stat2_desc': 'ਬਜਾਜ, IDFC, HDB, ਪੂਨਾਵਾਲਾ ਤੇ DMI',
    'hero.stat3_metric': 'ਤੁਰੰਤ ਰੁਪਏ',
    'hero.stat3_label': 'ਪੁਰਾਣਾ ਫੋਨ ਐਕਸਚੇਂਜ',
    'hero.stat3_desc': 'ਫਤਿਹਾਬਾਦ ਚ ਸਭ ਤੋਂ ਵੱਧ ਮੁੱਲ',
    'hero.stat4_metric': '10+ ਸਾਲ',
    'hero.stat4_label': 'ਪੱਕਾ ਭਰੋਸਾ',
    'hero.stat4_desc': '5,000+ ਸੰਤੁਸ਼ਟ ਗਾਹਕ',

    // Marquee
    'marquee.item1': '📱 ਆਈਫੋਨ 16 ਪ੍ਰੋ ਮੈਕਸ ਸਟਾਕ ਚ ਉਪਲਬਧ',
    'marquee.item2': '🔥 ਸੈਮਸੰਗ ਗਲੈਕਸੀ S25 ਅਲਟਰਾ ਤਿਆਰ ਹੈ',
    'marquee.item3': '💳 ਸੌਖੀਆਂ ਕਿਸ਼ਤਾਂ: ਬਜਾਜ, IDFC, HDB, ਪੂਨਾਵਾਲਾ ਅਤੇ DMI ਫਾਈਨਾਂਸ',
    'marquee.item4': '✅ 100% ਅਸਲੀ ਸੀਲ ਬੰਦ ਹੈਂਡਸੈੱਟ',
    'marquee.item5': '🔄 ਪੁਰਾਣੇ ਫੋਨ ਦਾ ਸਭ ਤੋਂ ਵੱਧ ਭਾਅ',
    'marquee.item6': '🎁 ਟੈਂਪਰਡ ਗਲਾਸ ਅਤੇ ਬੈਕ ਕਵਰ ਮੁਫਤ',
    'marquee.item7': '📍 ਪਾਲਿਕਾ ਬਾਜ਼ਾਰ, ਫਤਿਹਾਬਾਦ, ਹਰਿਆਣਾ',

    // Deals
    'deals.eyebrow': 'ਖਾਸ ਆਫਰ',
    'deals.title': 'ਧਮਾਕੇਦਾਰ ਸਮਾਰਟਫੋਨ ਆਫਰ।',
    'deals.card_badge': 'ਸਪੈਸ਼ਲ ਆਫਰ',
    'deals.card_title': 'ਅੱਜ ਹੀ ਆਪਣਾ ਫੋਨ ਬਦਲੋ।',
    'deals.card_desc': 'ਪੁਰਾਣੇ ਫੋਨ ਤੇ ₹15,000 ਤੱਕ ਦੀ ਬਚਤ, ਨਾਲੇ ਸੌਖੀਆਂ ਕਿਸ਼ਤਾਂ ਦੀ ਸਹੂਲਤ।',
    'deals.card_btn': 'ਆਫਰ ਵਾਲੇ ਫੋਨ ਵੇਖੋ →',

    // Financing Partners
    'finance.eyebrow': 'ਫਾਈਨਾਂਸ ਸਹੂਲਤ',
    'finance.title': 'ਸੌਖੀਆਂ ਕਿਸ਼ਤਾਂ ਤੇ ਘਰ ਲੈ ਜਾਓ ਨਵਾਂ ਫੋਨ।',
    'finance.desc': 'ਦੇਸ਼ ਦੀਆਂ ਵੱਡੀਆਂ ਫਾਈਨਾਂਸ ਕੰਪਨੀਆਂ ਰਾਹੀਂ ਸਿਰਫ 5 ਮਿੰਟਾਂ ਵਿੱਚ ਫੋਨ ਫਾਈਨਾਂਸ ਕਰਵਾਓ।',
    'finance.approval_time': 'ਦੁਕਾਨ ਤੇ 5 ਮਿੰਟ ਚ ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ',
    'finance.docs': 'ਸਿਰਫ ਆਧਾਰ ਕਾਰਡ ਤੇ ਬੈਂਕ ਵੇਰਵਾ ਲੋੜੀਂਦਾ',

    // Stock
    'stock.eyebrow': 'ਲਾਈਵ ਸਟਾਕ',
    'stock.title': 'ਫਤਿਹਾਬਾਦ ਚ ਉਪਲਬਧ ਸਟਾਕ।',
    'stock.count': 'ਫੋਨ ਹੁਣੇ ਉਪਲਬਧ ਹਨ',
    'stock.search_placeholder': 'ਫੋਨ ਜਾਂ ਮਾਡਲ ਲਿਖੋ (ਜਿਵੇਂ iPhone, S24)...',
    'stock.brand': 'ਬ੍ਰਾਂਡ:',
    'stock.condition': 'ਹਾਲਤ:',
    'stock.sort': 'ਤਰਤੀਬ:',
    'stock.sort_featured': 'ਖਾਸ ਫੋਨ ਪਹਿਲਾਂ',
    'stock.sort_asc': 'ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ',
    'stock.sort_desc': 'ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ',
    'stock.in_stock': 'ਸਟਾਕ ਚ ਹੈ',
    'stock.sold_out': 'ਵਿਕ ਚੁੱਕਾ ਹੈ',
    'stock.btn_enquire': 'ਵਟਸਐਪ ਤੇ ਪੁੱਛੋ',
    'stock.empty_title': 'ਕੋਈ ਫੋਨ ਨਹੀਂ ਲੱਭਿਆ',
    'stock.empty_desc': 'ਫਿਲਟਰ ਸਾਫ ਕਰੋ ਜਾਂ ਵਟਸਐਪ ਤੇ ਨਵੇਂ ਸਟਾਕ ਦੀ ਪੁੱਛ-ਗਿੱਛ ਕਰੋ।',
    'stock.reset_btn': 'ਫਿਲਟਰ ਹਟਾਓ',

    // Bento / Benefits
    'why.eyebrow': 'ਸਾਡੀ ਵਿਸ਼ੇਸ਼ਤਾ',
    'why.title': 'ਫਤਿਹਾਬਾਦ ਦੇ ਲੋਕਾਂ ਦਾ ਪਹਿਲਾ ਭਰੋਸਾ।',
    'why.desc': 'ਫੋਨ ਚੈੱਕ ਕਰਕੇ ਲਵੋ, ਪੱਕਾ ਬਿੱਲ ਲਵੋ ਅਤੇ ਡਾਟਾ ਬਿਲਕੁਲ ਮੁਫਤ ਟਰਾਂਸਫਰ ਕਰਵਾਓ।',
    'why.emi_badge': 'ਸੌਖੀ ਕਿਸ਼ਤ',
    'why.emi_title': 'ਸਾਰੇ ਫੋਨਾਂ ਤੇ ਤੁਰੰਤ ਕਿਸ਼ਤਾਂ।',
    'why.emi_desc': 'ਬਜਾਜ, IDFC, HDB, ਪੂਨਾਵਾਲਾ ਤੇ DMI ਫਾਈਨਾਂਸ ਰਾਹੀਂ ਮਿੰਟਾਂ ਚ ਫੋਨ ਘਰ ਲੈ ਜਾਓ।',
    'why.genuine_title': '100% ਅਸਲੀ ਸੀਲ ਬੰਦ',
    'why.genuine_desc': 'ਕੋਈ ਖੁੱਲ੍ਹਾ ਜਾਂ ਨਕਲੀ ਮਾਲ ਨਹੀਂ। ਹਰ ਫੋਨ ਦਾ ਜੀਐਸਟੀ ਬਿੱਲ ਅਤੇ ਕੰਪਨੀ ਵਾਰੰਟੀ।',
    'why.setup_title': 'ਡਾਟਾ ਤੇ ਸਕ੍ਰੀਨ ਗਾਰਡ ਬਿਲਕੁਲ ਫ੍ਰੀ',
    'why.setup_desc': 'ਸਕ੍ਰੀਨ ਗਲਾਸ, ਕਵਰ ਅਤੇ ਪੁਰਾਣੇ ਫੋਨ ਦਾ ਸਾਰਾ ਡਾਟਾ ਸਾਡੀ ਟੀਮ ਮੁਫਤ ਪਾ ਕੇ ਦਿੰਦੀ ਹੈ।',
    'why.exchange_badge': 'ਐਕਸਚੇਂਜ ਆਫਰ',
    'why.exchange_title': 'ਪੁਰਾਣੇ ਮੋਬਾਈਲ ਦਾ ਪੂਰਾ ਮੁੱਲ।',
    'why.exchange_desc': 'ਪੁਰਾਣਾ ਫੋਨ ਲਿਆਓ, ਸਹੀ ਚੈੱਕ ਕਰਵਾਓ ਤੇ ਨਵੇਂ ਫੋਨ ਚੋਂ ਮੌਕੇ ਤੇ ਪੈਸੇ ਘਟਵਾਓ।',

    // Contact
    'contact.eyebrow': 'ਆਓ ਜੀ',
    'contact.title': 'ਦੁਕਾਨ ਤੇ ਆਓ ਜਾਂ ਮੈਸੇਜ ਕਰੋ।',
    'contact.desc': 'ਫੋਨ ਹੱਥ ਚ ਫੜ ਕੇ ਵੇਖੋ, ਕੈਮਰਾ ਚਲਾਓ ਅਤੇ ਖੁਸ਼ ਹੋ ਕੇ ਖਰੀਦੋ।',
    'contact.location_title': 'ਦੁਕਾਨ ਦਾ ਪਤਾ',
    'contact.hours_title': 'ਸਮਾਂ',
    'contact.hours_val': 'ਸਵੇਰੇ 10:00 ਤੋਂ ਰਾਤ 9:00 ਵਜੇ (ਰੋਜ਼ਾਨਾ)',
    'contact.helpline_title': 'ਸਿੱਧਾ ਫੋਨ ਕਰੋ',
    'contact.form_title': 'ਵਟਸਐਪ ਤੇ ਤੁਰੰਤ ਪੁੱਛੋ',
    'contact.form_desc': 'ਜਿਹੜਾ ਫੋਨ ਚਾਹੀਦਾ ਹੈ ਦੱਸੋ, ਅਸੀਂ ਤੁਰੰਤ ਰੇਟ ਦੱਸਾਂਗੇ।',
    'contact.form_name': 'ਤੁਹਾਡਾ ਨਾਮ',
    'contact.form_phone': 'ਕਿਹੜਾ ਮਾਡਲ ਚਾਹੀਦਾ ਹੈ',
    'contact.form_purpose': 'ਗੱਲਬਾਤ ਦਾ ਵਿਸ਼ਾ',
    'contact.form_submit': 'ਵਟਸਐਪ ਸ਼ੁਰੂ ਕਰੋ',

    // Footer
    'footer.tagline': 'ਫਤਿਹਾਬਾਦ ਦਾ ਭਰੋਸੇਮੰਦ ਮੋਬਾਈਲ ਕੇਂਦਰ। ਸਹੀ ਮੁੱਲ, ਪੱਕਾ ਬਿੱਲ।',
    'footer.rights': 'ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',

    // FAQ
    'faq.eyebrow': 'ਖਰੀਦਦਾਰੀ ਗਾਈਡ',
    'faq.title': 'ਆਮ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ।',
    'faq.desc': 'ਫਤਿਹਾਬਾਦ ਵਿੱਚ ਸਮਾਰਟਫੋਨ, ਆਸਾਨ ਕਿਸ਼ਤਾਂ ਅਤੇ ਪੁਰਾਣੇ ਫੋਨ ਐਕਸਚੇਂਜ ਬਾਰੇ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ।',
    'faq.q1': 'ਖੱਤਰੀ ਮੋਬਾਈਲ ਜ਼ੋਨ ਫਤਿਹਾਬਾਦ ਵਿੱਚ ਕਿਹੜੇ ਬ੍ਰਾਂਡ ਮਿਲਦੇ ਹਨ?',
    'faq.a1': 'ਪਾਲਿਕਾ ਬਾਜ਼ਾਰ, ਫਤਿਹਾਬਾਦ ਵਿਖੇ Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme ਤੇ Nothing ਫੋਨ ਅਤੇ ਸਮਾਰਟਵਾਚ ਉਪਲਬਧ ਹਨ।',
    'faq.q2': 'ਕਿਹੜੀਆਂ ਫਾਈਨਾਂਸ ਕੰਪਨੀਆਂ ਤੋਂ ਕਿਸ਼ਤ ਹੋ ਜਾਂਦੀ ਹੈ?',
    'faq.a2': 'Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp ਅਤੇ DMI Finance ਰਾਹੀਂ ਆਧਾਰ ਕਾਰਡ ਤੇ ਬੈਂਕ ਖਾਤੇ ਨਾਲ ਤੁਰੰਤ EMI ਮਿਲਦੀ ਹੈ।',
    'faq.q3': 'ਕੀ ਪੁਰਾਣਾ ਫੋਨ ਬਦਲ ਕੇ ਨਵਾਂ ਲਿਆ ਜਾ ਸਕਦਾ ਹੈ?',
    'faq.a3': 'ਹਾਂ ਜੀ, ਆਪਣਾ ਪੁਰਾਣਾ ਫੋਨ ਲਿਆਓ, ਮੌਕੇ ਤੇ ਸਹੀ ਜਾਂਚ ਤੋਂ ਬਾਅਦ ਪੂਰਾ ਮੁੱਲ ਨਵੇਂ ਫੋਨ ਵਿੱਚੋਂ ਘਟਾ ਦਿੱਤਾ ਜਾਵੇਗਾ।',
    'faq.q4': 'ਕੀ ਹਰ ਫੋਨ ਨਾਲ ਪੱਕਾ GST ਬਿੱਲ ਮਿਲਦਾ ਹੈ?',
    'faq.a4': 'ਹਰ ਨਵੇਂ ਸੀਲ ਬੰਦ ਫੋਨ ਨਾਲ ਪੱਕਾ GST ਬਿੱਲ ਅਤੇ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਕੰਪਨੀ ਦੀ ਅਧਿਕਾਰਤ ਵਾਰੰਟੀ ਮਿਲਦੀ ਹੈ।',
    'faq.q5': 'ਪਤਾ ਅਤੇ ਖੁੱਲ੍ਹਣ ਦਾ ਸਮਾਂ ਕੀ ਹੈ?',
    'faq.a5': 'ਪਾਲਿਕਾ ਬਾਜ਼ਾਰ, ਫਤਿਹਾਬਾਦ, ਹਰਿਆਣਾ 125050 (ਸੋਮਵਾਰ ਤੋਂ ਸ਼ਨੀਵਾਰ, ਸਵੇਰੇ 10 ਤੋਂ ਰਾਤ 9 ਵਜੇ)। ਤਾਜ਼ਾ ਰੇਟ ਲਈ ਸਿੱਧਾ ਵਟਸਐਪ ਕਰੋ।',
  },

  hr: {
    // Nav
    'nav.store': 'घर',
    'nav.deals': 'ऑफर',
    'nav.stock': 'स्टॉक',
    'nav.partners': 'किस्त-फाइनेंस',
    'nav.why': 'फायदे',
    'nav.gallery': 'फोटो',
    'nav.visit': 'पता',
    'nav.about': 'म्हारे बारे म',
    'nav.faq': 'सवाल-जवाब',
    'nav.browse': 'फोन देखो',
    'nav.whatsapp': 'व्हाट्सएप करो',

    // Hero
    'hero.badge': 'ताज़ा स्टॉक · फतेहाबाद, हरियाणे म',
    'hero.title': 'खत्री मोबाइल ज़ोन.',
    'hero.tagline': 'तगड़े फोन, जमा सही और वाजिब रेट प।',
    'hero.desc': '100% सील पैक असली फोन, पुराने फोन का हरियाणे म सबसे घना रेट और आसान किश्ता। दुकान प आके देख लो चाहे घर बैठे व्हाट्सएप प मंगा लो।',
    'hero.whatsapp_cta': 'व्हाट्सएप प बात करो',
    'hero.browse_cta': 'सारे फोन देख लो',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'सील पैक पक्का सौदा',
    'hero.stat1_desc': 'पक्का बिल अर कंपनी वारंटी गेल',
    'hero.stat2_metric': 'आसान किस्त',
    'hero.stat2_label': 'तगड़े फाइनेंस पार्टनर',
    'hero.stat2_desc': 'बजाज, IDFC, HDB, पूनावाला व DMI',
    'hero.stat3_metric': 'हाथो-हाथ ₹',
    'hero.stat3_label': 'पुराणा फोन बदलो',
    'hero.stat3_desc': 'फतेहाबाद म सबसे बढ़िया भाव',
    'hero.stat4_metric': '10+ साल',
    'hero.stat4_label': 'भाइयों का भरोसा',
    'hero.stat4_desc': '5,000+ ताईं खुश ग्राहक',

    // Marquee
    'marquee.item1': '📱 आईफोन 16 प्रो मैक्स तैयार खड़ा सै',
    'marquee.item2': '🔥 सैमसंग S25 अल्ट्रा हाजिर सै',
    'marquee.item3': '💳 किश्ता की मौज: बजाज, IDFC, HDB, पूनावाला अर DMI',
    'marquee.item4': '✅ जमा असली सील पैक डिब्बा',
    'marquee.item5': '🔄 पुराणे फोन का सबसे घना रेट',
    'marquee.item6': '🎁 टेम्पर्ड ग्लास अर बैक कवर जमा फ्री',
    'marquee.item7': '📍 पालिका बाजार, फतेहाबाद, हरियाणा',

    // Deals
    'deals.eyebrow': 'खास छूट',
    'deals.title': 'तगड़े मोबाइल ऑफर्स।',
    'deals.card_badge': 'खास छूट',
    'deals.card_title': 'आज ए नया फोन ठा लो भाई।',
    'deals.card_desc': 'पुराणे फोन प ₹15,000 ताईं की बचत, अर किश्ता की जमा सीधी सुविधा।',
    'deals.card_btn': 'छूट वाले फोन देखो →',

    // Financing Partners
    'finance.eyebrow': 'किस्त सुविधा',
    'finance.title': 'आसान किश्ता प ले ज्याओ कोई सा बी फोन।',
    'finance.desc': 'बजाज, IDFC, HDB, पूनावाला अर DMI गेल सिर्फ 5 मिनट म किस्त मंजूर। ज्यादा कागज की कोई टेंशन कोन्या।',
    'finance.approval_time': 'दुकान प 5 मिनट म किस्त पास',
    'finance.docs': 'सिर्फ आधार कार्ड अर बैंक खाता चाहिए',

    // Stock
    'stock.eyebrow': 'दुकान का स्टॉक',
    'stock.title': 'फतेहाबाद म हाजिर फोन।',
    'stock.count': 'फोन आज तैयार खड़े सैं',
    'stock.search_placeholder': 'फोन या कंपनी का नाम लिखो (जणु iPhone, Galaxy)...',
    'stock.brand': 'कंपनी:',
    'stock.condition': 'हालत:',
    'stock.sort': 'छंटाई:',
    'stock.sort_featured': 'खास फोन पैहलां',
    'stock.sort_asc': 'रेट: कम त ज्यादा',
    'stock.sort_desc': 'रेट: ज्यादा त कम',
    'stock.in_stock': 'हाजिर सै',
    'stock.sold_out': 'बिक ग्या',
    'stock.btn_enquire': 'व्हाट्सएप प पूछो',
    'stock.empty_title': 'कोई फोन कोन्या मिल्या',
    'stock.empty_desc': 'फिल्टर हटा के देखो या सीधे व्हाट्सएप प पूछ लो भाई।',
    'stock.reset_btn': 'फिल्टर हटाओ',

    // Bento / Benefits
    'why.eyebrow': 'अपनी खासियत',
    'why.title': 'हरियाणे के भाईयों की पहली पसंद।',
    'why.desc': 'हाथ म फोन चलाके तसल्ली करो, पक्का बिल ल्यो अर डाटा जमा फ्री म ट्रांसफर करवाओ।',
    'why.emi_badge': 'किस्त सुविधा',
    'why.emi_title': 'सारे फोनां प आसान किस्त।',
    'why.emi_desc': 'बजाज फिनसर्व, IDFC, HDB, पूनावाला अर DMI गेल मिनट म फोन घरै ले ज्याओ।',
    'why.genuine_title': '100% असली सील पैक',
    'why.genuine_desc': 'कोई खुला या नक्का माल कोन्या। पक्का जीएसटी बिल अर पूरे भारत म वारंटी।',
    'why.setup_title': 'डाटा अर कवर जमा फ्री',
    'why.setup_desc': 'स्क्रीन ग्लास, बैक कवर अर पुराने फोन का सारा डाटा अपने भाई फ्री म चढ़ा के देवे सैं।',
    'why.exchange_badge': 'पुराणा बदलो',
    'why.exchange_title': 'पुराणे फोन का जमा खरा भाव।',
    'why.exchange_desc': 'पुराणा फोन ल्याओ, चेक करवाओ अर नए फोन म हाथो-हाथ पैसे कटवाओ।',

    // Contact
    'contact.eyebrow': 'आओ भाई',
    'contact.title': 'दुकान प पधारो या फोन घुमाओ।',
    'contact.desc': 'हाथ म फोन चलाके देखो, कैमरा परखो अर राजी होके ले ज्याओ।',
    'contact.location_title': 'दुकान का पता',
    'contact.hours_title': 'खुलण का टैम',
    'contact.hours_val': 'सवेरे 10 त रात 9 बजे तांई (सातों दिन)',
    'contact.helpline_title': 'सीधा फोन मिलाओ',
    'contact.form_title': 'व्हाट्सएप प पूछो',
    'contact.form_desc': 'जो फोन चाहिए लिख द्यो, तुरंत सही रेट बता द्वांगे।',
    'contact.form_name': 'थारा नाम',
    'contact.form_phone': 'कौण सा फोन चाहिए',
    'contact.form_purpose': 'बातचीत का काम',
    'contact.form_submit': 'व्हाट्सएप चैट खोलो',

    // Footer
    'footer.tagline': 'फतेहाबाद का पक्का अर सच्चा ठिकाणा। खरा माल, सही भाव।',
    'footer.rights': 'सारे हक सुरक्षित सैं।',

    // FAQ
    'faq.eyebrow': 'खास जानकारी',
    'faq.title': 'आमतौर प पूछे जावण वाले सवाल।',
    'faq.desc': 'फतेहाबाद म फोन खरीदण, किश्ता अर पुराणे फोन बदलण बारे जरूरी सवालां के जवाब।',
    'faq.q1': 'फतेहाबाद म खत्री मोबाइल ज़ोन प कौण-सी कंपनी के फोन मिलैं सैं?',
    'faq.a1': 'पालिका बाजार, फतेहाबाद म Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme अर Nothing के साथ स्मार्टवॉच भी मिलैं सैं।',
    'faq.q2': 'किस्त करवाण खातर कौण से फाइनेंस पार्टनर सैं?',
    'faq.a2': 'Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp अर DMI Finance गेल आधार कार्ड अर बैंक खाते प तुरंत किस्त हो ज्या सै।',
    'faq.q3': 'के पुराणा फोन बदल क नया फोन मिल ज्यागा?',
    'faq.a3': 'हाँ भाई, पुराणा फोन ले आओ। साची जांच के बाद पूरा भाव नए फोन म हाथो-हाथ कम हो ज्यागा।',
    'faq.q4': 'के पक्का GST बिल अर वारंटी मिलेगी?',
    'faq.a4': 'हर नए सील पैक फोन गेल पक्का GST बिल अर पूरे भारत म कंपनी वारंटी मिलां सै।',
    'faq.q5': 'पता अर खुलण का टैम के सै?',
    'faq.a5': 'पालिका बाजार, फतेहाबाद, हरियाणा 125050 (सोमवार त शनिवार, सवेरे 10 त रात 9 बजे)। रेट पूछण खातर सीधे व्हाट्सएप करो।',
  },

  raj: {
    // Nav
    'nav.store': 'मुखपृष्ठ',
    'nav.deals': 'छूट-ऑफर',
    'nav.stock': 'स्टॉक',
    'nav.partners': 'किस्त-फाइनेंस',
    'nav.why': 'खासियत',
    'nav.gallery': 'तस्वीरां',
    'nav.visit': 'पधारो',
    'nav.about': 'म्हांरे बारे म',
    'nav.faq': 'सवाल-जवाब',
    'nav.browse': 'स्टॉक देखो',
    'nav.whatsapp': 'व्हाट्सएप करो',

    // Hero
    'hero.badge': 'हाजिर स्टॉक · फतेहाबाद, हरियाणा',
    'hero.title': 'खत्री मोबाइल ज़ोन.',
    'hero.tagline': 'बढ़िया फोन, सही अर वाजिब मोल प।',
    'hero.desc': '100% सील पैक असल स्मार्टफोन, जुना फोन रो घणो भाव अर आसान किश्ता रो भरोसो। दुकान प पधारो या सीधा व्हाट्सएप सू मंगाओ सा।',
    'hero.whatsapp_cta': 'व्हाट्सएप प पूछो सा',
    'hero.browse_cta': 'सगळा मोबाइल देखो',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'सील पैक असल माल',
    'hero.stat1_desc': 'पक्को बिल अर कंपनी वारंटी',
    'hero.stat2_metric': 'आसान किस्त',
    'hero.stat2_label': 'फाइनेंस पार्टनर्स',
    'hero.stat2_desc': 'बजाज, IDFC, HDB, पूनावाला व DMI',
    'hero.stat3_metric': 'रोकट ₹',
    'hero.stat3_label': 'जुनो फोन बदलो',
    'hero.stat3_desc': 'फतेहाबाद म सबसूं चोखो मोल',
    'hero.stat4_metric': '10+ बरस',
    'hero.stat4_label': 'अखंड भरोसो',
    'hero.stat4_desc': '5,000+ संतुष्ट ग्राहक',

    // Marquee
    'marquee.item1': '📱 आईफोन 16 प्रो मैक्स तैयार है सा',
    'marquee.item2': '🔥 सैमसंग गैलेक्सी S25 अल्ट्रा हाजिर है',
    'marquee.item3': '💳 किश्ता री सुविधा: बजाज, IDFC, HDB, पूनावाला अर DMI',
    'marquee.item4': '✅ 100% सील बंद हैंडसेट',
    'marquee.item5': '🔄 जुने फोन रो सबसूं चोखो भाव',
    'marquee.item6': '🎁 टेम्पर्ड ग्लास अर कवर बिल्कुल मुफ्त',
    'marquee.item7': '📍 पालिका बाजार, फतेहाबाद, हरियाणा',

    // Deals
    'deals.eyebrow': 'खास छूट',
    'deals.title': 'धमाकेदार फ्लैगशिप ऑफर सा।',
    'deals.card_badge': 'खास ऑफर',
    'deals.card_title': 'आज ही नयो फोन ले पधारो।',
    'deals.card_desc': 'जुना फोन प ₹15,000 ताईं छूट, साथ म किश्ता री सोरी सुविधा।',
    'deals.card_btn': 'ऑफर वाळा फोन देखो →',

    // Financing Partners
    'finance.eyebrow': 'किस्त सुविधा',
    'finance.title': 'आसान किश्तां प ले जाओ फोन।',
    'finance.desc': 'बजाज, IDFC, HDB, पूनावाला अर DMI साथै तुरंत अप्रूवल। सिर्फ 5 मिनट म आसान किश्ता।',
    'finance.approval_time': 'दुकान प 5 मिनट म किस्त पास',
    'finance.docs': 'सिर्फ आधार कार्ड अर बैंक खाता चाहीजे',

    // Stock
    'stock.eyebrow': 'लाइव स्टॉक',
    'stock.title': 'फतेहाबाद म हाजिर फोन।',
    'stock.count': 'फोन अभी तैयार है सा',
    'stock.search_placeholder': 'फोन रो नाम लिखो (जियां iPhone, Galaxy)...',
    'stock.brand': 'कंपनी:',
    'stock.condition': 'हालत:',
    'stock.sort': 'क्रम:',
    'stock.sort_featured': 'खास फोन पैली',
    'stock.sort_asc': 'भाव: कम सू बेसी',
    'stock.sort_desc': 'भाव: बेसी सू कम',
    'stock.in_stock': 'हाजिर है',
    'stock.sold_out': 'बिक ग्यो',
    'stock.btn_enquire': 'व्हाट्सएप प पूछो सा',
    'stock.empty_title': 'कोई फोन कोनी मिल्यो',
    'stock.empty_desc': 'फिल्टर हटाओ या सीधा व्हाट्सएप प जानकारी लेवो सा।',
    'stock.reset_btn': 'फिल्टर हटाओ',

    // Bento / Benefits
    'why.eyebrow': 'म्हारी खासियत',
    'why.title': 'फतेहाबाद रा भाइयां रो पक्को भरोसो।',
    'why.desc': 'हाथ म फोन चलाके देखो, पक्को बिल लेवो अर डेटा ट्रांसफर मुफ्त करावो सा।',
    'why.emi_badge': 'आसान किस्त',
    'why.emi_title': 'सगळा फोन प आसान EMI।',
    'why.emi_desc': 'बजाज, IDFC, HDB, पूनावाला अर DMI साथै मजे सू फोन ले जाओ सा।',
    'why.genuine_title': '100% असल सील पैक',
    'why.genuine_desc': 'कदे कोई डुप्लीकेट माल कोनी मिले। जीएसटी बिल अर पूरी वारंटी।',
    'why.setup_title': 'डेटा व कवर बिल्कुल मुफ्त',
    'why.setup_desc': 'स्क्रीन गार्ड, कवर अर फोन रो पुरो डेटा म्हारी टीम मुफ्त म करसी।',
    'why.exchange_badge': 'एक्सचेंज ऑफर',
    'why.exchange_title': 'जुना फोन रो चोखो भाव।',
    'why.exchange_desc': 'जुनो फोन लाओ, सही चेक कराओ अर नया फोन म रकम कम कराओ।',

    // Contact
    'contact.eyebrow': 'पधारो सा',
    'contact.title': 'दुकान प पधारो या फोन मिलाओ सा।',
    'contact.desc': 'फोन हाथ म लेर देखो, कैमरा परखो अर राजी होके ले जाओ।',
    'contact.location_title': 'दुकान रो पतो',
    'contact.hours_title': 'खुलण रो टैम',
    'contact.hours_val': 'सवार 10 सू रात 9 बजे ताईं (सातों दिन)',
    'contact.helpline_title': 'सीधा फोन करो सा',
    'contact.form_title': 'व्हाट्सएप प पूछो सा',
    'contact.form_desc': 'थारो मनपसंद फोन लिखो, म्हे तुरंत सही भाव बतास्यां।',
    'contact.form_name': 'थारो शुभ नाम',
    'contact.form_phone': 'कौण सो मोबाइल चाहीजे',
    'contact.form_purpose': 'बातचीत रो कारण',
    'contact.form_submit': 'व्हाट्सएप चैट शुरू करो',

    // Footer
    'footer.tagline': 'फतेहाबाद रो भरोसेमंद ठिकाणो। पक्को बिल, सही मोल सा।',
    'footer.rights': 'सगळा अधिकार सुरक्षित है सा।',

    // FAQ
    'faq.eyebrow': 'खरीददारी गाइड',
    'faq.title': 'घणा पूछ्या जावण वाळा सवाल।',
    'faq.desc': 'फतेहाबाद म मोबाइल खरीदण, किश्ता अर जुना फोन बदलण रा जरूरी जवाब।',
    'faq.q1': 'खत्री मोबाइल ज़ोन फतेहाबाद म किस कंपनी रा फोन मिले है?',
    'faq.a1': 'पालिका बाजार, फतेहाबाद म Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Xiaomi, OPPO, Realme अर Nothing रा फोन हाजिर है सा।',
    'faq.q2': 'किश्तां वास्ते किस फाइनेंस कंपनी री सुविधा है?',
    'faq.a2': 'Bajaj Finserv, IDFC FIRST Bank, HDB Financial Services, Poonawalla Fincorp अर DMI Finance सूं आधार कार्ड प तुरंत किस्त बण जावे है।',
    'faq.q3': 'कांई जुनो फोन एक्सचेंज हो जावेला?',
    'faq.a3': 'जी हां सा, जुनो फोन पधारो, जांच के बाद चोखो मोल नया फोन म हाथो-हाथ कम हो जासी।',
    'faq.q4': 'कांई पक्को GST बिल अर वारंटी मिलेला?',
    'faq.a4': 'हर सील पैक नया फोन साथै पक्को GST बिल अर पूरी कंपनी वारंटी मिले है सा।',
    'faq.q5': 'पतो अर खुलण रो टैम कांई है?',
    'faq.a5': 'पालिका बाजार, फतेहाबाद, हरियाणा 125050 (सोमवार सूं शनिवार, सवार 10 सूं रात 9 बजे)। लाइव रेट खातर व्हाट्सएप करो सा।',
  },

  ur: {
    // Nav
    'nav.store': 'ہوم',
    'nav.deals': 'پیشکش',
    'nav.stock': 'اسٹاک',
    'nav.partners': 'فنانسنگ',
    'nav.why': 'خصوصیات',
    'nav.gallery': 'گیلری',
    'nav.visit': 'رابطہ',
    'nav.about': 'ہمارے بارے میں',
    'nav.faq': 'سوالات',
    'nav.browse': 'اسٹاک دیکھیں',
    'nav.whatsapp': 'واٹس ایپ کریں',

    // Hero
    'hero.badge': 'لائیو اسٹاک · فتح آباد، ہریانہ',
    'hero.title': 'کھتری موبائل زون.',
    'hero.tagline': 'بہترین اسمارٹ فونز، مناسب ترین دام پر۔',
    'hero.desc': '100 فیصد اصلی سیل پیک اسمارٹ فونز، پرانے فون کا بہترین ایکسچینج ریٹ اور آسان اقساط۔ تشریف لائیں یا براہ راست واٹس ایپ پر آرڈر کریں۔',
    'hero.whatsapp_cta': 'واٹس ایپ پر رابطہ کریں',
    'hero.browse_cta': 'تمام فونز دیکھیں',
    'hero.stat1_metric': '100%',
    'hero.stat1_label': 'اصلی سیل پیک',
    'hero.stat1_desc': 'پکے بل اور برانڈ وارنٹی کے ساتھ',
    'hero.stat2_metric': 'آسان اقساط',
    'hero.stat2_label': 'فنانس پارٹنرز',
    'hero.stat2_desc': 'بجاج، IDFC، HDB، پوناوالا اور DMI',
    'hero.stat3_metric': 'فوری نقد',
    'hero.stat3_label': 'پرانا فون تبدیل',
    'hero.stat3_desc': 'فتح آباد میں سب سے بہترین قیمت',
    'hero.stat4_metric': '10+ سال',
    'hero.stat4_label': 'قابل اعتماد خدمت',
    'hero.stat4_desc': '5,000 سے زائد مطمئن گاہک',

    // Marquee
    'marquee.item1': '📱 آئی فون 16 پرو میکس اسٹاک میں دستیاب ہے',
    'marquee.item2': '🔥 سیمسنگ گلیکسی S25 الٹرا دستیاب ہے',
    'marquee.item3': '💳 آسان اقساط: بجاج، IDFC، HDB، پوناوالا اور DMI فنانس',
    'marquee.item4': '✅ 100% اصلی سیل بند ہینڈ سیٹ',
    'marquee.item5': '🔄 پرانے فون کی سب سے زیادہ ایکسچینج ویلیو',
    'marquee.item6': '🎁 مفت اسکرین گارڈ اور بیک کور سیٹ اپ',
    'marquee.item7': '📍 پالیکا بازار، فتح آباد، ہریانہ',

    // Deals
    'deals.eyebrow': 'خاص پیشکش',
    'deals.title': 'شاندار فلیگ شپ آفرز۔',
    'deals.card_badge': 'خصوصی آفر',
    'deals.card_title': 'آج ہی اپنا فون اپ گریڈ کریں۔',
    'deals.card_desc': 'پرانے فون کے بدلے ₹15,000 تک کی بچت، ساتھ میں آسان اقساط کی سہولت۔',
    'deals.card_btn': 'آفر والے فونز دیکھیں ←',

    // Financing Partners
    'finance.eyebrow': 'فنانس کی سہولت',
    'finance.title': 'آسان اقساط پر نیا اسمارٹ فون حاصل کریں۔',
    'finance.desc': 'بجاج، IDFC، HDB، پوناوالا اور DMI کے ساتھ محض 5 منٹ میں فوری منظوری۔',
    'finance.approval_time': 'صرف 5 منٹ میں فوری منظوری',
    'finance.docs': 'صرف آدھار کارڈ اور بینک اکاؤنٹ درکار ہے',

    // Stock
    'stock.eyebrow': 'لائیو اسٹاک',
    'stock.title': 'فتح آباد میں دستیاب موبائلز۔',
    'stock.count': 'فونز اس وقت دستیاب ہیں',
    'stock.search_placeholder': 'ماڈل یا برانڈ تلاش کریں...',
    'stock.brand': 'برانڈ:',
    'stock.condition': 'حالت:',
    'stock.sort': 'ترتیب:',
    'stock.sort_featured': 'نمایاں پہلے',
    'stock.sort_asc': 'قیمت: کم سے زیادہ',
    'stock.sort_desc': 'قیمت: زیادہ سے کم',
    'stock.in_stock': 'دستیاب ہے',
    'stock.sold_out': 'ختم ہو چکا',
    'stock.btn_enquire': 'واٹس ایپ پر معلوم کریں',
    'stock.empty_title': 'کوئی فون نہیں ملا',
    'stock.empty_desc': 'فلٹر تبدیل کریں یا نئے اسٹاک کی معلومات کے لیے براہ راست واٹس ایپ کریں۔',
    'stock.reset_btn': 'فلٹر ہٹائیں',

    // Bento / Benefits
    'why.eyebrow': 'ہماری خصوصیت',
    'why.title': 'فتح آباد کے بااعتماد خریداروں کی پہلی ترجیح۔',
    'why.desc': 'فون خود چلا کر دیکھیں، پکا بل حاصل کریں اور مفت ڈیٹا ٹرانسفر کروائیں۔',
    'why.emi_badge': 'آسان اقساط',
    'why.emi_title': 'تمام موبائلز پر آسان EMI۔',
    'why.emi_desc': 'بجاج، IDFC، HDB، پوناوالا اور DMI کے ذریعے منٹوں میں فون حاصل کریں۔',
    'why.genuine_title': '100% اصلی سیل پیک',
    'why.genuine_desc': 'کوئی کھلا یا مشکوک ہینڈ سیٹ نہیں۔ پکا جی ایس ٹی بل اور ملک گیر وارنٹی۔',
    'why.setup_title': 'ڈیٹا ٹرانسفر اور کور بالکل مفت',
    'why.setup_desc': 'اسکرین گارڈ، کور اور پرانے فون کا ڈیٹا ہماری ٹیم بلا معاوضہ منتقل کرتی ہے۔',
    'why.exchange_badge': 'ایکسچینج آفر',
    'why.exchange_title': 'پرانے فون کی بہترین قیمت۔',
    'why.exchange_desc': 'پرانا فون لائیں، درست جانچ کروائیں اور فوری طور پر رقم کٹوائیں۔',

    // Contact
    'contact.eyebrow': 'تشریف لائیں',
    'contact.title': 'دکان پر تشریف لائیں یا رابطہ کریں۔',
    'contact.desc': 'فون خود دیکھ کر جانچیں اور مطمئن ہو کر خریدیں۔ آپ کا ہمیشہ خیر مقدم ہے۔',
    'contact.location_title': 'پتہ',
    'contact.hours_title': 'اوقات',
    'contact.hours_val': 'صبح 10:00 تا رات 9:00 بجے (ہفتے کے ساتوں دن)',
    'contact.helpline_title': 'براہ راست کال',
    'contact.form_title': 'فوری واٹس ایپ رابطہ',
    'contact.form_desc': 'اپنی پسند کا فون بتائیں، ہم فوراً قیمت اور دستیابی سے آگاہ کریں گے۔',
    'contact.form_name': 'آپ کا نام',
    'contact.form_phone': 'مطلوبہ فون ماڈل',
    'contact.form_purpose': 'معلومات کی نوعیت',
    'contact.form_submit': 'واٹس ایپ بات چیت شروع کریں',

    // Footer
    'footer.tagline': 'فتح آباد کا قابل اعتماد موبائل مرکز۔ پکا بل، صحیح دام۔',
    'footer.rights': 'جملہ حقوق محفوظ ہیں۔',

    // FAQ
    'faq.eyebrow': 'خریداری رہنما',
    'faq.title': 'اکثر پوچھے جانے والے سوالات۔',
    'faq.desc': 'فتح آباد میں اسمارٹ فونز، آسان اقساط اور پرانے فون کی تبدیلی سے متعلق اہم سوالات کے جوابات۔',
    'faq.q1': 'فتح آباد میں کھتری موبائل زون پر کون سے برانڈز دستیاب ہیں؟',
    'faq.a1': 'پالیکا بازار، فتح آباد میں Apple iPhone، Samsung Galaxy، OnePlus، Vivo، Xiaomi، OPPO، Realme اور Nothing اسمارٹ فونز دستیاب ہیں۔',
    'faq.q2': 'اقساط کے لیے کون سے فنانس پارٹنرز دستیاب ہیں؟',
    'faq.a2': 'Bajaj Finserv، IDFC FIRST Bank، HDB Financial Services، Poonawalla Fincorp اور DMI Finance کے ذریعے آدھار کارڈ اور بینک تفصیلات پر فوری منظوری مل جاتی ہے۔',
    'faq.q3': 'کیا میں اپنا پرانا فون تبدیل کر کے نیا فون لے سکتا ہوں؟',
    'faq.a3': 'جی ہاں، اپنا پرانا فون لائیں، شفاف جانچ کے بعد فوری طور پر نئے فون کی قیمت میں سے رقم کم کر دی جائے گی۔',
    'faq.q4': 'کیا ہر فون کے ساتھ پکا GST بل اور وارنٹی ملتی ہے؟',
    'faq.a4': 'ہر نئے سیل پیک فون کے ساتھ پکا GST بل اور پورے بھارت میں برانڈ وارنٹی فراہم کی جاتی ہے۔',
    'faq.q5': 'پتہ اور اوقات کیا ہیں؟',
    'faq.a5': 'پالیکا بازار، فتح آباد، ہریانہ 125050 (پیر تا ہفتہ، صبح 10 تا رات 9 بجے)۔ براہ راست قیمت جاننے کے لیے واٹس ایپ کریں۔',
  },
}

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string, fallback?: string) => string
  languages: LanguageOption[]
  currentLanguageOption: LanguageOption
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('kmz_lang') as LanguageCode
      if (saved && TRANSLATIONS[saved]) return saved
    } catch {}
    return 'en'
  })

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('kmz_lang', lang)
    } catch {}
  }

  useEffect(() => {
    const bcp47Map: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      pa: 'pa-IN',
      hr: 'hi-IN',
      raj: 'hi-IN',
      ur: 'ur-IN',
    }
    document.documentElement.lang = bcp47Map[language] || 'en-IN'
  }, [language])

  const t = (key: string, fallback?: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || fallback || key
  }

  const currentLanguageOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES, currentLanguageOption }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
