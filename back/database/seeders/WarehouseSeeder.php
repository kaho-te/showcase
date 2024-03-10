<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Warehouse::create([
            'threed_data' => 'dummy',
            'user_id' => 1,
        ]);
        Warehouse::create([
            'threed_data' => 'dummy',
            'user_id' => 2,
        ]);
        Warehouse::create([
            'threed_data' => 'dummy',
            'user_id' => 3,
        ]);
    }
}
