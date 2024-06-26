<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Http\Services\OrderService;
use App\Http\Services\PaymentService;
use Exception;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentService;
    protected $orderService;

    public function __construct(PaymentService $paymentService, OrderService $orderService)
    {
        $this->paymentService = $paymentService;
        $this->orderService = $orderService;
    }

    /**
     * Add New Payment
     * @param PaymentRequest $request
     * @return mixed
     */
    public function store(PaymentRequest $request)
    {
        try {
            $data = $request->only(['order_id', 'customer_id', 'amount', 'payment_method']);
            $order = $this->orderService->getOrderById($data["order_id"]);
            $totalPaid = $order->payment->sum('amount');
            $payment = $this->paymentService->create($data);

            if ($payment) {
                if ($payment->amount + 1 >= $order->final_price - $totalPaid) {
                    $order->fill(["order_status" => "done"]);
                } else {
                    $order->fill(["order_status" => "stake"]);
                }
                $order->save();

                return response()->json([
                    'error' => false,
                    'message' => 'Payment successfull'
                ], 200);
            }
        } catch (Exception $err) {
            return response()->json([
                'error' => true,
                'message' => $err->getMessage()
            ], 500);
        }
    }
}
