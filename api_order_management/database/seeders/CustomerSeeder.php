<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        DB::table('customers')->truncate();
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 50; $i++) {
            $type = $faker->randomElement(['company', 'self']);
            $phoneLength = $faker->numberBetween(10, 11);
            $phoneNumber = $faker->numerify(str_repeat('#', $phoneLength));
            $taxCode = $type === 'company' ? "MST".$faker->numerify('##########') : null;
            DB::table('customers')->insert([
                'customer_code' => $faker->unique()->numerify('CUST####'),
                'name' => $faker->name,
                'type' => $type,
                'email' => $faker->unique()->safeEmail,
                'address' => $faker->address,
                'tax_code' => $taxCode,
                'phone' => $phoneNumber,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
