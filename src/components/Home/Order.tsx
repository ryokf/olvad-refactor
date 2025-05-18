'use client'

import { Button, Carousel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import CardComponent from '../Card';
import buttonTheme from '@/themes/button';
import carouselTheme from '@/themes/caraousel';
import Product from '@/models/Product';
import { getProductLimit} from '@/services/productService';

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
            <div className="w-10/12 mx-auto bg-tertiary h-full py-6 px-4 rounded-lg flex flex-col items-center justify-center lg:col-span-1">
                <h1 className='text-3xl font-bold text-white my-2 mx-auto'>Spesial Menu Baru! Nikmati Diskon Hingga 50%</h1>
                <h1 className='text-lg text-white my-2 mx-auto text-center'>Waktu terbatas untuk mendapatkan diskon</h1>
                {/* <p className='text-white text-sm font-semibold'>Waktu terbatas untuk mendapatkan diskon</p> */}
                {/* <p className='font-semibold text-3xl text-center text-red-500 mt-6'>4 : 10 : 10 : 9</p>
                <p className='text-center text-red-500 font-semibold mb-2'>Hurry to take of the offer!!!</p> */}
                <Button theme={buttonTheme} className='!w-full mt-4 font-bold bg-primary hover:bg-secondary'>Pesan Sekarang!!!</Button>
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