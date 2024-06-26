<?php

/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Exception;

class AdminRepository extends BaseRepository
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
        return Admin::class;
    }


    /**
     * Get data by multiple fields
     *
     * @param array $params
     * @return mixed
     */
    public function search($params, $page, $perPage, $columns = ['*'], $pageName = 'page')
    {
        $conditions = $this->getSearchConditions($params);
        $admin = $this->model
            ->select(
                'admins.*',
            )
            ->leftjoin('model_has_roles', 'model_has_roles.model_id', '=', 'admins.id')
            ->distinct('admins.id');
        if (isset($conditions['name'])) {
            $admin = $admin->where('admins.name', 'like', '%' . $conditions['name'] . '%');
        }
        if (isset($conditions['email'])) {
            $admin = $admin->where('admins.email', 'like', '%' . $conditions['email'] . '%');
        }

        if (isset($conditions['status'])) {
            $admin = $admin->where('admins.status', '=', (int) $conditions['status']);
        }
        
        if (isset($conditions['role'])) {
            $admin = $admin->where('model_has_roles.role_id', '=', (int) $conditions['role']);
        }

        $result = $admin->orderBy('id', 'desc')->paginate($perPage, $columns, $pageName, $page);
        return $result;

    }

    /**
     * Save a new user in repository
     *
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        $checkEmail =  $this->model->where('email',$attributes['email'])->get()->count();
        if($checkEmail > 0)
        {
            throw new Exception("Email already exist..!");
        }
        $attributes['password'] = Hash::make($attributes['password']);

        return parent::create($attributes);
    }

     /**
     * Change Password in repository
     *
     * @param array $attributes
     * @return mixed
     */
    public function changePassword(array $attributes, $id)
    {
        if($attributes != null)
        {
            if (isset($attributes['password'])) {
                $attributes['password'] = Hash::make($attributes['password']);
            }
            return parent::update($attributes, $id);
        }
    }
    /**
     * Update Password 
     *
     * @param array $attributes
     * @param int $id - User Id
     * @return mixed
     */
    public function update(array $attributes, $id)
    {
        $checkEmail =  $this->model
        ->where('id', '!=',$id)
        ->where('email',$attributes['email'])
        ->get()->count();
        if($checkEmail > 0)
        {
            throw new Exception("Email already exist..!");
        }
    
        $admin = Auth::user();
        if($admin->id != $id){
            foreach($admin->roles as $item)
            {
               if($item->name == config('constant.role') )
               {
                    if (isset($attributes['password'])) {
                        $attributes['password'] = Hash::make($attributes['password']);
                    }
               }else
               {
                    throw new Exception("Access denied");
               }
            }
        }
        return parent::update($attributes, $id);
    }
}