"use client"

import { supabase } from '@/config/db';
import buttonTheme from '@/themes/button';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import CardComponent from '../../components/Card';

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

interface Category { 
    id: number; 
    category: string; 
    icon: string|null;
} 

const MenuPage = () => {

    const [products, setProducts] = useState<Product[] | null>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProducts = async (id: number|null) => {
        if(id === null) {
            const { data } = await supabase.from("products").select("*, categories(*)");
            setProducts(data);
        }else{  
            const { data } = await supabase.from("products").select("*, categories(*)").eq("category_id", id);
            setProducts(data);
        }
    };

    const fetchCategories = async () => {
        const { data } = await supabase.from("categories").select("*");
        if (data) {
            setCategories(data);
        }
    };

    return (
        <div className='min-h-screen'>
            <div className="h-96">
                <h1 className='text-3xl lg:text-5xl font-bold text-center text-primary pt-10 lg:pt-32'>Daftar Menu</h1>
                <div className="flex justify-start my-10 max-w-5xl w-11/12 mx-auto gap-4">
                    <Button theme={buttonTheme} color='primary' onClick={() => fetchProducts(null)}>All</Button>
                    {
                        categories.map((category) => {
                            return (
                                <div key={category.id} className="">
                                    <Button theme={buttonTheme} color='primary' onClick={() => fetchProducts(category.id)}>{category.category}</Button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl w-11/12 mx-auto">
                    {
                        products?.map((product) => {
                            return (
                                <CardComponent
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    photo={product.photo}
                                    category={product.categories.category}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuPage