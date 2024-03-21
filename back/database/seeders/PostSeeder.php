<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'text' => 'I don’t know why Figma doesn’t let me type in Japanese but here is an English sample ',
            'warehouse_id' => 1,
            'user_id' => 1,
        ]);
        Post::create([
            'text' => 'I don’t know why Figma doesn’t let me type in Japanese but here is an English sample ',
            'warehouse_id' => 2,
            'user_id' => 2,
        ]);
        Post::create([
            'text' => 'I don’t know why Figma doesn’t let me type in Japanese but here is an English sample ',
            'warehouse_id' => 3,
            'user_id' => 3,
        ]);
        Post::create([
            'text' => 'I don’t know why Figma doesn’t let me type in Japanese but here is an English sample ',
            'warehouse_id' => 4,
            'user_id' => 1,
        ]);
    }
}
