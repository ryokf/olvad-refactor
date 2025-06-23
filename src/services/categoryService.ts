import { supabase } from "@/config/db";
import { mapToCategory } from "@/utils/categoryUtils";
import { Category } from "@/types/Category";

export const getCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("id", { ascending: true });
    return data.map(item => mapToCategory(item));
} 

export const addCategory = async (category: Category) => {
    const { error } = await supabase.from("categories").insert([{
        category: category.category,
        icon: category.icon
    }]);
    if (error) {
        console.error("Error creating category:", error);
        return null;
    }
    return true;
}

export const deleteCategory = async (id: number) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
        console.error("Error deleting category:", error);
        return null;
    }
    return true;
}

export const updateCategory = async (id: number, category: Category) => {
    const { error } = await supabase.from("categories").update({ category: category.category, icon: category.icon }).eq("id", id);
    if (error) {
        console.error("Error updating category:", error);
        return null;
    }
    return true;
}