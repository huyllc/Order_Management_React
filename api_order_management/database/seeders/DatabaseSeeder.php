<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            CustomerSeeder::class,
            UserSeeder::class,
            WarehouseSeeder::class,
            ProductSeeder::class,
            // OrderSeeder::class,
            // OrderDetailSeeder::class,
            // ReturnOrderSeeder::class,
            // PaymentSeeder::class,
        ]);
    }
}
