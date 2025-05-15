import Product from "./Product";

class Cart {
    id: number;
    customer_id: number;
    products: Product;
    created_at: string;
    qty: number;

    constructor(id: number, customerId: number, products: Product, qty: number, created_at: string) {
        this.id = id;
        this.customer_id = customerId;
        this.products = products;
        this.qty = qty;
        this.created_at = created_at;
    }
    getId(): number {
        return this.id;
    }
    getCustomerId(): number {
        return this.customer_id;
    }
    getDate(): string {
        return this.created_at;
    }

    getProductId(): Product {
        return this.products;
    }

    getQty(): number {
        return this.qty;
    }
    static getAll(data: Cart): Cart {
        console.log("data", data);
        return new Cart(data.id, data.customer_id, data.products, data.qty, data.created_at);
    }
}

export default Cart