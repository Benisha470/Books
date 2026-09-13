export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  coverUrl: string;
  badge?: 'Best Seller' | 'Popular' | 'Trending' | 'New' | 'Editor Pick';
  description: string;
  excerpt: string;
  pages: number;
  publisher: string;
  year: number;
  isbn: string;
  format: 'Hardcover' | 'Paperback' | 'Collector Edition';
  inStock: boolean;
  accentColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  iconName: string;
  image: string;
  description: string;
  color: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
  format: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
