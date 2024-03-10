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
            'text' => '投稿に対するコメント',
            'post_id' => 1,
            'user_id' => 2,
        ]);
        Comment::create([
            'text' => '投稿に対するコメント2',
            'post_id' => 2,
            'user_id' => 3,
        ]);
    }
}
