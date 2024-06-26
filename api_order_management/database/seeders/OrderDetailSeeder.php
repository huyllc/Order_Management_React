<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        DB::table('order_details')->truncate();

        for ($i = 1; $i <= 20; $i++) {
            $productPrice = rand(1000, 5000) / 100;
            $quantity = rand(1, 5);
            $discount = rand(0, 20);
            $totalPrice = ($quantity * $productPrice) * (1 - ($discount / 100));

            DB::table('order_details')->insert([
                'order_id' => rand(1, 14),
                'product_id' => rand(1, 10),
                'product_price' => $productPrice,
                'quantity' => $quantity,
                'quantity_return' => 0,
                'status' => ['none', 'return'][array_rand(['none', 'return'])],
                'discount' => $discount,
                'total_price' => $totalPrice,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
