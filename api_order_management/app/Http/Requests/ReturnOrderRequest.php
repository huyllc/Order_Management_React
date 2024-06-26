<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReturnOrderRequest extends FormRequest
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
        $rules = [
            'note' => 'required|max:255',
        ];

        $listOrder = $this->input('list_order');

        if (!is_array($listOrder) || empty($listOrder)) {
            return $rules;
        }

        foreach ($listOrder as $index => $orderItem) {
            $rules["list_order.$index.quantity_return"] = "required|integer|min:0|max:{$orderItem['quantity_can_return']}";
        }

        return $rules;
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'list_order.*.quantity_return.max' => 'Số hàng trả về không được vượt quá số lượng có thể trả',
            'list_order.*.quantity_return.min' => 'Số hàng trả về phải lớn hơn hoặc bằng 0'
        ];
    }
}
