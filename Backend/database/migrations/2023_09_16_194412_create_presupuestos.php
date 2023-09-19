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
        Schema::create('presupuestos', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->string('importe');
            $table->string('entidad');
            $table->foreignId('perfil_id')->constrained('perfiles');
            $table->foreignId('ingreso_id')->constrained('ingresos')->nullable();
            $table->foreignId('gasto_id')->constrained('gastos')->nullable();
            $table->foreignId('ahorro_id')->constrained('ahorros')->nullable();
            $table->foreignId('inversion_id')->constrained('inversiones')->nullable();
            $table->foreignId('prestamo_id')->constrained('prestamos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presupuestos');
    }
};
