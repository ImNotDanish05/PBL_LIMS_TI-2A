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
        Schema::create('test_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reference_id')->constrained('reference_standards')->cascadeOnDelete();
            $table->string('name');
            $table->string('applicable_parameter');
            $table->integer('duration');
            $table->date('validity_period');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_methods');
    }
};
