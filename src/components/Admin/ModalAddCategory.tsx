
"use client";

import Category from "@/models/Category";
import { addCategory } from "@/services/categoryService";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export function ModalAddCategory({ fetchCategories }: { fetchCategories: () => void}) {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({
        category: "",
        icon : null
    });

    function onCloseModal() {
        setOpenModal(false);
        setData({
            category: "", 
            icon : null
        });
    }

    const handleSubmit = async () => {
        const newCategory = new Category(undefined, data.category, data.icon);
        const result = await addCategory(newCategory);
        if (result) {
            alert("Kategori berhasil ditambahkan!");
            onCloseModal();
        } else {
            alert("Gagal menambahkan kategori.");
        }

        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="bg-tertiary mb-6">Tambah Kategori</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Masukkan data kategori</h3>

                        <div>
                            <Label htmlFor="name" className="mb-2 block">Name</Label>
                            <TextInput
                                id="name"
                                placeholder="Nama produk"
                                value={data.category}
                                onChange={(e) => setData({ ...data, category: e.target.value })}
                                required
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <Button color="primary" onClick={handleSubmit}>Simpan</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
