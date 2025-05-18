import React from 'react'

const AdminPage = () => {
    return (
        <>
            <div className='grid grid-cols-4 gap-4 w-4/5 mx-10'>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Total Users</h2>
                    <p className='text-xl text-gray-700'>100</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Total products</h2>
                    <p className='text-xl text-gray-700'>100</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Total Profit this month</h2>
                    <p className='text-xl text-gray-700'>200</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Total Orders this month</h2>
                    <p className='text-xl text-gray-700'>50</p>
                </div>
            </div>
        </>
    )
}

export default AdminPage