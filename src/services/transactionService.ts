import { supabase } from "@/config/db";
import { mapToTransaction } from "@/utils/transactionUtils";

import { Customer } from '@/types/Transaction';

// Definisi interface untuk data transaksi dari database
interface TransactionData {
    id: number;
    customer_id: string;
    detail_order: {
        items: {
            qty: number;
            name: string;
            price: number;
        }[];
    };
    status: string;
    price: number;
    created_at: string;
    customer?: Customer;
}

// Fungsi untuk memproses data transaksi dengan informasi pengguna
const processTransactionWithUserData = async (data: TransactionData[]) => {
    const user_id = data.map(item => item.customer_id);
    await Promise.all(user_id.map(async (id) => {
        const userData = await fetch('/api/admin/' + id);
        const json = await userData.json();
        data.forEach(item => {
            if (item.customer_id === id) {
                item.customer = {
                    full_name: json.user.user_metadata.full_name,
                    email: json.user.email,
                    phone: json.user.user_metadata.phone,
                    avatar_url: json.user.user_metadata.avatar_url
                };
            }
        });
        return json;
    }));
    return data.map(item => mapToTransaction(item));
};

export const getTransactionByCustomerId = async (id: string, status?: string) => {
    if (status === "") {
        const { data } = await supabase.from("transactions").select("*").eq("customer_id", id);
        return data.map(item => mapToTransaction(item));
    } else {
        const { data } = await supabase.from("transactions").select("*").eq("status", status).eq("customer_id", id);
        return data.map(item => mapToTransaction(item));
    }
};

export const getTransactionByStatus = async (status: string) => {
    if (status === "") {
        const { data } = await supabase.from("transactions").select("*");
        return processTransactionWithUserData(data);
    } else {
        const { data } = await supabase.from("transactions").select("*").eq("status", status);
        return processTransactionWithUserData(data);
    }
};

export const addTransaction = async (transaction) => {
    try {
        const { data, error } = await supabase.from("transactions").insert([{
            customer_id: transaction.customer_id,
            detail_order: transaction.detail_order,
            status: transaction.status,
            price: transaction.price
        }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding transaction:", error);
        return null;
    }
}

export const updateTransaction = async (id: number, status: string) => {
    try {
        const { data, error } = await supabase.from("transactions").update({ status }).eq("id", id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating transaction:", error);
        return null;
    }
}

