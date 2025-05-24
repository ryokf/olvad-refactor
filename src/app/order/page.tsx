// src/app/order/page.tsx
'use client';

import Image from "next/image";
import { getTransactionByCustomerId } from "@/services/transactionService";
import { supabase } from "@/config/db";
import { useEffect, useState } from "react";
import { filterTransaction } from "@/constant/FilterTransaction";

export default function OrdersPage() {
    // Hitung total harga diskon
    // const totalPrice = products.reduce((sum, item) => sum + item.priceDiscount, 0);
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState("processed");
    const [loading, setLoading] = useState(false);

    function handleClick(key) {
        setActive(key);
        fetchTransactions(key);
        // if (onChange) onChange(key);
    }
    
    useEffect(() => {
        fetchTransactions(active)
    }, [])
    
    const fetchTransactions = async (status) => {
        const { data: { user } } = await supabase.auth.getUser()
        setLoading(true);
        const data = await getTransactionByCustomerId(user.id, status);
        setProducts(data);
        setLoading(false);
    }

    return (
        <div className="pt-32 pb-20">
            <div className="w-1/2 mx-auto p-4 font-sans text-gray-800">
                <h1 className="text-3xl font-semibold mb-4">Pesanan anda</h1>
                {/* Status info */}
                <nav className="flex justify-center w-fit border rounded-lg border-gray-300 font-semibold text-sm select-none">
                    {filterTransaction.map(({ label, key }) => {
                        const isActive = key === active;
                        return (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                className={`relative px-4 py-3 whitespace-nowrap ${isActive
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-gray-700 hover:text-primary"
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </nav>
                {/* Delivery note */}

                {/* Product list */}
                <div className="gap-8 w-full">

                    {loading ? <p>Loading...</p> : products.map((product, i) => (
                        <div key={i} className="mt-4 p-4 border-primary border-dashed border-[3px] rounded-xl">
                            <p className="text-sm text-gray-500">id pesanan : {product.id}</p>
                            <p className="text-sm text-gray-500 mb-4">Tanggal pesanan : {product.createdAt.split("T")[0]}</p>
                            <div className="divide-y divide-gray-300 border border-gray-300 rounded-md">
                                {product.detail_order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between p-3 items-center space-x-4">
                                        <div className="flex-shrink-0 w-20 h-20 relative bg-gray-50 rounded border border-gray-200 overflow-hidden">
                                            <Image
                                                src={item.photo}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-semibold">{item.name}</div>

                                            <div className="text-sm text-gray-600 mt-1">x{item.qty}</div>
                                        </div>
                                        <div className="text-right min-w-[80px]">
                                            <div className="text-xs text-gray-400">
                                                Rp{item.price.toLocaleString("id-ID")}
                                            </div>
                                            <div className="font-semibold text-primary">
                                                Rp{(item.price * item.qty).toLocaleString("id-ID")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Total */}
                            <div className="mt-4 flex justify-end items-center space-x-2 border-t border-gray-300 pt-4">
                                <span className="text-lg font-semibold">Total Pesanan: {product.price.toLocaleString("id-ID")}</span>
                                {/* <span className="text-2xl font-bold text-primary">Rp{totalPrice.toLocaleString("id-ID")}</span> */}
                            </div>
                            {/* Footer Buttons */}
                            {/* <div className="w-full flex justify-end">

                                <div className="mt-6 flex space-x-3 w-1/3 ">
                                    <button className="flex-grow bg-tertiary font-bold text-white py-2 rounded hover:bg-primary/90 transition">
                                        Hubungi Penjual
                                    </button>
                                    <button className="flex-grow border border-gray-400 py-2 rounded hover:bg-gray-100 transition">
                                        Batalkan Pesanan
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    ))}
                </div>




            </div>
        </div>
    );
}