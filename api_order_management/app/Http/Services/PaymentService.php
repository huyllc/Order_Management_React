<?php

namespace App\Http\Services;

use App\Models\Payment;
use App\Repositories\PaymentRepository;

class PaymentService
{
    protected $paymentRepo;

    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepo = $paymentRepository;
    }

    /**
     * Create Method Instance
     * @param array $data
     * @return Payment
     */
    public function create($data)
    {
        $payment = $this->paymentRepo->create($data);

        return $payment;
    }
}
