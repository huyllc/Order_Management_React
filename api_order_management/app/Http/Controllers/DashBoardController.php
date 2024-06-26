<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Payment;
use App\Models\ReturnOrder;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function countTotal()
    {
        $orderCount = Order::count();
        $returnOrderCount = ReturnOrder::count();
        $customerCount = Customer::count();
        $paymentCount = Payment::sum('amount');

        return [
            'orderTotal' => $orderCount,
            'returnOrderTotal' => $returnOrderCount,
            'customerTotal' => $customerCount,
            'paymentTotal' => $paymentCount,
        ];
    }
}
