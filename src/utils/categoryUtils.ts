import { Category } from "@/types/Category";

// Fungsi untuk membuat objek Category baru
export const createCategory = (id: number, category: string, icon: string | null): Category => {
    return { id, category, icon };
};

// Definisi interface untuk data kategori dari database
interface CategoryData {
    id: number;
    category: string;
    icon: string | null;
}

// Fungsi untuk mengkonversi data mentah menjadi objek Category
export const mapToCategory = (data: CategoryData): Category => {
    return {
        id: data.id,
        category: data.category,
        icon: data.icon
    };
};