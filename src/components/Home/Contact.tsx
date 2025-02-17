import React from 'react'
import { FaHome, FaPhoneAlt } from 'react-icons/fa'
import { FaSquareInstagram } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const Contact = () => {
    return (
        <div className="w-11/12 mx-auto my-20 relative lg:max-w-7xl">
            <div className='grid grid-cols-1'>
                <div className="max-h-full lg:grid lg:grid-cols-2">
                    <h1 className="text-6xl font-semibold text-outline lg:hidden absolute uppercase">Contact</h1>
                    <h1 className='text-4xl mt-6 font-semibold text-center lg:hidden text-primary'>How to reach us</h1>
                    <div className="mx-auto w-11/12 mt-4 mb-8 lg:order-2 lg:flex lg:flex-col lg:justify-center">
                        <h1 className="text-8xl font-semibold text-outline hidden lg:block absolute uppercase lg:-mt-48">Contact</h1>
                        <h1 className='text-5xl mt-14 font-semibold hidden lg:block text-primary'>How to reach us</h1>
                        <p className=' text-secondary flex items-center gap-2 my-3'>
                            <span className='text-xl'>
                                <FaHome />
                            </span>
                            <span className=''>
                                Jl. Ngesti Pandowo F-25 Perumahan Kampoeng Semawis
                            </span>
                        </p>
                        <p className=' text-secondary flex items-center gap-2 my-3'>
                            <span className='text-xl'>
                                <MdEmail />
                            </span>
                            <span className=''>
                                olvadsmg@gmail.com
                            </span>
                        </p>
                        <p className=' text-secondary flex items-center gap-2 my-3'>
                            <span className='text-xl'>
                                <FaPhoneAlt />
                            </span>
                            <span className=''>
                                +62 812-4971-9115
                            </span>
                        </p>
                        <p className=' text-secondary flex items-center gap-2 my-3'>
                            <span className='text-xl'>
                                <FaSquareInstagram />
                            </span>
                            <span className=''>
                                @olvad.id
                            </span>
                        </p>
                    </div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden lg:w-[32rem] lg:mx-auto">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.49414336554182!2d110.46217224118435!3d-7.020300317955128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c50a760a81b%3A0xef2a5c04d1c086dd!2sJl.%20Ngesti%20Pandowo%20III%20No.25%2C%20Kedungmundu%2C%20Kec.%20Tembalang%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050273!5e0!3m2!1sen!2sid!4v1738808927355!5m2!1sen!2sid" width={"100%"} height={"100%"} style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact