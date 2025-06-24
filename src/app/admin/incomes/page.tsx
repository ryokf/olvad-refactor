'use client'

import { useEffect, useState } from 'react';
import { Income } from '@/types/Finance';
import { getIncomes } from '@/services/financeService';
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { supabase } from '@/config/db';

const IncomesPage = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk modal tambah/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIncome, setCurrentIncome] = useState<Partial<Income>>({
    name: '',
    qty: 1,
    price: 0,
    type: 'penjualan',
    created_at: ''
  });

  // Fetch data pemasukan
  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const data = await getIncomes('year'); // Mengambil data pemasukan setahun terakhir
      if (data) {
        // Sort by created_at descending
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setIncomes(data);
      }
    } catch (err) {
      setError('Gagal mengambil data pemasukan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menambah pemasukan baru
  const handleAddIncome = async () => {
    try {
      setLoading(true);

      const newIncome = {
        ...currentIncome,
        created_at: currentIncome.created_at || new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('incomes')
        .insert([newIncome])
        .select();

      if (error) throw error;

      // Refresh data setelah menambah
      fetchIncomes();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error adding income:', err);
      setError('Gagal menambahkan pemasukan.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengupdate pemasukan
  const handleUpdateIncome = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('incomes')
        .update({
          name: currentIncome.name,
          qty: currentIncome.qty,
          price: currentIncome.price,
          type: currentIncome.type,
          created_at: currentIncome.created_at
        })
        .eq('id', currentIncome.id)
        .select();

      if (error) throw error;

      // Refresh data setelah update
      fetchIncomes();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error updating income:', err);
      setError('Gagal mengupdate pemasukan.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus pemasukan
  const handleDeleteIncome = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pemasukan ini?')) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('incomes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data setelah menghapus
      fetchIncomes();
    } catch (err) {
      console.error('Error deleting income:', err);
      setError('Gagal menghapus pemasukan.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk membuka modal edit
  const openEditModal = (income: Income) => {
    setCurrentIncome(income);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    resetForm();
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setCurrentIncome({
      name: '',
      qty: 1,
      price: 0,
      type: 'penjualan',
      created_at: ''
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'qty' || name === 'price') {
      setCurrentIncome(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setCurrentIncome(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading && incomes.length === 0) {
    return <div className="container mx-auto p-4">Memuat data pemasukan...</div>;
  }

  if (error && incomes.length === 0) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-4/5 mx-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pemasukan</h1>
        <Button color="green" onClick={openAddModal}>
          Tambah Pemasukan
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left">Nama</th>
              <th className="py-3 px-4 border-b text-left">Jumlah</th>
              <th className="py-3 px-4 border-b text-left">Harga</th>
              <th className="py-3 px-4 border-b text-left">Total</th>
              <th className="py-3 px-4 border-b text-left">Tanggal</th>
              <th className="py-3 px-4 border-b text-left">Tipe</th>
              <th className="py-3 px-4 border-b text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">Tidak ada data pemasukan.</td>
              </tr>
            ) : (
              incomes.map((income) => (
                <tr key={income.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{income.name}</td>
                  <td className="py-3 px-4 border-b">{income.qty}</td>
                  <td className="py-3 px-4 border-b">{formatCurrency(income.price)}</td>
                  <td className="py-3 px-4 border-b">{formatCurrency(income.price * income.qty)}</td>
                  <td className="py-3 px-4 border-b">{new Date(income.created_at).toLocaleDateString('id-ID')}</td>
                  <td className="py-3 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      income.type === 'penjualan' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                      {income.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex space-x-2">
                      <Button size="xs" color="yellow" onClick={() => openEditModal(income)}>
                        Edit
                      </Button>
                      <Button size="xs" color="red" onClick={() => handleDeleteIncome(income.id)}>
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit Pemasukan */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          {isEditing ? 'Edit Pemasukan' : 'Tambah Pemasukan Baru'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Nama Pemasukan" />
              <TextInput
                id="name"
                name="name"
                value={currentIncome.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qty" value="Jumlah" />
                <TextInput
                  id="qty"
                  name="qty"
                  type="number"
                  value={currentIncome.qty}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price" value="Harga" />
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  value={currentIncome.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="created_at" value="Tanggal Pemasukan" />
              <TextInput
                id="created_at"
                name="created_at"
                type="date"
                value={currentIncome.created_at ? new Date(currentIncome.created_at).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type" value="Tipe Pemasukan" />
              <Select
                id="type"
                name="type"
                value={currentIncome.type}
                onChange={handleInputChange}
                required
              >
                <option value="penjualan">Penjualan</option>
                <option value="hibah">Hibah</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="green" onClick={isEditing ? handleUpdateIncome : handleAddIncome}>
            {isEditing ? 'Simpan Perubahan' : 'Tambah Pemasukan'}
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomesPage;