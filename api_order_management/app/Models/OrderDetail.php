<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_price',
        'quantity',
        'quantity_can_return',
        'quantity_return',
        'status',
        'total_price',
        'final_price',
        'discount',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($orderDetail) {
            if (!isset($orderDetail->quantity_can_return)) {
                $orderDetail->quantity_can_return = $orderDetail->quantity;
            }
        });
    }

    /**
     * Get Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
