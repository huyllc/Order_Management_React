<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_code' => $this->order_code,
            'customer_id' => $this->customer_id,
            'customer_code' => $this->customer->customer_code,
            'customer_name' => $this->customer->name,
            'customer_phone' => $this->customer->phone,
            'customer_email' => $this->customer->email,
            'customer_tax' => $this->customer->tax_code,
            'sale_id' => $this->sale_id,
            'sale_name' => $this->user->name,
            'address' => $this->address,
            'note' => $this->note,
            'order_status' => $this->order_status,
            'warehouse_id' => $this->warehouse_id,
            'total_price' => $this->total_price,
            'is_vat' => $this->is_vat,
            'final_price' => $this->final_price,
            'total_paid' => round($this->payment->sum('amount'), 2),
            'order_details' => OrderDetailResource::collection($this->order_detail),
            'list_order' => OrderDetailResource::collection(collect($this->order_detail)->reverse()->values()),
            'payments' => PaymentResource::collection($this->payment)
        ];
    }
}

