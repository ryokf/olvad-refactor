"use client";

import { updateProduct } from "@/services/productService"; // ganti dari addProduct
import {
    Button,
    FileInput,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Select,
    TextInput
} from "flowbite-react";
import { useEffect, useState } from "react";
import Product from "@/models/Product";
import { getCategories } from "@/services/categoryService";

export function ModalUpdateProduct({
    fetchProducts,
    id,
    name,
    description,
    price,
    category,
    photo
}: {
    fetchProducts: () => void;
    id: number;
    name: string;
    description: string;
    price: number;
    category: string | number;
    photo: string | File;
}) {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        id,
        name,
        description,
        price,
        category,
        photo
    });

    const [photoUrl, setPhotoUrl] = useState(
        typeof photo === "string" ? photo : null
    );

    function onCloseModal() {
        setOpenModal(false);
        setPhotoUrl(null);
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhotoUrl(URL.createObjectURL(file));
            setData((prev) => ({ ...prev, photo: file }));
        }
    };

    const handleSubmit = async () => {
        data.category = categories.find(
            (category) => category.name === data.category
        )
        console.log(data.category);
        const result = await updateProduct(data as Product);
        if (result) {
            alert("Produk berhasil diperbarui!");
            onCloseModal();
        } else {
            alert("Gagal memperbarui produk.");
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

    console.log(data);

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="mb-6"
            >
                Edit
            </button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Ubah data produk
                        </h3>

                        <div>
                            <Label htmlFor="name" className="mb-2 block">
                                Name
                            </Label>
                            <TextInput
                                id="name"
                                placeholder="Nama produk"
                                value={data.name}
                                onChange={(e) =>
                                    setData({ ...data, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="mb-2 block">
                                Description
                            </Label>
                            <TextInput
                                id="description"
                                placeholder="Deskripsi produk"
                                value={data.description}
                                onChange={(e) =>
                                    setData({ ...data, description: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="price" className="mb-2 block">
                                Price
                            </Label>
                            <TextInput
                                id="price"
                                type="number"
                                placeholder="Harga"
                                value={data.price}
                                onChange={(e) =>
                                    setData({ ...data, price: +e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="max-w-md">
                            <Label htmlFor="category" className="mb-2 block">
                                Category
                            </Label>
                            <Select
                                id="category"
                                value={categories.find((category) => category.id === data.category)?.id}
                                onChange={(e) =>
                                    setData({ ...data, category: e.target.value })
                                }
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block" htmlFor="file-upload">
                                Upload foto baru (opsional)
                            </Label>
                            <FileInput
                                id="file-upload"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        {photoUrl && (
                            <div className="mt-4">
                                <img
                                    src={photoUrl}
                                    alt="Preview"
                                    className="w-full max-h-60 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div className="w-full flex justify-end">
                            <Button color="primary" onClick={handleSubmit}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
