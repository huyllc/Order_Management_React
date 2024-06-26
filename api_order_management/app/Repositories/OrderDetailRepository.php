<?php

namespace App\Repositories;

use App\Models\OrderDetail;
use App\Repositories\BaseRepository;

class OrderDetailRepository extends BaseRepository
{
    
    public function model()
    {
        return OrderDetail::class;
    }
}
