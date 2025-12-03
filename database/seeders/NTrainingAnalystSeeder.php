<?php

namespace Database\Seeders;

use App\Models\NTrainingAnalyst;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NTrainingAnalystSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'analyst_id'  => 1,
                'training_id' => 1,
            ],
            [
                'analyst_id'  => 1,
                'training_id' => 2,
            ],
            [
                'analyst_id'  => 2,
                'training_id' => 2,
            ],
            [
                'analyst_id'  => 2,
                'training_id' => 3,
            ],
            [
                'analyst_id'  => 3,
                'training_id' => 4,
            ],
        ];

        foreach ($data as $item) {
            NTrainingAnalyst::create($item);
        }
    }
}
