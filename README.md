*# ✨ Hinggi.id

**Hinggi.id** adalah platform **e-commerce** yang berfokus pada penjualan **kain tradisional Sumba, NTT**.  
Kami berkomitmen untuk melestarikan budaya sekaligus mempermudah masyarakat dalam membeli kain tenun khas Sumba secara daring.

---

## 🏗️ Struktur Project

Project ini terdiri dari dua bagian utama:

| Bagian       | Teknologi          | Folder      |
| ------------ | ------------------ | ----------- |
| **Backend**  | Laravel (PHP)      | `/backend`  |
| **Frontend** | React (JavaScript) | `/frontend` |

---

## 🚀 Fitur Utama

✅ Menampilkan katalog kain tradisional Sumba  
✅ Sistem keranjang dan checkout  
✅ Autentikasi pengguna (login, register)  
✅ Manajemen produk (untuk admin)  
✅ Responsive design (mobile-friendly)

---

## 📦 Cara Install & Jalankan

### 🔧 **1. Persiapan Environment**

Pastikan sudah terinstall di komputer:

- PHP 8.x
- Composer
- Node.js + npm
- MySQL / MariaDB

---

### ⚙️ **2. Setup Backend (Laravel)**

Masuk ke folder backend:

```bash
cd backend
```

```bash
composer install
```

```bash
cp .env.example .env
```

```bash
php artisan key:generate
```

Atur konfigurasi database di .env

```bash
php artisan migrate --seed
```

```bash
php artisan serve
```

Backend akan berjalan di:
👉 `http://127.0.0.1:8000`

---

### 🎨 **3. Setup Frontend (React)**

Buka terminal baru, masuk ke folder frontend:

```bash
cd frontend
npm install
npm start
```

Frontend akan berjalan di:
👉 `http://localhost:8000`

---

## 🌐 URL Development

| Layanan        | URL                                            |
| -------------- | ---------------------------------------------- |
| Laravel API    | [http://127.0.0.1:8000](http://127.0.0.1:8000) |
| React Frontend | [http://localhost:8000](http://localhost:8000) |

---

## 📁 Struktur Folder

```
project-root/
├─ backend/      # Laravel Backend
│  ├─ app/
│  ├─ routes/
│  └─ ...
└─ frontend/     # React Frontend
   ├─ src/
   ├─ public/
   └─ ...
```

---

## 📜 Lisensi

Project ini dirilis dengan lisensi **MIT** – silakan lihat file [LICENSE](LICENSE) untuk detail.

---

<p align="center">
  Dibuat dengan ❤️ untuk melestarikan budaya Indonesia – **Hinggi.id**
</p>
