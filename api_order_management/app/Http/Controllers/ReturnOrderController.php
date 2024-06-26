<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReturnOrderRequest;
use App\Http\Resources\ReturnOrderResource;
use Illuminate\Http\Request;
use App\Http\Services\ReturnOrderService;
use Exception;
use Illuminate\Support\Facades\DB;

class ReturnOrderController extends Controller
{
    protected $returnOrderService;

    public function __construct(ReturnOrderService $returnOrderService)
    {
        $this->returnOrderService = $returnOrderService;
    }

    public function index(Request $request)
    {
        try {
            $limit = $request->limit;
            $returnOrders = $this->returnOrderService->getListPaginate($limit);
            return ReturnOrderResource::collection($returnOrders);

        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        try {
            return $this->returnOrderService->show($id);
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }


    public function store(ReturnOrderRequest $request)
    {
        try {
            $dataReturnOrder = $request->only(['total_price', 'note', 'order_detail_id', 'order_detail']);
            $dataReturnOrderDetail = $request->only(['list_order']);
            $returnOrder = $this->returnOrderService->store($dataReturnOrder, $dataReturnOrderDetail);
            return $returnOrder;
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * Store a return order to OrderDetail.
     */
    public function storeReturnOrder(ReturnOrderRequest $request, string $id)
    {
        try {
            $dataReturnOrder = $request->only(['total_price', 'note', 'order_detail_id']);
            $dataOrderDetail = $request->input('list_order');
            $this->returnOrderService->storeReturnOrder($dataOrderDetail, $id, $dataReturnOrder);
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

    /**
     * Delete return order
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $this->returnOrderService->destroy($id);
            DB::commit();
        } catch(Exception $e) {
            DB::rollBack();
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
}
