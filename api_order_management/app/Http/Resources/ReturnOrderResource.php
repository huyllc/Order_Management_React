<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $listOrder = $this->when(isset($this->list_order) || $this->relationLoaded('list_order'), function () {
            return OrderDetailResource::collection($this->list_order);
        });

        return [
            'id' => $this->id,
            'order_detail_id' => $this->order_detail_id,
            'order_code' => $this->order->order_code,
            'customer_code' => $this->order->customer->customer_code,
            'customer_name' => $this->order->customer->name,
            'address' => $this->order->address,
            'total_price' => $this->total_price,
            'note' => $this->note,
            'list_order' => $listOrder,
        ];
    }
}

