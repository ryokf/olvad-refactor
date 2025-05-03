import { supabase } from "@/config/db";
import Product from "@/models/Product";

export const getProducts = async () => {
    const { data } = await supabase.from("products").select("*, categories(*)");
    data.forEach((item) => {
        item.category = item.categories.category;
    });
    return data.map(item => Product.getAll(item));
}