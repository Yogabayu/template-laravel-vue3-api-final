<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $positionIds = DB::table('positions')->pluck('id');
        $users = [
            [
                'id' => Str::uuid(),
                'name' => 'Administrator',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'isActive' => 1,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
