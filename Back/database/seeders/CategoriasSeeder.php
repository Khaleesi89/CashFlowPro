<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

         /* CATEGORIAS INGRESOS */

        Categoria::create([
            'descripcion' => "sueldo",
            'user_id' => "1",
            'tipo_categoria' => "ingreso",
        ]);

        Categoria::create([
            'descripcion' => "venta articulos",
            'user_id' => "2",
            'tipo_categoria' => "ingreso",
        ]);

        Categoria::create([
            'descripcion' => "donación",
            'user_id' => "2",
            'tipo_categoria' => "ingreso",
        ]);

        Categoria::create([
            'descripcion' => "aguinaldo",
            'user_id' => "1",
            'tipo_categoria' => "ingreso",
        ]);

        Categoria::create([
            'descripcion' => "dividendo",
            'user_id' => "2",
            'tipo_categoria' => "ingreso",
        ]);

           /* CATEGORIAS GASTOS */

        Categoria::create([
            'descripcion' => "patente",
            'user_id' => "2",
            'tipo_categoria' => "gasto",
        ]);

        Categoria::create([
            'descripcion' => "obra social",
            'user_id' => "1",
            'tipo_categoria' => "gasto",
        ]);

        Categoria::create([
            'descripcion' => "combustible",
            'user_id' => "1",
            'tipo_categoria' => "gasto",
        ]);

        Categoria::create([
            'descripcion' => "sushi",
            'user_id' => "1",
            'tipo_categoria' => "gasto",
        ]);

        Categoria::create([
            'descripcion' => "alquiler",
            'user_id' => "1",
            'tipo_categoria' => "gasto",
        ]);


    }
}
