<?php

namespace App\Http\Requests;

use App\Rules\SufficientQuantity;
use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
        $rules =  [
            'customer_id' => 'required|integer|exists:customers,id',
            'address' => 'required|string',
            'sale_id' => 'required|integer|exists:users,id',
            'warehouse_id' => 'required|integer|exists:warehouses,id',
            'address' => 'required|string',
            'listProducts' => 'required|array',
            'listProducts.*.product_id' => 'required|integer|exists:products,id',
            'listProducts.*.quantity' => ['required', 'integer', 'min:1'],
            'listProducts.*.product_price' => 'required|numeric|min:0',
            'listProducts.*.discount' => 'required|numeric|min:0|max:100',
            'listProducts.*.status' => 'required|string',
            'listProducts.*.total_price' => 'required|numeric|min:0',
        ];
        if ($this->listProducts && is_array($this->listProducts)) {
            foreach ($this->listProducts as $index => $product) {
                if ($product['product_id'] !== null) {
                    $rules["listProducts.$index.quantity"][] = new SufficientQuantity($product['product_id'], $product['quantity']);
                }
            }
        }


        return $rules;
    }
}
