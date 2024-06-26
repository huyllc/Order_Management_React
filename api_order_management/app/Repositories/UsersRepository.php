<?php

/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class UsersRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [];
    /**
     *
     */
    public function boot()
    {
    }


    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }

    /**
     * Get data by multiple fields
     *
     * @param array $where
     * @param array $columns
     *
     * @return mixed
     */
    public function search($params)
    {
        $conditions = $this->getSearchConditions($params);
        $conditionsFormated = [];

        if (isset($conditions['id'])) {
            $conditionsFormated[] = ['id', '=', (int) $conditions['id']];
        }

        if (isset($conditions['user_name'])) {
            $conditionsFormated[] = ['username', 'like', '%' . $conditions['user_name'] . '%'];
        }

        if (isset($conditions['full_name'])) {
            $conditionsFormated[] = ['full_name', 'like', '%' . $conditions['full_name'] . '%'];
        }

        if (isset($conditions['ams_user_id'])) {
            $conditionsFormated[] = ['ams_user_id', 'like', '%' . $conditions['ams_user_id'] . '%'];
        }

        if (isset($conditions['createdDate'])) {
            $conditionsFormated[] = ['created_at', 'like', '%' . $conditions['createdDate'] . '%'];
        }


        $params['conditions'] = $conditionsFormated;

        $params['sortBy'] = 'id';

        $params['sortType'] = 'desc';

        if (!empty($params['sortBy']) && !empty($params['sortType'])) {
            $this->orderBy($params['sortBy'], $params['sortType']);
        }

        $result = $this->searchByParams($params);

        return $result;
    }

    /**
     * Get Total User
     * @param array $params
     * @return mixed
     */
    public function getTotalUser()
    {
        return count($this->model->get());
    }

    /**
     * Get User by user id
     */
    public function getUserByUserId($userId)
    {
        return $this->model->where('id', '=', $userId)->first();
    }

}
