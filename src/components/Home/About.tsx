"use client"

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { sourGummy } from '@/themes/fonts';
import CountUp from 'react-countup';

const About = () => {
    const outlineTextRef = useRef(null);
    const contentRef = useRef(null);

    const [isCountUpVisible, setIsCountUpVisible] = useState(false);

    useEffect(() => {
        setIsCountUpVisible(true);
    }, []);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tlOutline = gsap.timeline({
            scrollTrigger: contentRef.current, // start the timeline animation when ".container" enters the viewport (once)
        });

        tlOutline.from(contentRef.current, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })

        const tlContent = gsap.timeline({
            scrollTrigger: contentRef.current, // start the timeline animation when ".container" enters the viewport (once)
        });

        tlContent.from(outlineTextRef.current, {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power4.out"
        })
    });

    return (
        <div className="h-screen w-10/12 mx-auto relative flex justify-center items-center my-20">
            <h1 ref={outlineTextRef} className="text-6xl top-6 text-outline absolute">OurStory</h1>
            <div ref={contentRef}>
                <h1 className='text-3xl lg:text-8xl mx-20 mb-4 my-8 font-bold text-primary'>About Us</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-center my-4">
                        <Image src="/about.png" width={1000} height={1000} className="object-cover w-80 lg:w-[35rem] aspect-square rounded-xl" alt="Flowbite React Logo"></Image>
                    </div>
                    <div className="max-w-full">
                        <p className=' text-secondary max-w-6xl text-base lg:text-xl'>Selamat datang di <span className={`text-tertiary font-bold ${sourGummy.className}`}>Olvad</span>, tempat di mana kelezatan bertemu dengan kualitas. Kami berdedikasi untuk menyajikan roti, kue, dan pastry yang dibuat segar setiap hari menggunakan bahan-bahan pilihan terbaik. Dengan resep yang diracik penuh cinta dan perhatian, kami ingin setiap gigitan dari produk kami memberikan kehangatan dan kebahagiaan bagi Anda dan keluarga.</p>
                        <p className='my-7 text-secondary text-base lg:text-xl hidden lg:block'>Sejak berdiri pada tahun 2023, kami telah menjadi bagian dari banyak momen istimewa pelanggan kami. Mulai dari seminar hingga pesta perayaan, kami berkomitmen untuk menghadirkan cita rasa yang tak terlupakan. Terima kasih telah mempercayakan Olvad sebagai pilihan Anda, dan kami berharap dapat terus menemani hari-hari Anda dengan roti dan kue terbaik.</p>
                        <div className="flex gap-x-4 justify-between w-full my-4">
                            <div className="w-1/3 aspect-video rounded-xl flex flex-col justify-center items-center">
                                <h2 className='text-2xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={50} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>50</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm text-tertiary'>Produk</p>
                            </div>
                            <div className="w-1/3 aspect-video rounded-xl  flex flex-col justify-center items-center">
                                <h2 className='text-2xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={100} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>100</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm text-tertiary'>penjualan</p>
                            </div>
                            <div className="w-1/3 aspect-video rounded-xl  flex flex-col justify-center items-center">
                                <h2 className='text-2xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={50} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>50</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm text-tertiary'>Pelanggan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About