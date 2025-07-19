<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct()
    {
        // ✅ Konfigurasi Midtrans
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = false; // false = sandbox
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    /**
     * ✅ Dipanggil dari Checkout.tsx
     * Membuat order baru & Snap Token
     */
    public function createTransaction(Request $request)
    {
        // ✅ Validasi data dari frontend
        $validated = $request->validate([
            'shipping_address.full_name' => 'required|string|max:100',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.address' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.province' => 'required|string|max:100',
            'shipping_address.postal_code' => 'required|string|max:20',
            'total_amount' => 'required|numeric|min:1',
            'email' => 'required|email',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.name' => 'required|string',
        ]);

        $addr = $validated['shipping_address'];

        // ✅ Buat order_number unik
        $orderNumber = 'ORDER-' . time() . '-' . rand(1000, 9999);

        // ✅ Simpan shipping address
        $shipping = ShippingAddress::create([
            'user_id' => Auth::id(),
            'full_name' => $addr['full_name'],
            'phone' => $addr['phone'],
            'address' => $addr['address'],
            'city' => $addr['city'],
            'province' => $addr['province'],
            'postal_code' => $addr['postal_code'],
        ]);

        // ✅ Simpan order baru
        $order = Order::create([
            'user_id' => Auth::id(),
            'shipping_address_id' => $shipping->id,
            'total_amount' => $validated['total_amount'],
            'status' => 'pending',
            'payment_status' => 'pending',
            'order_number' => $orderNumber,
        ]);

        // ✅ Simpan item–itemnya, skip kalau id = SHIPPING
        foreach ($validated['items'] as $item) {
            if ($item['id'] === 'SHIPPING') {
                // Jangan simpan item shipping ke tabel order_items
                continue;
            }

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ]);
        }

        // ✅ Snap Token
        $params = [
            'transaction_details' => [
                'order_id' => $orderNumber,
                'gross_amount' => $validated['total_amount'],
            ],
            'customer_details' => [
                'first_name' => $addr['full_name'],
                'email' => $validated['email'],
                'phone' => $addr['phone'],
                'shipping_address' => [
                    'first_name' => $addr['full_name'],
                    'phone' => $addr['phone'],
                    'address' => $addr['address'],
                    'city' => $addr['city'],
                    'postal_code' => $addr['postal_code'],
                ],
            ],
            'item_details' => $validated['items'],
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'snapToken' => $snapToken,
            'order_id' => $orderNumber,
        ]);
    }

    public function payExistingOrder($orderNumber)
    {
        $order = Order::with(['items.product', 'shippingAddress'])
            ->where('order_number', $orderNumber)
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $items = $order->items->map(function ($item) {
            return [
                'id' => $item->product_id,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'name' => $item->product ? $item->product->name : 'Item',
            ];
        });

        $addr = $order->shippingAddress;

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => $order->total_amount,
            ],
            'customer_details' => [
                'first_name' => $addr->full_name,
                'email' => Auth::user()?->email ?? 'user@example.com',
                'phone' => $addr->phone,
                'shipping_address' => [
                    'first_name' => $addr->full_name,
                    'phone' => $addr->phone,
                    'address' => $addr->address,
                    'city' => $addr->city,
                    'postal_code' => $addr->postal_code,
                ],
            ],
            'item_details' => $items,
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'snapToken' => $snapToken,
            'order_id' => $order->order_number,
        ]);
    }

    public function updateTransactionDev(Request $request)
    {
        $validated = $request->validate([
            'order_number'   => 'required|string',
            'transaction_id' => 'required|string',
        ]);

        $order = Order::where('order_number', $validated['order_number'])->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->transaction_id = $validated['transaction_id'];
        $order->payment_status = 'paid';
        $order->status = 'paid';
        $order->save();

        return response()->json([
            'message'        => 'Transaction updated (dev mode)',
            'order_number'   => $order->order_number,
            'transaction_id' => $order->transaction_id,
            'payment_status' => $order->payment_status,
            'status'         => $order->status,
        ]);
    }
}
