# Olvad Refactor

Olvad Refactor adalah aplikasi web untuk manajemen toko roti, yang mencakup fitur-fitur untuk mengelola produk, kategori, transaksi, keuangan (pemasukan dan pengeluaran), serta otentikasi pengguna. Aplikasi ini dibangun menggunakan Next.js dan Supabase.

## Fitur Utama

- **Manajemen Produk**: Tambah, edit, dan hapus produk roti, termasuk detail seperti nama, kategori, harga, deskripsi, dan foto.
- **Manajemen Kategori**: Kelola kategori produk untuk pengorganisasian yang lebih baik.
- **Manajemen Transaksi**: Lacak pesanan pelanggan, perbarui status pesanan (diproses, siap, selesai), dan lihat detail pesanan.
- **Manajemen Keuangan**: Catat pemasukan dan pengeluaran, serta lihat ringkasan keuangan.
- **Otentikasi Pengguna**: Sistem login dan registrasi untuk pengguna dan admin.
- **Dashboard Admin**: Antarmuka khusus untuk admin untuk mengelola semua aspek toko.
- **Keranjang Belanja**: Fungsionalitas keranjang belanja untuk pelanggan.

## Teknologi yang Digunakan

- **Framework**: Next.js (React Framework)
- **Database & Backend as a Service (BaaS)**: Supabase (PostgreSQL, Otentikasi, Storage)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Validasi Skema**: Zod
- **Linter**: ESLint
- **Formatter**: Prettier

## Struktur Proyek

```
olvad-refactor/
├── public/                 # Aset statis (gambar, model 3D)
├── src/
│   ├── app/                # Halaman aplikasi (admin, auth, cart, menu, order, profile)
│   │   ├── (auth)/         # Halaman otentikasi (login, register)
│   │   ├── admin/          # Halaman admin (kategori, pengeluaran, pemasukan, pesanan, produk)
│   │   ├── api/            # API Routes (admin, check-status, tokenizer)
│   │   └── ...
│   ├── components/         # Komponen UI yang dapat digunakan kembali
│   │   ├── Admin/          # Komponen khusus admin (Sidebar, FinanceChart, Modals)
│   │   ├── Home/           # Komponen halaman utama (Hero, About, Contact, Order, Reviews)
│   │   └── ...
│   ├── config/             # Konfigurasi aplikasi (db.ts untuk Supabase)
│   ├── constant/           # Konstanta aplikasi (FilterTransaction, NavLink)
│   ├── services/           # Layanan untuk interaksi dengan Supabase (auth, cart, category, finance, product, transaction)
│   ├── themes/             # Konfigurasi tema UI (button, card, navbar, dll.)
│   ├── types/              # Definisi tipe TypeScript (Cart, Category, Finance, Product, Transaction, User)
│   └── utils/              # Fungsi utilitas (cartUtils, categoryUtils, productUtils, transactionUtils, userUtils)
├── .env                    # Variabel lingkungan
├── package.json            # Dependensi proyek dan skrip
├── next.config.ts          # Konfigurasi Next.js
├── tailwind.config.ts      # Konfigurasi Tailwind CSS
├── tsconfig.json           # Konfigurasi TypeScript
└── eslint.config.mjs       # Konfigurasi ESLint
```

## Instalasi dan Penggunaan

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

- Node.js (versi 18 atau lebih tinggi)
- npm atau Yarn
- Akun Supabase

### Langkah-langkah Instalasi

1. **Clone repositori:**

   ```bash
   git clone https://github.com/your-username/olvad-refactor.git
   cd olvad-refactor
   ```

2. **Instal dependensi:**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Variabel Lingkungan:**

   Buat file `.env.local` di root proyek dan tambahkan variabel lingkungan Supabase Anda:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

   Anda bisa mendapatkan nilai-nilai ini dari dashboard proyek Supabase Anda.

4. **Jalankan Migrasi Database (jika ada):**

   Pastikan skema database Supabase Anda sesuai dengan yang dibutuhkan aplikasi. Anda mungkin perlu membuat tabel `products`, `categories`, `transactions`, `incomes`, dan `expenses` secara manual di Supabase, atau menggunakan fitur migrasi Supabase jika proyek ini menyediakannya.

5. **Jalankan Aplikasi:**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

   Aplikasi akan berjalan di `http://localhost:3000` (atau port lain jika 3000 sudah digunakan).

## Kontribusi

Kontribusi sangat dihargai! Jika Anda ingin berkontribusi, silakan fork repositori ini dan buat pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE). (Jika ada file LICENSE)
