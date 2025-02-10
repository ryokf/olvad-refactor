import { supabase } from "@/config/db";

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Login error:', error);
    } else {
        console.log('User logged in:', data);
    }
};
