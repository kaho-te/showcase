<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Nijitoshi NAKAJIMA',
            'email' => 'nijitoshi@test.com',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'name' => 'Keisuke KUBOTA',
            'email' => 'keisuke@test.com',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'name' => 'Kaho TERADA',
            'email' => 'kaho@test.com',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'name' => 'Ryotaro ISHII',
            'email' => 'ryo@test.com',
            'password' => Hash::make('password'),
        ]);
    }
}
