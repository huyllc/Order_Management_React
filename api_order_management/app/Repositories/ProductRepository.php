<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\BaseRepository;

class ProductRepository extends BaseRepository
{
    /**
     * Restore product when delete product
     * @var int productId, int quantity
     * @return boolean
     */
    public function restoreProduct($productId, $quantity) {
        $product = $this->findOrFail($productId);
        if ($product) {
            $product->increment('quantity', $quantity);
            return true;
        }
        return false;
    }

    public function model()
    {
        return Product::class;
    }
}
