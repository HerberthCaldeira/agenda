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
        Schema::create('agenda_user', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('agenda_id');
            $table->boolean('can_see')->default(false);
            $table->boolean('can_edit')->default(false);
            $table->primary(['user_id', 'agenda_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agenda_user');
    }
};
