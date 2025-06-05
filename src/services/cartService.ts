import { supabase } from "@/config/db";
import Cart from "@/models/Cart";

export const getCartByCustomerId = async (customerId: string) => {
    const { data, error } = await supabase
        .from("carts")
        .select("*, products(*)")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching cart:", error);
        return [];
    }

    return data.map(item => Cart.getAll(item));
}

export const addToCart = async (customerId: string, productId: number, qty: number) => {
    const { data, error } = await supabase
        .from("carts")
        .insert([
            { customer_id: customerId, product_id: productId, qty }
        ]);

    if (error) {
        console.error("Error adding to cart:", error);
        return null;
    }

    return data;
}
export const updateCart = async (cartId: number, qty: number) => {
    const { data, error } = await supabase
        .from("carts")
        .update({ qty })
        .eq("id", cartId);

    if (error) {
        console.error("Error updating cart:", error);
        return null;
    }

    return data;
}
export const deleteCart = async (cartId: number) => {
    const { data, error } = await supabase
        .from("carts")
        .delete()
        .eq("id", cartId);

    if (error) {
        console.error("Error deleting cart:", error);
        return null;
    }

    return data;
}
export const clearCart = async (customerId: string) => {
    const { data, error } = await supabase
        .from("carts")
        .delete()
        .eq("customer_id", customerId);

    if (error) {
        console.error("Error clearing cart:", error);
        return null;
    }

    return data;
}