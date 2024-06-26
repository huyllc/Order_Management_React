<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WarehouseSeeder extends Seeder
{
    public function run()
    {
        DB::table('warehouses')->truncate();
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 20; $i++) {
            DB::table('warehouses')->insert([
                'name' => $faker->company . ' Warehouse ' . $i,
            ]);
        }
    }
}
