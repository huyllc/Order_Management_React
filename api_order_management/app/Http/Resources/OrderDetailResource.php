<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'product_id' => $this->product_id,
            'product_sku' => $this->product->sku,
            'product_name' => $this->product->name,
            'product_price' => $this->product_price,
            'quantity' => $this->quantity,
            'quantity_can_return' => $this->quantity_can_return,
            'quantity_return' => $this->quantity_return,
            'status' => $this->status,
            'total_price' => $this->total_price,
            'final_price' => $this->final_price,
            'discount' => $this->discount,
        ];
    }
}
