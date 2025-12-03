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
        Schema::create('n_parameter_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sample_id')->constrained('samples')->cascadeOnDelete();
            $table->foreignId('test_parameter_id')->constrained('test_parameters')->cascadeOnDelete();
            $table->foreignId('test_method_id')->constrained('test_methods')->cascadeOnDelete();
            $table->string('result')->nullable();
            $table->enum('status', ['in_progress', 'failed', 'success'])->default('in_progress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('n_parameter_methods');
    }
};
