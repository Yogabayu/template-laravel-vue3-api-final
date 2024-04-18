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
        Schema::create('phase_times', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('file_id');
            $table->enum('phase', ['1', '2', '3', '4']);
            $table->dateTime('startTime')->nullable();
            $table->dateTime('endTime')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phase_times');
    }
};
