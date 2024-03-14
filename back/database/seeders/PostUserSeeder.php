<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('post_user')->insert([
            'post_id' => 1,
            'user_id' => 2
        ]);
        DB::table('post_user')->insert([
            'post_id' => 2,
            'user_id' => 1
        ]);
        DB::table('post_user')->insert([
            'post_id' => 2,
            'user_id' => 3
        ]);
    }
}
