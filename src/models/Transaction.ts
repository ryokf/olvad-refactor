type OrderStatus = 'pending' | 'paid' | 'shipped' | 'done' | 'cancelled' | string;

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
    detail_order: DetailOrder;
    status: OrderStatus;
    price: number;

    constructor(
        id: number,
        createdAt: string,
        customer_id: string,
        detailOrderJson: string,
        status: OrderStatus,
        price: number
    ) {
        this.id = id;
        this.createdAt = createdAt || new Date().toISOString();
        this.customer_id = customer_id;
        this.detail_order = JSON.parse(detailOrderJson);
        this.status = status;
        this.price = price;
    }

    getId(): number {
        return this.id;
    }

    getCreatedAt(): Date {
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

    static getAll(data: Transaction): Transaction {
        console.log("data", data);
        return new Transaction(data.id, data.createdAt, data.customer_id, JSON.stringify(data.detail_order), data.status, data.price);
    }

    // Contoh method untuk mendapatkan total qty item
    getTotalQuantity(): number {
        return this.detail_order.items.reduce((total, item) => total + item.qty, 0);
    }
}