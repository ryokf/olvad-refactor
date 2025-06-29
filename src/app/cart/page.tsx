"use client"

import { supabase } from '@/config/db';
import { Cart } from '@/types/Cart';
import { clearCart, deleteCart, getCartByCustomerId, updateCart } from '@/services/cartService';
import { addTransaction } from '@/services/transactionService';
import buttonTheme from '@/themes/button';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'

declare global {
    interface Window {
        snap: {
            pay: (token: string, options?: {
                onSuccess?: (result: unknown) => void;
                onPending?: (result: unknown) => void;
                onError?: (result: unknown) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

const CartPage = () => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const checkLogin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                fetchCart();
            }
        }
        checkLogin();

    }, []);

    const fetchCart = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const data = await getCartByCustomerId(user.id);
        const total = data.reduce((acc, item) => acc + (item.products.price * item.qty), 0);
        setTotalPrice(total);
        setCart(data);
    }

    const handleDeleteCart = async (id: number) => {
        await deleteCart(id);
        await fetchCart();
    }

    const handleQtyChange = async (id: number, qty: number) => {
        const updatedCartList = cart.map(item => {
            if (item.id === id) {
                return { ...item, qty: qty } as Cart;
            }
            return item;
        });
        setCart(updatedCartList);
        const total = updatedCartList.reduce((acc, item) => acc + (item.products.price * item.qty), 0);
        setTotalPrice(total);
        const updatedCart = await updateCart(id, qty);
        if (!updatedCart) return;
    }

    // Kode checkout lama dihapus karena tidak digunakan

    const checkout = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        // await addTransaction({
        //     customer_id: user.id,
        //     detail_order: {
        //         items: cart.map(item => ({
        //             name: item.products.name,
        //             qty: item.qty,
        //             price: item.products.price,
        //             photo: item.products.photo,
        //             product_id: item.products.id
        //         }))
        //     },
        //     status: "processed",
        //     price: totalPrice
        // });

        // // Kosongkan cart
        // await clearCart(user.id);

        // // Redirect ke halaman order
        // redirect("/order");
        const id = new Date().getTime().toString()
        const data = {
            price: totalPrice,
            id: id,
        };

        const response = await fetch("/api/tokenizer", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        window.snap.pay(result.token, {
            onSuccess: async function () {
                // ✅ Cek ulang status transaksi
                const statusResponse = await fetch(`/api/check-status?id=${id}`);
                const statusData = await statusResponse.json();
                console.log("Midtrans Status:", statusData);

                if (statusData.transaction_status === "settlement" || statusData.transaction_status === "capture") {
                    // Tambahkan transaksi ke database
                    await addTransaction({
                        customer_id: user.id,
                        detail_order: {
                            items: cart.map(item => ({
                                name: item.products.name,
                                qty: item.qty,
                                price: item.products.price,
                                photo: item.products.photo,
                                product_id: item.products.id
                            }))
                        },
                        status: "processed",
                        price: totalPrice
                    });

                    // Kosongkan cart
                    await clearCart(user.id);

                    // Redirect ke halaman order
                    redirect("/order");
                } else {
                    alert("Pembayaran belum berhasil. Silakan coba lagi.");
                }
            }
            ,
            onPending: function () {
                alert("Anda belum menyelesaikan pembayaran, silakan selesaikan pembayaran Anda.");
            }
            ,
            onError: async () => {
                alert("Terjadi kesalahan saat memproses pembayaran, silakan coba lagi.");
            }
            ,
            onClose: () => {
                console.log("Midtrans Closed");
                alert("Payment is closed, please try again later.");
            }
        });
        // Token sudah digunakan dalam snap.pay, tidak perlu logging

        // Status sudah dicek dalam callback onSuccess, tidak perlu dicek lagi di sini

    }

    useEffect(() => {
        // render midtrans snap token
        const snapScript = "https://app.midtrans.com/snap/snap.js";
        const clientKey = process.env.NEXT_PUBLIC_CLIENT ?? '';
        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    // Midtrans tidak digunakan, jadi useEffect untuk script Midtrans dihapus

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mt-24 mb-8 text-primary">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                    <div className=''>
                        <h2 className="text-xl font-semibold mb-4 text-secondary">Order Summary</h2>
                        <ul className="w-10/12">
                            {
                                cart.map((item: Cart) => (
                                    <li key={item.id} className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <Image src={item.products.photo} alt={item.products.name} width={100} height={100} className="w-16 h-16 object-cover mr-4 rounded-full" />
                                            <div>
                                                <p className="font-semibold">{item.products.name}</p>
                                                <p className="text-gray-600">{item.products.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold text-left">Rp{item.products.price * item.qty}</p>
                                            <div className="flex items-center mt-2">
                                                <p className="text-gray-600 mr-2">Qty:</p>
                                                <input type="number" className='w-16 h-6 rounded border border-gray-300 text-center text-sm' value={item.qty} onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))} />
                                            </div>
                                        </div>
                                        <button onClick={async () => await handleDeleteCart(item.id)} className='text-red-500'>hapus</button>
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

                            <div className="flex justify-end">
                                <Button
                                    theme={buttonTheme}
                                    color='primary'
                                    onClick={checkout}
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