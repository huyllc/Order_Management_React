<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentSeeder extends Seeder
{
    public function run()
    {
        DB::table('payments')->truncate();
        for ($i = 1; $i <= 10; $i++) {
            $amount = rand(1000, 5000);

            DB::table('payments')->insert([
                'order_id' => rand(1, 10),
                'customer_id' => rand(1, 10),
                'amount' => $amount,
                'payment_method' => ['cash', 'credit'][array_rand(['cash', 'credit'])],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::table('payments')->insert([
            'order_id' => 12,
            'customer_id' => rand(1, 10),
            'amount' => 5000000,
            'payment_method' => ['cash', 'credit'][array_rand(['cash', 'credit'])],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('payments')->insert([
            'order_id' => 13,
            'customer_id' => rand(1, 10),
            'amount' => 30000000,
            'payment_method' => ['cash', 'credit'][array_rand(['cash', 'credit'])],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('payments')->insert([
            'order_id' => 13,
            'customer_id' => rand(1, 10),
            'amount' => 5000000,
            'payment_method' => ['cash', 'credit'][array_rand(['cash', 'credit'])],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
