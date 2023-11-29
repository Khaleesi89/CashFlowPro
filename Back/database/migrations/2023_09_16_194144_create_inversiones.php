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
        Schema::create('inversiones', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->string('importe');
            $table->string('entidad');
            $table->foreignId('user_id')->constrained('users');
            $table->string('periodoCorrespondiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inversiones');
    }
};
