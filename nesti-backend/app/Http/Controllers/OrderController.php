<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Simpan order baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address.full_name' => 'required|string|max:100',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.address' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.province' => 'required|string|max:100',
            'shipping_address.postal_code' => 'required|string|max:10',
            'payment_method' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
        ]);

        return DB::transaction(function () use ($validated) {
            $userId = Auth::id();

            // simpan shipping address
            $shipping = ShippingAddress::create([
                'user_id' => $userId,
                'full_name' => $validated['shipping_address']['full_name'],
                'phone' => $validated['shipping_address']['phone'],
                'address' => $validated['shipping_address']['address'],
                'city' => $validated['shipping_address']['city'],
                'province' => $validated['shipping_address']['province'],
                'postal_code' => $validated['shipping_address']['postal_code'],
            ]);

            // simpan order
            $order = Order::create([
                'user_id' => $userId,
                'shipping_address_id' => $shipping->id,
                'total_amount' => $validated['total_amount'],
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
            ]);

            // simpan order items
            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            return response()->json([
                'message' => 'Order created successfully',
                'order_id' => $order->id,
                'status' => $order->status,
            ], 201);
        });
    }

    // Lihat semua order user
    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user(); // atau Auth::user()

        // Ambil semua order milik user ini, sekaligus load relasi items.product & shippingAddress
        $orders = Order::with(['items.product', 'shippingAddress'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($orders);
    }

    // Lihat detail order tertentu
    public function show($id)
    {
        $user = Auth::user();
        $order = Order::with('items.product', 'shippingAddress')
            ->where('user_id', $user->id)
            ->findOrFail($id);

        return response()->json($order);
    }

    // 🔹 Ambil semua order untuk admin
    public function adminIndex()
    {
        // Pastikan hanya admin yang boleh (bisa cek via middleware atau role)
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        } // atau cek Auth::user()->role == 'admin'

        $orders = Order::with('items.product', 'shippingAddress')
            ->latest()
            ->get();

        return response()->json($orders);
    }

    // 🔹 Update status order
    public function updateStatus(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        } // atau cek role admin

        $validated = $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validated['status'];
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully',
            'order_id' => $order->id,
            'status' => $order->status,
        ]);
    }

}
