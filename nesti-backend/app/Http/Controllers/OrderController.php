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
    /**
     * 🔹 Simpan order baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address.full_name' => 'required|string|max:100',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.address' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.province' => 'required|string|max:100',
            'shipping_address.postal_code' => 'required|string|max:10',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
        ]);

        return DB::transaction(function () use ($validated) {
            $userId = Auth::id();

            // ✅ simpan shipping address
            $shipping = ShippingAddress::create([
                'user_id' => $userId,
                'full_name' => $validated['shipping_address']['full_name'],
                'phone' => $validated['shipping_address']['phone'],
                'address' => $validated['shipping_address']['address'],
                'city' => $validated['shipping_address']['city'],
                'province' => $validated['shipping_address']['province'],
                'postal_code' => $validated['shipping_address']['postal_code'],
            ]);

            // ✅ buat order_number unik
            $orderNumber = 'ORDER-' . time() . '-' . rand(1000, 9999);

            // ✅ simpan order
            $order = Order::create([
                'user_id' => $userId,
                'shipping_address_id' => $shipping->id,
                'total_amount' => $validated['total_amount'],
                'status' => 'pending',
                'payment_status' => 'pending',
                'order_number' => $orderNumber,
            ]);

            // ✅ simpan order items
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
                'order_number' => $order->order_number,
                'status' => $order->status,
            ], 201);
        });
    }

    /**
     * 🔹 Lihat semua order milik user
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $orders = Order::with([
            'order_items.product',
            'shipping_address',
            'statusHistories' => function ($q) {
                $q->orderBy('changed_at', 'asc');
            }
        ])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * 🔹 Lihat detail order tertentu
     */
    public function show($id)
    {
        $order = Order::with(['order_items.product', 'shipping_address'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    /**
     * 🔹 Lihat semua order (admin)
     */
    public function adminIndex()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orders = Order::with([
            'order_items.product',
            'shipping_address',
            'statusHistories' => function ($q) {
                $q->orderBy('changed_at', 'asc');
            }
        ])
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * 🔹 Update status order (admin)
     */
    public function updateStatus(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validated['status'];
        $order->save();

        // Simpan histori status
        $order->statusHistories()->create([
            'status' => $validated['status'],
            'changed_at' => now(),
        ]);

        // Muat ulang order beserta histori
        $order->load([
            'statusHistories' => function ($q) {
                $q->orderBy('changed_at', 'asc');
            }
        ]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order_id' => $order->id,
            'status' => $order->status,
            'statusHistories' => $order->statusHistories
        ]);
    }

    public function adminShow($id)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::with(['order_items.product', 'shipping_address', 'statusHistories'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
}
