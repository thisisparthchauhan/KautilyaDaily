// Market Data Types
export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isUp: boolean;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  sector: string;
  isUp: boolean;
  volume: string;
  dayHigh: number;
  dayLow: number;
  week52High: number;
  week52Low: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
  relatedStocks: string[];
}

export interface EditorialArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  category: string;
  imageUrl?: string;
  isPremium?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  likes: number;
  comments: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailOrMobile: string;
  role?: 'superadmin' | 'admin' | 'editor' | 'user';
  avatar?: string;
  isPremium?: boolean;
  subscriptionExpiry?: string;
  watchlist?: string[];
  createdAt?: string;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
  notes?: string;
}

export interface PortfolioHolding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  holdings: PortfolioHolding[];
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  createdAt: string;
}

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  date: string;
  time: string;
  impact: 'high' | 'medium' | 'low';
  forecast?: string;
  previous?: string;
  actual?: string;
}

export interface Sector {
  name: string;
  slug: string;
  change: number;
  changePercent: number;
  isUp: boolean;
  topStocks: string[];
  description: string;
}

export interface IPO {
  name: string;
  symbol: string;
  issuePrice: string;
  gmp: string;
  listingDate: string;
  closeDate: string;
  subscriptionStatus: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'breaking' | 'alert' | 'news' | 'system';
  read: boolean;
  createdAt: string;
}

export interface TrendingTag {
  name: string;
  count: number;
}
