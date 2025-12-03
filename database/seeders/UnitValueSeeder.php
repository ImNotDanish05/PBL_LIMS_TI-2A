<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnitValue;

class UnitValueSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel unit_values.
     */
    public function run(): void
    {
        $units = [
            ['value' => 'mg/L'],        // miligram per liter
            ['value' => 'µg/L'],        // mikrogram per liter
            ['value' => 'ppm'],         // parts per million
            ['value' => 'ppb'],         // parts per billion
            ['value' => 'CFU/mL'],      // colony forming units per milliliter
            ['value' => '%'],           // persen
            ['value' => 'mg/kg'],       // miligram per kilogram
            ['value' => 'g/L'],         // gram per liter
            ['value' => 'mL'],          // mililiter
            ['value' => 'pH'],          // unitless pH
            ['value' => 'NTU'],         // Nephelometric Turbidity Unit
            ['value' => '°C'],          // derajat Celsius
            ['value' => 'μS/cm'],       // microsiemens per centimeter
        ];

        foreach ($units as $unit) {
            UnitValue::create($unit);
        }
    }
}
