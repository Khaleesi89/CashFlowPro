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
            $table->string('descripcion')->nullable();
            $table->string('importe');
            $table->string('entidad')->nullable();//se uso unsigneBigInteger porque el foreingId no permite valores nulos
            $table->unsignedBigInteger('user_id')->constrained('users');
            $table->unsignedBigInteger('ingreso_id')->constrained('ingresos')->nullable();
            $table->unsignedBigInteger('gasto_id')->constrained('gastos')->nullable();
            $table->unsignedBigInteger('ahorro_id')->constrained('ahorros')->nullable();
            $table->unsignedBigInteger('inversion_id')->constrained('inversiones')->nullable();
            $table->unsignedBigInteger('prestamo_id')->constrained('prestamos')->nullable();
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
