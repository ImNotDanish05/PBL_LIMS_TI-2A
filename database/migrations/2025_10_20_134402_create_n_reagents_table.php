<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('n_reagents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('n_parameter_method_id')->constrained('n_parameter_methods')->cascadeOnDelete();
            $table->foreignId('reagent_id')->constrained('reagents')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('n_reagents');
    }
};
