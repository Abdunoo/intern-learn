# Tugas Upgrade: Katalog Produk (Lanjutan dari Tugas Evaluasi Day 1–6)

> Catatan: Tugas ini **melanjutkan**, bukan mengulang, soal "Pre-NextJS Challenge: Halaman Katalog Produk" yang sudah kamu kerjakan. Fitur seperti cart dasar (tambah/hapus/total), checkout dengan validasi, search live filter, badge stok, dan `document.title` via `useEffect` **sudah dianggap selesai** dan tidak diulang di sini. Fokus tugas ini adalah fitur **baru** yang belum diminta di soal sebelumnya.

Struktur project kamu:
```
src/
├── components/
│   ├── CartSidebar.jsx
│   ├── CheckoutForm.jsx
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── data/
│   └── products.js
├── App.jsx
├── App.css
└── main.jsx
```

## Cara Menjalankan
```
npm install
npm run dev
```

---

## Daftar Step (Fitur Baru)

| Step | Fitur Baru | File yang Disentuh | Prioritas |
|---|---|---|---|
| 1 | Ganti data hardcoded jadi fetch dari API sungguhan | `data/products.js` → dihapus/jadi fallback, `App.jsx` | 🔴 Wajib |
| 2 | Loading & Error state saat fetch | `App.jsx` | 🔴 Wajib |
| 3 | Modal detail produk (klik card → lihat detail lengkap) | file baru `ProductDetail.jsx` | 🟠 Penting |
| 4 | Cart tetap ada setelah refresh (localStorage) | `App.jsx` | 🟠 Penting |
| 5 | Debounce pada search (tidak filter di tiap ketikan) | `App.jsx` atau `ProductList.jsx` | 🟡 Bagus dicoba |
| 6 | Sorting produk (harga termurah/termahal, nama A-Z) | `App.jsx`, `ProductList.jsx` | 🟡 Bagus dicoba |
| 7 | Context API untuk cart (hindari props drilling) | file baru `context/CartContext.jsx` | 🟢 Bonus |

**Yang TIDAK perlu dikerjakan lagi** (karena sudah ada di tugas sebelumnya): search live filter dasar, badge Tersedia/Habis, tombol disabled saat stok habis, tambah/hapus item cart, total harga cart, form checkout dengan validasi nama/email, live preview nama & email, `console.log("App loaded")`, update `document.title`.

---

## Step 1: Ganti Data Hardcoded jadi Fetch dari API Sungguhan

**Kenapa ini beda dari tugas sebelumnya:** Sebelumnya data produk statis di `data/products.js`. Sekarang kamu belajar mengambil data dari luar (API asli), yang jadi fondasi penting sebelum Next.js (yang punya cara fetch data server-side sendiri).

**Yang harus dilakukan:**
- Di `App.jsx`, ganti `import { products } from './data/products'` dengan fetch ke [Fake Store API](https://fakestoreapi.com/products)
- Simpan hasil fetch ke state pakai `useState` + `useEffect`
- Sesuaikan field yang dipakai di `ProductCard.jsx`: API ini pakai `title`, `price`, `image`, `category`, `description` — bukan `nama`, `harga`, `stok` seperti data lama. Kamu bisa tetap tampilkan format Rupiah, tinggal konversi: `Math.round(product.price * 15000)` misalnya (karena API ini harganya dalam USD)
- `data/products.js` boleh disimpan sebagai referensi/fallback kalau fetch gagal, tidak perlu dihapus total

**Contoh kode:**
```jsx
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ...
}
```

**Hasil yang diharapkan:**
Produk yang tampil di katalog sekarang berasal dari API asli (nama-nama produk seperti "Fjallraven backpack", "Mens Cotton Jacket", dll), bukan "Susu UHT" atau "Telur Ayam" dari data lama.

**Cek pemahaman:** Kenapa `useEffect` dipakai untuk fetch, bukan langsung dipanggil di body komponen?
> Karena fetch adalah "side effect" (efek samping) — kalau dipanggil langsung tanpa `useEffect`, dia akan terpanggil berulang setiap kali komponen render, bukan cuma sekali.

---

## Step 2: Loading & Error State

**Kenapa ini beda dari tugas sebelumnya:** Data lama langsung tersedia (hardcoded), jadi tidak ada jeda waktu tunggu. Sekarang dengan fetch API asli, ada kemungkinan data belum datang atau gagal — perlu ditangani.

**Yang harus dilakukan:**
- Tambah state `loading` (true di awal) dan `error` (null di awal)
- Tampilkan pesan berbeda tergantung kondisi, sebelum render `ProductList`

**Contoh kode:**
```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch(() => {
      setError('Gagal mengambil data produk');
      setLoading(false);
    });
}, []);

if (loading) return <p>Loading produk...</p>;
if (error) return <p>{error}</p>;
```

**Hasil yang diharapkan:**
Saat halaman dibuka, muncul teks "Loading produk..." sesaat sebelum produk tampil. Kalau internet diputus lalu refresh, muncul pesan error di halaman — bukan halaman kosong/blank.

---

## Step 3: Modal Detail Produk

**Kenapa ini beda dari tugas sebelumnya:** Soal sebelumnya cuma minta `ProductCard` menampilkan nama, harga, status stok. Belum ada cara melihat detail lengkap (deskripsi, gambar besar, kategori).

**Yang harus dilakukan:**
- Buat file baru `src/components/ProductDetail.jsx`
- Klik `ProductCard` (di luar tombol "+ Tambah") membuka modal berisi gambar besar, deskripsi lengkap, harga, kategori
- Tombol/klik luar modal untuk menutup

**Contoh `ProductDetail.jsx`:**
```jsx
function ProductDetail({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Kategori: {product.category}</p>
        <button onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
}

export default ProductDetail;
```

**Di `App.jsx`:**
```jsx
const [selectedProduct, setSelectedProduct] = useState(null);

<ProductList products={filteredProducts} onSelect={setSelectedProduct} onTambah={handleTambah} />
{selectedProduct && (
  <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
)}
```

**Penting:** Karena `ProductCard` sudah punya tombol "+ Tambah" (dari tugas sebelumnya), pastikan klik tombol itu **tidak ikut membuka modal**. Gunakan `e.stopPropagation()` di tombol "+ Tambah":
```jsx
<button onClick={(e) => {
  e.stopPropagation();
  onTambah(product);
}} disabled={!product.stok}>
  + Tambah
</button>
```

**Hasil yang diharapkan:**
Klik card produk (bukan tombol "+ Tambah") membuka modal detail. Klik tombol "+ Tambah" tetap menambah ke cart seperti biasa tanpa membuka modal.

---

## Step 4: Cart Tetap Ada Setelah Refresh (localStorage)

**Kenapa ini beda dari tugas sebelumnya:** Soal sebelumnya hanya minta cart berfungsi selama halaman terbuka. Belum ada requirement cart bertahan setelah refresh.

**Yang harus dilakukan:**
- Saat `cart` berubah, simpan otomatis ke `localStorage`
- Saat app pertama kali dibuka, ambil cart dari `localStorage` (kalau ada)

**Contoh kode:**
```jsx
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
```

**Hasil yang diharapkan:**
Tambahkan 2-3 produk ke cart, refresh halaman (F5) — cart tidak kembali kosong, tetap menampilkan item sebelumnya.

**Cek pemahaman:** Kenapa `useState(() => {...})` pakai function, bukan langsung `useState(localStorage.getItem('cart'))`?
> Supaya `localStorage.getItem` cuma dipanggil sekali saat komponen pertama kali dibuat (lazy initialization), bukan setiap kali komponen re-render.

---

## Step 5: Debounce pada Search

**Kenapa ini beda dari tugas sebelumnya:** Soal sebelumnya cuma minta search "live filter saat mengetik" — itu sudah selesai. Fitur baru di sini: filter **tidak langsung jalan di setiap huruf yang diketik**, tapi menunggu user berhenti mengetik sejenak (misal 300ms) sebelum filter dijalankan. Ini optimasi penting kalau nanti data produk banyak atau filter butuh manggil API.

**Yang harus dilakukan:**
- Simpan input mentah di satu state (misal `searchInput`)
- Buat state kedua `debouncedSearch` yang di-update pakai `setTimeout` + `useEffect`
- Filter produk berdasarkan `debouncedSearch`, bukan `searchInput` langsung

**Contoh kode:**
```jsx
const [searchInput, setSearchInput] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchInput);
  }, 300);

  return () => clearTimeout(timer); // cleanup kalau user ngetik lagi sebelum 300ms
}, [searchInput]);
```

**Hasil yang diharapkan:**
Ketik cepat di search box (misal "susu") — filter produk baru jalan sedikit setelah kamu berhenti mengetik, bukan di setiap huruf.

**Cek pemahaman:** Kenapa perlu `return () => clearTimeout(timer)` di dalam `useEffect`?
> Itu fungsi "cleanup" — supaya timer lama dibatalkan kalau user mengetik huruf baru sebelum 300ms selesai, mencegah filter jalan dengan nilai yang sudah usang.

---

## Step 6: Sorting Produk

**Kenapa ini beda dari tugas sebelumnya:** Belum ada requirement urutkan produk. Ini fitur baru untuk latihan manipulasi array (`.sort()`) dikombinasikan dengan state.

**Yang harus dilakukan:**
- Tambah dropdown/tombol: "Termurah", "Termahal", "Nama A-Z"
- State `sortBy` menyimpan pilihan aktif
- Urutkan array produk (yang sudah difilter search) berdasarkan `sortBy` sebelum di-`.map()`

**Contoh kode:**
```jsx
const [sortBy, setSortBy] = useState('default');

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === 'termurah') return a.price - b.price;
  if (sortBy === 'termahal') return b.price - a.price;
  if (sortBy === 'nama') return a.title.localeCompare(b.title);
  return 0;
});
```

**Hasil yang diharapkan:**
Pilih "Termurah" di dropdown → produk otomatis terurut dari harga terendah. Pilih "Nama A-Z" → produk terurut alfabetis.

**Cek pemahaman:** Kenapa pakai `[...filteredProducts].sort()`, bukan `filteredProducts.sort()` langsung?
> `.sort()` memutasi (mengubah langsung) array aslinya. Dengan `[...filteredProducts]`, kita bikin salinan array dulu supaya array original tidak ikut berubah — best practice React untuk menghindari mutasi state secara langsung.

---

## Step 7 (Bonus): Context API untuk Cart

**Kenapa ini beda dari tugas sebelumnya:** Sebelumnya cart di-pass lewat props biasa (`App.jsx` → `ProductList.jsx` → `ProductCard.jsx` → `CartSidebar.jsx`). Kalau nanti komponen makin banyak, ini bisa jadi "props drilling" yang merepotkan. Context API adalah solusinya.

**Yang harus dilakukan:**
- Buat file baru `src/context/CartContext.jsx`
- Pindahkan state `cart` dan fungsi `addToCart`/`removeFromCart` ke context ini
- `ProductCard.jsx` dan `CartSidebar.jsx` ambil cart langsung pakai `useContext`, tidak lewat props berlapis

**Contoh struktur:**
```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prev => [...prev, product]);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

**Di `ProductCard.jsx`:**
```jsx
import { useCart } from '../context/CartContext';

const { addToCart } = useCart();
```

**Hasil yang diharapkan:**
Fungsionalitas cart tetap sama persis seperti sebelumnya (tambah, hapus, total, localStorage) — tapi sekarang kode lebih rapi karena tidak perlu meneruskan props cart secara manual ke semua komponen turunan.

---

## Checklist Progress

- [ ] Step 1: Fetch data dari Fake Store API (bukan lagi hardcoded)
- [ ] Step 2: Loading & Error state
- [ ] Step 3: Modal detail produk (`ProductDetail.jsx`)
- [ ] Step 4: Cart tersimpan di localStorage (bertahan setelah refresh)
- [ ] Step 5: Debounce pada search
- [ ] Step 6: Sorting produk (termurah/termahal/nama)
- [ ] Step 7: Context API untuk cart (Bonus)
