
"use client";

import { supabase } from "@/config/db";
import { Product } from "@/types/Product";
import { addToCart, getCartByCustomerId, updateCart } from "@/services/cartService";
import cardTheme from "@/themes/card";
import { Badge, Card } from "flowbite-react";

const CardComponent = ({ product }: { product: Product }) => {
    const addCart = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const cart = await getCartByCustomerId(user?.id || "");
        const existingItem = cart.find((item) => item.products.id === product.id);
        if (existingItem) {
            await updateCart(existingItem.id, existingItem.qty + 1);
            alert("Product added to cart");
            return;
        }
        
        if (!user) {
            alert("Please login first");
            return;
        }

        await addToCart(user.id, product.id, 1);
        alert("Product added to cart");
        console.log("Product added to cart", product.id);

        if (!cart) return;
    }

    return (
        <Card
            theme={cardTheme}
            className="max-w-80 lg:w-full mx-auto"
            imgAlt={product.name}
            imgSrc={product.photo}
        >
            <Badge className="w-fit bg-tertiary text-white" color="success">{product.category}</Badge>

            <h5 className="font-semibold text-primary dark:text-white lg:mt-2">
                {product.name}
            </h5>

            <div className="mb-2 flex items-center lg:mb-5">
                <p className="text-sm font-light text-secondary tracking-tight">{product.description}</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl lg:text-xl font-bold text-tertiary dark:text-white">Rp{Intl.NumberFormat('id-ID').format(product.price)}</span>
                <button
                    type="button"
                    onClick={() => { addCart() }}
                    className="rounded-lg hover:bg-tertiary px-5 lg:px-3 py-2.5 lg:py-2 text-center text-sm font-medium text-white bg-primary focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to cart
                </button>
            </div>
        </Card>
    );
}

export default CardComponent
