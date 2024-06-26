<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run()
    {
        DB::table('orders')->truncate();

        for ($i = 1; $i <= 10; $i++) {
            $totalPrice = rand(1000000, 5000000);
            $finalPrice = $totalPrice + (rand(100,101));

            DB::table('orders')->insert([
                'order_code' => 'ORD' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'customer_id' => rand(1, 10),
                'sale_id' => rand(1, 3),
                'total_price' => $totalPrice,
                'final_price' => $finalPrice,
                'order_status' => ['done', 'stake', 'none'][array_rand(['done', 'stake', 'none'])],
                'address' => 'Address ' . $i,
                'export_bill' => rand(0, 1) == 1,
                'is_vat' => rand(0, 1) == 1,
                'date_delivery' => now()->addDays(rand(1, 30)),
                'note' => Str::random(20),
                'warehouse_id' => rand(1, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::table('orders')->insert([
            'order_code' => 'ORD012',
            'customer_id' => rand(1, 10),
            'sale_id' => rand(1, 3),
            'total_price' => 50000000,
            'final_price' => 45000000,
            'order_status' => 'none',
            'address' => 'Address ' . $i,
            'export_bill' => rand(0, 1) == 1,
            'is_vat' => rand(0, 1) == 1,
            'date_delivery' => now()->addDays(rand(1, 30)),
            'note' => Str::random(20),
            'warehouse_id' => rand(1, 2),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('orders')->insert([
            'order_code' => 'ORD013',
            'customer_id' => rand(1, 10),
            'sale_id' => rand(1, 3),
            'total_price' => 48500000,
            'final_price' => 40000000,
            'total_paid' =>  5000000,
            'order_status' => 'stake',
            'address' => 'Address ' . $i,
            'export_bill' => rand(0, 1) == 1,
            'is_vat' => rand(0, 1) == 1,
            'date_delivery' => now()->addDays(rand(1, 30)),
            'note' => Str::random(20),
            'warehouse_id' => rand(1, 2),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('orders')->insert([
            'order_code' => 'ORD014',
            'customer_id' => rand(1, 10),
            'sale_id' => rand(1, 3),
            'total_price' => 38000000,
            'final_price' => 35000000,
            'total_paid' => 38000000,
            'order_status' => 'done',
            'address' => 'Address ' . $i,
            'export_bill' => rand(0, 1) == 1,
            'is_vat' => rand(0, 1) == 1,
            'date_delivery' => now()->addDays(rand(1, 30)),
            'note' => Str::random(20),
            'warehouse_id' => rand(1, 2),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
