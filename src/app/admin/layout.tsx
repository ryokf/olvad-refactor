'use client'

import { useEffect, useState } from 'react'
import { SidebarComponent } from '../../components/Admin/Sidebar';
import { supabase } from '@/config/db';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user && user.user_metadata.email !== "ryokhrisnaf@gmail.com") {
                window.location.href = "/"
            } else {
                setAllowed(true);
            }
        }
        checkAdmin();
    }, []) // Dependency array kosong untuk memastikan useEffect hanya dijalankan sekali

    return (
        <div className="min-h-screen w-full">
            {allowed &&
                <>
                    <SidebarComponent></SidebarComponent>
                    <div className="ml-80 w-full">
                        <h1 className='text-3xl font-medium text-black my-8 mx-10'>Dashboard Admin</h1>
                        {children}
                    </div>
                </>
            }
        </div>
    )
}

export default AdminLayout