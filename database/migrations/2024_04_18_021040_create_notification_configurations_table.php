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
        Schema::create('notification_configurations', function (Blueprint $table) {
            $table->id();
            $table->uuid('position_id');
            $table->enum('phase', ['1', '2', '3', '4']);
            $table->string('minPlafon')->comment('minimum plafon pinjaman')->nullable();
            $table->string('maxPlafon')->comment('maximum plafon pinjaman')->nullable();
            $table->timestamps();

            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_configuration');
    }
};
