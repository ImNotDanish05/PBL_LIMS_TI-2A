<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReagentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'supplier_id' => $this->faker->numberBetween(1, 5),
            'grade_id' => $this->faker->numberBetween(1, 3),
            'name' => $this->faker->word(),
            'formula' => strtoupper($this->faker->bothify('???-###')),
            'batch_number' => strtoupper($this->faker->bothify('BN####')),
            'storage_location' => 'Lab-' . $this->faker->numberBetween(1, 10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
