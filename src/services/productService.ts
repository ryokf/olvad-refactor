import { supabase } from "@/config/db";
import Product from "@/models/Product";

export const getProducts = async () => {
    const { data } = await supabase.from("products").select("*, categories(*)");
    data.forEach((item) => {
        item.category = item.categories.category;
    });
    return data.map(item => Product.getAll(item));
}

export const getProductsByCategory = async (categoryId: number) => {
    const { data } = await supabase.from("products").select("*, categories(*)").eq("category_id", categoryId);
    data.forEach((item) => {
        item.category = item.categories.category;
    }
    );
    return data.map(item => Product.getAll(item));
}