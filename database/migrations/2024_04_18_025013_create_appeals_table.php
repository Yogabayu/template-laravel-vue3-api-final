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
        Schema::create('appeals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('user_id');
            $table->string('note')->nullable();
            $table->enum('phase', ['1', '2', '3', '4']);
            $table->string('file1')->comment('additional file')->nullable();
            $table->string('file2')->comment('additional file')->nullable();
            $table->string('file3')->comment('additional file')->nullable();
            $table->string('file4')->comment('additional file')->nullable();
            $table->string('file5')->comment('additional file')->nullable();
            $table->timestamps();

            $table->foreign('file_id')->references('id')->on('files');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appeals');
    }
};
