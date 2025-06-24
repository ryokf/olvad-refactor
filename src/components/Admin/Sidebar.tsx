
"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { usePathname } from 'next/navigation';
import { RiBreadLine } from "react-icons/ri";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { LuFileInput, LuFileOutput } from "react-icons/lu";

export function SidebarComponent() {
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname === path;
    };
    return (
        <Sidebar aria-label="Default sidebar example" className="w-80 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 shadow-lg">
            <SidebarLogo href="/admin" img="/logo.png" imgAlt="Flowbite logo">
                Olvad
            </SidebarLogo>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem href="/admin" icon={HiChartPie} labelColor="dark" active={isActive("/admin")}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem href="/admin/products" icon={RiBreadLine} labelColor="dark" active={isActive("/admin/products")}>
                        Products
                    </SidebarItem>
                    <SidebarItem href="/admin/category" icon={MdOutlineCategory} labelColor="dark" active={isActive("/admin/category")}>
                        Category
                    </SidebarItem>
                    <SidebarItem href="/admin/orders" icon={MdOutlineShoppingCart} active={isActive("/admin/orders")} labelColor="dark">
                        Order
                    </SidebarItem>
                    <SidebarItem href="/admin/expenses" icon={LuFileOutput} labelColor="dark" active={isActive("/admin/finance")}>
                        Pengeluaran
                    </SidebarItem>
                    <SidebarItem href="/admin/incomes" icon={LuFileInput} labelColor="dark" active={isActive("/admin/incomes")}>
                        Pemasukan
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}
export default SidebarComponent;