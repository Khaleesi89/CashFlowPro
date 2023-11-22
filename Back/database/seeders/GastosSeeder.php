<?php

namespace Database\Seeders;
use App\Models\Gasto;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GastosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //usuario 1

        Gasto::create([
            'descripcion' => "alquiler mes octubre",
            'importe' => "1000",
            'fecha_vencimiento' => "20/10/2023",
            'user_id' => "1",
            'categoria_id' => "9",
            'periodoCorrespondiente' => "11/2023"
           ]);

        Gasto::create([
            'descripcion' => "sushi con mama",
            'importe' => "432",
            'fecha_vencimiento' => "20/10/2023",
            'user_id' => "1",
            'categoria_id' => "8",
            'periodoCorrespondiente' => "10/2023"
           ]);

        Gasto::create([
            'descripcion' => "combustible cachirulito",
            'importe' => "876",
            'fecha_vencimiento' => "20/10/2023",
            'user_id' => "1",
            'categoria_id' => "7",
            'periodoCorrespondiente' => "9/2023"
           ]);

        Gasto::create([
            'descripcion' => "adicional obra social",
            'importe' => "988",
            'fecha_vencimiento' => "20/10/2023",
            'user_id' => "1",
            'categoria_id' => "6",
            'periodoCorrespondiente' => "11/2023"
           ]);


        //usuario 2
        Gasto::create([
            'descripcion' => "patente mensual",
            'importe' => "234",
            'fecha_vencimiento' => "20/10/2023",
            'user_id' => "2",
            'categoria_id' => "10",
            'periodoCorrespondiente' => "11/2023"
           ]);

        Gasto::create([
        'descripcion' => "adicional obra social",
        'importe' => "988",
        'fecha_vencimiento' => "20/10/2023",
        'user_id' => "2",
        'categoria_id' => "11",
        'periodoCorrespondiente' => "10/2023"
        ]);

       
    }
}
