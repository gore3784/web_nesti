<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string|null $order_number
 * @property string|null $payment_status
 * @property string|null $status
 * @property string|null $transaction_id
 */

class Order extends Model
{
    // Kolom yang boleh diisi mass-assignment
    protected $fillable = [
        'user_id',
        'shipping_address_id',
        'total_amount',
        'payment_method',
        'status',
        'payment_status',
        'order_number',
        'transaction_id',
    ];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke alamat pengiriman
    public function shippingAddress()
    {
        return $this->belongsTo(ShippingAddress::class, 'shipping_address_id');
    }

    // Relasi ke item-item order
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
