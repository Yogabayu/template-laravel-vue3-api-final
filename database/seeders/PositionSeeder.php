<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officeId = DB::table('offices')->where('code', 'KPCBN')->value('id');
        $roleId = DB::table('roles')->where('name', 'administrator')->value('id');

        if ($officeId && $roleId) {
            $position = [
                'id' => Str::uuid()->toString(),
                'name' => 'administrator',
                'role_id' => $roleId,
            ];

            Position::create($position);
        }
    }
}
