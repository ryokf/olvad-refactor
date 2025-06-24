import { supabase } from "@/config/db";
import { mapToProduct } from "@/utils/productUtils";

// Import tipe Product tidak diperlukan di sini

// Definisi interface untuk data produk dari database
interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
    photo: string;
    category_id: number;
    categories?: {
        category: string;
    };
}

// Fungsi untuk memproses data produk dari database
const processProductData = (data: ProductData[]) => {
    return data.map(item => {
        // Menyalin kategori dari relasi categories ke field category
        item.category = item.categories?.category;
        return mapToProduct(item);
    });
};

export const getProducts = async () => {
    const { data } = await supabase.from("products").select("*, categories(*)");
    return processProductData(data);
};

export const getProductLimit = async (limit: number) => {
    const { data } = await supabase.from("products").select("*, categories(*)").limit(limit);
    return processProductData(data);
};

export const getProductsByCategory = async (categoryId: number) => {
    const { data } = await supabase.from("products").select("*, categories(*)").eq("category_id", categoryId);
    return processProductData(data);
};

export const getProductById = async (id: number) => {
    const { data } = await supabase.from("products").select("*, categories(*)").eq("id", id);
    return processProductData(data);
};

export const addProduct = async (product) => {
    // Gunakan fileName terpisah untuk path di storage
    const fileName = `${Date.now()}`;
    
    // Upload foto ke Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(`${fileName}`, product.photo);

    if (uploadError) {
        console.error("Upload error:", uploadError);
        return null;
    }

    // Dapatkan URL public dari foto
    const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(`${fileName}`);

    // Insert ke tabel products
    const { data: productData, error: insertError } = await supabase
        .from("products")
        .insert([{
            name: product.name,
            description: product.description,
            price: product.price,
            photo: urlData.publicUrl, // simpan URL foto, bukan objek file
            category_id: product.category
        }])
        .select();

    if (insertError) {
        console.error("Insert error:", insertError);
        return null;
    }

    // Optional: Assign kategori ke data produk jika dibutuhkan
    if (productData) {
        productData.forEach((item) => {
            item.category = product.category;
        });
    }

    return productData;
};

export const updateProduct = async (product) => {
    let photoUrl = product.photo;

    // Pastikan typeof === 'object' agar aman digunakan dalam instanceof
    if (typeof product.photo === "object" && product.photo! instanceof File) {
        const fileName = `${Date.now()}`;
        const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(`public/${fileName}`, product.photo, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            console.error("Upload gagal:", uploadError);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from("products")
            .getPublicUrl(`public/${fileName}`);

        photoUrl = urlData.publicUrl;
    }

    const { data, error: updateError } = await supabase
        .from("products")
        .update({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product.category,
            photo: photoUrl
        })
        .eq("id", product.id)
        .select();

    if (updateError) {
        console.error("Gagal update:", updateError);
        return null;
    }

    return data;
};

export const deleteProduct = async (productId: string, photoUrl: string) => {
    // 1. Hapus file dari Supabase Storage
    const filePath = photoUrl.split("/storage/v1/object/")[1];
    if (filePath) {
        const { error: storageError } = await supabase.storage
            .from("products")
            .remove([`${filePath}`]);

        if (storageError) {
            console.error("Gagal menghapus file dari storage:", storageError);
        }
    }

    // 2. Hapus data dari tabel Supabase
    const { error: dbError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (dbError) {
        console.error("Gagal menghapus data dari tabel:", dbError);
        return false;
    }

    console.log("Data berhasil dihapus");
    return true;
};
