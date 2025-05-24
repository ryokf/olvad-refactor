import { supabase } from "@/config/db";
import { Transaction } from "@/models/Transaction";

export const getTransactionByCustomerId = async (id: string, status?: string) => {
    if (status === "") {
        const { data } = await supabase.from("transactions").select("*").eq("customer_id", id);
        return data.map(item => Transaction.getAll(item));
    } else {
        const { data } = await supabase.from("transactions").select("*").eq("status", status).eq("customer_id", id);
        return data.map(item => Transaction.getAll(item));
    }
};

export const getTransactionByStatus = async (status: string) => {
    const { data } = await supabase.from("transactions").select("*").eq("status", status);
    console.log(data.map(item => item.customer_id));
    const user_id = data.map(item => item.customer_id);
    await Promise.all(user_id.map(async (item) => {
        const userData = await fetch('/api/admin/' + item);
        const json = await userData.json();
        console.log(json);
        data.map(item => item.customer = {
            full_name: json.user.user_metadata.full_name,
            email: json.user.email,
            phone: json.user.user_metadata.phone,
            avatar_url: json.user.user_metadata.avatar_url
        });
        return json
    }))
    return data.map(item => Transaction.getAll(item));
}

export const addTransaction = async (transaction) => {
    console.log(transaction);

    const { data, error } = await supabase.from("transactions").insert([{
        customer_id: transaction.customer_id,
        detail_order: transaction.detail_order,
        status: transaction.status,
        price: transaction.price
    }]);
    if (error) {
        console.error("Error adding transaction:", error);
        return null;
    }
    return data;
}

export const updateTransaction = async (id: number, status: string) => {
    const { data, error } = await supabase.from("transactions").update({ status }).eq("id", id);
    if (error) {
        console.error("Error updating transaction:", error);
        return null;
    }
    return data;
}

