<?php

namespace Database\Seeders;
use App\Models\Inversion;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InversionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //usuario 2
        Inversion::create([
            'descripcion' => "compra dolares",
            'importe' => "14000",
            'entidad' => "Banco Galicia",
            'user_id' => "2",
            'periodoCorrespondiente' => "11/2023"
           ]);

        Inversion::create([
            'descripcion' => "fondo de inversión",
            'importe' => "12000",
            'entidad' => "Balanz",
            'user_id' => "2",
            'periodoCorrespondiente' => "11/2023"
           ]);

        // usuario 1
        Inversion::create([
            'descripcion' => "plazo fijo",
            'importe' => "4300",
            'entidad' => "Banco Galicia",
            'user_id' => "1",
            'periodoCorrespondiente' => "01/2023"
           ]);

        Inversion::create([
            'descripcion' => "fondo de inversión",
            'importe' => "12000",
            'entidad' => "Balanz",
            'user_id' => "1",
            'periodoCorrespondiente' => "10/2023"
        ]);

        Inversion::create([
            'descripcion' => "compra dolares",
            'importe' => "14000",
            'entidad' => "Banco Galicia",
            'user_id' => "1",
            'periodoCorrespondiente' => "11/2023"
           ]);
}
}
