"use client"

import { poppins, sourGummy } from '@/themes/fonts';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useRef } from 'react'
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
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto min-h-screen">
            {/* <h1 ref={outlineTextRef} className="text-[6rem] top-12 lg:text-[18rem] text-outline absolute -z-10 lg:top-6 -left-1/4 ">Dreamofhappiness</h1> */}
            <div className="pt-6 sm:pt-10 lg:pt-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 min-h-[calc(100vh-2rem)]">
                <div ref={headTextRef} className="flex flex-col items-center md:items-start justify-center w-full max-w-2xl mx-auto">
                    <h1 className={`${poppins.className} text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-center md:text-left font-bold text-primary leading-tight`}>
                        Feel The <span className={`${sourGummy.className} font-bold text-tertiary`}>Happiness</span> In Every Bite
                    </h1>
                    <p className='my-4 sm:my-6 text-secondary text-lg sm:text-xl lg:text-2xl text-center md:text-left font-medium'>
                        kombinasi dari bahan alami terbaik untuk manisnya setiap momen
                    </p>
                    {/* <TextInput 
                        sizing={"lg"} 
                        theme={textInputTheme} 
                        color='primary' 
                        id="email4" 
                        type="email" 
                        icon={IoSearch} 
                        placeholder="Cari menu favoritmu" 
                        required 
                        className='w-full max-w-md focus:!outline-primary' 
                    /> */}
                </div>
                <div className="flex justify-center items-center h-[50vh] md:h-[70vh] lg:h-[80vh]">
                    <Canvas orthographic camera={{zoom: 55, position: [0, 5, 5]}} className="w-full h-full">
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