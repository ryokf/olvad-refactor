export type OrderStatus = 'processed' | 'ready' | 'done' | string;

export interface Items {
    qty: number;
    name: string;
    price: number;
    photo: string;
}

export interface DetailOrder {
    items: Items[];
}

export interface Customer {
    full_name: string;
    email: string;
    phone: string | null;
    avatar_url: string | null;
}

export interface Transaction {
    id: number;
    createdAt: string;
    customer_id: string; // UUID
    customer: Customer;
    detail_order: DetailOrder;
    status: OrderStatus;
    price: number;
}