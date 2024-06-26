<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Exception;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Show warehouse list
     */
    public function index()
    {
        try {          
            return Warehouse::all();
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }
}
