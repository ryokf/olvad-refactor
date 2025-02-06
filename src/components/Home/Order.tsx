import { Button, Carousel } from 'flowbite-react'
import React from 'react'
import CardComponent from '../Card';
import buttonTheme from '@/themes/button';

const Order = () => {
    return (
        <div className="grid grid-cols-1 w-10/12 mx-auto min-h-screen">
            <div className="">
                <h1 className='text-3xl font-bold text-tertiary my-2 mx-auto'>We serve and deliver delectable food</h1>
                <p className='text-secondary text-sm font-semibold'>Order from the comfort of your home and have it delivered to your doorstep.</p>
                <p className='font-semibold text-3xl text-center text-red-500 mt-6'>4 : 10 : 10 : 9</p>
                <p className='text-center text-red-500 font-semibold mb-2'>Hurry to take of the offer!!!</p>
                <Button theme={buttonTheme} color='failure' className='!w-full mt-4 font-bold'>Order Now!!!</Button>
            </div>
            <Carousel className="w-full" indicators={false} pauseOnHover>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
                <CardComponent></CardComponent>
            </Carousel>
        </div>
    )
}

export default Order