<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reagent;
use App\Models\Supplier;
use App\Models\Grade;

class ReagentSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel reagents.
     */
    public function run(): void
    {
        // Pastikan supplier & grade sudah ada
        $suppliers = Supplier::all();
        $grades = Grade::all();

        if ($suppliers->isEmpty() || $grades->isEmpty()) {
            $this->command->warn('⚠️ Jalankan SupplierSeeder dan GradeSeeder terlebih dahulu!');
            return;
        }

        $reagents = [
            [
                'name' => 'Asam Sulfat',
                'formula' => 'H2SO4',
                'batch_number' => 'AS-2024-01',
                'storage_location' => 'Rak A1',
            ],
            [
                'name' => 'Natrium Klorida',
                'formula' => 'NaCl',
                'batch_number' => 'NK-2024-02',
                'storage_location' => 'Rak B3',
            ],
            [
                'name' => 'Etanol',
                'formula' => 'C2H5OH',
                'batch_number' => 'ET-2024-03',
                'storage_location' => 'Lemari Kimia 2',
            ],
            [
                'name' => 'Aseton',
                'formula' => 'C3H6O',
                'batch_number' => 'AC-2024-04',
                'storage_location' => 'Lemari Pelarut',
            ],
            [
                'name' => 'Kalium Permanganat',
                'formula' => 'KMnO4',
                'batch_number' => 'KP-2024-05',
                'storage_location' => 'Rak C2',
            ],
        ];

        foreach ($reagents as $data) {
            Reagent::create([
                ...$data,
                'supplier_id' => $suppliers->random()->id,
                'grade_id' => $grades->random()->id,
            ]);
        }
    }
}
