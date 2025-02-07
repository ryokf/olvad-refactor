
"use client";

import cardTheme from "@/themes/card";
import { Badge, Card } from "flowbite-react";

const CardComponent = () => {
    return (
        <Card
            theme={cardTheme}
            className="max-w-80"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc="https://flowbite.com/docs/images/products/apple-watch.png"
        >
            <Badge className="w-fit bg-tertiary text-white" color="success">Category</Badge>

            <h5 className="font-semibold tracking-tight text-primary dark:text-white">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
            </h5>

            <div className="mb-2 flex items-center">
                <p className="text-sm font-light text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam facere sint fugiat vitae vel quam</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary dark:text-white">$599</span>
                <button
                    className="rounded-lg hover:bg-tertiary px-5 py-2.5 text-center text-sm font-medium text-white bg-primary focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to cart
                </button>
            </div>
        </Card>
    );
}

export default CardComponent
