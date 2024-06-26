<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReturnOrderSeeder extends Seeder
{
    public function run()
    {
        DB::table('return_orders')->truncate();

        for ($i = 1; $i <= 10; $i++) {
            $totalPrice = rand(1000, 5000) / 100;

            DB::table('return_orders')->insert([
                'order_detail_id' => rand(1, 10),
                'total_price' => $totalPrice,
                'note' => Str::random(20),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
