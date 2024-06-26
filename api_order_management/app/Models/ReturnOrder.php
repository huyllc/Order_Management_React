<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_detail_id',
        'quantity',
        'total_price',
        'note',
    ];

    protected $casts = [
        'additional_data' => 'array',
    ];

    /**
     * Get Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_detail_id');
    }
}
