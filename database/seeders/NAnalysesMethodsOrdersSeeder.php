<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NAnalysesMethodsOrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'order_id' => 1,
                'analyses_method_id' => 1,
                'description' => 'Analisis kualitas air lengkap untuk parameter fisik dan kimia',
                'price' => 250000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'analyses_method_id' => 2,
                'description' => 'Uji kandungan logam berat dalam sampel air',
                'price' => 180000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'analyses_method_id' => 3,
                'description' => 'Analisis mikrobiologi untuk parameter E.coli dan total koliform',
                'price' => 320000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'analyses_method_id' => 4,
                'description' => 'Uji residu pestisida dalam produk pertanian',
                'price' => 275000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'analyses_method_id' => 5,
                'description' => 'Analisis kandungan nutrisi dan vitamin dalam makanan',
                'price' => 210000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'analyses_method_id' => 1,
                'description' => 'Pemeriksaan kualitas air minum dalam kemasan',
                'price' => 195000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 4,
                'analyses_method_id' => 2,
                'description' => 'Analisis logam berat pada sampel tanah',
                'price' => 290000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 4,
                'analyses_method_id' => 3,
                'description' => 'Uji bakteri patogen pada sampel lingkungan',
                'price' => 335000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'analyses_method_id' => 4,
                'description' => 'Analisis residu pestisida organofosfat',
                'price' => 265000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'analyses_method_id' => 5,
                'description' => 'Uji kandungan protein dan lemak dalam produk pangan',
                'price' => 225000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('n_analyses_methods_orders')->insert($data);
    }
}