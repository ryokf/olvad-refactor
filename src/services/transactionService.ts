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

