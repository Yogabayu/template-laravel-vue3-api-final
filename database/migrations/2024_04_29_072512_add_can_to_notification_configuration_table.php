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
        Schema::table('notification_configurations', function (Blueprint $table) {
            $table->boolean('canAppeal')->default(false);
            $table->boolean('canApprove')->default(false);
            $table->boolean('notification')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notificationconfigurations', function (Blueprint $table) {
            //
        });
    }
};
