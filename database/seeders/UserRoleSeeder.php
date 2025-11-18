<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRoleSeeder extends Seeder
{
    public function run()
    {
        // 1️⃣ Buat user khusus untuk admin (hanya 1)
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'), // password bisa disesuaikan
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // 2️⃣ Buat user random untuk setiap role lainnya
        $roles = ['client', 'staff', 'analyst', 'supervisor', 'manager'];

        foreach ($roles as $role) {
            User::factory(5)->create([
                'role' => $role,
            ]);
        }
    }
}
