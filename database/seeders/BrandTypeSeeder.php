<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BrandType;

class BrandTypeSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel brand_types.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Merck'],
            ['name' => 'Sigma-Aldrich'],
            ['name' => 'Eppendorf'],
            ['name' => 'Thermo Fisher Scientific'],
            ['name' => 'Agilent Technologies'],
            ['name' => 'Shimadzu'],
            ['name' => 'Waters Corporation'],
            ['name' => 'Bio-Rad Laboratories'],
            ['name' => 'VWR International'],
            ['name' => 'Fisherbrand'],
        ];

        foreach ($brands as $brand) {
            BrandType::create($brand);
        }
    }
}
