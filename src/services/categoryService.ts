import { supabase } from "@/config/db";
import Category from "@/models/Category";

export const getCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    return data.map(item => Category.getAll(item));
} 