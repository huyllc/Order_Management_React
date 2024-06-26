<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\ReturnOrder;

class ReturnOrderRepository extends BaseRepository
{
    /**
     * Set Model for Class
     *
     * @return string
     */
    public function model()
    {
        return ReturnOrder::class;
    }

}
