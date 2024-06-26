<?php

namespace App\Http\Services;

use App\Repositories\OrderRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\ProductRepository;

class OrderService extends BaseService
{
    /**
     * @var Repository| \App\Repositories
     */
    protected $orderRepo;

    /**
     * @var Repository| \App\Repositories
     */
    protected $orderDetailRepo;


    /**
     * @var Service| \App\Serive
     */
    protected $productRepo;

    public function __construct(
        OrderRepository $orderRepo,
        OrderDetailRepository $orderDetailRepo,
        ProductRepository $productRepo
    ) {
        $this->orderRepo = $orderRepo;
        $this->orderDetailRepo = $orderDetailRepo;
        $this->productRepo = $productRepo;
    }

    /**
     * Store a newly created resource in storage.
     * @param $data
     * @return mixed
     */
    public function store($dataOrder, $dataOrderDetail)
    {
        $dataOrder['order_code'] = uniqid();
        $order = $this->orderRepo->create($dataOrder);
        if ($dataOrderDetail) {
            foreach ($dataOrderDetail['listProducts'] as $key => $data) {
                $dataOrder = array_merge(['order_id' => $order->id], $data);
                $product = $this->productRepo->findOrFail($dataOrder['product_id']);
                $product->quantity -= $dataOrder['quantity'];
                $product->save();
                $this->orderDetailRepo->create($dataOrder);
            }
        }
        return $order;
    }

    /**
     * Update the specified resource in storage.
     * @param $data, string id
     * @return mixed
     */
    public function update($dataOrder, $dataOrderDetail, string $orderId){
        $order = $this->orderRepo->findOrFail($orderId);
        $oldOrderDetails = $order->order_detail;

        $oldOrderDetailsMap = [];
        foreach ($oldOrderDetails as $detail) {
            $oldOrderDetailsMap[$detail->id] = $detail;
        }
        $order->update($dataOrder);
        // Iterate through the new order details data
        foreach ($dataOrderDetail["listOrderDetails"] as $data) {
            $productId = $data["product_id"];
            $quantity = $data["quantity"];
            $detailId = $data["id"];
            $data['order_id'] = $orderId;
            if ($detailId && isset($oldOrderDetailsMap[$detailId])) {
                $oldDetail = $oldOrderDetailsMap[$detailId];

                $this->productRepo->restoreProduct($oldDetail->product_id, $oldDetail->quantity);

                $oldDetail->update($data);
                $product = $this->productRepo->findOrFail($productId);
                if ($product->quantity >= $quantity) {
                    $product->quantity -= $quantity;
                }
                $product->save();
            } else {
                $this->orderDetailRepo->create($data);

                $product = $this->productRepo->findOrFail($productId);
                if ($product->quantity >= $quantity) {
                    $product->quantity -= $quantity;
                }
                $product->save();
            }
        }
    }
    /**
     * Get List Order Paginate
     * @param array $searchCons
     * @param int $limit
     * @return mixed
     */
    public function getListOrder($searchCons, $limit = 10)
    {
        $query = $this->orderRepo->newQuery();

        if (!empty($searchCons['order_id'])) {
            $query->whereIn('id', $searchCons['order_id']);
        }

        if (!empty($searchCons['customer_id'])) {
            $query->whereIn('customer_id', $searchCons['customer_id']);
        }

        if (!empty($searchCons['sale_id'])) {
            $query->whereIn('sale_id', $searchCons['sale_id']);
        }

        if (!empty($searchCons['order_status'])) {
            $query->whereIn('order_status', $searchCons['order_status']);
        }

        if (!empty($searchCons['date_from'])) {
            $query->whereDate('created_at', '>=', $searchCons['date_from']);
        }

        if (!empty($searchCons['date_end'])) {
            $query->whereDate('created_at', '<=', $searchCons['date_end']);
        }

        return $query->orderBy('id', 'desc')->paginate($limit);
    }

    /**
     * Get Order By Id
     * @param int $id
     * @return mixed
     */
    public function getOrderById($id)
    {
        return $this->orderRepo->findOrFail($id);
    }

    /**
     * Find Order By Order Code
     * @param string $order_code
     * @return mixed
     */
    public function findByOrderCode($order_code)
    {
        return $this->orderRepo->where('order_code', 'like', '%' . $order_code . '%')->get();
    }

    /**
     * Format Search String to Array
     * @param string $searchString
     * @return array
     */
    public function formatSearchParams($searchString)
    {
        if (!empty($searchString)) {
            $stringArray = explode(",", $searchString);

            return array_map('intval', $stringArray);
        }

        return [];
    }
}
