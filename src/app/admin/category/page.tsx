'use client'

import { Category } from '@/types/Category';
import { deleteCategory, getCategories } from '@/services/categoryService';
import { Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { TableBody, TableCell, TableHeadCell, TableRow } from "flowbite-react";
import { ModalAddCategory } from '../../../components/Admin/ModalAddCategory';
import { ModalUpdateCategory } from '@/components/Admin/ModalUpdateCategory';

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getCategories()
        if (data) {
            setCategories(data);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await deleteCategory(id);
        if (result) {
            fetchCategories();
        } else {
            alert("Gagal menghapus kategori.");
        }
    }

    console.log(categories)

    return (
        <div className="overflow-x-auto w-1/2 mx-10 mb-20">
            <div className="">
                <ModalAddCategory fetchCategories={async () => await fetchCategories()}></ModalAddCategory>
            </div>
            <Table>
                <TableHead>
                    <TableHeadCell>#</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    {/* <TableHeadCell>Icon</TableHeadCell> */}
                    <TableHeadCell>
                        Action
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        categories.map((category, index) => (
                            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>{index + 1}</TableCell>

                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {category.category}
                                </TableCell>
                                {/* <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {category.icon}
                                </TableCell> */}

                                <TableCell>

                                    <ModalUpdateCategory fetchCategories={async () => await fetchCategories()} id={category.id} category={category.category}></ModalUpdateCategory>

                                    <span className="mx-2">|</span>
                                    <button onClick={async () => { await handleDelete(category.id) }} className="font-medium text-red-600 hover:underline dark:text-red-500">
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

export default CategoryPage