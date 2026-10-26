export type CategoryType =
  | 'all'
  | 'blouses'
  | 'suits'
  | 'lehengas'
  | 'girls'
  | 'bottoms'
  | 'sarees';

export interface ProductItem {
  id: string;
  name: string;
  category: CategoryType;
  categoryLabel: string;
  price: number;
  stitchingPrice?: number;
  image: string;
  description: string;
  fabric: string;
  workType: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  featured?: boolean;
  audience: 'Women' | 'Girls';
}

export interface RateItem {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  price: number;
  description: string;
  turnaroundDays: string;
  popularAddons?: { name: string; price: number }[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedSize: string;
  customStitching: boolean;
  notes?: string;
  bustSize?: string;
  waistSize?: string;
  lengthSize?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isOffline?: boolean;
  suggestions?: string[];
}

export interface CustomBookingData {
  customerName: string;
  phone: string;
  city: string;
  serviceCategory: string;
  outfitDetails: string;
  hasOwnFabric: 'yes' | 'no' | 'need_advice';
  bust?: string;
  waist?: string;
  hip?: string;
  length?: string;
  shoulder?: string;
  armhole?: string;
  notes?: string;
  urgentDelivery?: boolean;
}
