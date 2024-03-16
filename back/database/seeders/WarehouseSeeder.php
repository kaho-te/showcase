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
            'threed_data' => 'sci_-_fi_computer_game_ready.glb',
            'user_id' => 1,
        ]);
        Warehouse::create([
            'threed_data' => 'uchiwa_fan.glb',
            'user_id' => 2,
        ]);
        Warehouse::create([
            'threed_data' => 'usagi.glb',
            'user_id' => 3,
        ]);
        Warehouse::create([
            'threed_data' => 'watermelon.glb',
            'user_id' => 1,
        ]);
        Warehouse::create([
            'threed_data' => 'f4e384fa9c6f4753b59f07c63ef4a098.glb',
            'user_id' => 1,
        ]);
    }
}
