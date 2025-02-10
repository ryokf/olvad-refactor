import { Label, TextInput } from 'flowbite-react'
import React from 'react'

const RegisterPage = () => {
    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" type="text" placeholder="olvad" required />
            </div>
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
        </>
    )
}

export default RegisterPage