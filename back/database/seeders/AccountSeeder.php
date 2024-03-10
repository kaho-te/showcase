<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::create([
            'icon' => 'dummy',
            'mainstage_image' => 'dummy_stage',
            'profile' => 'プロフィール文章１',
            'user_id' => 1,
        ]);
        Account::create([
            'icon' => 'dummy',
            'mainstage_image' => 'dummy_stage',
            'profile' => 'プロフィール文章２',
            'user_id' => 2,
        ]);
    }
}
