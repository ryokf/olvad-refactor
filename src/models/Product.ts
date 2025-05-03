class Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    photo: string;

    constructor(id: number, name: string, category: string, price: number, description: string, photo: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.photo = photo;
    }

    getId(): number {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getCategory(): string {
        return this.category;
    }
    getPrice(): number {
        return this.price;
    }
    getDescription(): string {
        return this.description;
    }
    getPhoto(): string {
        return this.photo;
    }

    static getAll(data: Product): Product {
        return new Product(data.id, data.name, data.category, data.price, data.description, data.photo);
    }
}

export default Product