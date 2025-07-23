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
    public function shipping_address()
    {
        return $this->belongsTo(ShippingAddress::class, 'shipping_address_id');
    }

    // Relasi ke item-item order (pakai satu nama saja)
    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function statusHistories()
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

}
