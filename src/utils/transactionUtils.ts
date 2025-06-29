import { Customer, OrderStatus, Transaction } from "@/types/Transaction";

// Fungsi untuk membuat objek Transaction baru
export const createTransaction = (
    id: number,
    createdAt: string,
    customer_id: string,
    customer: Customer,
    detailOrderJson: string,
    status: OrderStatus,
    price: number
): Transaction => {
    return {
        id,
        createdAt: createdAt || new Date().toISOString(),
        customer_id,
        customer,
        detail_order: JSON.parse(detailOrderJson),
        status,
        price
    };
};

// Definisi interface untuk data transaksi dari database
interface TransactionData {
    id: number;
    createdAt?: string;
    created_at?: string;
    customer_id: string;
    customer?: Customer;
    detail_order: {
        items: {
            qty: number;
            name: string;
            price: number;
        }[];
    };
    status: OrderStatus;
    price: number;
}

// Fungsi untuk mengkonversi data mentah menjadi objek Transaction
export const mapToTransaction = (data: TransactionData): Transaction => {
    return {
        id: data.id,
        createdAt: data.createdAt || data.created_at || new Date().toISOString(),
        customer_id: data.customer_id,
        customer: data.customer,
        detail_order: data.detail_order,
        status: data.status,
        price: data.price
    };
};

// Fungsi utilitas untuk Transaction
export const getTotalQuantity = (transaction: Transaction): number => {
    return transaction.detail_order.items.reduce((total, item) => total + item.qty, 0);
};