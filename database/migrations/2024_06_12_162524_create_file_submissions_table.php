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
        Schema::create('file_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('file_id');
            $table->enum('phase', ['1', '2', '3', '4', '5', '6']);
            $table->string('name');
            $table->string('path')->nullable();
            $table->string('link')->nullable();
            $table->string('note')->nullable();
            $table->integer('type');
            $table->boolean('isSecret')->default(0);
            $table->boolean('isApprove')->default(0);
            $table->dateTime('startTime')->nullable();
            $table->dateTime('endTime')->nullable();
            $table->timestamps();

            $table->foreign('file_id')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_submissions');
    }
};
