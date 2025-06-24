import { User } from "@/types/User";

// Fungsi untuk membuat objek User baru
export const createUser = (id: number, email: string, full_name: string, avatar_url: string, email_verified: boolean, phone: string): User => {
    return {
        id,
        email,
        user_metadata: {
            full_name,
            avatar_url,
            email_verified,
            phone
        }
    };
};

// Definisi interface untuk data user dari database
interface UserData {
    id: number;
    email: string;
    user_metadata: {
        full_name: string;
        avatar_url: string;
        email_verified: boolean;
        phone: string;
    };
}

// Fungsi untuk mengkonversi data mentah menjadi objek User
export const mapToUser = (data: UserData): User => {
    return {
        id: data.id,
        email: data.email,
        user_metadata: data.user_metadata
    };
};