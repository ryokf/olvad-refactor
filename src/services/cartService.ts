import { supabase } from "@/config/db";
import { mapToCart } from "@/utils/cartUtils";

export const getCartByCustomerId = async (customerId: string) => {
    try {
        const { data, error } = await supabase
            .from("carts")
            .select("*, products(*)")
            .eq("customer_id", customerId)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data.map(item => mapToCart(item));
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
}

export const addToCart = async (customerId: string, productId: number, qty: number) => {
    try {
        const { data, error } = await supabase
            .from("carts")
            .insert([
                { customer_id: customerId, product_id: productId, qty }
            ]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        return null;
    }
}
export const updateCart = async (cartId: number, qty: number) => {
    try {
        const { data, error } = await supabase
            .from("carts")
            .update({ qty })
            .eq("id", cartId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating cart:", error);
        return null;
    }
}
export const deleteCart = async (cartId: number) => {
    try {
        const { data, error } = await supabase
            .from("carts")
            .delete()
            .eq("id", cartId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error deleting cart:", error);
        return null;
    }
}
export const clearCart = async (customerId: string) => {
    try {
        const { data, error } = await supabase
            .from("carts")
            .delete()
            .eq("customer_id", customerId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        return null;
    }
}