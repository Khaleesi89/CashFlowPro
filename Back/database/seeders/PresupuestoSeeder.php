<?php

namespace Database\Seeders;

use App\Models\Presupuesto;
use Illuminate\Database\Seeder;

class PresupuestoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //INGRESO
        Presupuesto::create([
            'descripcion' => "sueldo octubre",
            'importe' =>  "100000",
            'entidad' => "",
            'user_id' => "1",
            'ingreso_id' => "1",
            'gasto_id' => NULL,
            'ahorro_id' => NULL,
            'inversion_id' => NULL,
            'prestamo_id' => NULL,
        ]);

        //AHORRO
        Presupuesto::create([
            'descripcion' => "vacaciones",
            'importe' =>  "23000",
            'entidad' => "",
            'user_id' => "1",
            'ingreso_id' => NULL,
            'gasto_id' => NULL,
            'ahorro_id' => "1",
            'inversion_id' => NULL,
            'prestamo_id' => NULL,
        ]);

        //GASTO
        Presupuesto::create([
            'descripcion' => "patente mensual",
            'importe' =>  "234",
            'entidad' => "",
            'user_id' => "2",
            'ingreso_id' => NULL,
            'gasto_id' => "1",
            'ahorro_id' => NULL,
            'inversion_id' => NULL,
            'prestamo_id' => NULL,
        ]);

        // INVERSIONES
        Presupuesto::create([
            'descripcion' => "compra dolares",
            'importe' =>  "14000",
            'entidad' => "banco galicia",
            'user_id' => "2",
            'ingreso_id' => NULL,
            'gasto_id' => NULL,
            'ahorro_id' => NULL,
            'inversion_id' => "1",
            'prestamo_id' => NULL,
        ]);

        //PRESTAMOS
        Presupuesto::create([
            'descripcion' => NULL,
            'importe' =>  "2433",
            'entidad' => "Cristian",
            'user_id' => "1",
            'ingreso_id' => NULL,
            'gasto_id' => NULL,
            'ahorro_id' => NULL,
            'inversion_id' => NULL,
            'prestamo_id' => "1",
        ]);
    }
}
