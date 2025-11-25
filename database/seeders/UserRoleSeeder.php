<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run()
    {
        // 1️⃣ BUAT ROLES TERLEBIH DAHULU
        $roles = ['admin', 'client', 'staff', 'analyst', 'supervisor', 'manager'];

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'web'
            ]);
        }

        // 2️⃣ ADMIN
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'remember_token' => Str::random(10),
            'signature' => 'signatures/admin.png',
            'email_verified_at' => now(),
        ]);
        $adminUser->assignRole('admin');

        // 3️⃣ STAFF
        $staffUser = User::create([
            'name' => 'King Staff',
            'email' => 'staff@staff.com',
            'password' => Hash::make('staff123'),
            'remember_token' => Str::random(10),
            'signature' => 'signatures/admin.png',
            'email_verified_at' => now(),
        ]);
        $staffUser->assignRole('staff');

        // 4️⃣ USER SPESIAL: IMNOTDANISH05 (ROLE MANAGER)
        $danish = User::create([
            'name' => 'Danish ImNotDanish05',
            'email' => 'imnotdanish05@gmail.com',
            'password' => Hash::make('danish123'),
            'remember_token' => Str::random(10),
            'signature' => 'signatures/admin.png',
            'email_verified_at' => now(),
        ]);
        $danish->assignRole('manager');

        // 5️⃣ USER RANDOM UNTUK ROLE LAIN
        $otherRoles = ['client', 'staff', 'analyst', 'supervisor', 'manager'];

        foreach ($otherRoles as $role) {
            $users = User::factory(5)->create(['role' => $role]);

            foreach ($users as $user) {
                $user->assignRole($role);
            }
        }

        $this->command->info('🎉 UserRoleSeeder completed!');
        $this->command->info('👤 Admin: admin@example.com / admin123');
        $this->command->info('👤 Manager (Special): imnotdanish05@gmail.com / danish123');
    }
}
