<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderShowResource;
use App\Http\Resources\SelectSearchOrderCode;
use App\Http\Services\OrderService;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
     /**
     * @var Services| \App\Http\Services
     */
    protected $orderService;


    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        DB::beginTransaction();
        try{
            $dataOrder = $request->only("customer_id",
                                   "sale_id",
                                   "total_price",
                                   "final_price",
                                   "order_status",
                                   "address",
                                   "date_delivery",
                                   "note",
                                   "warehouse_id"
            );
            $dataOrderDetail = $request->only('listProducts');
            $order = $this->orderService->store($dataOrder, $dataOrderDetail);
            DB::commit();
            return response()->json([
                'error' => false,
                'message' => "success",
                'order_id' => $order->id
            ]);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, string $id)
    {
        try{
            $dataOrder = $request->only(
                "sale_id",
                "total_price",
                "final_price",
                "order_status",
                "address",
                "date_delivery",
                "note",
                "warehouse_id"
            );
            $dataOrderDetail = $request->only('listOrderDetails');
            $this->orderService->update($dataOrder, $dataOrderDetail, $id);
        } catch(Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
        return response()->json([
            'error' => false,
            'message' => "success"
        ]);
    }

    /*
     * Get List Order
     * @param Request $request
     */
    public function get(Request $request)
    {
        $searchCons = [
            "order_id" => isset($request->order) ? $this->orderService->formatSearchParams($request->order) : "",
            "customer_id" => isset($request->customer) ? $this->orderService->formatSearchParams($request->customer) : "",
            "sale_id" => isset($request->sale) ? $this->orderService->formatSearchParams($request->sale) : "",
            "order_status" => isset($request->order_status) ? explode(",", $request->order_status) : "",
            "date_from" => isset($request->date_from) ? $request->date_from : "",
            "date_end" => isset($request->date_end ) ? $request->date_end : ""
        ];

        try {
            $limit = isset($request->limit) ? $request->limit : 10;
            $orders = $this->orderService->getListOrder($searchCons, $limit);

            return OrderResource::collection($orders);
        } catch (Exception $err) {
            return response()->json([
                'error' => true,
                'message' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Get Order by ID
     * @param Request $request
     */
    public function show(Request $request)
    {
        try {
            $orders = $this->orderService->getOrderById($request->id);

            return new OrderShowResource($orders);
        } catch (Exception $err) {
            return response()->json([
                'error' => true,
                'message' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Find List Order by Order Code
    * @param Request $request
     * @return mixed
     */
    public function findByOrderCode(Request $request)
    {
        try {
            $orders = $this->orderService->findByOrderCode($request->order_code);

            return SelectSearchOrderCode::collection($orders);
        } catch (Exception $err) {
            return response()->json([
                'error' => true,
                'message' => $err->getMessage()
            ], 500);
        }
    }
}
