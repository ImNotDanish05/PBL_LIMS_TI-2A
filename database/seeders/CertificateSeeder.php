<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certificates = [
            [
                'analyst_id'  => 1,
                'name'        => 'ISO/IEC 17025:2017 Laboratory Competence',
                'issued_date' => Carbon::parse('2023-01-15'),
                'expired_date' => Carbon::parse('2026-01-15'),
                'file_path'   => 'certificates/iso-17025-analyst1.pdf',
            ],
            [
                'analyst_id'  => 1,
                'name'        => 'Chemical Analysis Training Level 2',
                'issued_date' => Carbon::parse('2022-06-01'),
                'expired_date' => Carbon::parse('2025-06-01'),
                'file_path'   => 'certificates/chemical-analysis-lvl2-analyst1.pdf',
            ],
            [
                'analyst_id'  => 2,
                'name'        => 'Gas Chromatography (GC) Certification',
                'issued_date' => Carbon::parse('2023-04-10'),
                'expired_date' => Carbon::parse('2024-04-10'),
                'file_path'   => 'certificates/gc-cert-analyst2.pdf',
            ],
            [
                'analyst_id'  => 2,
                'name'        => 'HPLC Operation & Maintenance',
                'issued_date' => Carbon::parse('2023-08-18'),
                'expired_date' => Carbon::parse('2025-08-18'),
                'file_path'   => 'certificates/hplc-analyst2.pdf',
            ],
            [
                'analyst_id'  => 3,
                'name'        => 'Microbiology Testing Competence',
                'issued_date' => Carbon::parse('2021-11-05'),
                'expired_date' => Carbon::parse('2024-11-05'),
                'file_path'   => 'certificates/microbiology-analyst3.pdf',
            ],
        ];

        foreach ($certificates as $certificate) {
            Certificate::create($certificate);
        }
    }
}
