import { Product } from "./Product";

// Definisi tipe data Cart sebagai interface
export interface Cart {
    id: number;
    customer_id: number;
    products: Product;
    created_at: string;
    qty: number;
}