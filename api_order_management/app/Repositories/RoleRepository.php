<?php

/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Role;

class RoleRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Role::class;
    }

    /**
     * Save a new Role in repository
     *
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        $role = parent::create($attributes['name']);
        $role->syncPermissions($attributes['permissions']);
        return $role;
    }

    /**
     * Update a Role in repository 
     *
     * @param array $attributes
     * @param int $id - Role Id
     * @return mixed
     */
    public function update(array $attributes, $id)
    {
        $role = parent::update($attributes['name'], $id);
        $role->syncPermissions($attributes['permissions']);
        return $role;
    }

    /**
     * Get data by multiple fields
     *
     * @param array $params
     * @return mixed
     */
    public function search($params)
    {
        $conditions = $this->getSearchConditions($params);
        $conditionsFormated = [];

        if (isset($conditions['name'])) {
            $conditionsFormated[] = ['name', 'like', '%' . $params['name'] . '%'];
        }

        if (isset($conditions['status'])) {
            $conditionsFormated[] = ['status', '=', (int) $conditions['status']];
        }

        $params['conditions'] = $conditionsFormated;
        $result = $this->searchByParams($params);

        return $result;
    }
}
