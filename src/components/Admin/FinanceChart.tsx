'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DateFilter, getAvailableYears, getFinanceDataByDate, getTotalFinances } from '@/services/financeService';
import { Button, Label, Select } from 'flowbite-react';

// Mendaftarkan komponen Chart.js yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinanceChart = () => {
  const [interval, setInterval] = useState<'week' | 'month' | 'year'>('week');
  const [chartData, setChartData] = useState<ChartData<'line'>>({ datasets: [], labels: [] });
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // State untuk filter
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Mendapatkan tahun yang tersedia dari database
  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const years = await getAvailableYears();
        setAvailableYears(years);
        if (years.length > 0) {
          setSelectedYear(years[years.length - 1]); // Set tahun terbaru sebagai default
        }
      } catch (error) {
        console.error('Error fetching available years:', error);
      }
    };

    fetchAvailableYears();
  }, []);

  const fetchFinanceData = useCallback(async () => {
    setLoading(true);
    try {
      // Menyiapkan filter berdasarkan pilihan pengguna
      let dateFilter: DateFilter | undefined;

      if (selectedYear) {
        // Filter berdasarkan tahun dan bulan (jika dipilih)
        dateFilter = {
          year: selectedYear,
          month: selectedMonth !== null ? selectedMonth + 1 : undefined // +1 karena indeks bulan dimulai dari 0
        };
      }

      // Menggunakan Promise.all untuk melakukan request paralel
      const [financeData, financeTotals] = await Promise.all([
        getFinanceDataByDate(interval, dateFilter),
        getTotalFinances(interval, dateFilter)
      ]);

      setTotalIncome(financeTotals.totalIncomes);
      setTotalExpense(financeTotals.totalExpenses);
      setChartData(financeData);
    } catch (error) {
      console.error('Error fetching finance data:', error);
    } finally {
      setLoading(false);
    }
  }, [interval, selectedYear, selectedMonth]);

  useEffect(() => {
    fetchFinanceData();
  }, [interval, selectedYear, selectedMonth, fetchFinanceData]);

  // Fungsi untuk mengatur filter bulan
  const handleMonthChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMonth(value === '' ? null : parseInt(value));
  }, []);

  // Fungsi untuk mengatur filter tahun
  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
    // Reset bulan saat memilih tahun baru
    setSelectedMonth(null);
  }, []);

  // Menggunakan useMemo untuk options chart agar tidak dibuat ulang pada setiap render
  const options: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Grafik Keuangan (${interval === 'week' ? 'Mingguan' : interval === 'month' ? 'Bulanan' : 'Tahunan'})`,
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Menampilkan nilai dalam format mata uang Rupiah
          callback: function (value) {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(value as number);
          }
        }
      }
    }
  }), [interval]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            size="sm"
            color={interval === 'week' ? 'blue' : 'light'}
            onClick={() => setInterval('week')}
          >
            Mingguan
          </Button>
          <Button
            size="sm"
            color={interval === 'month' ? 'blue' : 'light'}
            onClick={() => setInterval('month')}
          >
            Bulanan
          </Button>
          <Button
            size="sm"
            color={interval === 'year' ? 'blue' : 'light'}
            onClick={() => setInterval('year')}
          >
            Tahunan
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
        {/* Filter Tahun */}
        <div>
          <div className="mb-2">
            <Label htmlFor="year-filter" value="Pilih Tahun" />
          </div>
          <Select
            id="year-filter"
            value={selectedYear.toString()}
            onChange={handleYearChange}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
        </div>

        {/* Filter Bulan */}
        <div>
          <div className="mb-2">
            <Label htmlFor="month-filter" value="Pilih Bulan" />
          </div>
          <Select
            id="month-filter"
            value={selectedMonth !== null ? selectedMonth.toString() : ''}
            onChange={handleMonthChange}
          >
            <option value="">Semua Bulan</option>
            <option value="0">Januari</option>
            <option value="1">Februari</option>
            <option value="2">Maret</option>
            <option value="3">April</option>
            <option value="4">Mei</option>
            <option value="5">Juni</option>
            <option value="6">Juli</option>
            <option value="7">Agustus</option>
            <option value="8">September</option>
            <option value="9">Oktober</option>
            <option value="10">November</option>
            <option value="11">Desember</option>
          </Select>
        </div>
      </div>
      </div>

      {/* Filter Section */}
     

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <Line options={options} data={chartData} />
        </div>
      )}
    </div>
  );
};

export default FinanceChart;