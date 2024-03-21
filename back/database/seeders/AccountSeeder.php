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
            'icon' => 'IMG_1232.jpg',
            'mainstage_image' => 'ShowCaseDemo.mp4',
            'profile' => 'Here is a space to write something about yourself or your space design and ',
            'user_id' => 1,
        ]);
        Account::create([
            'icon' => 'IMG_1234.png',
            'mainstage_image' => 'ShowCaseDemo.mp4',
            'profile' => 'Here is a space to write something about yourself or your space design and ',
            'user_id' => 2,
        ]);
        Account::create([
            'icon' => 'IMG_1231.jpg',
            'mainstage_image' => 'ShowCaseDemo.mp4',
            'profile' => 'Here is a space to write something about yourself or your space design and ',
            'user_id' => 3,
        ]);
        Account::create([
            'icon' => 'IMG_1233.jpg',
            'mainstage_image' => 'ShowCaseDemo.mp4',
            'profile' => 'Here is a space to write something about yourself or your space design and ',
            'user_id' => 4,
        ]);
    }
}
