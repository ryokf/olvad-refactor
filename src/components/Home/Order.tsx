'use client'

import { Button, Carousel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import CardComponent from '../Card';
import buttonTheme from '@/themes/button';
import { supabase } from '@/config/db';

const Order = () => {
    interface Product {
        id: number;
        name: string;
        category_id: number;
        price: number;
        description: string;
        photo: string;
    }

    const [products, setProducts] = useState<Product[] | null>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await supabase.from("products").select();
        setProducts(data);
    };

    console.log(products)
    
    return (
        <div className="grid grid-cols-1 w-10/12 mx-auto min-h-screen">
            <div className="">
                <h1 className='text-3xl font-bold text-tertiary my-2 mx-auto'>Spesial Ramadhan! Nikmati Diskon Hingga 50%</h1>
                <p className='text-secondary text-sm font-semibold'>Sambut bulan suci dengan kelezatan roti segar dari kami! Dapatkan potongan harga spesial untuk semua varian roti dan kue favorit Anda.</p>
                <p className='font-semibold text-3xl text-center text-red-500 mt-6'>4 : 10 : 10 : 9</p>
                <p className='text-center text-red-500 font-semibold mb-2'>Hurry to take of the offer!!!</p>
                <Button theme={buttonTheme} color='failure' className='!w-full mt-4 font-bold'>Order Now!!!</Button>
            </div>
            <Carousel className="w-full" indicators={false} pauseOnHover>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
            </Carousel>
        </div>
    )
}

export default Order