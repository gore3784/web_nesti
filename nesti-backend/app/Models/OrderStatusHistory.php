<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatusHistory extends Model
{
    protected $table = 'order_status_histories';

    // gunakan timestamps = false karena hanya pakai changed_at
    public $timestamps = false;

    // kolom yang bisa diisi massal
    protected $fillable = [
        'order_id',
        'status',
        'changed_at',
    ];

    // cast kolom changed_at ke tipe datetime
    protected $casts = [
        'changed_at' => 'datetime',
    ];

    /**
     * Relasi ke tabel orders
        */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
