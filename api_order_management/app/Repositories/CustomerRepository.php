<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Customer;

class CustomerRepository extends BaseRepository
{
    /**
     * Set Model for Class
     *
     * @return string
     */
    public function model()
    {
        return Customer::class;
    }

}
