
"use client";

import Link from "next/link";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { supabase } from "@/config/db";
import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { navLink } from "@/constant/NavLink";
import buttonTheme from "@/themes/button";
import { navbarTheme } from "@/themes/navbar";

export function NavbarComponent() {
    const [user, setUser] = useState<User | null>(null);

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    }, []);

    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        window.location.reload();
    }, []);

    useEffect(() => {
        getUser();
        
        // Menambahkan listener untuk perubahan auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            getUser();
        });
        
        // Cleanup subscription saat komponen unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [getUser]);

    return (
        <div className="relative md:fixed w-full z-[999]">

            <Navbar theme={navbarTheme} fluid className="lg:[&>*]:mx-20 py-5 dark:bg-gray-950">
                <Navbar.Brand as={Link} href="/" className="gap-2">
                    <Image src="/logo.png" width={100} height={100} className="object-cover w-10" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-3xl font-semibold text-primary">Olvad</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="[&>*]:text-white lg:flex lg:items-center">
                    {
                        navLink.map((item) => (
                            <Navbar.Link key={item.name} as={Link} href={item.href} className="hover:!text-primary">{item.name}</Navbar.Link>
                        ))
                    }
                    {
                        user && (
                            <div className="flex gap-2">
                                <Button theme={buttonTheme} color="primary" as={Link} href="/profile" className="hover:!text-primary w-full">Profile</Button>
                                <Button theme={buttonTheme} color="failure" as="button" onClick={() => handleLogout()} className="hover:!text-primary w-full">Logout</Button>
                            </div>
                        )
                    }
                    {
                        !user && (
                            <div className="flex gap-2">
                                <Button theme={buttonTheme} color="primary" as={Link} href="/login" className="hover:!text-primary w-full">Login</Button>
                                <Button theme={buttonTheme} color="primary" as={Link} href="/register" className="hover:!text-primary w-full">Register</Button>
                            </div>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarComponent
