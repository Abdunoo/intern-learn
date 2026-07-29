# Chatbot Gemini (Terminal)

Contoh chatbot sederhana pakai Gemini API, langsung dijalankan di terminal.

## Cara Menjalankan

1. **Dapatkan API key** di https://aistudio.google.com/apikey (gratis untuk tier awal).

2. **Install dependency:**
   ```bash
   npm install
   ```

3. **Setup API key:**
   - Copy file `.env.example` jadi `.env`
   - Isi `GEMINI_API_KEY` dengan API key kamu
   ```bash
   cp .env.example .env
   ```

4. **Jalankan chatbot:**
   ```bash
   npm start
   ```

5. Ketik pesan, bot akan membalas. Ketik `exit` untuk keluar.

## Cara Kerja

- `ai.chats.create()` membuat sesi chat yang otomatis menyimpan history percakapan, jadi bot bisa "ingat" konteks sebelumnya tanpa kita kirim ulang manual.
- `systemInstruction` dipakai untuk mengatur karakter/perilaku bot.
- API key disimpan di file `.env` (jangan pernah commit file ini ke Git atau taruh langsung di kode — pakai `.gitignore`).

## Langkah Lanjutan

Kalau sudah lancar dengan versi terminal ini, coba kembangkan ke:
- **Streaming response** — pakai `sendMessageStream()` supaya jawaban muncul kata per kata seperti ChatGPT.
- **Web app** — bungkus logic ini di dalam API route (Next.js/Express) supaya bisa dipakai dari frontend, dengan API key tetap aman di backend.
- **Simpan history ke database** — supaya percakapan tidak hilang saat aplikasi di-restart.
