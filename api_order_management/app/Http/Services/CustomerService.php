<?php

namespace App\Http\Services;

use App\Http\Resources\CustomerResource;
use App\Repositories\CustomerRepository;

class CustomerService
{
    protected $customerRepo;

    public function __construct(CustomerRepository $customerRepo)
    {
        $this->customerRepo = $customerRepo;
    }

    /**
     * Get Customer List
     * @param int
     * @return mixed
     */
    public function index()
    {
        $customer = $this->customerRepo->get();
        return CustomerResource::collection($customer);
    }

    /**
     * Get Customer Detail
     * @param int
     * @return mixed
     */
    public function show($id)
    {
        $customer = $this->customerRepo->findOrFail($id);
        return new CustomerResource($customer);
    }

    /**
     * Create Customer
     * @param param
     * @return mixed
     */
    public function store($params)
    {
        $customer = $this->customerRepo->create($params);
        return new CustomerResource($customer);
    }

    /**
     * Update Customer
     * @param param
     * @return mixed
     */
    public function update($params ,$id)
    {
        $customer = $this->customerRepo->findOrFail($id);
        if($customer) {
            if($customer->type === "self"){
                $params["tax_code"] = "";
                $params['customer_code'] = "KH_" . $customer->id;
            }

            $customer->update($params);
            return new CustomerResource($customer);
        }
    }

    /**
     * Get List Customer Paginate
     * @param int $limit
     * @return mixed
     */
    public function getListPaginate($limit)
    {
        return $this->customerRepo->paginate($limit);
    }

     /**
     * Get search customer
     * @param int $limit
     * @return mixed
     */
    public function search($params = [])
    {
        $paramsSearch = [
            'conditions' => [],
        ];
        if (!empty($params['customer_code'])) {
            $paramsSearch['conditions'][] = ['customer_code', 'LIKE', '%'.$params['customer_code'].'%'];
        }

        if (!empty($params['name'])) {
            $paramsSearch['conditions'][] = ['name', 'LIKE', '%'.$params['name'].'%'];
        }

        if (!empty($params['phone'])) {
            $paramsSearch['conditions'][] = ['phone', 'LIKE', '%'.$params['phone'].'%'];
        }

        $customers = $this->customerRepo->searchByParams($paramsSearch);
        return $customers;
    }
}
