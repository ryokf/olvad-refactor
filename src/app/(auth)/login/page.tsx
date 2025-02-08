
"use client";

import { supabase } from "@/config/db";
import buttonTheme from "@/themes/button";
import { Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";

const LoginPage = () => {
    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Login error:', error);
        } else {
            console.log('User logged in:', data);
        }

    };
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
    });


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="">
                <Image src="/logo.png" width={100} height={100} className="object-cover w-16 mx-auto my-4" alt="Flowbite React Logo"></Image>
                <h1 className="text-4xl mb-2 font-bold text-center text-primary">Login</h1>
                <p className="text-center font-semibold text-secondary mb-6">Please login to your account</p>
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@olvad.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput id="password1" type="password" required />
                    </div>
                    <Button theme={buttonTheme} color="primary" className="bg-tertiary border-none" onClick={signInWithGoogle}>Submit</Button>
                    <p className="text-center font-semibold text-secondary">or sing in with</p>
                    <div className="flex items-center justify-between gap-x-4">
                        <hr className="border border-primary border-dashed w-full" />
                        <button onClick={signInWithGoogle} className="border border-primary w-20 p-2 rounded-lg">
                            <Image src="/google.png" width={100} height={100} className="aspect-square w-16 mx-auto" alt="Flowbite React Logo"></Image>
                        </button>
                        <hr className="border border-primary border-dashed w-full" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage
