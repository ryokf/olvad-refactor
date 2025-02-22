"use client"

import buttonTheme from '@/themes/button';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import Image from 'next/image'
import React from 'react'

const CartPage = () => {
    interface CartItem {
        id: number;
        photo: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
    }

    const [cart, setCart] = React.useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    React.useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
        setCart(storedCart);
        setTotalPrice(storedCart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0));
    }, []);

    console.log(cart);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mt-24 mb-8 text-primary">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                    <div className=''>
                        <h2 className="text-xl font-semibold mb-4 text-secondary">Order Summary</h2>
                        <ul className="w-10/12">
                            {
                                cart.map((item: { id: number; photo: string; name: string; category: string; price: number; quantity: number; }) => (
                                    <li key={item.id} className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <Image src={item.photo} alt={item.name} width={100} height={100} className="w-16 h-16 object-cover mr-4 rounded-full" />
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-gray-600">Qty : {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">Rp{item.price * item.quantity}</p>
                                    </li>
                                ))
                            }
                        </ul>
                        <hr className='my-4 w-10/12' />
                        <div className="flex flex-col items-end w-10/12">
                            <p className='font-semibold text-primary'>total pembayaran</p>
                            <p className='font-bold text-2xl text-primary'>Rp{Intl.NumberFormat('id-ID').format(totalPrice)}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-secondary">Payment</h2>
                        <form>
                            <div className="mb-4">
                                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Full Name
                                </Label>
                                <TextInput
                                    className=" rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </Label>
                                <TextInput
                                    className=" rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </Label>
                                <TextInput
                                    className=" rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="text"
                                    placeholder="081234567890"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                    Address
                                </Label>
                                <Textarea
                                    className=" rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address"
                                    placeholder="Jl. Sudirman No. 123, Bandung, Jawa Barat"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment">
                                    Payment Method
                                </Label>
                                <select
                                    className=" rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="payment"
                                >
                                    <option>Bank Transfer</option>
                                    <option>Credit Card</option>
                                    <option>Paid on Delivery</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    theme={buttonTheme}
                                    color='primary'
                                    type="submit"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage