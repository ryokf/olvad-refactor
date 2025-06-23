import { Product } from "@/types/Product";

// Fungsi untuk membuat objek Product baru
export const createProduct = (id: number, name: string, category: string, price: number, description: string, photo: string): Product => {
    return { id, name, category, price, description, photo };
};

// Fungsi untuk mengkonversi data mentah menjadi objek Product
export const mapToProduct = (data: any): Product => {
    return {
        id: data.id,
        name: data.name,
        category: data.category,
        price: data.price,
        description: data.description,
        photo: data.photo
    };
};