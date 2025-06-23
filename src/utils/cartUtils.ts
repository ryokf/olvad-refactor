import { Cart } from "@/types/Cart";
import { Product } from "@/types/Product";

// Fungsi untuk membuat objek Cart baru
export const createCart = (id: number, customerId: number, products: Product, qty: number, created_at: string): Cart => {
    return {
        id,
        customer_id: customerId,
        products,
        qty,
        created_at
    };
};

// Fungsi untuk mengkonversi data mentah menjadi objek Cart
export const mapToCart = (data: any): Cart => {
    return {
        id: data.id,
        customer_id: data.customer_id,
        products: data.products,
        qty: data.qty,
        created_at: data.created_at
    };
};