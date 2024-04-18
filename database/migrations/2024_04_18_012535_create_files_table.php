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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('phase', ['1', '2', '3', '4']);
            $table->string('plafon')->comment('plafon pinjaman')->nullable();
            $table->longText('surveyResult')->comment('hasil survei')->nullable();
            $table->longText('otsResult')->comment('ots')->nullable();
            $table->longText('cekLingResult')->comment('cek lingkungan')->nullable();
            $table->longText('verTelResult')->comment('cek verifikasi telepon')->nullable();
            $table->longText('creditScoring')->comment('credit scoring')->nullable();
            $table->boolean('isApproved')->default(0);
            $table->boolean('isAppealed')->default(0);
            $table->string('file1')->comment('ktp pemohon')->nullable();
            $table->string('file2')->comment('ktp pasangan, jika sudah menikah')->nullable();
            $table->string('file3')->comment('ktp penjamin jika agunan bukan milik pemohon')->nullable();
            $table->string('file4')->comment('kk')->nullable();
            $table->string('file5')->comment('buku nikah')->nullable();
            $table->string('file6')->comment('slik')->nullable();
            $table->string('file7')->comment('shm')->nullable();
            $table->string('file8')->comment('bpkb')->nullable();
            $table->string('file9')->comment('foto detail mesin')->nullable();
            $table->string('file10')->comment('foto kunjungan')->nullable();
            $table->string('file11')->comment('berkas lain')->nullable();
            $table->string('file12')->comment('berkas lain')->nullable();
            $table->string('file13')->comment('berkas lain')->nullable();
            $table->string('file14')->comment('berkas lain')->nullable();
            $table->string('file15')->comment('berkas lain')->nullable();
            $table->string('file16')->comment('berkas lain')->nullable();
            $table->string('file17')->comment('berkas lain')->nullable();
            $table->string('file18')->comment('berkas lain')->nullable();
            $table->string('file19')->comment('berkas lain')->nullable();
            $table->string('file20')->comment('berkas lain')->nullable();
            $table->string('file21')->comment('berkas lain')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
