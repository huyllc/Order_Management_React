<?php

/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Permission::class;
    }
}
