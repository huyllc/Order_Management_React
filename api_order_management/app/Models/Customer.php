<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_code',
        'name',
        'type',
        'email',
        'address',
        'tax_code',
        'phone',
    ];
    
    /**
     * Get Payment
     */
    public function payment()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get Order
     */
    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
