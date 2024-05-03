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
        Schema::table('roles', function (Blueprint $table) {
            $table->boolean('isPhase1Access')->default(true);
            $table->boolean('isPhase2Access')->default(false);
            $table->boolean('isPhase3Access')->default(false);
            $table->boolean('isPhase4Access')->default(false);
            // $table->boolean('canApprovePhase1')->default(true);
            // $table->boolean('canApprovePhase2')->default(false);
            // $table->boolean('canApprovePhase3')->default(false);
            // $table->boolean('canApprovePhase4')->default(false);
            // $table->boolean('canAppeal')->default(false);
            // $table->boolean('canApprove')->default(false);
            // $table->boolean('canInsertData')->default(false);
            // $table->boolean('canComment')->default(false);
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
