
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  condition: 'new' | 'used';
  isFlashDeal?: boolean;
  freeShipping?: boolean;
  fullDelivery?: boolean;
  sellerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  trackingNumber: string;
  address: string;
  paymentMethod: string;
}

export type View = 
  | 'home' 
  | 'product' 
  | 'cart' 
  | 'sell' 
  | 'search' 
  | 'register' 
  | 'login'
  | 'dashboard-buyer' 
  | 'dashboard-seller' 
  | 'checkout' 
  | 'orders';
