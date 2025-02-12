"use client"

import { registerWithEmail } from '@/services/auth'
import buttonTheme from '@/themes/button'
import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" type="text" placeholder="olvad" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
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
            <Button theme={buttonTheme} onClick={() => registerWithEmail(name, email, password)} color="primary" className="bg-tertiary border-none">Submit</Button>
        </>
    )
}

export default RegisterPage