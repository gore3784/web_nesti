<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MidtransController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// =========================
// 🔐 Auth & User
// =========================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// =========================
// 📦 Categories & Products
// =========================
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
Route::post('/products/decrease-stock', [ProductController::class, 'decreaseStock']);

// =========================
// 👤 Profile
// =========================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
});

// =========================
// 👥 Admin Users
// =========================
Route::middleware('auth:sanctum')->get('/admin/users', [AdminUserController::class, 'index']);

// =========================
// 🛒 Orders (User)
// =========================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});

// =========================
// 📦 Orders (Admin)
// =========================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::put('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('/admin/orders/{id}', [OrderController::class, 'adminShow']);
});

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
});

// =========================
// 💳 Payments
// =========================
Route::middleware('auth:sanctum')->group(function () {
    // createTransaction dan payExistingOrder tetap pakai auth
    Route::post('/payments/midtrans', [PaymentController::class, 'createTransaction']);
    Route::post('/payments/midtrans/{order_number}', [PaymentController::class, 'payExistingOrder']);
});

// =========================
// ✅ Development Only: Update transaction_id langsung dari Snap
// =========================
Route::post('/orders/update-transaction', [PaymentController::class, 'updateTransactionDev']);

// =========================
// 🔔 Callback Midtrans (tanpa auth) — siap untuk production nanti
// =========================
Route::post('/payments/midtrans/callback', [MidtransController::class, 'callback'])
    ->withoutMiddleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum']);


Route::get('/proxy/provinces', function () {
    $response = Http::get('https://wilayah.id/api/provinces.json');
    return response($response->body(), $response->status())
        ->header('Content-Type', 'application/json');
});

Route::get('/proxy/regencies/{provCode}', function ($provCode) {
    $response = Http::get("https://wilayah.id/api/regencies/$provCode.json");
    return response($response->body(), $response->status())
        ->header('Content-Type', 'application/json');
});
