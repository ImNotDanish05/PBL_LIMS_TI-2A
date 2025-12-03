<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestMethod;
use App\Models\ReferenceStandard;

class TestMethodSeeder extends Seeder
{
    public function run(): void
    {
        $ref1 = ReferenceStandard::firstOrCreate(['name' => 'SNI Metodologi']);

        $methods = [
            [
                'reference_id' => $ref1->id,
                'name' => 'Spektrofotometri UV-Vis',
                'applicable_parameter' => 'Nitrat, Nitrit',
                'duration' => 60, // Durasi dalam menit
                'validity_period' => '2026-12-31'
            ],
            [
                'reference_id' => $ref1->id,
                'name' => 'Titrasi Asam Basa',
                'applicable_parameter' => 'Alkalinitas',
                'duration' => 30,
                'validity_period' => '2026-12-31'
            ],
            [
                'reference_id' => $ref1->id,
                'name' => 'Gravimetri',
                'applicable_parameter' => 'TSS, TDS',
                'duration' => 240,
                'validity_period' => '2026-12-31'
            ],
        ];

        foreach ($methods as $method) {
            TestMethod::create($method);
        }
    }
}
