"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { deleteProduct, getProducts } from '@/services/productService';
import Image from 'next/image';
import { ModalAddProduct } from '../../../components/Admin/ModalAddProduct';
import { ModalUpdateProduct } from '../../../components/Admin/ModalUpdateProduct';

const AdminProductPage = () => {
    const [products, setProducts] = React.useState([]);
    const fetchProducts = async () => {
        const products = await getProducts();
        setProducts(products);
    }

    React.useEffect(() => {
        fetchProducts();
    }, [])

    const handleDelete = async (id: number, photoUrl: string) => {
        const result = await deleteProduct(id.toString(), photoUrl);
        if (result) {
            fetchProducts();
        } else {
            alert("Gagal menghapus produk.");
        }
    }

    console.log(products);
    return (
        <div className="overflow-x-auto w-4/5 mx-10 mb-20">
            <ModalAddProduct fetchProducts={async () => await fetchProducts()}></ModalAddProduct>
            <Table hoverable>
                <TableHead className='w-full'>
                        <TableHeadCell>#</TableHeadCell>
                        <TableHeadCell>Photo</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Description</TableHeadCell>
                        <TableHeadCell>Price</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        products.map((product, index) => (
                            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Image width={100} height={100} src={product.photo} alt={product.name} className="w-20 h-20 object-cover" />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.description}
                                </TableCell>
                                <TableCell>{Intl.NumberFormat('id-ID').format(product.price)}</TableCell>
                                <TableCell>
                                    <a href="#" className="font-medium text-tertiary hover:underline dark:text-cyan-500">
                                        <ModalUpdateProduct fetchProducts={async () => await fetchProducts()} product={product}></ModalUpdateProduct>
                                    </a>
                                    <span className="mx-2">|</span>
                                    <button onClick={async () => {await handleDelete(product.id, product.photo)}} className="font-medium text-red-600 hover:underline dark:text-red-500">
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminProductPage