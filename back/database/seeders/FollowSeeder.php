<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('follows')->insert([
            'user_id' => 1,
            'following_id' => 2
        ]);
        DB::table('follows')->insert([
            'user_id' => 2,
            'following_id' => 3
        ]);
        DB::table('follows')->insert([
            'user_id' => 1,
            'following_id' => 3
        ]);
    }
}
