<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderStatusHistoryController extends Controller
{
    /**
     * 🔹 Lihat histori status untuk 1 order (user yang login)
     */
    public function userHistories($orderId)
    {
        $order = Order::with([
            'statusHistories' => function ($q) {
                $q->orderBy('changed_at', 'asc');
            }
        ])->find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // hanya boleh dilihat user pemilik atau admin
        if ($order->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'histories' => $order->statusHistories->map(function ($history) {
                return [
                    'status' => $history->status,
                    'changed_at' => $history->changed_at->toDateTimeString(),
                ];
            }),
        ]);
    }

    /**
     * 🔹 Lihat histori status untuk 1 order (admin)
     */
    public function adminHistories($orderId)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::with([
            'statusHistories' => function ($q) {
                $q->orderBy('changed_at', 'asc');
            }
        ])->find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'histories' => $order->statusHistories->map(function ($history) {
                return [
                    'status' => $history->status,
                    'changed_at' => $history->changed_at->toDateTimeString(),
                ];
            }),
        ]);
    }
}
