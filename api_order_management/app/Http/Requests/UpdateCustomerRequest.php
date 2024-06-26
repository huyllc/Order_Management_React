<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $customerId = $this->route('id');

        return [
            'name' => 'required|string|max:255',
            'type' => 'required|in:company,self',
            'email' => 'required|email|unique:customers,email,' . $customerId,
            'address' => 'required|string|max:255',
            'phone' => 'required|min:10|max:11|string|unique:customers,phone,' . $customerId,
        ];
    }

    /**
     * Get the validation rules that apply to the request conditionally.
     */
    public function withValidator($validator)
    {
        $customerId = $this->route('id');

        $validator->sometimes('tax_code', 'required|string|regex:/^[A-Za-z0-9]{10}$/u|unique:customers,tax_code,' . $customerId, function ($input) {
            return $input->type === 'company';
        });

        $validator->sometimes('customer_code', 'required|string|unique:customers,customer_code,' . $customerId, function ($value) {
            return $value['type'] === 'company';
        });
    }

    /**
     * Get custom error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'tax_code.regex' => 'Mã số thuế chỉ có 10 số',
            'tax_code.unique' => 'Mã số thuế đã tồn tại',
            'customer_code.unique' => 'Mã số khách hàng đã tồn tại',
            'email.unique' => 'Email đã tồn tại',
            'phone.min' => 'Số điện thoại phải có ít nhất 10 chữ số',
            'phone.max' => 'Số điện thoại không được vượt quá 11 chữ số',
            'phone.unique' => 'Số điện thoại đã tồn tại',
        ];
    }
}
