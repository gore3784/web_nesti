# Hinggi.id

---

## Pastikan kamu punya environment dasar':'

* PHP versi sesuai Laravel (cek di `composer.json` atau dokumentasi Laravel).
* Composer (untuk menginstal dependency Laravel).
* Node.js + npm (untuk mengolah asset frontend dengan Vite/laravel-mix).
* Database (MySQL/PostgreSQL sesuai kebutuhan project).

---

### Install dependency PHP (Laravel)

Setelah clone, biasanya folder `vendor` tidak ikut.

Jadi jalankan:

```bash
composer install
```

👉 Ini akan membaca `composer.json` dan mengunduh semua library Laravel.

---

### Copy file environment

Biasanya repo Laravel punya file `.env.example`.

Buat file `.env` dari itu:

```bash
cp .env.example .env
```

(atau copy manual dan rename jadi `.env`)

---

### Generate application key

Setelah `.env` ada, jalankan:

```bash
php artisan key:generate
```

👉 Ini akan mengisi `APP_KEY` di `.env`.

---

### Setting database di `.env`

Edit `.env` sesuai database lokalmu:

```
DB_DATABASE=nama_database
DB_USERNAME=user_db
DB_PASSWORD=pass_db
```

Lalu jalankan migration:

```bash
php artisan migrate
```

(opsional kalau project butuh seed data: `php artisan db:seed`)

---

### Install dependency frontend

Kalau project punya frontend asset (lihat ada `package.json`):

```bash
npm install
```

👉 Ini akan menginstal semua dependency frontend.

---

### Jalankan Laravel

Setelah semua siap:

```bash
php artisan serve
```

👉 Secara default bisa diakses di: [http://127.0.0.1:8000](http://127.0.0.1:8000/)

---

### 📌 Ringkasan langkah setelah clone':'

✅ `composer install`

✅ copy `.env.example` → `.env`

✅ `php artisan key:generate`

✅ set DB → `php artisan migrate`

✅ `npm install`

✅ `npm run dev` (untuk asset)

✅ `php artisan serve` (untuk menjalankan server)
