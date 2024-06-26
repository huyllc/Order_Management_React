<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\ReturnOrderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/customer')->controller(CustomerController::class)->group(function () {
    Route::get('', 'index');
    Route::get('show/{id}', 'show');
    Route::post('/', 'store');
    Route::put('{id}', 'update')->name('customer.update');
    Route::get('/search', 'searchByPhone');
});
Route::get('/search/customer', [CustomerController::class, 'search']);
Route::prefix('/return-order')->controller(ReturnOrderController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/{id}', 'show');
    Route::post('/', 'store');
    Route::post('/{id}', 'storeReturnOrder');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('order')->group(function () {
    Route::controller(OrderController::class)->group(function () {
        Route::get('list', 'get')->name('api.order.list');
        Route::get('show/{id}', 'show')->name('api.order.show');
        Route::post('create', 'store');
        Route::put('update/{id}', 'update');
        Route::get('search', 'findByOrderCode');
    });

    Route::prefix('payment')->controller(PaymentController::class)->group(function () {
        Route::post('store', 'store')->name('api.order.payment');
    });
});

Route::prefix('user')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('list', 'index')->name('api.user.list');
        Route::get('search', 'search');
        Route::get('searchFilter', 'searchFilter');
    });
});

Route::prefix('product')->group(function () {
    Route::controller(ProductController::class)->group(function () {
        Route::get('search', 'search');
        Route::get('name', 'getByName')->name('api.product.getname');
        Route::get('sku', 'getBySku')->name('api.product.getsku');
        Route::get('get/name', 'searchByName');
    });
});

Route::prefix('warehouse')->group(function () {
    Route::controller(WarehouseController::class)->group(function () {
        Route::get('getAll', 'index');
    });
});

Route::prefix('dashboard')->group(function () {
    Route::controller(DashBoardController::class)->group(function () {
        Route::get('', 'countTotal');
    });
});
