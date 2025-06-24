import { supabase } from "@/config/db";
import { Expense, Income } from "../types/Finance";

// Tipe data untuk filter tanggal
export interface DateFilter {
    startDate?: string;
    endDate?: string;
    year?: number;
    month?: number;
}

// Fungsi untuk mendapatkan semua tahun yang tersedia di database
export const getAvailableYears = async () => {
    try {
        // Menggunakan Promise.all untuk melakukan request paralel
        const [expensesResult, incomesResult] = await Promise.all([
            supabase
                .from("expenses")
                .select("created_at")
                .order("created_at", { ascending: true })
                .limit(1),
            supabase
                .from("incomes")
                .select("created_at")
                .order("created_at", { ascending: true })
                .limit(1)
        ]);
        
        if (expensesResult.error || incomesResult.error) {
            throw expensesResult.error || incomesResult.error;
        }
        
        // Menentukan tahun tertua
        const currentYear = new Date().getFullYear();
        let oldestYear = currentYear;
        
        if (expensesResult.data?.length > 0) {
            const expenseYear = new Date(expensesResult.data[0].created_at).getFullYear();
            oldestYear = Math.min(oldestYear, expenseYear);
        }
        
        if (incomesResult.data?.length > 0) {
            const incomeYear = new Date(incomesResult.data[0].created_at).getFullYear();
            oldestYear = Math.min(oldestYear, incomeYear);
        }
        
        // Membuat array tahun dari tahun tertua hingga tahun sekarang
        return Array.from(
            { length: currentYear - oldestYear + 1 },
            (_, i) => oldestYear + i
        );
    } catch (error) {
        console.error("Error fetching available years:", error);
        return [];
    }
};

// Fungsi untuk mendapatkan data expenses berdasarkan interval waktu atau filter
export const getExpenses = async (interval: string, filter?: DateFilter): Promise<Expense[]> => {
    try {
        let query = supabase.from("expenses").select("*").order("created_at", { ascending: true });
        
        // Jika ada filter spesifik, gunakan filter tersebut
        if (filter) {
            if (filter.startDate && filter.endDate) {
                // Filter berdasarkan rentang tanggal kustom
                query = query.gte("created_at", filter.startDate).lte("created_at", filter.endDate);
            } else if (filter.year) {
                // Filter berdasarkan tahun
                const startOfYear = new Date(filter.year, 0, 1).toISOString();
                const endOfYear = filter.month 
                    ? new Date(filter.year, filter.month, 0).toISOString() // Akhir bulan tertentu
                    : new Date(filter.year, 11, 31, 23, 59, 59).toISOString(); // Akhir tahun
                
                query = query.gte("created_at", startOfYear).lte("created_at", endOfYear);
            }
        } else {
            // Gunakan interval default jika tidak ada filter spesifik
            const startDate = new Date();
            
            if (interval === 'week') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (interval === 'month') {
                startDate.setMonth(startDate.getMonth() - 1);
            } else if (interval === 'year') {
                startDate.setFullYear(startDate.getFullYear() - 1);
            }
            query = query.gte("created_at", startDate.toISOString());
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data as Expense[];
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }
};

export const getIncomes = async (interval: string, filter?: DateFilter): Promise<Income[]> => {
    try {
        let query = supabase.from("incomes").select("*").order("created_at", { ascending: true });

        if (filter) {
            if (filter.startDate && filter.endDate) {
                query = query.gte("created_at", filter.startDate).lte("created_at", filter.endDate);
            } else if (filter.year) {
                const startOfYear = new Date(filter.year, 0, 1).toISOString();
                const endOfYear = filter.month
                    ? new Date(filter.year, filter.month, 0).toISOString()
                    : new Date(filter.year, 11, 31, 23, 59, 59).toISOString();

                query = query.gte("created_at", startOfYear).lte("created_at", endOfYear);
            }
        } else {
            const startDate = new Date();

            if (interval === 'week') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (interval === 'month') {
                startDate.setMonth(startDate.getMonth() - 1);
            } else if (interval === 'year') {
                startDate.setFullYear(startDate.getFullYear() - 1);
            }
            
            query = query.gte("created_at", startDate.toISOString());
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data as Income[];
    } catch (error) {
        console.error('Error fetching incomes:', error);
        return [];
    }
};

// Fungsi untuk mendapatkan total expenses
export const getTotalExpenses = async (interval: string, filter?: DateFilter) => {
    try {
        const expenses = await getExpenses(interval, filter);
        return expenses.reduce((total, expense) => total + (expense.price * expense.qty), 0);
    } catch (error) {
        console.error('Error calculating total expenses:', error);
        return 0;
    }
};

// Fungsi untuk mendapatkan total incomes
export const getTotalIncomes = async (interval: string, filter?: DateFilter) => {
    try {
        const incomes = await getIncomes(interval, filter);
        return incomes.reduce((total, income) => total + (income.price * income.qty), 0);
    } catch (error) {
        console.error('Error calculating total incomes:', error);
        return 0;
    }
};

// Fungsi untuk mendapatkan total expenses dan incomes secara paralel
export const getTotalFinances = async (interval: string, filter?: DateFilter) => {
    try {
        const [totalExpenses, totalIncomes] = await Promise.all([
            getTotalExpenses(interval, filter),
            getTotalIncomes(interval, filter)
        ]);
        
        return { totalExpenses, totalIncomes, profit: totalIncomes - totalExpenses };
    } catch (error) {
        console.error('Error calculating total finances:', error);
        return { totalExpenses: 0, totalIncomes: 0, profit: 0 };
    }
};

// Fungsi untuk mendapatkan nama bulan dalam bahasa Indonesia
const getMonthName = (month: number): string => {
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return monthNames[month];
};

// Fungsi untuk mengelompokkan data keuangan berdasarkan tanggal
export const getFinanceDataByDate = async (interval: string, filter?: DateFilter) => {
    try {
        // Menggunakan Promise.all untuk mendapatkan data secara paralel
        const [expenses, incomes] = await Promise.all([
            getExpenses(interval, filter),
            getIncomes(interval, filter)
        ]);
        
        // Menentukan format tanggal dan pengelompokan berdasarkan interval dan filter
        let dateFormat: string;
        let groupingFunction: (date: Date) => string;
        
        if (filter?.year && !filter?.month && interval === 'year' || interval === 'year') {
            // Jika filter tahun dan interval tahunan, kelompokkan berdasarkan bulan
            dateFormat = 'MMMM';
            groupingFunction = (date: Date) => getMonthName(date.getMonth());
        } else if ((interval === 'month' || filter?.month) && !filter?.startDate) {
            // Jika interval bulanan atau filter bulan, kelompokkan berdasarkan minggu
            dateFormat = 'Minggu-W';
            groupingFunction = (date: Date) => {
                // Menghitung minggu dalam bulan (1-5)
                const weekOfMonth = Math.ceil(date.getDate() / 7);
                return `Minggu-${weekOfMonth}`;
            };
        } else {
            // Jika interval mingguan atau filter tanggal kustom, kelompokkan berdasarkan hari
            dateFormat = 'DD/MM';
            groupingFunction = (date: Date) => {
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            };
        }
    
    // Mengelompokkan expenses dan incomes berdasarkan tanggal menggunakan reduce untuk efisiensi
    const expensesByDate = expenses.reduce((acc, expense) => {
        const date = new Date(expense.created_at);
        const formattedDate = groupingFunction(date);
        acc[formattedDate] = (acc[formattedDate] || 0) + (expense.price * expense.qty);
        return acc;
    }, {} as Record<string, number>);
    
    const incomesByDate = incomes.reduce((acc, income) => {
        const date = new Date(income.created_at);
        const formattedDate = groupingFunction(date);
        acc[formattedDate] = (acc[formattedDate] || 0) + (income.price * income.qty);
        return acc;
    }, {} as Record<string, number>);
    
    // Mendapatkan semua tanggal unik
    const allDates = [...new Set([...Object.keys(expensesByDate), ...Object.keys(incomesByDate)])];
    
    // Fungsi untuk mengurutkan tanggal berdasarkan format
    const sortDates = (a: string, b: string) => {
        if (dateFormat === 'MMMM') {
            // Urutan bulan
            const monthNames = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            return monthNames.indexOf(a) - monthNames.indexOf(b);
        } else if (dateFormat === 'Minggu-W') {
            // Urutan minggu
            return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]);
        } else if (dateFormat === 'DD/MM') {
            // Format DD/MM
            const [dayA, monthA] = a.split('/').map(Number);
            const [dayB, monthB] = b.split('/').map(Number);
            return monthA !== monthB ? monthA - monthB : dayA - dayB;
        } else {
            // Format MM/YYYY
            const [monthA, yearA] = a.split('/').map(Number);
            const [monthB, yearB] = b.split('/').map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
        }
    };
    
    // Mengurutkan tanggal
    allDates.sort(sortDates);
    
    // Membuat data untuk chart
    return {
        labels: allDates,
        datasets: [
            {
                label: 'Expenses',
                data: allDates.map(date => expensesByDate[date] || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
            {
                label: 'Incomes',
                data: allDates.map(date => incomesByDate[date] || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };
    } catch (error) {
        console.error('Error in getFinanceDataByDate:', error);
        return { labels: [], datasets: [] };
    }
};