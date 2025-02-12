'use client'

import { Button, Carousel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import CardComponent from '../Card';
import buttonTheme from '@/themes/button';
import { supabase } from '@/config/db';
import carouselTheme from '@/themes/caraousel';

interface Product {
    id: number;
    name: string;
    categories: {
        category: string;
    };
    price: number;
    description: string;
    photo: string;
}

const Order = () => {

    const [products, setProducts] = useState<Product[] | null>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await supabase.from("products").select("*, categories(*)");
        setProducts(data);
    };

    console.log(products);

    return (
        <div className="min-h-screen lg:min-h-fit my-20 lg:grid grid-cols-3 items-end lg:w-10/12 mx-auto">
            <div className="w-10/12 mx-auto">
                <h1 className='text-3xl font-bold text-tertiary my-2 mx-auto'>Spesial Ramadhan! Nikmati Diskon Hingga 50%</h1>
                <p className='text-secondary text-sm font-semibold'>Sambut bulan suci dengan kelezatan roti segar dari kami! Dapatkan potongan harga spesial untuk semua varian roti dan kue favorit Anda.</p>
                <p className='font-semibold text-3xl text-center text-red-500 mt-6'>4 : 10 : 10 : 9</p>
                <p className='text-center text-red-500 font-semibold mb-2'>Hurry to take of the offer!!!</p>
                <Button theme={buttonTheme} color='failure' className='!w-full mt-4 font-bold'>Order Now!!!</Button>
            </div>
            <Carousel theme={carouselTheme} className="w-full my-10 lg:hidden" indicators={false} pauseOnHover>
                {
                    products?.map((product) => {
                        return (
                            <CardComponent key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} photo={product.photo} category={product.categories.category} />
                        )
                    })
                }
            </Carousel>
            <div className="hidden lg:flex col-span-2 gap-4 h-fit">
                    {
                        products?.map((product) => {
                            return (
                                <CardComponent key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} photo={product.photo} category={product.categories.category} />
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default Order