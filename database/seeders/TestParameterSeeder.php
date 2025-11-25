<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestParameter;
use App\Models\ReferenceStandard;
use App\Models\UnitValue;

class TestParameterSeeder extends Seeder // Ganti nama class
{
    public function run(): void
    {
        // Ambil ID acuan, jika tidak ada, buat baru
        $ref1 = ReferenceStandard::firstOrCreate(['name' => 'SNI 01-2891-1992']);
        $ref2 = ReferenceStandard::firstOrCreate(['name' => 'ISO 4833:2013']);
        $ref3 = ReferenceStandard::firstOrCreate(['name' => 'SNI 06-6989.25-2005']);

        $unit1 = UnitValue::firstOrCreate(['value' => '%']);
        $unit2 = UnitValue::firstOrCreate(['value' => 'CFU/mL']);
        $unit3 = UnitValue::firstOrCreate(['value' => 'NTU']);

        TestParameter::create([
            'unit_value_id' => $unit1->id,
            'reference_id' => $ref1->id, // INI PERBAIKANNYA
            'name' => 'Kadar Air',
            'category' => 'kimia',
            'detection_limit' => 'LOD',
            'quality_standard' => 'SNI 01-2891-1992',
        ]);

        TestParameter::create([
            'unit_value_id' => $unit2->id,
            'reference_id' => $ref2->id, // INI PERBAIKANNYA
            'name' => 'Total Plate Count',
            'category' => 'mikrobiologi',
            'detection_limit' => 'LOQ',
            'quality_standard' => 'ISO 4833:2013',
        ]);

        TestParameter::create([
            'unit_value_id' => $unit3->id,
            'reference_id' => $ref3->id, // INI PERBAIKANNYA
            'name' => 'Kekeruhan',
            'category' => 'fisika',
            'detection_limit' => 'LOD',
            'quality_standard' => 'SNI 06-6989.25-2005',
        ]);
    }
}
