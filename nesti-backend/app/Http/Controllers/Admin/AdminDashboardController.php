<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Total semua produk
        $totalProducts = Product::count();

        // Produk dengan stok rendah (< 10)
        $lowStockProducts = Product::where('stock', '<', 10)->count();

        // Total semua orders
        $totalOrders = Order::count();

        // Total revenue
        $totalRevenue = Order::sum('total_amount');

        // Recent orders (3 terbaru)
        $recentOrders = Order::with('user:id,full_name')
            ->latest()
            ->take(3)
            ->get(['id', 'user_id', 'total_amount', 'status', 'created_at']);

        // Low stock list (3 produk stok rendah)
        $lowStockList = Product::where('stock', '<', 10)
            ->take(3)
            ->get(['id', 'name', 'stock']);

        return response()->json([
            'totalProducts' => $totalProducts,
            'lowStockProducts' => $lowStockProducts,
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'recentOrders' => $recentOrders,
            'lowStockList' => $lowStockList,
        ]);
    }
}
