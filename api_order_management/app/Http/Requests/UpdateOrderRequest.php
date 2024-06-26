<?php

namespace App\Http\Requests;

use App\Rules\OrderDetailQuantity;
use App\Rules\OrderDetailQuantityRule;
use App\Rules\SufficientQuantity;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];

        $listOrderDetails = $this->input('listOrderDetails');

        if (!is_array($listOrderDetails) || empty($listOrderDetails)) {
            return $rules;
        }

        foreach ($listOrderDetails as $index => $item) {
            if ($item['product_id'] !== null) {
                $rules["listOrderDetails.$index.quantity"][] = new OrderDetailQuantityRule($item['product_id'], $item['quantity'], $item["id"]);
            }
        }

        return $rules;
    }
}
