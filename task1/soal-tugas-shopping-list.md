# Soal Tugas — HTML, CSS & JavaScript
## Pre-React Challenge: Halaman Daftar Belanja (Shopping List)

Waktu pengerjaan: satu hari  
Kerjakan hanya dengan file HTML, CSS, dan JS murni (tanpa framework/library apapun).

---

## Deskripsi

Buat sebuah halaman web **Daftar Belanja** yang memungkinkan pengguna menambahkan item belanja, menandai item yang sudah dibeli, dan menghapus item dari daftar.

---

## Tampilan yang Harus Dibuat

```
┌────────────────────────────────────────────┐
│              Daftar Belanja                │
├────────────────────────────────────────────┤
│  Nama Item : [___________________]         │
│  Jumlah    : [___________________]         │
│  Satuan    : [___________________]         │
│                                            │
│              [Tambah Item]                 │
├────────────────────────────────────────────┤
│  ┌────────────┬────────┬────────┬────────┐ │
│  │ Nama Item  │ Jumlah │ Satuan │        │ │
│  ├────────────┼────────┼────────┼────────┤ │
│  │ ✅ Susu    │ 2      │ Liter  │  hapus  │ │
│  │ ☐  Telur   │ 1      │ Lusin  │  hapus  │ │
│  └────────────┴────────┴────────┴────────┘ │
│                                            │
│  Total item: 2  |  Sudah dibeli: 1         │
└────────────────────────────────────────────┘
```

---

## Requirement Wajib

### HTML
- [ ] Gunakan semantic HTML (`header`, `main`, `section`, dll)
- [ ] Form dengan 3 input: Nama Item, Jumlah, Satuan
- [ ] Tabel untuk menampilkan daftar item belanja

### CSS (Flexbox/Grid)
- [ ] Layout halaman menggunakan Flexbox atau Grid
- [ ] Form dan tabel rapi dan tidak berantakan
- [ ] Tampilan responsif — tetap terbaca di layar kecil
- [ ] Item yang sudah dibeli tampil berbeda (teks coret + warna berbeda)
- [ ] Tombol hapus dan checkbox punya hover effect

### JavaScript (DOM & Validasi)
- [ ] Saat tombol "Tambah Item" diklik, data muncul sebagai baris baru di tabel **tanpa reload halaman**
- [ ] Setiap baris punya checkbox — klik checkbox untuk toggle status "sudah dibeli" (teks jadi coret)
- [ ] Tombol hapus di setiap baris bisa menghapus item tersebut dari tabel
- [ ] Counter "Total item: X | Sudah dibeli: X" update otomatis setiap ada perubahan
- [ ] Setelah berhasil tambah, form langsung dikosongkan kembali

### Validasi Form (wajib pakai JavaScript, bukan HTML `required`)
- [ ] Semua field tidak boleh kosong
- [ ] Field Jumlah hanya boleh berisi angka dan harus lebih dari 0
- [ ] Field Nama Item minimal 3 karakter
- [ ] Jika validasi gagal, tampilkan pesan error yang jelas di bawah field yang bermasalah (bukan `alert()`)

---

## Struktur File

```
tugas-belanja/
├── index.html
├── style.css
└── script.js
```

---

## Penilaian

| Aspek | Yang Dilihat |
|---|---|
| HTML | Struktur rapi, semantic, form lengkap |
| CSS Layout | Flexbox/Grid dipakai dengan benar, tampilan bersih |
| DOM Manipulation | Data muncul di tabel tanpa reload, hapus & toggle berfungsi |
| Validasi | Pesan error muncul di tempat yang tepat, bukan alert() |
| Detail kecil | Counter update, form reset, styling item yang sudah dibeli |

---

## Catatan
- **Tidak boleh** pakai jQuery atau library CSS seperti Bootstrap/Tailwind
- **Tidak boleh** pakai `alert()` untuk apapun — semua feedback tampil di halaman
- Kalau ada waktu sisa, boleh tambahkan fitur filter: tampilkan semua / belum dibeli / sudah dibeli sebagai bonus

---

## Cara Menjalankan Project

Project ini murni HTML/CSS/JS. Jalankan lewat server lokal dari dalam folder project (`tugas-belanja/`):

```bash
# Opsi A — tanpa install apa pun (butuh Node.js terpasang)
npx serve
# lalu buka URL yang muncul, mis. http://localhost:3000
```

---

## Contoh Referensi: `belajarjs.zip`

Sebagai **contoh pola pengerjaan**, sudah disediakan file `belajarjs.zip` (project "Daftar Kontak").
Struktur dan teknik di dalamnya **mirip** dengan tugas ini — pakai untuk belajar pola, **bukan untuk disalin mentah-mentah** (topiknya beda: Kontak vs Belanja).

> **Catatan:** file `belajarjs.zip` di-copy dari folder **Download**, lalu dimasukkan ke folder **belajar** masing-masing.

### Cara membuka contoh
1. Ekstrak `belajarjs.zip` (klik kanan → **Extract Here**, atau pakai aplikasi arsip apa pun)
2. Masuk ke folder hasil ekstrak, lalu jalankan server lokal:

```bash
# Opsi A — tanpa install apa pun (butuh Node.js terpasang)
npx serve
# lalu buka URL yang muncul, mis. http://localhost:3000
```

### Apa yang bisa dipelajari dari contoh ini

| Pola di `belajarjs` | Bisa dipakai untuk tugas ini |
|---|---|
| Render ulang tabel dari array (`renderTable()`) | Cara aman menampilkan & menghapus item tanpa bug index |
| `e.preventDefault()` di event submit | Tambah data tanpa reload halaman |
| Validasi manual + tampilkan error di bawah field | Validasi tanpa `alert()` dan tanpa `required` |
| `form.reset()` setelah submit | Mengosongkan form otomatis |
| Toggle `class` lewat CSS | Dasar untuk efek teks coret saat item "sudah dibeli" |

> **Perlu ditambahkan sendiri** (tidak ada di contoh): checkbox toggle "sudah dibeli", styling teks coret, dan counter ganda `Total item: X | Sudah dibeli: X`.

---

## Tutorial Langkah demi Langkah

Panduan ini menjelaskan **urutan kerja** dari nol sampai selesai. Sengaja **tidak diberi contoh kode** — kamu yang menulis kodenya sendiri, supaya benar-benar paham. Kalau bingung soal pola, lihat dulu project contoh `belajarjs` di atas, jangan langsung menyalin.

### Tahap 0 — Siapkan alat kerja

1. Pastikan **VS Code** sudah terpasang (editor untuk menulis kode).
2. Pastikan **Node.js** sudah terpasang. Cek dengan membuka Terminal lalu ketik `node -v`. Kalau muncul nomor versi (mis. `v20.x.x`), berarti sudah siap. Kalau "command not found", install dulu dari [nodejs.org](https://nodejs.org).
3. Pastikan kamu punya **browser** (Chrome / Firefox) untuk melihat hasilnya.

### Tahap 1 — Buat struktur folder & file

1. Buat satu folder baru bernama `tugas-belanja`.
2. Buka folder itu di VS Code (menu **File → Open Folder**).
3. Di dalam folder, buat **3 file kosong**: `index.html`, `style.css`, dan `script.js`.
4. Di Terminal VS Code (menu **Terminal → New Terminal**), pastikan kamu sudah berada di dalam folder `tugas-belanja`, lalu jalankan `npx serve`.
5. Buka URL yang muncul (mis. `http://localhost:3000`) di browser. Untuk sekarang halaman masih kosong — itu normal. **Biarkan terminal tetap menyala** selama mengerjakan.

> Tips: setiap kali kamu menyimpan file (Ctrl+S), cukup **refresh** browser untuk melihat perubahannya.

### Tahap 2 — Kerangka HTML dulu (jangan pikirkan tampilan)

Kerjakan file `index.html` lebih dulu. Targetnya: semua elemen ada di halaman, **belum perlu rapi**.

1. Buat kerangka HTML dasar, lalu sambungkan `style.css` (di bagian `<head>`) dan `script.js` (sebelum `</body>`).
2. Susun struktur pakai **tag semantic**: bungkus dengan `header` (judul "Daftar Belanja"), `main`, dan `section`.
3. Buat **form** berisi 3 input: **Nama Item**, **Jumlah**, **Satuan**, dan satu tombol **Tambah Item**.
4. Sediakan tempat kosong untuk **pesan error** di bawah tiap input (mis. elemen kosong yang nanti diisi lewat JS).
5. Buat **tabel**: bagian judul kolom (`Nama Item`, `Jumlah`, `Satuan`, dan kolom kosong untuk tombol hapus) + bagian isi yang masih kosong (nanti diisi otomatis oleh JS).
6. Sediakan tempat untuk **counter** "Total item: X | Sudah dibeli: X".
7. Cek di browser: semua elemen sudah muncul walau tampilannya masih polos.

### Tahap 3 — Buat fungsi JavaScript-nya (ini bagian inti)

Kerjakan file `script.js`. Kerjakan **satu per satu**, dites tiap selesai satu fitur.

1. **Siapkan "ingatan" data.** Buat satu variabel array kosong untuk menyimpan daftar item. **Semua item disimpan di sini**, bukan langsung ditempel ke tabel.
2. **Ambil elemen** yang dibutuhkan dari HTML (form, tiap input, badan tabel, elemen counter) supaya bisa dipakai di JS.
3. **Tangani tombol Tambah.** Pasang event saat form di-submit. Hal pertama yang harus dilakukan: **cegah halaman me-reload**.
4. **Buat fungsi "gambar ulang tabel".** Tugasnya: kosongkan isi tabel, lalu untuk tiap item di array, buat satu baris baru. **Selalu panggil fungsi ini setiap data berubah** (tambah / hapus / centang). Pola "gambar ulang dari array" inilah kunci supaya tidak ada bug.
5. **Tambah item.** Kalau data valid (lihat Tahap 4), masukkan item baru ke array → panggil "gambar ulang tabel" → **kosongkan form**.
6. **Checkbox "sudah dibeli".** Tiap baris punya checkbox. Saat dicentang, ubah status item itu di array, lalu gambar ulang supaya barisnya tampil tercoret.
7. **Tombol Hapus.** Tiap baris punya tombol hapus. Saat diklik, buang item itu dari array, lalu gambar ulang tabel.
8. **Counter.** Buat fungsi yang menghitung total item dan jumlah yang sudah dibeli dari array, lalu tampilkan. Panggil fungsi ini setiap kali tabel digambar ulang.

> Tips uji: tambah beberapa item, centang satu, hapus satu — pastikan tabel & counter selalu cocok dengan kenyataan.

### Tahap 4 — Validasi form (pakai JavaScript, bukan `required`)

Masih di `script.js`. Sebelum item ditambahkan, periksa dulu isiannya:

1. **Semua field tidak boleh kosong.**
2. **Nama Item** minimal **3 karakter**.
3. **Jumlah** harus **angka** dan **lebih dari 0**.
4. Kalau ada yang salah: **tampilkan pesan error di bawah field yang bermasalah** (isi elemen error yang sudah disiapkan di Tahap 2). **Jangan pakai `alert()`.**
5. Kalau semua benar, baru lanjut menambahkan item. Jangan lupa **hapus pesan error lama** setiap kali tombol Tambah ditekan ulang.

### Tahap 5 — Percantik tampilan dengan CSS

Baru sekarang kerjakan `style.css`, setelah semua fungsi jalan:

1. Atur **layout** halaman pakai **Flexbox atau Grid** supaya form dan tabel rapi.
2. Beri jarak, warna, dan border supaya enak dilihat.
3. **Item yang sudah dibeli** harus tampil beda: **teks dicoret** + warna berbeda (biasanya pakai sebuah class yang ditambahkan lewat JS saat dicentang).
4. Beri **efek hover** pada tombol hapus dan checkbox.
5. Pastikan **responsif**: coba kecilkan jendela browser, tampilan harus tetap terbaca (gunakan media query bila perlu).

### Tahap 6 — Cek akhir sebelum dikumpulkan

Jalankan checklist ini sambil mencoba langsung di browser:

- [ ] Tambah item → muncul di tabel **tanpa halaman reload**
- [ ] Form **kosong otomatis** setelah berhasil menambah
- [ ] Centang checkbox → teks jadi **tercoret** dan warna berubah
- [ ] Tombol hapus → baris benar-benar hilang
- [ ] Counter **Total item** & **Sudah dibeli** selalu update otomatis
- [ ] Isi form salah (kosong / nama < 3 huruf / jumlah 0 atau bukan angka) → muncul **pesan error di bawah field**, **bukan** `alert()`
- [ ] Tampilan tetap rapi saat jendela dikecilkan
- [ ] Tidak memakai jQuery, Bootstrap, Tailwind, atau `alert()`

> Kalau semua kotak di atas sudah ✅, tugasmu selesai. Kalau ada waktu sisa, coba kerjakan **fitur filter barang** (tampilkan semua / belum dibeli / sudah dibeli).
