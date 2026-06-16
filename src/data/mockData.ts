import type { MarketIndex, Stock, NewsArticle, EditorialArticle, Sector, EconomicEvent, IPO, TrendingTag } from '@/types';

export const marketIndices: MarketIndex[] = [
  { symbol: 'NIFTY', name: 'NIFTY 50', value: 24312.45, change: 174.20, changePercent: 0.72, isUp: true },
  { symbol: 'SENSEX', name: 'SENSEX', value: 80125.80, change: 542.15, changePercent: 0.68, isUp: true },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty', value: 52418.30, change: 435.60, changePercent: 0.84, isUp: true },
  { symbol: 'USDINR', name: 'USD/INR', value: 83.12, change: -0.09, changePercent: -0.11, isUp: false },
  { symbol: 'GOLD', name: 'Gold (10g)', value: 5820, change: 20.30, changePercent: 0.35, isUp: true },
  { symbol: 'CRUDE', name: 'Crude Oil', value: 78.40, change: -0.41, changePercent: -0.52, isUp: false },
  { symbol: 'BTC', name: 'Bitcoin', value: 67200, change: 806.40, changePercent: 1.20, isUp: true },
  { symbol: 'ETH', name: 'Ethereum', value: 3520, change: 42.24, changePercent: 1.22, isUp: true },
];

export const globalIndices: MarketIndex[] = [
  { symbol: 'DJI', name: 'Dow Jones', value: 44565.50, change: 125.30, changePercent: 0.28, isUp: true },
  { symbol: 'IXIC', name: 'NASDAQ', value: 18342.80, change: 185.60, changePercent: 1.02, isUp: true },
  { symbol: 'SPX', name: 'S&P 500', value: 6115.20, change: 32.80, changePercent: 0.54, isUp: true },
  { symbol: 'FTSE', name: 'FTSE 100', value: 8305.40, change: -15.20, changePercent: -0.18, isUp: false },
  { symbol: 'N225', name: 'Nikkei 225', value: 39154.80, change: 245.60, changePercent: 0.63, isUp: true },
  { symbol: 'HSI', name: 'Hang Seng', value: 21890.30, change: -125.40, changePercent: -0.57, isUp: false },
  { symbol: 'KS11', name: 'KOSPI', value: 2625.40, change: 18.20, changePercent: 0.70, isUp: true },
  { symbol: 'DAX', name: 'DAX', value: 20265.80, change: 85.40, changePercent: 0.42, isUp: true },
];

export const stocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2945.60, change: 32.40, changePercent: 1.11, marketCap: '19.8T', peRatio: 28.5, sector: 'Energy', isUp: true, volume: '8.2M', dayHigh: 2960.00, dayLow: 2915.20, week52High: 3210.50, week52Low: 2220.30 },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 4215.80, change: -25.60, changePercent: -0.60, marketCap: '15.4T', peRatio: 32.1, sector: 'Technology', isUp: false, volume: '2.1M', dayHigh: 4250.00, dayLow: 4195.40, week52High: 4590.00, week52Low: 3250.80 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1685.40, change: 18.20, changePercent: 1.09, marketCap: '12.8T', peRatio: 22.3, sector: 'Banking', isUp: true, volume: '5.6M', dayHigh: 1695.00, dayLow: 1668.50, week52High: 1790.00, week52Low: 1365.20 },
  { symbol: 'INFY', name: 'Infosys', price: 1845.60, change: 28.40, changePercent: 1.56, marketCap: '7.6T', peRatio: 28.8, sector: 'Technology', isUp: true, volume: '3.4M', dayHigh: 1858.00, dayLow: 1820.50, week52High: 2010.00, week52Low: 1350.40 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1225.80, change: 15.60, changePercent: 1.29, marketCap: '8.5T', peRatio: 20.5, sector: 'Banking', isUp: true, volume: '4.2M', dayHigh: 1235.00, dayLow: 1210.20, week52High: 1290.00, week52Low: 895.50 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2385.40, change: -12.80, changePercent: -0.53, marketCap: '5.6T', peRatio: 58.2, sector: 'Consumer', isUp: false, volume: '1.2M', dayHigh: 2405.00, dayLow: 2375.60, week52High: 2760.00, week52Low: 2150.30 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 765.40, change: 8.60, changePercent: 1.14, marketCap: '6.8T', peRatio: 12.8, sector: 'Banking', isUp: true, volume: '12.5M', dayHigh: 772.00, dayLow: 758.20, week52High: 912.00, week52Low: 549.40 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1585.60, change: 22.40, changePercent: 1.43, marketCap: '8.9T', peRatio: 35.6, sector: 'Telecom', isUp: true, volume: '2.8M', dayHigh: 1595.00, dayLow: 1565.20, week52High: 1778.00, week52Low: 895.40 },
  { symbol: 'ITC', name: 'ITC Limited', price: 425.80, change: -2.40, changePercent: -0.56, marketCap: '5.3T', peRatio: 28.4, sector: 'Consumer', isUp: false, volume: '6.4M', dayHigh: 430.00, dayLow: 423.60, week52High: 510.00, week52Low: 399.20 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1785.40, change: 24.60, changePercent: 1.40, marketCap: '3.5T', peRatio: 25.2, sector: 'Banking', isUp: true, volume: '1.8M', dayHigh: 1795.00, dayLow: 1762.80, week52High: 1920.00, week52Low: 1545.60 },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'RBI holds rates; liquidity stance shifts to neutral',
    excerpt: 'The Monetary Policy Committee unanimously decided to keep the repo rate unchanged at 6.5%, while changing the stance to neutral, opening doors for future cuts.',
    content: 'Full article content...',
    author: 'Financial Desk',
    publishedAt: '2026-02-14T09:30:00Z',
    readTime: 4,
    category: 'Policy',
    tags: ['RBI', 'Rates', 'Monetary Policy'],
    isBreaking: true,
    isFeatured: false,
    relatedStocks: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK'],
  },
  {
    id: '2',
    title: 'EV supply chain: battery margins under pressure',
    excerpt: 'Rising lithium prices and intense competition are squeezing margins for battery manufacturers across the EV ecosystem.',
    content: 'Full article content...',
    author: 'Auto Desk',
    publishedAt: '2026-02-14T08:15:00Z',
    readTime: 5,
    category: 'Auto',
    tags: ['EV', 'Battery', 'Automotive'],
    isBreaking: false,
    isFeatured: false,
    relatedStocks: ['TATAMOTORS', 'M&M'],
  },
  {
    id: '3',
    title: 'Q3 earnings: IT guidance beats estimates',
    excerpt: 'Major IT services companies report better-than-expected Q3 results, with FY26 guidance raising analyst confidence.',
    content: 'Full article content...',
    author: 'Tech Desk',
    publishedAt: '2026-02-14T07:45:00Z',
    readTime: 6,
    category: 'Technology',
    tags: ['IT', 'Earnings', 'TCS', 'Infosys'],
    isBreaking: false,
    isFeatured: true,
    relatedStocks: ['TCS', 'INFY', 'WIPRO', 'HCLTECH'],
  },
  {
    id: '4',
    title: 'Global yields dip; emerging flows turn positive',
    excerpt: 'Softening US Treasury yields are driving renewed interest in emerging market equities, with India seeing strong inflows.',
    content: 'Full article content...',
    author: 'Global Desk',
    publishedAt: '2026-02-14T06:30:00Z',
    readTime: 4,
    category: 'Global',
    tags: ['FII', 'Yields', 'Emerging Markets'],
    isBreaking: false,
    isFeatured: false,
    relatedStocks: ['RELIANCE', 'TCS', 'HDFCBANK'],
  },
  {
    id: '5',
    title: 'SME credit: new NBFC models emerge',
    excerpt: 'Technology-driven lending models are reshaping how small businesses access credit, with faster approvals and better risk assessment.',
    content: 'Full article content...',
    author: 'Banking Desk',
    publishedAt: '2026-02-14T05:15:00Z',
    readTime: 5,
    category: 'Banking',
    tags: ['NBFC', 'SME', 'Credit'],
    isBreaking: false,
    isFeatured: false,
    relatedStocks: ['BAJFINANCE', 'CHOLAFIN'],
  },
];

export const editorialArticles: EditorialArticle[] = [
  {
    id: '1',
    title: 'Why India\'s logistics index is rewriting the supply-chain playbook',
    excerpt: 'Infrastructure spend, port modernization, and a new wave of cold-chain startups are converging. We map the winners, risks, and policy tailwinds.',
    content: 'Full editorial content...',
    author: 'Arvind Mehta',
    authorRole: 'Macro & Policy Editor',
    publishedAt: '2026-02-13T10:00:00Z',
    readTime: 8,
    category: 'Analysis',
    isPremium: false,
  },
  {
    id: '2',
    title: 'The new rules of global trade',
    excerpt: 'Tariffs, nearshoring, and digital customs are reshaping competitiveness. Here\'s what investors should watch.',
    content: 'Full editorial content...',
    author: 'Priya Sharma',
    authorRole: 'Global Trade Analyst',
    publishedAt: '2026-02-12T14:30:00Z',
    readTime: 6,
    category: 'Global',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Banking sector: The credit cycle turns',
    excerpt: 'After years of NPA cleanup, Indian banks are poised for a multi-year growth cycle. We analyze the key drivers and risks.',
    content: 'Full editorial content...',
    author: 'Rahul Verma',
    authorRole: 'Banking Analyst',
    publishedAt: '2026-02-11T09:00:00Z',
    readTime: 7,
    category: 'Banking',
    isPremium: true,
  },
];

export const sectors: Sector[] = [
  { name: 'Banking', slug: 'banking', change: 18.20, changePercent: 0.84, isUp: true, topStocks: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK'], description: 'India\'s banking sector is witnessing a credit cycle turnaround with improving asset quality.' },
  { name: 'Technology', slug: 'technology', change: 45.60, changePercent: 1.12, isUp: true, topStocks: ['TCS', 'INFY', 'WIPRO', 'HCLTECH'], description: 'IT services giants continue to benefit from global digital transformation trends.' },
  { name: 'Energy', slug: 'energy', change: -12.40, changePercent: -0.31, isUp: false, topStocks: ['RELIANCE', 'ONGC', 'IOC', 'BPCL'], description: 'Oil & gas sector faces volatility amid global supply dynamics.' },
  { name: 'Healthcare', slug: 'healthcare', change: 28.50, changePercent: 0.45, isUp: true, topStocks: ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'DIVISLAB'], description: 'Pharma sector shows resilience with strong export demand.' },
  { name: 'Consumer', slug: 'consumer', change: -15.20, changePercent: -0.18, isUp: false, topStocks: ['HINDUNILVR', 'ITC', 'NESTLEIND', 'BRITANNIA'], description: 'FMCG companies navigate rural demand challenges.' },
  { name: 'Realty', slug: 'realty', change: 85.40, changePercent: 1.05, isUp: true, topStocks: ['DLF', 'OBEROIRLTY', 'GODREJPROP', 'SOBHA'], description: 'Real estate sector benefits from urbanization and infrastructure growth.' },
];

export const economicEvents: EconomicEvent[] = [
  { id: '1', title: 'RBI Monetary Policy Decision', country: 'India', date: '2026-02-14', time: '10:00 AM', impact: 'high', forecast: '6.50%', previous: '6.50%', actual: '6.50%' },
  { id: '2', title: 'US CPI Inflation Data', country: 'USA', date: '2026-02-13', time: '6:00 PM', impact: 'high', forecast: '2.9%', previous: '3.0%', actual: '2.8%' },
  { id: '3', title: 'India WPI Inflation', country: 'India', date: '2026-02-17', time: '12:00 PM', impact: 'medium', forecast: '2.4%', previous: '2.5%' },
  { id: '4', title: 'US Retail Sales', country: 'USA', date: '2026-02-14', time: '6:30 PM', impact: 'medium', forecast: '0.3%', previous: '0.2%' },
  { id: '5', title: 'EU GDP Growth Rate', country: 'EU', date: '2026-02-18', time: '3:00 PM', impact: 'high', forecast: '0.8%', previous: '0.7%' },
  { id: '6', title: 'China Industrial Production', country: 'China', date: '2026-02-17', time: '7:00 AM', impact: 'medium', forecast: '5.2%', previous: '5.0%' },
];

export const ipos: IPO[] = [
  { name: 'TechVenture Solutions', symbol: 'TECHVENT', issuePrice: '₹425-450', gmp: '+₹125', listingDate: '2026-02-20', closeDate: '2026-02-18', subscriptionStatus: '15.2x', category: 'Technology' },
  { name: 'Green Energy Power', symbol: 'GREENPWR', issuePrice: '₹280-295', gmp: '+₹45', listingDate: '2026-02-25', closeDate: '2026-02-21', subscriptionStatus: '8.5x', category: 'Energy' },
  { name: 'Healthcare Plus', symbol: 'HEALTHPlus', issuePrice: '₹650-685', gmp: '+₹210', listingDate: '2026-03-05', closeDate: '2026-03-03', subscriptionStatus: '22.8x', category: 'Healthcare' },
];

export const trendingTags: TrendingTag[] = [
  { name: 'NIFTY', count: 1250 },
  { name: 'Earnings', count: 890 },
  { name: 'RBI', count: 756 },
  { name: 'GlobalTrade', count: 634 },
  { name: 'Startups', count: 521 },
  { name: 'EV', count: 489 },
  { name: 'Banking', count: 445 },
  { name: 'IT', count: 398 },
];

export const tickerData = [
  { symbol: 'NIFTY', value: '24,312', change: '+0.72%', isUp: true },
  { symbol: 'SENSEX', value: '80,125', change: '+0.68%', isUp: true },
  { symbol: 'USD/INR', value: '83.12', change: '-0.11%', isUp: false },
  { symbol: 'GOLD', value: '5,820', change: '+0.35%', isUp: true },
  { symbol: 'CRUDE', value: '78.40', change: '-0.52%', isUp: false },
  { symbol: 'BTC', value: '67,200', change: '+1.20%', isUp: true },
  { symbol: 'ETH', value: '3,520', change: '+1.22%', isUp: true },
  { symbol: 'NASDAQ', value: '18,342', change: '+1.02%', isUp: true },
  { symbol: 'S&P 500', value: '6,115', change: '+0.54%', isUp: true },
  { symbol: 'FTSE', value: '8,305', change: '-0.18%', isUp: false },
];
