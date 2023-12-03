<?php

namespace Database\Seeders;
use App\Models\Prestamo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrestamosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //usuario 1
        Prestamo::create([
            'descripcion' => "Cristian",
            'importe' => "2433",
            'user_id' => "1",
            'periodoCorrespondiente' => "11/2023"
           ]);
           Prestamo::create([
               'descripcion' => "Laura",
               'importe' => "24343",
               'user_id' => "1",
               'periodoCorrespondiente' => "10/2023"
           ]);
        
           Prestamo::create([
            'descripcion' => "Cristian",
            'importe' => "2433",
            'user_id' => "1",
            'periodoCorrespondiente' => "01/2023"
           ]);
           Prestamo::create([
               'descripcion' => "Laura",
               'importe' => "24343",
               'user_id' => "1",
               'periodoCorrespondiente' => "09/2023"
           ]);

        //usuario 2
        Prestamo::create([
            'descripcion' => "Cristian",
            'importe' => "12433",
            'user_id' => "2",
            'periodoCorrespondiente' => "12/2023"
        ]);
    }
}
