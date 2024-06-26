<?php

namespace App\Http\Services;

use App\Repositories\ProductRepository;

class ProductService
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    /**
     * Get Customer List
     * @param int
     * @return mixed
     */
    public function search($params = [])
    {
        $paramsSearch = [
            'conditions' => [],
        ];
        if (isset($params['id'])) {
            array_push($paramsSearch['conditions'], ['id', 'LIKE', '%'.$params['id'].'%']);
        }
        if (isset($params['name'])) {
            array_push($paramsSearch['conditions'], ['name', 'LIKE',  '%'.$params['name'].'%']);
        }
        
        $products = $this->productRepo->searchByParams($paramsSearch);
        return $products;
    }
}
