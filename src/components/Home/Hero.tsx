"use client"

import { poppins, sourGummy } from '@/themes/fonts';
import textInputTheme from '@/themes/text_input';
import { useGSAP } from '@gsap/react'
import { TextInput } from 'flowbite-react';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import { IoSearch } from "react-icons/io5";
import BakeryShop from '../3D_model/BakeryShop';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Hero = () => {
    const headTextRef = useRef(null);
    const outlineTextRef = useRef(null);
    const imageRef = useRef(null);


    useGSAP(() => {
        gsap.from(headTextRef.current, {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power4.out"
        })

        gsap.from(outlineTextRef.current, {
            opacity: 0,
            x: 100,
            duration: 1,
            ease: "power4.out"
        })

        gsap.from(imageRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        })

        
    });




    return (
        <div className="lg:max-w-8xl w-11/12 mx-auto min-h-screen">
            {/* <h1 ref={outlineTextRef} className="text-[6rem] top-12 lg:text-[18rem] text-outline absolute -z-10 lg:top-6 -left-1/4 ">Dreamofhappiness</h1> */}
            <div className="pt-10 lg:pt-0 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 items-stretch max-h-screen ">
                <div ref={headTextRef} className="flex flex-col items-end justify-center md:h-screen max-w-2xl mx-auto ">
                    <h1 className={`${poppins.className} text-5xl text-center lg:text-left lg:text-8xl font-bold text-primary`}>Feel The <span className={`${sourGummy.className} font-bold text-tertiary`}>Happiness</span> In Every Bite</h1>
                    <p className='my-7 text-secondary text-xl text-center lg:text-left lg:text-2xl font-medium'>kombinasi dari bahan alami terbaik untuk manisnya setiap momen</p>
                    {/* <button className='bg-secondary text-white py-2 px-4 rounded-xl text-xl'>Lihat Menu</button> */}
                    <TextInput sizing={"lg"} theme={textInputTheme} color='primary' id="email4" type="email" icon={IoSearch} placeholder="Cari menu favoritmu" required className='w-full focus:!outline-primary mx-auto hidden lg:block' />
                </div>
                <div className="flex justify-center">
                    <Canvas orthographic camera={{zoom: 55, position: [0, 5, 5]} }>
                        <directionalLight intensity={3} position={[-5, 5,5]}></directionalLight>
                        <ambientLight intensity={3} />
                        <BakeryShop position={[0, -1.5, 2]} scale={[0.75, 0.95, 0.75]}></BakeryShop>
                        <OrbitControls 
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 3}
                            minAzimuthAngle={-Math.PI / 4}
                        ></OrbitControls>
                    </Canvas>
                </div>
            </div>
        </div>
    )
}

export default Hero