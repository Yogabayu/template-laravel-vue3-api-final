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
        Schema::table('files', function (Blueprint $table) {
            $table->string('nik_pemohon')->nullable();
            $table->string('nik_pasangan')->nullable();
            $table->string('nik_jaminan')->comment('jika jaminan bukan atas nama')->nullable();
            $table->string('address')->comment('alamat')->nullable();
            $table->string('no_hp')->comment('nomor hp')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            //
        });
    }
};
