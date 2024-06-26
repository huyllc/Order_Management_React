<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    /**
     * Get Order
     */
    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
