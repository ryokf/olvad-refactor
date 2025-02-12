
"use client";

import cardTheme from "@/themes/card";
import { Badge, Card } from "flowbite-react";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    photo: string;
}

const CardComponent = ({id, name = "", price = 0, description = "", photo = "https://flowbite.com/docs/images/products/apple-watch.png", category = "category"} : Product) => {
    return (
        <Card
            theme={cardTheme}
            className="max-w-80 lg:w-full mx-auto"
            imgAlt={name}
            imgSrc={photo}
        >
            <Badge className="w-fit bg-tertiary text-white" color="success">{category}</Badge>

            <h5 className="font-semibold tracking-tight text-primary dark:text-white">
                {name}
            </h5>

            <div className="mb-2 flex items-center">
                <p className="text-sm font-light text-secondary">{description}</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl lg:text-xl font-bold text-tertiary dark:text-white">Rp{Intl.NumberFormat('id-ID').format(price)}</span>
                <button
                    type="button"
                    onClick={() => {console.log(id)}}
                    className="rounded-lg hover:bg-tertiary px-5 lg:px-3 py-2.5 lg:py-2 text-center text-sm font-medium text-white bg-primary focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to cart
                </button>
            </div>
        </Card>
    );
}

export default CardComponent
