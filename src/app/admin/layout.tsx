import React from 'react'
import { SidebarComponent } from '../../components/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full">
            <SidebarComponent></SidebarComponent>
            <div className="ml-80 w-full">
                <h1 className='text-3xl font-medium text-black my-8 mx-10'>Dashboard Admin</h1>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout