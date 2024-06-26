<?php
/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Setting;

class SettingRepository extends BaseRepository
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
        //
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Setting::class;
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
            $conditionsFormated[] = ['name', 'like', '%'.$params['name'].'%'];
        }

        if (isset($conditions['type'])) {
            $conditionsFormated[] = ['type' , '=', (int) $conditions['type']];
        }

        if (isset($conditions['value'])) {
            $conditionsFormated[] =['value', 'like', '%'.$params['value'].'%'];
        }

        if (isset($conditions['module'])) {
            $conditionsFormated[] =['module', 'like', '%'.$params['module'].'%'];
        }

        $params['conditions'] = $conditionsFormated;
        $result = $this->searchByParams($params);

        return $result;
    }

    /**
     * Get Setting 
     * @param int $version
    */
    public function getSetting()
    {
        $model = $this->model->orderBy('positon','desc')->get();
        return $model;
    }
}
