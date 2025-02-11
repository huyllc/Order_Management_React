<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'discount',
        'quantity',
        'price',
    ];
    
    /**
     * Get OrderDetail
     */
    public function order_detail()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
