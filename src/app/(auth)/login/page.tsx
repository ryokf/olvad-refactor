"use client";

import { loginWithEmail } from "@/services/auth";
import buttonTheme from "@/themes/button";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@olvad.com" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Password" />
                </div>
                <TextInput id="password1" type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <Button theme={buttonTheme} onClick={() => loginWithEmail(email, password)} color="primary" className="bg-tertiary border-none">Submit</Button>
        </>
    );
}

export default LoginPage
