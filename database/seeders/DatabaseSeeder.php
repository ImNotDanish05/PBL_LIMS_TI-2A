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
        // 1) Roles & base users (Spatie roles must exist first)
        $this->call([
            \Database\Seeders\UserRoleSeeder::class,
        ]);

        // // 2) User-linked records
        // $this->call([
        //     \Database\Seeders\ClientSeeder::class,
        //     \Database\Seeders\AnalystSeeder::class,
        //     \Database\Seeders\TrainingSeeder::class,
        //     \Database\Seeders\CertificateSeeder::class,
        // ]);

        // // 3) Independent master data
        // $this->call([
        //     \Database\Seeders\SampleCategorySeeder::class,
        //     \Database\Seeders\BrandTypeSeeder::class,
        //     \Database\Seeders\GradeSeeder::class,
        //     \Database\Seeders\SupplierSeeder::class,
        //     \Database\Seeders\UnitValueSeeder::class,
        //     \Database\Seeders\ReferenceStandardSeeder::class,
        //     \Database\Seeders\AnalysesMethodSeeder::class,
        // ]);

        // // 4) Dependent master data
        // $this->call([
        //     \Database\Seeders\SampleSeeder::class,          // needs sample categories
        //     \Database\Seeders\EquipmentSeeder::class,       // needs brand types
        //     \Database\Seeders\ReagentSeeder::class,         // needs suppliers & grades
        //     \Database\Seeders\TestMethodSeeder::class,      // needs reference standards
        //     \Database\Seeders\TestParameterSeeder::class,   // needs unit values & reference standards
        // ]);

        // // 5) Transactional data & pivot tables
        // $this->call([
        //     \Database\Seeders\OrderSeeder::class,                 // needs clients
        //     \Database\Seeders\NOrderSampleSeeder::class,          // needs orders & samples
        //     \Database\Seeders\NAnalysesMethodsOrdersSeeder::class,// needs orders & analyses methods
        //     \Database\Seeders\NAnalystSeeder::class,              // needs orders & analysts
        //     \Database\Seeders\NParameterMethodSeeder::class,      // needs samples, test params, test methods
        //     \Database\Seeders\NEquipmentSeeder::class,            // needs n_parameter_methods & equipments
        //     \Database\Seeders\NReagentSeeder::class,              // needs n_parameter_methods & reagents
        //     \Database\Seeders\NTrainingAnalystSeeder::class,      // needs analysts & trainings
        // ]);
    }
}
