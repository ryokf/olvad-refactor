import { Category } from "@/types/Category";

// Fungsi untuk membuat objek Category baru
export const createCategory = (id: number, category: string, icon: string | null): Category => {
    return { id, category, icon };
};

// Fungsi untuk mengkonversi data mentah menjadi objek Category
export const mapToCategory = (data: any): Category => {
    return {
        id: data.id,
        category: data.category,
        icon: data.icon
    };
};