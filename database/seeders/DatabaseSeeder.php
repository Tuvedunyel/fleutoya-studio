<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'gmontoya@fleuttoya.studio'],
            [
                'name' => 'Grégoire Montoya',
                'password' => Hash::make('user!Tribu1'),
                'email_verified_at' => now(),
            ]
        );
    }
}
