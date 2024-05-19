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
        Schema::create('phase_durations', function (Blueprint $table) {
            $table->id();
            $table->uuid('position_id');
            $table->enum('phase', ['1', '2', '3', '4', '5', '6']);
            $table->integer('duration_days');
            $table->timestamps();

            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phase_durations');
    }
};
