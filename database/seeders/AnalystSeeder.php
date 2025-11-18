<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Analyst;

class AnalystSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil SEMUA user yang rolenya 'analyst'
        $analystUsers = User::where('role', 'analyst')->get();

        if ($analystUsers->isEmpty()) {
            $this->command->warn('⚠️ Tidak ditemukan user dengan role "analyst". Jalankan UserRoleSeeder dulu!');
            return;
        }

        $specialists = ['Kimia Analitik', 'Mikrobiologi', 'Toksikologi', 'Farmakologi', 'Bioteknologi'];

        // Buat data analis untuk SETIAP user analis
        foreach ($analystUsers as $index => $user) {
            Analyst::create([
                'user_id' => $user->id,
                'name' => $user->name,
                'specialist' => $specialists[$index % count($specialists)],
            ]);
        }
    }
}
