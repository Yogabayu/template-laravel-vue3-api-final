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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('isPhase1Access')->default(true);
            $table->boolean('isPhase2Access')->default(false);
            $table->boolean('isPhase3Access')->default(false);
            $table->boolean('isPhase4Access')->default(false);
            $table->boolean('canAppeal')->default(false);
            $table->boolean('canApprove')->default(false);
            $table->boolean('canInsertData')->default(false);
            $table->boolean('canComment')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
