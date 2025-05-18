import React from 'react'
import { SidebarComponent } from '../../components/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full">
            <SidebarComponent></SidebarComponent>
            {children}
        </div>
    )
}

export default AdminLayout