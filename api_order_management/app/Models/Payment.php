<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'customer_id',
        'amount',
        'payment_method',
        'excess_money'
    ];

    /**
     * Get Customer
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
