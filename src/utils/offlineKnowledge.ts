import { OFFICIAL_RATE_LIST } from '../data/boutiqueData';

export interface OfflineAnswer {
  keywords: string[];
  title: string;
  answer: string;
  quickAction?: { label: string; actionId: string };
}

export const OFFLINE_KNOWLEDGE_BASE: OfflineAnswer[] = [
  {
    keywords: ['rate', 'price', 'cost', 'charge', 'charges', 'kitna', 'karcha', 'fees', 'list', 'blouse rate', 'suit rate'],
    title: 'Official Tailoring Rate List',
    answer: `Here is our official Radha Bootic Centre price list:\n\n• **सादा ब्लाउज (Basic Blouse)**: ₹100\n• **अस्तर ब्लाउज (Lined Blouse)**: ₹250\n• **डिजाइनर ब्लाउज (Designer Blouse)**: ₹350 - ₹650 (with cups/pads, deep back, dori)\n• **सादा सूट (Simple Kurti & Salwar)**: ₹300\n• **डिजाइनर सूट / अनारकली (Designer/Anarkali Suit)**: ₹450 - ₹750\n• **लहंगा सिलाई (Lehenga Stitching)**: ₹700 - ₹1,500 (with cancan & dupatta border)\n• **बच्चों की ड्रेस व लहंगा (Girls' Festive)**: ₹400 - ₹850\n• **सलवार / पटियाला / Alterations**: ₹50 - ₹150\n\nAll rates include precision tailoring and ironed finish!`,
    quickAction: { label: 'View Full Rate Card', actionId: 'open_rates' },
  },
  {
    keywords: ['blouse', 'blouses', 'neck', 'neckline', 'back', 'dori', 'cup', 'padded', 'maggam', 'sleeve', 'cut'],
    title: 'Designer Blouse Customization',
    answer: `We specialize in all types of designer blouse styling:\n\n1. **Necklines**: Boat neck, Sweetheart neck, Deep U/V with sheer net, Halter, and Queen Anne.\n2. **Back Designs**: Teardrop cutout, backless with dual dori, handmade latkans, criss-cross ties, and button backs.\n3. **Sleeves**: Elbow-length maggam zari work, bell sleeves, cap sleeves, puff princess sleeves, or sleeveless.\n4. **Cups & Fit**: In-built padded cups for zero-bra hassle, princess cut seams for contour fit, and pure cotton inner lining for sensitive skin.\n\nStitching charges: ₹100 (Sada) | ₹250 (Astar) | ₹350+ (Designer).`,
    quickAction: { label: 'Try 3D Blouse Studio', actionId: 'open_3d' },
  },
  {
    keywords: ['time', 'delivery', 'days', 'urgent', 'urgent delivery', 'turnaround', 'kab milega', 'fast'],
    title: 'Delivery & Turnaround Timelines',
    answer: `Our stitching turnaround schedules:\n\n• **Standard Tailoring**: 3 to 5 business days for blouses and regular suits.\n• **Urgent / Express Service**: Ready in 24 to 48 hours (+₹100 express charge).\n• **Bridal & Heavy Lehengas**: 7 to 12 days (includes a dedicated trial fitting so the gown falls perfectly on your wedding day).\n• **Minor Alterations**: Same day or within 24 hours.`,
  },
  {
    keywords: ['measurement', 'measurements', 'size', 'fitting', 'naap', 'how to measure', 'tape'],
    title: 'How to Give Measurements Online',
    answer: `You can easily provide measurements through our online booking form:\n\n1. **Bust / Chest**: Measure around the fullest part of your chest with a soft tape.\n2. **Waist**: Measure at your natural waistline (where you tuck your skirt or blouse).\n3. **Blouse Length**: Shoulder to desired bottom hem (standard: 13-15 inches).\n4. **Kurti / Lehenga Length**: Waist to ankle/floor.\n5. **Shoulder & Armhole**: Shoulder bone to shoulder bone, and around armpit.\n\nTip: You can also send a well-fitting sample garment or discuss directly on WhatsApp!`,
    quickAction: { label: 'Open Custom Measurement Form', actionId: 'open_booking' },
  },
  {
    keywords: ['fabric', 'material', 'cloth', 'kapda', 'own fabric', 'bring fabric', 'silk', 'organza'],
    title: 'Fabric Provision & Bring Your Own Material',
    answer: `Yes! You have two flexible options:\n\n1. **Bring / Send Your Own Fabric**: Bring your unstitched suit fabric, saree blouse piece, or lehenga material. We will cut, line, and tailor it with precision.\n2. **Boutique Fabric Selection**: We also stock premium raw silks, brocades, organza, crepe, and lining fabrics in rich festive hues.\n\nWe provide expert guidance on lining selection (cotton voile, shantoon, or butter crepe) based on your fabric transparency.`,
  },
  {
    keywords: ['girls', 'kids', 'baby', 'daughter', 'bacche', 'frock', 'gown', 'party wear'],
    title: "Girls' Festive & Party Wear",
    answer: `We craft enchanting, skin-friendly outfits for girls aged 1 to 14 years:\n\n• **Tiered Ruffle Gowns**: Multilayer soft net flounces with comfortable cotton inner lining.\n• **Mini Lehengas**: Haldi, Mehendi, and wedding lehengas with soft elasticated waistbands and lightweight dupattas.\n• **Comfort Guarantee**: No itchy zari touches the child's skin—every seam is soft-finished and lined!`,
    quickAction: { label: 'Explore Girls Collection', actionId: 'filter_girls' },
  },
  {
    keywords: ['contact', 'phone', 'whatsapp', 'address', 'location', 'shop', 'where', 'timing', 'hours'],
    title: 'Boutique Contact & Hours',
    answer: `**Radha Bootic Centre — Ladies Tailoring & Stitching**\n\n• **Tagline**: "Har Outfit, Aapke Style Ke Saath"\n• **WhatsApp & Phone**: +91 98765 43210 (Demo Contact Placeholder)\n• **Hours**: Monday to Saturday: 10:00 AM – 8:30 PM | Sunday: 11:00 AM – 6:00 PM\n• **Services**: Ladies & Girls Tailoring, Custom Embroidery, Bridal Stitching, and Urgent Alterations.\n\nYou can click the WhatsApp button to chat directly or submit a booking inquiry on the site!`,
    quickAction: { label: 'Book Appointment', actionId: 'open_booking' },
  },
  {
    keywords: ['offline', 'internet', 'connection', 'network', 'without net'],
    title: 'Offline Assistance Capabilities',
    answer: `You are currently using Radha Bootic Centre's built-in offline engine! Even without an active internet connection, you can:\n\n✓ View the complete tailoring rate card\n✓ Browse cached catalog styles & photos\n✓ Explore the interactive 3D studio\n✓ Prepare custom measurement orders (stored locally and synced once online)\n✓ Check stitching guidelines, blouse cuts, and fabric advice!`,
  },
];

export function getOfflineAnswer(userQuery: string): { reply: string; title?: string; quickAction?: { label: string; actionId: string } } {
  const query = userQuery.toLowerCase().trim();

  // Search through knowledge base
  let bestMatch: OfflineAnswer | null = null;
  let maxScore = 0;

  for (const item of OFFLINE_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (query.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return {
      reply: bestMatch.answer,
      title: bestMatch.title,
      quickAction: bestMatch.quickAction,
    };
  }

  // Generic fallback if no specific keyword matched
  return {
    reply: `Namaste from Radha Bootic Centre! I am assisting you in offline mode.\n\nWe specialize exclusively in women's and girls' fashion, including:\n• Designer Blouse stitching (from ₹100 to ₹350+)\n• Salwar suits & Anarkalis (from ₹300 to ₹450+)\n• Flared bridal lehengas (from ₹700+)\n• Girls' party wear and alterations\n\nYou can ask about pricing, blouse neck designs, turnaround times, or measurements!`,
    quickAction: { label: 'View Rate Card', actionId: 'open_rates' },
  };
}
