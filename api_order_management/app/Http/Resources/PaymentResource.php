<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "customer_name" => $this->customer->name,
            "amount" => $this->amount,
            "excess_money" => $this->excess_money,
            "payment_method" => $this->payment_method,
            "date_payment" => (new DateTime($this->created_at))->format('d/m/Y H:i:s')
        ];
    }
}
