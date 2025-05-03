class Category{
    id: number;
    category: string;
    icon: string | null;

    constructor(id: number, category: string, icon: string | null) {
        this.id = id;
        this.category = category;
        this.icon = icon;
    }
    getId(): number {
        return this.id;
    }
    getCategory(): string {
        return this.category;
    }
    getIcon(): string | null {
        return this.icon;
    }
    static getAll(data: Category): Category {
        return new Category(data.id, data.category, data.icon);
    }
}

export default Category