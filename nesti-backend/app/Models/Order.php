<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'shipping_address_id',
        'total_amount',
        'payment_method',
        'status'
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
