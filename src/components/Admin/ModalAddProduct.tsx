
"use client";

import { getCategories } from "@/services/categoryService";
import { addProduct } from "@/services/productService";
import { Button, FileInput, Label, Modal, ModalBody, ModalHeader, Select, TextInput } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ModalAddProduct({ fetchProducts }: { fetchProducts: () => void}) {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        photo: null
    });

    const [photoUrl, setPhotoUrl] = useState(null);

    function onCloseModal() {
        setOpenModal(false);
        setData({
            name: "",
            description: "",
            price: "",
            category: "",
            photo: null
        });
        setPhotoUrl(null);
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoUrl(URL.createObjectURL(file));
            setData((prev) => ({ ...prev, photo: file }));
        }
    };

    const handleSubmit = async () => {
        if (!data.photo) {
            alert("Foto harus diunggah");
            return;
        }
        const result = await addProduct(data);
        if (result) {
            alert("Produk berhasil ditambahkan!");
            onCloseModal();
        } else {
            alert("Gagal menambahkan produk.");
        }

        fetchProducts();
    };

    const fetchCategories = async () => {
        const data = await getCategories()
        if (data) {
            setCategories(data);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="bg-tertiary mb-6">Tambah Produk</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Masukkan data produk</h3>

                        <div>
                            <Label htmlFor="name" className="mb-2 block">Name</Label>
                            <TextInput
                                id="name"
                                placeholder="Nama produk"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="mb-2 block">Description</Label>
                            <TextInput
                                id="description"
                                placeholder="Deskripsi produk"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="price" className="mb-2 block">Price</Label>
                            <TextInput
                                id="price"
                                type="number"
                                placeholder="Harga"
                                value={data.price}
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="max-w-md">
                            <Label htmlFor="category" className="mb-2 block">Category</Label>
                            <Select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData({ ...data, category: e.target.value })}
                                required
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block" htmlFor="file-upload">Upload foto</Label>
                            <FileInput id="file-upload" accept="image/*" onChange={handlePhotoChange} />
                        </div>

                        {photoUrl && (
                            <div className="mt-4">
                                <Image width={100} height={100} src={photoUrl} alt="Preview" className="w-full max-h-60 object-cover rounded-lg" />
                            </div>
                        )}

                        <div className="w-full flex justify-end">
                            <Button color="primary" onClick={handleSubmit}>Simpan</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
