
"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import Image from "next/image";

export function NavbarComponent() {
    const navLink = [
        {
            name: "Home",
            href: "#"
        },
        {
            name: "About",
            href: "#"
        },
        {
            name: "Services",
            href: "#"
        },
        {
            name: "Contact",
            href: "#"
        },
        {
            name: "Menu",
            href: "#"
        },
    ]

    return (
        <div className="relative md:fixed w-full z-[999]">

        <Navbar fluid className="lg:[&>*]:mx-20 py-5 dark:bg-gray-950">
            <Navbar.Brand as={Link} href="https://flowbite-react.com" className="gap-2">
                <Image src="/logo.png" width={100} height={100} className="object-cover w-10" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-3xl font-semibold text-primary">Olvad</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="[&>*]:text-white">
                {
                    navLink.map((item, index) => (
                        <Navbar.Link key={index} as={Link} href={item.href} className="hover:!text-primary">{item.name}</Navbar.Link>
                    ))
                }
            </Navbar.Collapse>
        </Navbar>
                </div>
    );
}

export default NavbarComponent
