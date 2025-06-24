'use client'

import { useEffect, useState } from 'react';
import { Expense } from '@/types/Finance';
import { getExpenses } from '@/services/financeService';
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { supabase } from '@/config/db';

const PengeluaranPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk modal tambah/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Partial<Expense>>({
    name: '',
    qty: 1,
    price: 0,
    method: 'cash',
    type: 'pembelian alat',
    invoice: '',
    created_at: ''
  });

  // Fetch data pengeluaran
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses('year'); // Mengambil data pengeluaran setahun terakhir
      if (data) {
        // Sort by created_at descending
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setExpenses(data);
      }
    } catch (err) {
      setError('Gagal mengambil data pengeluaran.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menambah pengeluaran baru
  const handleAddExpense = async () => {
    try {
      setLoading(true);
      
      let invoiceUrl = '';
      
      // Upload file invoice jika ada
      if (currentExpense.invoice && typeof currentExpense.invoice === 'object') {
        const file = currentExpense.invoice as File;
        const fileName = `invoice_${Date.now()}_${file.name}`;
        
        // Upload file ke Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('invoices')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        // Dapatkan URL publik dari file
        const { data: urlData } = supabase.storage
          .from('invoices')
          .getPublicUrl(fileName);
          
        invoiceUrl = urlData.publicUrl;
      }

      const newExpense = {
        ...currentExpense,
        created_at: currentExpense.created_at || new Date().toISOString(),
        invoice: invoiceUrl || currentExpense.invoice,
      };

      console.log(newExpense)

      const { data, error } = await supabase
        .from('expenses')
        .insert([newExpense])
        .select();

      if (error) throw error;

      // Refresh data setelah menambah
      fetchExpenses();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Gagal menambahkan pengeluaran.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengupdate pengeluaran
  const handleUpdateExpense = async () => {
    try {
      setLoading(true);
      
      let invoiceUrl = currentExpense.invoice;
      
      // Upload file invoice baru jika ada
      if (currentExpense.invoice && typeof currentExpense.invoice === 'object') {
        const file = currentExpense.invoice as File;
        const fileName = `invoice_${Date.now()}_${file.name}`;
        
        // Upload file ke Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('invoices')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        // Dapatkan URL publik dari file
        const { data: urlData } = supabase.storage
          .from('invoices')
          .getPublicUrl(fileName);
          
        invoiceUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('expenses')
        .update({
          name: currentExpense.name,
          qty: currentExpense.qty,
          price: currentExpense.price,
          method: currentExpense.method,
          type: currentExpense.type,
          invoice: invoiceUrl
        })
        .eq('id', currentExpense.id)
        .select();

      if (error) throw error;

      // Refresh data setelah update
      fetchExpenses();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Gagal mengupdate pengeluaran.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus pengeluaran
  const handleDeleteExpense = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengeluaran ini?')) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data setelah menghapus
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Gagal menghapus pengeluaran.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk membuka modal edit
  const openEditModal = (expense: Expense) => {
    setCurrentExpense(expense);
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
    setCurrentExpense({
      name: '',
      qty: 1,
      price: 0,
      method: 'cash',
      type: 'pembelian alat',
      invoice: '',
      created_at: ''
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'qty' || name === 'price') {
      setCurrentExpense(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setCurrentExpense(prev => ({
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

  if (loading && expenses.length === 0) {
    return <div className="container mx-auto p-4">Memuat data pengeluaran...</div>;
  }

  if (error && expenses.length === 0) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-4/5 mx-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pengeluaran</h1>
        <Button color="blue" onClick={openAddModal}>
          Tambah Pengeluaran
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
              <th className="py-3 px-4 border-b text-left">Invoice</th>
              <th className="py-3 px-4 border-b text-left">Metode</th>
              <th className="py-3 px-4 border-b text-left">Tipe</th>
              <th className="py-3 px-4 border-b text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-4 text-center text-gray-500">Tidak ada data pengeluaran.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{expense.name}</td>
                  <td className="py-3 px-4 border-b">{expense.qty}</td>
                  <td className="py-3 px-4 border-b">{formatCurrency(expense.price)}</td>
                  <td className="py-3 px-4 border-b">{formatCurrency(expense.price * expense.qty)}</td>
                  <td className="py-3 px-4 border-b">{new Date(expense.created_at).toLocaleDateString('id-ID')}</td>
                  <td className="py-3 px-4 border-b">
                    {expense.invoice ? (
                      <a href={expense.invoice} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Lihat Invoice
                      </a>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-4 border-b">{expense.method}</td>
                  <td className="py-3 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expense.type === 'pembelian alat' ? 'bg-blue-100 text-blue-800' : 
                      expense.type === 'pembelian bahan' ? 'bg-green-100 text-green-800' : 
                      expense.type === 'peminjaman' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                      {expense.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex space-x-2">
                      <Button size="xs" color="yellow" onClick={() => openEditModal(expense)}>
                        Edit
                      </Button>
                      <Button size="xs" color="red" onClick={() => handleDeleteExpense(expense.id)}>
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

      {/* Modal Tambah/Edit Pengeluaran */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          {isEditing ? 'Edit Pengeluaran' : 'Tambah Pengeluaran Baru'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Nama Pengeluaran" />
              <TextInput
                id="name"
                name="name"
                value={currentExpense.name}
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
                  value={currentExpense.qty}
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
                  value={currentExpense.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="invoice" value="Foto Invoice" />
              <div className="flex items-center space-x-2">
                <input
                  id="invoice"
                  name="invoice"
                  type="file"
                  accept="image/*,.pdf"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCurrentExpense(prev => ({ ...prev, invoice: file }));
                    }
                  }}
                />
                {isEditing && typeof currentExpense.invoice === 'string' && currentExpense.invoice && (
                  <a 
                    href={currentExpense.invoice} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Invoice
                  </a>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="created_at" value="Tanggal Pengeluaran" />
              <TextInput
                id="created_at"
                name="created_at"
                type="date"
                value={currentExpense.created_at ? new Date(currentExpense.created_at).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="method" value="Metode Pembayaran" />
              <Select
                id="method"
                name="method"
                value={currentExpense.method}
                onChange={handleInputChange}
                required
              >
                <option value="cash">Tunai</option>
                <option value="transfer">Transfer Bank</option>
                <option value="debit">Kartu Debit</option>
                <option value="credit">Kartu Kredit</option>
                <option value="other">Lainnya</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="type" value="Tipe Pengeluaran" />
              <Select
                id="type"
                name="type"
                value={currentExpense.type}
                onChange={handleInputChange}
                required
              >
                <option value="pembelian alat">Pembelian Alat</option>
                <option value="pembelian bahan">Pembelian Bahan</option>
                <option value="peminjaman">Peminjaman</option>
                <option value="investasi">Investasi</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={isEditing ? handleUpdateExpense : handleAddExpense}>
            {isEditing ? 'Simpan Perubahan' : 'Tambah Pengeluaran'}
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PengeluaranPage;