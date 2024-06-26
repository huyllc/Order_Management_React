<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SelectSearchProduct;
use App\Http\Services\ProductService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * @var Services| \App\Http\Services
     */
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function search(Request $request) {
        DB::beginTransaction();
        try{
            $params = [
                'id' => $request->input('id', null),
                'name' => $request->input('name', null)
            ];
            DB::commit();
            return ProductResource::collection($this->productService->search($params));
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getByName(Request $request)
    {
        $name = $request->name;
        return Product::where('name', 'like', '%' . $name . '%')->get();
    }

    public function getBySku(Request $request)
    {
        $sku = $request->sku;
        return Product::where('sku', 'like', '%' . $sku . '%')->get();
    }

    public function searchByName(Request $request)
    {
        DB::beginTransaction();
        try{
            $params = [
                'name' => $request->input('name', null)
            ];
            DB::commit();
            return SelectSearchProduct::collection($this->productService->search($params));
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
