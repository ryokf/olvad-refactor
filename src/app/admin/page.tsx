'use client';

import { useEffect, useState } from 'react';
import FinanceChart from '@/components/Admin/FinanceChart';
import { getTotalExpenses, getTotalIncomes } from '@/services/financeService';

const AdminPage = () => {
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                setLoading(true);
                const incomeTotal = await getTotalIncomes('month');
                const expenseTotal = await getTotalExpenses('month');
                setTotalIncome(incomeTotal);
                setTotalExpense(expenseTotal);
            } catch (error) {
                console.error('Error fetching totals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotals();
    }, []);

    return (
        <>
            <div className='grid grid-cols-4 gap-4 w-4/5 mx-10 mb-8'>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Total Orders</h2>
                    <p className='text-xl text-gray-700'>100</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Expenses this month</h2>
                    <p className='text-xl text-gray-700'>
                    {loading ? 'Loading...' : new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        }).format(totalExpense)}
                    </p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Income this month</h2>
                    <p className='text-xl text-gray-700'>
                        {loading ? 'Loading...' : new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        }).format(totalIncome)}
                    </p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-black'>Profit this month</h2>
                    <p className='text-xl text-gray-700'>
                    {loading ? 'Loading...' : new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        }).format(totalIncome - totalExpense)}
                    </p>
                </div>
            </div>
            
            <div className='w-4/5 mx-10 mb-10'>
                <FinanceChart />
            </div>
        </>
    )
}

export default AdminPage