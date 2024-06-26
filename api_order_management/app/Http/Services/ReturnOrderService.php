<?php

namespace App\Http\Services;

use App\Http\Resources\ReturnOrderResource;
use App\Models\OrderDetail;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\ReturnOrderRepository;
use Illuminate\Support\Facades\DB;

class ReturnOrderService
{
    protected $returnOrderRepo;
    protected $orderDetailRepo;
    protected $orderRepo;

    public function __construct(
        OrderRepository $orderRepo,
        ReturnOrderRepository $returnOrderRepo,
        OrderDetailRepository $orderDetailRepo,
    )
    {
        $this->returnOrderRepo = $returnOrderRepo;
        $this->orderDetailRepo = $orderDetailRepo;
        $this->orderRepo = $orderRepo;
    }

    /**
     * Get List Return Order
     * @param int
     * @return mixed
     */
    public function index()
    {
        $returnOrderRepo = $this->returnOrderRepo->get();
        return ReturnOrderResource::collection($returnOrderRepo);
    }

    /**
     * Get Detail Return Order
     * @param int
     * @return mixed
     */
    public function show($id)
    {
        $returnOrder = $this->returnOrderRepo->findOrFail($id);
        $orderDetailIds = $returnOrder->additional_data;
        $orderDetails = $this->orderDetailRepo->whereIn('id', $orderDetailIds)->get();

        $returnOrder->list_order = $orderDetails;

        return new ReturnOrderResource($returnOrder);
    }

    /**
     * Submit Return Order
     * @param int
     * @return mixed
     */
    public function store($dataReturnOrder, $dataReturnOrderDetail)
    {
        $returnOrder = $this->returnOrderRepo->create($dataReturnOrder, $dataReturnOrderDetail);
        if ($dataReturnOrderDetail) {
            foreach ($dataReturnOrderDetail["list_order"] as $data) {
                $this->orderDetailRepo->create($data);
            }
        }
        return $returnOrder;
    }

    /**
     * Get List ReturnOrder Paginate
     * @param int $limit
     * @return mixed
     */
    public function getListPaginate($limit)
    {
        return $this->returnOrderRepo->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param $dataOrderDetail
     * @param string $id
     * @param $dataReturnOrder
     * @return mixed
     */
    public function storeReturnOrder($dataOrderDetail, string $id, $dataReturnOrder)
    {
        $order = $this->orderRepo->findOrFail($id);
        if ($order && $order->order_status === 'done') {
            $returnOrder = $this->returnOrderRepo->create($dataReturnOrder);

            $orderDetailIds = [];

            if ($dataOrderDetail) {
                foreach ($dataOrderDetail as $data) {
                    $dataOrderDetail = array_merge(['order_id' => $order->id], $data);

                    if ($dataOrderDetail["quantity_can_return"] > 0) {
                        $dataOrderDetail["quantity_can_return"] -= $dataOrderDetail["quantity_return"];
                    }

                    if ($dataOrderDetail["quantity_return"] !== 0) {
                        $orderDetail = $this->orderDetailRepo->create($dataOrderDetail);
                        $orderDetailIds[] = $orderDetail->id;
                    }
                }
            }

            $returnOrder->additional_data = $orderDetailIds;
            $returnOrder->save();
        }
    }


   /**
     * Delete return order
     */
    public function destroy(string $id)
    {
        $returnOrder = $this->returnOrderRepo->findOrFail($id);

        $orderDetailIds = $returnOrder->additional_data;
        $orderDetails = $this->orderDetailRepo->whereIn('id', $orderDetailIds)->get();

        $returnOrder->list_order = $orderDetails;
        if($orderDetails) {
            foreach($orderDetails as $order) {
                if ($order->status === "return")
                $this->orderDetailRepo->destroy($order->id);
            }
            $this->returnOrderRepo->destroy($id);
        }
    }
}
