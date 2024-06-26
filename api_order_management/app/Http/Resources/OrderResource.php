<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'order_code' => $this->order_code,
            'created_at' => (new DateTime($this->created_at))->format('d/m/Y'),
            'customer_name' => $this->customer->name,
            'customer_id' => $this->customer_id,
            'customer_phone' => $this->customer->phone,
            'final_price' => $this->final_price,
            'sale_id' => $this->sale_id,
            'sale_name' => $this->user->name,
            'address' => $this->address,
            'status' => $this->order_status,
        ];
    }
}
