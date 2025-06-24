'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/config/db'
import { User } from '@supabase/supabase-js'
import Image from "next/image";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mx-auto max-w-7xl p-4 pt-6 sm:p-6 lg:p-8 min-h-96 flex justify-center items-center">
            <div className="my-32">

                <h1 className="text-3xl font-bold text-center text-primary">Profile</h1>
                <div className="mt-4 flex flex-col items-center">
                    <Image width={100} height={100} src={user.user_metadata.avatar_url} alt="Profile Picture" className="w-20 h-20 rounded-full" />
                    <div className="ml-4">
                        <p className="text-xl text-center font-semibold text-primary">{user.user_metadata.full_name}</p>
                        <p className="text-center mb-4 text-secondary">{user.email}</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="mt-6 rounded-lg bg-tertiary py-2 px-4 text-white hover:bg-green-700">
                        Edit Profile
                    </button>
                    <button
                        className="mt-6 rounded-lg bg-red-500 py-2 px-4 text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
