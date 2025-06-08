'use client'

import { Button, Carousel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import CardComponent from '../Card';
import buttonTheme from '@/themes/button';
import carouselTheme from '@/themes/caraousel';
import Product from '@/models/Product';
import { getProductLimit } from '@/services/productService';

const Order = () => {

    const [products, setProducts] = useState<Product[] | null>([]);

    useEffect(() => {
        const getPromoData = async () => {
            const data = await getProductLimit(4);
            setProducts(data);
        };

        getPromoData();
    }, []);

    return (
        <div className="min-h-screen lg:min-h-fit my-20 lg:grid grid-cols-3 items-end lg:w-10/12 mx-auto">
            <div className="flex flex-col h-full justify-between bg-gradient-to-r from-tertiary to-tertiary/50 p-6 mr-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-4">🎉 Promo Spesial!</h2>
                    <p className="text-2xl font-semibold text-primary">Diskon hingga 50%</p>
                    <p className="text-xl text-primary">Hanya hari ini! Jangan lewatkan kesempatan emas ini.</p>
                </div>
                <a className="inline-block text-center mt-4 bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded transition">
                    🛒 Pesan Sekarang
                </a>
            </div>
            <Carousel theme={carouselTheme} className="w-full my-10 lg:hidden" indicators={false} pauseOnHover>
                {
                    products?.map((product) => {
                        console.log(product);
                        return (
                            <CardComponent key={product.id} product={product} />
                        )
                    })
                }
            </Carousel>
            <div className="hidden lg:flex col-span-2 gap-4 h-fit">
                {
                    products?.map((product) => {
                        return (
                            <CardComponent key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Order