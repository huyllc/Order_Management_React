<?php

namespace App\Rules;

use App\Models\OrderDetail;
use App\Repositories\ProductRepository;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class OrderDetailQuantityRule implements ValidationRule
{
    protected $productRepo;
    protected $productId;
    protected $quantity;
    protected $orderDetailId;

    public function __construct($productId, $quantity, $orderDetailId)
    {
        $this->productRepo = new ProductRepository();
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->orderDetailId = $orderDetailId;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $product = $this->productRepo->findOrFail($this->productId);
        $orderDetail = OrderDetail::find($this->orderDetailId);
        $total_quantity = $orderDetail ? $product->quantity + $orderDetail->quantity : $product->quantity;

        if (!$product) {
            $fail('The selected product does not exist.');
            return;
        }
        if ($total_quantity <= $this->quantity) {
            $fail(
                'Không đủ số lượng sản phẩm '. $product->name.'(<='.($total_quantity).')'
            );
        }
    }
}
