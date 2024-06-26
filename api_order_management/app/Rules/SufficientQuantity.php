<?php

namespace App\Rules;

use App\Repositories\ProductRepository;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SufficientQuantity implements ValidationRule
{
    protected $productRepo;
    protected $productId;
    protected $quantity;

    public function __construct($productId, $quantity)
    {
        $this->productRepo = new ProductRepository();
        $this->productId = $productId;
        $this->quantity = $quantity;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $product = $this->productRepo->findOrFail($this->productId);
        if (!$product) {
            $fail('The selected product does not exist.');
            return;
        }
        if ($product->quantity < $this->quantity) {
            $fail('Không đủ số lượng sản phẩm '. $product->name.'(<='.$product->quantity.')');
        }
    }
}
