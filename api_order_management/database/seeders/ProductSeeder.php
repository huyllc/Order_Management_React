<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->truncate();
        $faker = \Faker\Factory::create();
        $generatedNames = [];
        for ($i = 1; $i <= 50; $i++) {
            do {
                $name = $faker->unique()->words(3, true);
            } while (in_array($name, $generatedNames));

            $generatedNames[] = $name;

            DB::table('products')->insert([
                'name' => $name,
                'sku' => 'SKU' . str_pad($i, 10, '0', STR_PAD_LEFT),
                'discount' => rand(5, 15),
                'quantity' => $faker->numberBetween(50, 200),
                'price' => $faker->numberBetween(1000000, 10000000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
