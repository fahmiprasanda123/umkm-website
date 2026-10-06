# 🌿 Nusantara Artisan & Co. — Website & Katalog Dinamis UMKM (Tanpa Database)

Website Company Profile dan Katalog Produk Interaktif untuk UMKM yang **100% Statis (Jamstack), Berjalan Tanpa Database Server**, dan **Siap Dipublish Gratis ke GitHub Pages**.

---

## ✨ Fitur Utama

1. **Dinamis Tanpa Database (Zero-Server Architecture)**:
   - Data produk, profil usaha, testimoni, dan konfigurasi tersimpan di file `data/site-data.json`.
   - Menggunakan sinkronisasi pintar `LocalStorage` browser sehingga pemilik toko bisa mengedit konten secara realtime di browser.
2. **Katalog Produk Interaktif**:
   - Pencarian instan (Live Search).
   - Filter berdasarkan Kategori (Kopi & Minuman, Camilan & Sambal, Kerajinan Etnik, Batik & Busana).
   - Pengurutan produk (Terpopuler, Harga Terendah, Harga Tertinggi, Nama A-Z).
   - Modal Quick View dengan spesifikasi lengkap dan foto detail.
3. **Keranjang Belanja & Checkout WhatsApp Otomatis**:
   - Pengunjung bisa menambahkan banyak produk sekaligus ke keranjang.
   - Drawer keranjang interaktif (+ / - / hapus produk).
   - Formulir detail pembeli (Nama, No. WA, Alamat Pengiriman / Ambil di Tempat, Opsi Pembayaran QRIS/Transfer/COD, Catatan Khusus).
   - Tombol **"Kirim Pesanan via WhatsApp"** otomatis menyusun pesan rapi dengan rincian barang, jumlah, subtotal, dan detail alamat yang langsung membuka obrolan WhatsApp dengan nomor penjual!
4. **Admin Panel / CMS Mode di Browser**:
   - Dilindungi PIN keamanan (PIN Bawaan: `1234`).
   - Ubah Nama Toko, Slogan, No. WhatsApp, Email, Alamat, Jam Buka, Link Google Maps, dan Media Sosial.
   - Tambah, Edit, dan Hapus Produk lengkap dengan harga promo/coret, badge, rating, dan **fitur upload gambar lokal dari komputer** (otomatis diubah ke Base64 DataURL).
   - Kelola ulasan/testimoni.
   - **Fitur Ekspor 1-Klik**: Download file `site-data.json` hasil editan untuk diperbarui di GitHub repository.
5. **Estetika Premium & Modern**:
   - Tipografi modern Google Font (*Plus Jakarta Sans*).
   - Dark Mode / Light Mode toggle yang tersimpan otomatis.
   - Desain responsif (*mobile-first*) untuk HP, tablet, dan laptop.
   - Animasi micro-interaction dan toast notification yang elegan.

---

## 📁 Struktur File Proyek

```
umkm-statis/
├── index.html              # Halaman web utama
├── css/
│   └── style.css          # Desain sistem, layout responsif, Dark/Light mode
├── js/
│   ├── app.js             # Logika katalog, keranjang belanja, checkout WA, ulasan
│   └── admin.js           # Panel kelola produk & profil (CMS tanpa database)
├── data/
│   └── site-data.json     # Sumber data profil usaha & katalog produk
└── README.md              # Dokumentasi & panduan deployment
```

---

## 🚀 Cara Menjalankan di Komputer Lokal (Super Mudah Tanpa XAMPP)

Website ini adalah **100% Client-Side Jamstack Murni**, sehingga Anda **TIDAK memerlukan XAMPP, Apache, Node.js, atau server apa pun**!

### Cukup Klik 2 Kali File `index.html`!
1. Buka folder proyek ini di komputer Anda (lewat File Explorer di Windows atau Finder di Mac).
2. **Klik dua kali (*double click*) file `index.html`**.
3. Website akan langsung terbuka dan berjalan sempurna di browser favorit Anda (Google Chrome, Microsoft Edge, Safari, Firefox, Opera)!
4. Seluruh fitur (katalog produk, pencarian instan, filter kategori, keranjang belanja, checkout WhatsApp otomatis, hingga Panel Admin) dapat digunakan secara langsung dan offline.

> 💡 **Tips Akses Admin saat Buka File Langsung**:
> Saat membuka file secara langsung (format `file:///.../index.html`), Anda bisa langsung membuka Panel Admin dengan menekan kombinasi tombol **`Ctrl + Shift + A`** (atau `Cmd + Shift + A` di Mac), atau dengan **mengklik logo toko sebanyak 5 kali berurutan**. Masukkan PIN bawaan: `1234`.

---

## 🌐 Cara Mempublikasikan ke GitHub Pages (Gratis & 1 Menit)

1. **Buat Repository Baru di GitHub**:
   - Masuk ke [github.com](https://github.com) lalu klik tombol **New Repository**.
   - Beri nama repository (misal: `toko-karya-nusantara`).
   - Pilih opsi **Public**, lalu klik **Create repository**.

2. **Upload / Push Kode**:
   - Jika menggunakan Git di terminal:
     ```bash
     git init
     git add .
     git commit -m "Inisialisasi website UMKM dinamis"
     git branch -M main
     git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO-ANDA.git
     git push -u origin main
     ```
   - Atau langsung gunakan tombol **Upload files** di halaman web GitHub untuk mengunggah semua file (`index.html`, folder `css`, folder `js`, dan folder `data`).

3. **Aktifkan GitHub Pages**:
   - Di halaman repository GitHub Anda, klik tab **Settings**.
   - Di menu sebelah kiri, klik **Pages**.
   - Di bagian **Build and deployment** &rarr; **Source**, pilih **Deploy from a branch**.
   - Pilih Branch: **main** (atau `master`) dan folder: `/(root)`.
   - Klik **Save**.

4. **Selesai!**
   Tunggu sekitar 30 detik. Website Anda akan langsung online dengan domain HTTPS gratis:
   ```
   https://username-anda.github.io/nama-repo-anda/
   ```

---

## 💡 Bagaimana Cara Memperbarui Produk & Profil Tanpa Database?

1. Di website Anda, klik ikon **Gear / Pengaturan** di pojok kanan atas atau klik **"Mode Kelola Toko (Admin)"** di bagian paling bawah halaman (footer).
2. Masukkan PIN Admin: `1234` *(bisa diubah di menu profil)*.
3. Tambah atau edit produk sesuai kebutuhan Anda.
4. Buka tab **"Publish ke GitHub Pages"** di dalam modal admin, lalu klik tombol **"Unduh File site-data.json Terbaru"**.
5. Ganti (overwrite) file `data/site-data.json` di komputer / repository GitHub Anda dengan file yang baru diunduh tadi, lalu commit/upload ke GitHub.
6. Perubahan akan langsung aktif untuk **seluruh pengunjung di seluruh dunia**!

---

## 🔑 Cara Masuk ke Panel Admin (Tersembunyi dari Publik)

Tombol admin sengaja disembunyikan agar pengunjung umum tidak mengetahuinya. Anda sebagai pemilik toko dapat masuk dengan 4 cara yang sangat mudah:

1. **Lewat URL (Paling Praktis)**:
   Cukup tambahkan `?admin` di akhir alamat website Anda di browser:
   - Di lokal: `http://localhost/umkm-statis/?admin`
   - Di GitHub Pages: `https://username.github.io/nama-repo/?admin`
   *(Modal PIN akan otomatis terbuka begitu halaman selesai dimuat).*

2. **Keyboard Shortcut**:
   Tekan **`Ctrl + Shift + A`** (atau `Cmd + Shift + A` di Mac) di keyboard Anda saat berada di website.

3. **Ketuk / Klik Logo Toko 5 Kali**:
   Klik logo toko di pojok kiri atas sebanyak **5 kali berurutan** dalam 3 detik.

4. **Hotspot Rahasia di Footer**:
   Di bagian pojok kanan bawah (footer), terdapat ikon gembok kecil transparan yang dapat diklik.

5. **Fitur Logout Admin**:
   Di pojok kanan atas header panel admin (serta di bagian bawah tab Publish), terdapat tombol **"Logout"** berwarna merah. Mengklik tombol ini akan langsung mengakhiri sesi login admin dan menghapus status autentikasi di browser, sehingga aman jika komputer digunakan bersama.

---

## 🎨 Fitur Ubah Logo, Ganti PIN & CMS Konten Halaman Lengkap

Di dalam Panel Admin:
1. **Tab Profil & Logo**:
   - **Ubah Logo Usaha**: Pilih simbol icon FontAwesome ATAU upload file gambar logo sendiri langsung dari komputer.
   - **Ganti PIN Admin**: Form PIN baru & konfirmasi PIN baru dengan enkripsi aman satu arah SHA-256.
   - **Informasi Bisnis**: Nama toko, tagline, deskripsi, nomor WhatsApp, email, alamat lengkap, jam operasional, link embed Google Maps, dan link media sosial (Instagram, TikTok, Shopee, Tokopedia).
2. **Tab Konten Halaman (CMS Dinamis)**:
   - **1. Tentang Kami (About Us)**: Ubah tagline, judul, 2 paragraf cerita, badge pengalaman ("10+ Tahun"), upload foto perajin dari komputer, dan 4 pilar kualitas bahan (pilihan ikon FontAwesome, judul, dan deskripsi).
   - **2. Mengapa Memilih Kami (Keunggulan)**: Ubah tagline, judul, subtitle, dan 4 kartu keunggulan pelayanan (pilihan ikon FontAwesome, judul, dan deskripsi).
   - **3. Banner Promosi / Hampers**: Ubah badge promo, judul penawaran custom, teks deskripsi penawaran, teks tombol, dan template chat WhatsApp.
   - **4. Hero Utama & Statistik**: Ubah 2 badge atas, judul utama 2 baris (dengan efek gradient), dan 4 angka statistik counter.
   - **5. Header Ulasan Pelanggan**: Ubah tagline ("Ulasan Pelanggan"), judul ("Apa Kata Mereka yang Sudah Mencoba?"), dan deskripsi ulasan.
   - **6. Header Kontak & Form Pesan**: Ubah tagline ("Hubungi Kami"), judul ("Kunjungi Toko atau Pesan Daring"), subjudul, serta judul dan keterangan form WhatsApp.
3. **Tab Kelola Testimoni & Ulasan**:
   - **Tambah Ulasan Baru**: Input nama pelanggan, domisili/profesi, rating 1-5 bintang, waktu ulasan, upload foto avatar dari komputer, dan isi ulasan.
   - **Edit & Hapus Ulasan**: Edit konten ulasan yang sudah ada atau hapus ulasan lama secara instan.
4. **Ekspor Data untuk GitHub Pages**:
   - Setelah mengedit profil, konten, atau produk, buka tab **"Publish ke GitHub Pages"** dan unduh file `site-data.json` untuk diperbarui di repository GitHub Anda.

---

## ☕ Dukung Pengembang (Support & Donasi)

Template website UMKM ini dibuat dan dibagikan secara gratis dan terbuka (*open-source*) untuk mendukung kemajuan dan percepatan digitalisasi pelaku UMKM di seluruh Indonesia.

Jika template website ini bermanfaat bagi usaha Anda dan Anda ingin mendukung pengembangan fitur-fitur baru lebih lanjut, Anda dapat memberikan apresiasi atau donasi sukarela melalui tautan berikut:

- ☕ **Buy Me a Coffee**: [https://buymeacoffee.com/itsamilitarysecret](https://buymeacoffee.com/itsamilitarysecret)
- 💛 **Saweria**: [https://saweria.co/itsamilitarysecret](https://saweria.co/itsamilitarysecret)

Terima kasih banyak atas setiap dukungan, doa, dan apresiasi Anda untuk kemajuan ekosistem UMKM lokal! 🙏✨
