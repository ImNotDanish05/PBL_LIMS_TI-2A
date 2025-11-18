<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ReferenceStandard;

class ReferenceStandardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $standards = [
            'ISO 17025:2017',
            'SNI 19-17025:2018',
            'AOAC Official Method',
            'ASTM Standard',
            'EPA Method',
        ];

        foreach ($standards as $standard) {
            ReferenceStandard::create([
                'name' => $standard,
            ]);
        }
    }
}
