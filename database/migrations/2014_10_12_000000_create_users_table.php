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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('isActive')->default(1);
            $table->string('telegram_username')->nullable();
            $table->string('telegram_chat_id')->nullable();

            $table->uuid('position_id');
            $table->unsignedBigInteger('dirut_id')->nullable();
            $table->unsignedBigInteger('dir_id')->nullable();
            $table->unsignedBigInteger('bm_id')->nullable();
            $table->unsignedBigInteger('asmen_id')->nullable();
            $table->unsignedBigInteger('brm_id')->nullable();
            $table->unsignedBigInteger('ca_id')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('position_id')->references('id')->on('positions');
            $table->foreign('dirut_id')->references('id')->on('users');
            $table->foreign('dir_id')->references('id')->on('users');
            $table->foreign('bm_id')->references('id')->on('users');
            $table->foreign('asmen_id')->references('id')->on('users');
            $table->foreign('brm_id')->references('id')->on('users');
            $table->foreign('ca_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
