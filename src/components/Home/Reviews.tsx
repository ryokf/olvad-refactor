import Image from 'next/image'
import React from 'react'

const Reviews = () => {
    return (
        <div className="w-11/12 mx-auto min-h-screen lg:min-h-fit lg:max-w-7xl my-8 lg:mb-32 relative">
            <div className="flex justify-center">
                <h1 className="text-6xl font-semibold text-center text-outline absolute uppercase">Testimoni</h1>
            </div>
            <h1 className='text-3xl mt-5 lg:mt-7 font-bold text-center text-primary'>Pengalaman Pelanggan Kami</h1>
            <div className="my-8 h-full sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <Carousel> */}
                <div className="border-2 bg-white border-dashed border-primary rounded-xl p-6 my-4 text-center max-w-sm mx-auto">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image width={100} height={100} src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="w-full h-full rounded-full" alt="Rounded avatar" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Ryo Khrisna f</h3>
                    <h5 className="text-sm text-gray-500">Customer</h5>
                    <p className="text-gray-600 mt-2 relative">
                        <span>&nbsp;</span><span className="text-green-500 text-2xl absolute left-0 -top-2 inline-block">&#8220;</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                        </span>
                        <span className="text-green-500 text-2xl absolute right-0 -bottom-2">&#8221;</span>
                    </p>
                </div>
                <div className="border-2 border-dashed border-primary rounded-xl p-6 my-4 text-center max-w-sm mx-auto">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image width={100} height={100} src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="w-full h-full rounded-full" alt="Rounded avatar" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Ryo Khrisna f</h3>
                    <h5 className="text-sm text-gray-500">Customer</h5>
                    <p className="text-gray-600 mt-2 relative">
                        <span>&nbsp;</span><span className="text-green-500 text-2xl absolute left-0 -top-2 inline-block">&#8220;</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                        </span>
                        <span className="text-green-500 text-2xl absolute right-0 -bottom-2">&#8221;</span>
                    </p>
                </div>
                <div className="border-2 border-dashed border-primary rounded-xl p-6 my-4 text-center max-w-sm mx-auto">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image width={100} height={100} src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="w-full h-full rounded-full" alt="Rounded avatar" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Ryo Khrisna f</h3>
                    <h5 className="text-sm text-gray-500">Customer</h5>
                    <p className="text-gray-600 mt-2 relative">
                        <span>&nbsp;</span><span className="text-green-500 text-2xl absolute left-0 -top-2 inline-block">&#8220;</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                        </span>
                        <span className="text-green-500 text-2xl absolute right-0 -bottom-2">&#8221;</span>
                    </p>
                </div>
                {/* </Carousel> */}
            </div>
        </div>
    )
}

export default Reviews