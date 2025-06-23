// Definisi tipe data UserMetadata sebagai interface
export interface UserMetadata {
    full_name: string;
    avatar_url: string;
    email_verified: boolean;
    phone: string;
}

// Definisi tipe data User sebagai interface
export interface User {
    id: number;
    email: string;
    user_metadata: UserMetadata;
}