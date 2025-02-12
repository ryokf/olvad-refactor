"use client";

import { signInWithGoogle } from '@/services/auth'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="">
                <Image src="/logo.png" width={100} height={100} className="object-cover w-16 mx-auto my-4" alt="Flowbite React Logo"></Image>
                <h1 className="text-4xl mb-2 font-bold text-center text-primary">{pathname === "/login" ? "Login" : "Register"}</h1>
                <p className="text-center font-semibold text-secondary mb-6">{pathname === "/login" ? "Login to your account" : "Create an account"}</p>
                <form className="flex max-w-xl flex-col gap-4">
                    {children}
                    <p className="text-center text-sm font-semibold text-secondary">or {pathname === "/login" ? "sign in" : "sign up"} with</p>
                    <div className="flex items-center justify-between gap-x-4">
                        <hr className="border border-primary border-dashed w-full" />
                        <button type="button" onClick={signInWithGoogle} className="border border-primary w-20 p-2 rounded-lg">
                            <Image src="/google.png" width={100} height={100} className="aspect-square w-16 mx-auto" alt="Flowbite React Logo"></Image>
                        </button>
                        <hr className="border border-primary border-dashed w-full" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthLayout