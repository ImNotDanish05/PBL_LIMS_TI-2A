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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId(column: 'client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('order_number')->nullable();
            $table->string('title')->nullable();
            $table->string('result_value')->nullable();
            $table->date('order_date');
            $table->date('estimate_date')->nullable();
            $table->date('report_issued_at')->nullable();
            $table->string('report_file_path')->nullable();
            $table->string('notes')->nullable();
            $table->enum('order_type', ['internal','regular', 'external', 'urgent'])->default('internal');
            $table->enum('status', ['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])->default('received');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
