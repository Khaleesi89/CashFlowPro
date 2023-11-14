<?php

namespace Database\Seeders;
use App\Models\Ingreso;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngresosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //usuario 1
        Ingreso::create([
            'descripcion' => "sueldo octubre",
            'importe' => "100000",
            'user_id' => "1",
            'categoria_id' => "1",
        ]);

        Ingreso::create([
            'descripcion' => "aguinaldo junio",
            'importe' => "178888",
            'user_id' => "1",
            'categoria_id' => "2",
        ]);



        //usuario 2

        Ingreso::create([
            'descripcion' => "dividendos Balanz",
            'importe' => "45000",
            'user_id' => "2",
            'categoria_id' => "5",
        ]);

        Ingreso::create([
            'descripcion' => "regalo de abuela",
            'importe' => "90000",
            'user_id' => "2",
            'categoria_id' => "3",
        ]);

    }
}
