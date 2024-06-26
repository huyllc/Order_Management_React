<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\BaseRepository;

class OrderRepository extends BaseRepository
{
    public function model()
    {
        return Order::class;
    }
}
