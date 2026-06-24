# Soal Tugas — React (Evaluasi Day 1–6)
## Pre-NextJS Challenge: Halaman Katalog Produk (Product Catalog App)

Waktu pengerjaan: satu hari  
Kerjakan dengan React murni menggunakan Vite (tanpa Next.js, tanpa library UI apapun).

---

## Deskripsi

Buat sebuah halaman web **Katalog Produk** yang memungkinkan pengguna mencari dan memfilter produk, menambahkan produk ke keranjang belanja, serta melakukan checkout dengan validasi form. Data produk sudah tersedia sebagai array hardcoded di file terpisah.

---

## Tampilan yang Harus Dibuat

```
┌─────────────────────────────────────────────────────┐
│              Mini Product Catalog                   │
├─────────────────────────────────────────────────────┤
│  Cari produk : [_____________________________]      │
│                                                     │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐          │
│  │ Susu UHT  │ │  Telur   │ │  Roti     │          │
│  │ Rp 15.000 │ │ Rp 22.000│ │ Rp 12.000 │          │
│  │ [Tersedia]│ │ [Tersedia]│ │ [Habis]   │          │
│  │[+ Tambah] │ │[+ Tambah] │ │[+ Tambah] │          │
│  └───────────┘ └───────────┘ └───────────┘          │
├─────────────────────────────────────────────────────┤
│  Keranjang (2 item)          Total: Rp 37.000       │
│  ─────────────────────────────────────────────────  │
│  Susu UHT × 1    Rp 15.000              [hapus]     │
│  Telur    × 1    Rp 22.000              [hapus]     │
├─────────────────────────────────────────────────────┤
│  Nama  : [_________________________]                │
│  Email : [_________________________]                │
│                 [Checkout]                          │
└─────────────────────────────────────────────────────┘
```

---

## Requirement Wajib

### Komponen & JSX (Day 1)
- [ ] Buat komponen `ProductCard` yang menampilkan nama, harga, dan status stok secara statis
- [ ] Gunakan JSX yang benar — semua tag ditutup, `className` bukan `class`
- [ ] Pisahkan setiap bagian UI menjadi komponen tersendiri (`ProductList`, `CartSidebar`, `CheckoutForm`)

### Props — Parent ke Child (Day 2)
- [ ] Komponen `ProductCard` menerima props: `nama`, `harga`, `stok` dari parent
- [ ] Harga ditampilkan dalam format rupiah: `Rp 15.000`
- [ ] Fungsi `onTambah` dikirim sebagai props dari parent ke tombol "+ Tambah"

### Conditional Rendering & List Rendering (Day 3)
- [ ] Render semua produk dari array menggunakan `.map()` dengan `key` yang unik
- [ ] Tampilkan badge **"Tersedia"** atau **"Habis"** berdasarkan nilai boolean `stok`
- [ ] Tombol "+ Tambah" disabled jika `stok` bernilai `false`
- [ ] Tampilkan teks "Keranjang kosong" jika belum ada item di cart

### useEffect (Day 4)
- [ ] Saat app pertama kali render, `console.log("App loaded")` muncul di console
- [ ] `document.title` otomatis update setiap kali jumlah item di cart berubah, contoh: `Keranjang (2)`

### Controlled Input & Live Preview (Day 5)
- [ ] Input pencarian terhubung ke state — produk terfilter secara live saat mengetik
- [ ] Input nama dan email di form checkout adalah controlled component
- [ ] Di bawah form, tampilkan live preview: **"Halo, {nama}! Pesanan akan dikirim ke {email}"** (muncul setelah keduanya diisi)

### Validasi Form (Day 6)
- [ ] Semua field tidak boleh kosong
- [ ] Email harus mengandung karakter `@`
- [ ] Nama minimal 3 karakter
- [ ] Tombol "Checkout" disabled selama form belum valid
- [ ] Jika validasi gagal, tampilkan pesan error di bawah field yang bermasalah — **bukan `alert()`**
- [ ] Keranjang tidak boleh kosong saat checkout — tampilkan pesan jika kosong

---

## Struktur File

```
tugas-katalog/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── products.js        ← data produk hardcoded di sini
    └── components/
        ├── ProductCard.jsx
        ├── ProductList.jsx
        ├── CartSidebar.jsx
        └── CheckoutForm.jsx
```

---

## Penilaian

| Aspek | Yang Dilihat |
|---|---|
| Komponen & JSX | Struktur komponen rapi, JSX valid, tiap bagian UI dipisah |
| Props | Data mengalir dari parent ke child dengan benar, format harga pakai Rp |
| Conditional & List Rendering | Badge stok benar, `.map()` pakai `key`, tombol disabled saat habis |
| useEffect | `console.log` saat mount, `document.title` update saat cart berubah |
| Controlled Input | Search live filter jalan, form checkout terhubung ke state, live preview muncul |
| Validasi | Pesan error muncul di tempat yang tepat, tombol checkout disabled jika belum valid |
| Detail kecil | Total harga di cart update otomatis, form reset setelah checkout, keranjang kosong ditangani |

---

## Catatan
- **Tidak boleh** pakai library UI seperti Bootstrap, Tailwind, atau Material UI
- **Tidak boleh** pakai `alert()` untuk apapun — semua feedback tampil di halaman
- **Tidak boleh** pakai Next.js atau React Router — satu halaman saja
- Kalau ada waktu sisa, boleh tambahkan **fitur filter kategori** (tombol: Semua / Makanan / Minuman) sebagai bonus

---

## Cara Menjalankan Project

Project ini menggunakan Vite + React. Jalankan dari dalam folder project:

```bash
npm create vite@latest tugas-katalog -- --template react
cd tugas-katalog
npm install
npm run dev
# lalu buka URL yang muncul, mis. http://localhost:5173
```

---

## Data Produk (hardcoded di `src/data/products.js`)

Gunakan minimal 6 produk dengan struktur berikut:

```js
export const products = [
  { id: 1, nama: "Susu UHT",   harga: 15000, stok: true,  kategori: "Minuman" },
  { id: 2, nama: "Telur Ayam", harga: 22000, stok: true,  kategori: "Makanan" },
  { id: 3, nama: "Roti Tawar", harga: 12000, stok: false, kategori: "Makanan" },
  // ... tambahkan 3 produk lagi
]
```

---

## Tutorial Langkah demi Langkah

Panduan ini menjelaskan **urutan kerja** dari nol sampai selesai. Sengaja **tidak diberi contoh kode lengkap** — kamu yang menulis sendiri supaya benar-benar paham.

### Tahap 0 — Siapkan alat kerja

1. Pastikan **VS Code** sudah terpasang.
2. Pastikan **Node.js** sudah terpasang. Cek dengan `node -v` di terminal. Kalau muncul nomor versi (mis. `v20.x.x`), berarti sudah siap. Kalau "command not found", install dulu dari [nodejs.org](https://nodejs.org).
3. Siapkan browser (Chrome / Firefox) untuk melihat hasilnya.

### Tahap 1 — Setup project Vite

1. Jalankan perintah setup di atas, buka folder di VS Code.
2. Buat folder `src/components/` dan `src/data/`, lalu buat file sesuai struktur di atas.
3. Isi `products.js` dengan minimal 6 produk. Jalankan `npm run dev` dan biarkan terminal tetap menyala.

> Tips: setiap kali kamu menyimpan file (Ctrl+S), cukup **refresh** browser untuk melihat perubahannya.

### Tahap 2 — Komponen statis dulu (jangan pikirkan interaksi dulu)

1. Buat `ProductCard` dengan data hardcoded dulu — pastikan tampil di browser sebelum lanjut.
2. Pindahkan data ke props: kirim dari `App.jsx`, terima di `ProductCard`.
3. Render semua produk dari array menggunakan `.map()`. Tambahkan badge Tersedia/Habis.
4. Cek di browser: semua kartu produk muncul dengan benar.

### Tahap 3 — State cart & interaksi

1. Buat state `cart` di `App.jsx` sebagai array. Kirim fungsi `onTambah` ke tiap `ProductCard`.
2. Buat komponen `CartSidebar` yang menerima `cart` sebagai props, tampilkan item dan total harga.
3. Tambahkan tombol hapus di tiap item cart. Kirim fungsi `onHapus` dari App.
4. Uji: tambah beberapa item → pastikan cart dan total harga update dengan benar.

### Tahap 4 — useEffect

1. Tambahkan `useEffect` dengan dependency array kosong `[]` untuk `console.log("App loaded")`.
2. Tambahkan `useEffect` kedua yang bergantung pada `cart` — update `document.title` setiap cart berubah.

### Tahap 5 — Search & form checkout

1. Buat state `query` untuk input pencarian. Filter produk dari array berdasarkan `query` sebelum di-`.map()`.
2. Buat state `nama` dan `email` untuk form checkout. Hubungkan ke input via `value` dan `onChange`.
3. Tampilkan live preview di bawah form jika kedua field sudah diisi.

### Tahap 6 — Validasi form

1. Tulis fungsi validasi yang mengecek nama (min 3 karakter) dan email (ada "@").
2. Tampilkan pesan error di bawah tiap field yang gagal validasi — **bukan `alert()`**.
3. Set tombol Checkout menjadi `disabled` jika form belum valid atau cart masih kosong.

### Tahap 7 — Cek akhir sebelum dikumpulkan

Jalankan checklist ini sambil mencoba langsung di browser:

- [ ] Produk tampil dari array, search live filter jalan
- [ ] Badge Tersedia/Habis benar, tombol disabled saat stok habis
- [ ] Tambah ke cart → item muncul di CartSidebar, total update otomatis
- [ ] Hapus dari cart → item hilang, total turun
- [ ] `document.title` berubah setiap cart berubah
- [ ] Live preview nama & email muncul di form checkout
- [ ] Validasi error muncul di bawah field, bukan `alert()`
- [ ] Tombol Checkout disabled jika form tidak valid atau cart kosong
- [ ] Tidak memakai library UI, `alert()`, atau Next.js

> Kalau semua kotak di atas sudah ✅, tugasmu selesai. Kalau ada waktu sisa, coba kerjakan **fitur filter kategori** (tombol: Semua / Makanan / Minuman) sebagai bonus.

---

## Cara Mengumpulkan

Push project ke GitHub repo. Share link repo beserta **README singkat** yang menyebutkan fitur mana saja yang berhasil dikerjakan. Tidak perlu deploy — reviewer akan menjalankan sendiri dengan `npm run dev`. (Silahkan googling untuk cara membuat akun dan push ke github).
