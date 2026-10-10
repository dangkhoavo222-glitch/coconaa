export interface Product {
  id: string;
  name: string;
  category: string;
  badge: string;
  secondaryBadge?: string;
  price: number;
  originalPrice?: number;
  volume: string;
  shelfLife: string;
  packaging: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  brix: string;
  features: string[];
  ingredients: string;
  standards: string[];
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  volume: string;
  priceRanges: string[];
  standards: string[];
  searchQuery: string;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'popular';
}

export type ViewMode = 'landing' | 'catalog';
