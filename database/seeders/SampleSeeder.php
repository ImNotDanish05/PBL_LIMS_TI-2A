<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('samples')->insert([
            [
                'sample_category_id' => 1,
                'name' => 'Air Sungai Ciliwung',
                'form' => 'liquid',
                'preservation_method' => 'Pendinginan 4°C',
                'condition' => 'good',
                'storage_condition' => 'Chiller 4°C', // INI PERBAIKANNYA
            ],
            [
                'sample_category_id' => 2,
                'name' => 'Tanah Pertanian A',
                'form' => 'solid',
                'preservation_method' => 'Disimpan dalam wadah tertutup',
                'condition' => 'good',
                'storage_condition' => 'Suhu Ruang', // INI PERBAIKANNYA
            ],
            [
                'sample_category_id' => 3, // Asumsi 3 = Kategori Gas/Udara
                'name' => 'Udara Pabrik X',
                'form' => 'gas',
                'preservation_method' => 'Sampel dalam tabung khusus',
                'condition' => 'good',
                'storage_condition' => 'Rak Tabung Gas', // INI PERBAIKANNYA
            ],
        ]);
    }
}
