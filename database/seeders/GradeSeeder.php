<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grade;

class GradeSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel grades (khusus untuk reagents).
     */
    public function run(): void
    {
        $grades = [
            ['name' => 'Analytical Grade'],
            ['name' => 'HPLC Grade'],
            ['name' => 'Reagent Grade'],
            ['name' => 'Technical Grade'],
            ['name' => 'ACS Grade'],
            ['name' => 'Laboratory Grade'],
            ['name' => 'Spectroscopic Grade'],
            ['name' => 'Pharmaceutical Grade'],
            ['name' => 'Molecular Biology Grade'],
            ['name' => 'Electronics Grade'],
        ];

        foreach ($grades as $grade) {
            Grade::create($grade);
        }
    }
}
