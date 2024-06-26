<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->truncate();
        $faker = \Faker\Factory::create();

        for ($i = 1; $i <= 20; $i++) {
            DB::table('users')->insert([
                'name' => "SALE ".$faker->name,
                'role' => 'sale',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
