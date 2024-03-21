<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::create([
            'text' => 'Thanks for tagging along today!',
            'post_id' => 2,
            'user_id' => 1,
        ]);
        Comment::create([
            'text' => 'This is awesome!',
            'post_id' => 2,
            'user_id' => 3,
        ]);
        Comment::create([
            'text' => 'Thanks for tagging along today!',
            'post_id' => 1,
            'user_id' => 2,
        ]);
    }
}
