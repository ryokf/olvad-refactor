"use client";

import { poppins } from "../themes/fonts";
import "./globals.css";
import NavbarComponent from "@/components/Navbar";
import FooterComponent from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const excludeNavbarAndFooter = [
    "/login", 
    "/register", 
    "/admin",
    "/admin/products",
    "/admin/orders",
    "/admin/category",
    "/admin/finance",
    "/admin/incomes",
    "/admin/expenses",
  ];

  const noNavbar = excludeNavbarAndFooter
  const noFooter = excludeNavbarAndFooter;

  const pathname = usePathname();

  return (
    <html lang="en">

      <body
        className={`${poppins.className} antialiased overflow-x-hidden`}
      >

          {
            !noNavbar.includes(pathname) &&
            <NavbarComponent></NavbarComponent>
          }
          {children}
          {
            !noFooter.includes(pathname) &&
            <FooterComponent></FooterComponent>
          }

      </body>
    </html>
  );
}
