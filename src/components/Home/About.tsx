"use client"

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sourGummy } from '@/themes/fonts';
import CountUp from 'react-countup';

const About = () => {
    const outlineTextRef = useRef(null);
    const contentRef = useRef(null);

    const [isCountUpVisible, setIsCountUpVisible] = useState(false);

    useEffect(() => {
        // Menggunakan requestAnimationFrame untuk memastikan state diperbarui setelah render
        const timer = requestAnimationFrame(() => {
            setIsCountUpVisible(true);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        // Menggunakan satu timeline untuk kedua animasi untuk meningkatkan performa
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contentRef.current,
                start: "top bottom",
                toggleActions: "play none none none"
            }
        });

        tl.from(contentRef.current, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        }).from(outlineTextRef.current, {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power4.out"
        }, "-=0.5"); // Mulai sedikit lebih awal untuk animasi yang lebih mulus
    }, []);

    return (
        <div className="h-screen w-10/12 mx-auto relative flex justify-center items-center mt-20 lg:max-w-7xl">
            <h1 ref={outlineTextRef} className="text-6xl lg:text-8xl top-0 text-outline lg:left-20 lg:top-28 2xl:top-48 absolute">OurStory</h1>
            <div ref={contentRef}>
                <h1 className='text-3xl lg:text-6xl mx-20 mt-8 font-bold text-primary'>About Us</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-center my-4">
                        <Image src="/about.png" width={1000} height={1000} className="object-cover w-80 lg:w-96 lg:h-96 aspect-square rounded-xl" alt="Flowbite React Logo"></Image>
                    </div>
                    <div className="max-w-full">
                        <p className=' text-secondary max-w-6xl text-base'>Selamat datang di <span className={`text-tertiary font-bold ${sourGummy.className}`}>Olvad</span>, tempat di mana kelezatan bertemu dengan kualitas. Kami berdedikasi untuk menyajikan roti, kue, dan pastry yang dibuat segar setiap hari menggunakan bahan-bahan pilihan terbaik. Dengan resep yang diracik penuh cinta dan perhatian, kami ingin setiap gigitan dari produk kami memberikan kehangatan dan kebahagiaan bagi Anda dan keluarga.</p>
                        <br />
                        <p className='my-7 lg:my-0 text-secondary text-base hidden lg:block'>Sejak berdiri pada tahun 2023, kami telah menjadi bagian dari banyak momen istimewa pelanggan kami. Mulai dari seminar hingga pesta perayaan, kami berkomitmen untuk menghadirkan cita rasa yang tak terlupakan. Terima kasih telah mempercayakan Olvad sebagai pilihan Anda, dan kami berharap dapat terus menemani hari-hari Anda dengan roti dan kue terbaik.</p>
                        <div className="flex gap-x-4 justify-between w-full my-4 lg:my-0">
                            <div className="w-1/3 aspect-video rounded-xl flex flex-col justify-center items-center">
                                <h2 className='text-2xl lg:text-4xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={50} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>50</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm lg:text-lg lg:font-bold text-tertiary'>Produk</p>
                            </div>
                            <div className="w-1/3 aspect-video rounded-xl  flex flex-col justify-center items-center">
                                <h2 className='text-2xl lg:text-4xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={100} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>100</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm lg:text-lg lg:font-bold text-tertiary'>penjualan</p>
                            </div>
                            <div className="w-1/3 aspect-video rounded-xl  flex flex-col justify-center items-center">
                                <h2 className='text-2xl lg:text-4xl font-bold text-tertiary'>
                                    {isCountUpVisible && <CountUp start={0} end={50} duration={3} enableScrollSpy={true} />}
                                    {!isCountUpVisible && <span>50</span>}
                                    +
                                </h2>
                                <p className='font-medium text-sm lg:text-lg lg:font-bold text-tertiary'>Pelanggan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About