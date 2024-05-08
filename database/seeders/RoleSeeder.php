<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['id' => Str::uuid(), 'name' => 'administrator'],
            ['id' => Str::uuid(), 'name' => 'Account Officer'],
            // ['id' => Str::uuid(), 'name' => 'ca'],
            // ['id' => Str::uuid(), 'name' => 'dirut'],
        ];

        foreach ($roles as $roles) {
            Role::create($roles);
        }
    }
}
