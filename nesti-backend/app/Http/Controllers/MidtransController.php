<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Midtrans\Config;
use Midtrans\Notification;
use Illuminate\Support\Facades\Log;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        try {
            // ✅ Konfigurasi Midtrans
            Config::$serverKey = config('services.midtrans.serverKey');
            Config::$isProduction = false; // false = sandbox
            Config::$isSanitized  = true;
            Config::$is3ds        = true;

            // ✅ Terima notifikasi dari Midtrans
            $notif = new Notification();

            $orderId       = $notif->order_id;
            $transaction   = $notif->transaction_status;
            $fraud         = $notif->fraud_status;
            $transactionId = $notif->transaction_id;

            Log::info('Callback Midtrans diterima', [
                'order_id' => $orderId,
                'transaction_status' => $transaction,
                'fraud_status' => $fraud,
                'transaction_id' => $transactionId,
                'payload' => $request->all()
            ]);

            // ✅ Cari order
            $order = Order::where('order_number', $orderId)->first();
            if (!$order) {
                Log::error('Order tidak ditemukan: '.$orderId);
                return response()->json(['message' => 'Order not found'], 404);
            }

            // ✅ Default status
            $newPaymentStatus = $order->payment_status;
            $newOrderStatus   = $order->status;

            // ✅ Mapping status
            if ($transaction === 'capture') {
                if ($fraud === 'challenge') {
                    $newPaymentStatus = 'challenge';
                    $newOrderStatus   = 'pending';
                } else {
                    $newPaymentStatus = 'paid';
                    $newOrderStatus   = 'paid';
                }
            } elseif ($transaction === 'settlement') {
                $newPaymentStatus = 'paid';
                $newOrderStatus   = 'paid';
            } elseif ($transaction === 'pending') {
                $newPaymentStatus = 'pending';
                $newOrderStatus   = 'pending';
            } elseif ($transaction === 'deny') {
                $newPaymentStatus = 'denied';
                $newOrderStatus   = 'cancelled';
            } elseif ($transaction === 'expire') {
                $newPaymentStatus = 'expired';
                $newOrderStatus   = 'cancelled';
            } elseif ($transaction === 'cancel') {
                $newPaymentStatus = 'cancelled';
                $newOrderStatus   = 'cancelled';
            }

            // ✅ Update order
            $order->payment_status = $newPaymentStatus;
            $order->status         = $newOrderStatus;
            $order->transaction_id = $transactionId;
            $order->save();

            Log::info('Order diupdate dari Midtrans', [
                'order_number'   => $order->order_number,
                'payment_status' => $order->payment_status,
                'status'         => $order->status,
                'transaction_id' => $order->transaction_id,
            ]);

            return response()->json(['message' => 'Callback processed']);
        } catch (\Exception $e) {
            Log::error('Callback Midtrans error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
