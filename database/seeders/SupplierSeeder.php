<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel suppliers.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'PT Kimia Sejahtera',
                'contact_person' => 'Budi Santoso',
                'phone_number' => '081234567890',
                'address' => 'Jl. Industri No. 12, Jakarta Timur',
            ],
            [
                'name' => 'CV LabTech Indonesia',
                'contact_person' => 'Rina Marlina',
                'phone_number' => '081298765432',
                'address' => 'Jl. Pahlawan No. 45, Bandung',
            ],
            [
                'name' => 'PT BioAnalytik Nusantara',
                'contact_person' => 'Andi Wijaya',
                'phone_number' => '082145678901',
                'address' => 'Jl. Soekarno Hatta No. 23, Surabaya',
            ],
            [
                'name' => 'CV Mitra Lab Sentosa',
                'contact_person' => 'Dewi Lestari',
                'phone_number' => '087812345678',
                'address' => 'Jl. Gatot Subroto No. 89, Yogyakarta',
            ],
            [
                'name' => 'PT ChemSolution Prima',
                'contact_person' => 'Agus Prabowo',
                'phone_number' => '081356789012',
                'address' => 'Jl. Raya Ciledug No. 102, Tangerang',
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
