export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  stock: number;
  slug: string;
  featured: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  province: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  created_at: string;
  role: string; 
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}