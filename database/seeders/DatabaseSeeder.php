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
                $this->call([
                        UserRoleSeeder::class,
                        ClientSeeder::class,
                        AnalystSeeder::class,
                ]);

                // // Master Data Independen
                $this->call([
                        // BrandTypeSeeder::class,
                        // GradeSeeder::class,
                        // SupplierSeeder::class,
                        // TrainingSeeder::class,
                        // CertificateSeeder::class,
                        SampleCategorySeeder::class,
                        // UnitValueSeeder::class,
                        // ReferenceStandardSeeder::class,
                        AnalysesMethodSeeder::class,
                        SampleSeeder::class,
                ]);

                // Master Data Dependen
                $this->call([
                        // EquipmentSeeder::class,
                        // ReagentSeeder::class,
                        TestMethodSeeder::class,
                        TestParameterSeeder::class,
                ]);

                // Master Data Transaksional
                $this->call([
                        OrderSeeder::class,
                        NOrderSampleSeeder::class,
                        // NAnalysesMethodsOrdersSeeder::class,
                        NAnalystSeeder::class,
                        NParameterMethodSeeder::class,
                        // NEquipmentSeeder::class,
                        // NReagentSeeder::class,
                        // NTrainingAnalystSeeder::class,
                ]);
        }
}
