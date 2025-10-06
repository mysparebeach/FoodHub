export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'preparing' | 'out-for-delivery' | 'delivered';
  estimatedDelivery: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
