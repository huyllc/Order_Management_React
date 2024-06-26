<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_code',
        'customer_id',
        'sale_id',
        'total_price',
        'final_price',
        'order_status',
        'address',
        'export_bill',
        'is_vat',
        'date_delivery',
        'note',
        'warehouse_id',
    ];

    /**
     * Get Customer
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get Admin
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'sale_id');
    }

    /**
     * Get Warehouse
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get Payment
     */
    public function payment()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get Payment
     */
    public function order_detail()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }

    /**
     * Get ReturnOrder
     */
    public function return_order()
    {
        return $this->hasMany(ReturnOrder::class, 'order_detail_id');
    }
}
