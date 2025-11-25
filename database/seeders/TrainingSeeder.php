<?php

namespace Database\Seeders;

use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainings = [
            [
                'name'     => 'Pelatihan Dasar Laboratorium Kimia',
                'provider' => 'Badan Standardisasi Nasional (BSN)',
                'date'     => Carbon::parse('2023-01-10'),
                'result'   => 'Lulus',
            ],
            [
                'name'     => 'Training Operasional HPLC',
                'provider' => 'PT Instrumen Nusantara',
                'date'     => Carbon::parse('2023-04-05'),
                'result'   => 'Lulus',
            ],
            [
                'name'     => 'ISO/IEC 17025 Awareness Training',
                'provider' => 'KAN (Komite Akreditasi Nasional)',
                'date'     => Carbon::parse('2022-11-18'),
                'result'   => 'Lulus',
            ],
            [
                'name'     => 'Pelatihan Mikrobiologi Dasar',
                'provider' => 'Balai Besar Laboratorium Kesehatan',
                'date'     => Carbon::parse('2023-07-23'),
                'result'   => 'Lulus',
            ],
            [
                'name'     => 'Workshop Pengujian Air & Lingkungan',
                'provider' => 'LIPI Research Center',
                'date'     => Carbon::parse('2022-09-14'),
                'result'   => 'Lulus',
            ],
        ];

        foreach ($trainings as $training) {
            Training::create($training);
        }
    }
}
