
"use client";

import { createCategory } from "@/utils/categoryUtils";
import { updateCategory } from "@/services/categoryService";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";

export function ModalUpdateCategory({ fetchCategories, id, category }: { fetchCategories: () => void, id: number, category: string}) {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({
        category,
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
        const newCategory = createCategory(undefined, data.category, data.icon);
        const result = await updateCategory(id, newCategory);
        if (result) {
            alert("Kategori berhasil diubah!");
            onCloseModal();
        } else {
            alert("Gagal mengubah kategori.");
        }

        fetchCategories();
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="mb-6 text-tertiary">Edit</button>
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
