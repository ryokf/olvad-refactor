'use client';

import Image from "next/image";
import { getTransactionByStatus, updateTransaction } from "@/services/transactionService";
import { useEffect, useState } from "react";
import { filterTransaction } from "@/constant/FilterTransaction";

export default function OrdersPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("processed");

    useEffect(() => {
        fetchTransactions(status)
    }, [])

    const fetchTransactions = async (status) => {
        setLoading(true);
        const data = await getTransactionByStatus(status);
        console.log(data)
        data.map(item => item.createdAt = new Date(item.createdAt).toLocaleString());
        setProducts(data);
        setLoading(false);
    }

    const handleUpdate = async (id, status) => {
        await updateTransaction(id, status);
        fetchTransactions(status);
    }

    function handleClick(status) {
        setStatus(status);
        fetchTransactions(status);
    }

    return (
        <div className="">
            <div className="w-10/12 p-4 font-sans text-gray-800">
                <nav className="flex mx-8 justify-center w-fit border rounded-lg border-gray-300 font-semibold text-sm select-none">
                    {filterTransaction.map(({ label, key }) => {
                        const isActive = key === status;
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
                <div className="gap-4 grid grid-cols-3 w-full mx-8">
                    {loading ? <p>Loading...</p> :
                        products.map((product, i) => (
                            <div key={i} className="mt-4 p-4 border-primary border-dashed border-[3px] rounded-xl">
                                <div className="w-full flex gap-4 mb-4 items-center">
                                    <Image className="w-16 h-16 rounded-full" src={product.customer.avatar_url} alt={product.customer.full_name} width={100} height={100}></Image>
                                    <div className="h-fit w-fit">
                                        <p className="text-lg font-semibold">{product.customer.full_name}</p>
                                        <p className="text-sm text-gray-500">{product.customer.email}</p>
                                    </div>
                                </div>
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
                                <div className="mt-4 flex justify-between items-center space-x-2 border-t border-gray-300 pt-4">
                                    <span className="text-lg font-semibold">Total Pesanan: {product.price.toLocaleString("id-ID")}</span>
                                    {
                                        product.status != "done" && 
                                        <button onClick={() => product.status === "ready" ? handleUpdate(product.id, "done") : handleUpdate(product.id, "ready")} className="bg-tertiary px-4 font-bold text-white py-2 rounded hover:bg-tertiaty/90 transition">{`${product.status === "ready" ? "Sudah diambil" : "Pesanan siap"}`}</button>
                                    }
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}