<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder User
        $this->call(UserSeeder::class);

        // // Master Data Independen
        // $this->call([
        //     BrandTypeSeeder::class,
        //     GradeSeeder::class,
        //     SupplierSeeder::class,
        //     SampleCategorySeeder::class,
        //     UnitValueSeeder::class,
        //     ReferenceStandardSeeder::class,
        //     AnalysesMethodSeeder::class,
        // ]);

        // // Master Data Dependen
        // $this->call([
        //     EquipmentSeeder::class,
        //     ReagentSeeder::class,
        //     TestMethodSeeder::class,
        //     TestParameterSeeder::class,
        // ]);

        // // Data Transaksional
        // $this->call([
        //     AnalystSeeder::class,
        //     ClientSeeder::class,
        //     SampleSeeder::class,
        // ]);
    }
}
