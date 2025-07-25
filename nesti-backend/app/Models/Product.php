<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
        'stock',
        'image',
        'slug',
        'featured',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];
}
