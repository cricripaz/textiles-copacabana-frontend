// src/app/models/order.model.ts

export interface Order {
  order_id: number;
  customer_name: string;
  order_status: string;
  entry_date: string;
  products: { [key: string]: Product };
}

export interface Product {
  quantity: number;
}
