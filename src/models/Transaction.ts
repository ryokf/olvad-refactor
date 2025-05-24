type OrderStatus = 'processed' | 'ready' | 'done' | string;

interface Items {
    qty: number;
    name: string;
    price: number;
}

interface DetailOrder {
    items: Items[];
}

export class Transaction {
    id: number;
    createdAt: string ;
    customer_id: string; // UUID
    customer: {
        full_name: string;
        email: string;
        phone: string | null;
        avatar_url: string | null;
    }
    detail_order: DetailOrder;
    status: OrderStatus;
    price: number;

    constructor(
        id: number,
        createdAt: string,
        customer_id: string,
        customer: {
            full_name: string;
            email: string;
            phone: string | null;
            avatar_url: string | null;
        },
        detailOrderJson: string,
        status: OrderStatus,
        price: number
    ) {
        this.id = id;
        this.createdAt = createdAt || new Date().toISOString();
        this.customer_id = customer_id;
        this.customer = customer;
        this.detail_order = JSON.parse(detailOrderJson);
        this.status = status;
        this.price = price;
    }

    getId(): number {
        return this.id;
    }

    getCreatedAt(): string {
        return this.createdAt;
    }

    getCustomerId(): string {
        return this.customer_id;
    }

    getDetailOrder(): DetailOrder {
        return this.detail_order;
    }

    getStatus(): OrderStatus {
        return this.status;
    }

    getPrice(): number {
        return this.price;
    }

    getCustomer(): {
        full_name: string;
        email: string;
        phone: string | null;
        avatar_url: string | null;
    } {
        return this.customer;
    }

    static getAll(data: Transaction): Transaction {
        console.log("data", data);
        return new Transaction(data.id, data.createdAt, data.customer_id, data.customer, JSON.stringify(data.detail_order), data.status, data.price);
    }

    // Contoh method untuk mendapatkan total qty item
    getTotalQuantity(): number {
        return this.detail_order.items.reduce((total, item) => total + item.qty, 0);
    }
}