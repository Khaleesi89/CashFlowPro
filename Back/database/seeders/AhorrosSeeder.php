<?php

namespace Database\Seeders;
use App\Models\Ahorro;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AhorrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //usuario 2

        //meta 2
        Ahorro::create([
            'descripcion' => "barilo",
            'user_id' => "2",
            'meta_id' => "2",
            'importe' => "5000",
            'periodoCorrespondiente' => "11/2023"
        ]);
        
        Ahorro::create([
            'descripcion' => "vacaciones octubre",
            'user_id' => "2",
            'meta_id' => "2",
            'importe' => "1000",
            'periodoCorrespondiente' => "10/2023"
        ]);
        //usuario 1

        //meta 1
        Ahorro::create([
            'descripcion' => "vacaciones",
            'user_id' => "1",
            'meta_id' => "1",
            'importe' => "23000",
            'periodoCorrespondiente' => "11/2023"
        ]);


        //meta 3
        Ahorro::create([
            'descripcion' => "celu octubre",
            'user_id' => "1",
            'meta_id' => "3",
            'importe' => "20000",
            'periodoCorrespondiente' => "10/2023"
        ]);

        Ahorro::create([
            'descripcion' => "celu septiembre",
            'user_id' => "1",
            'meta_id' => "3",
            'importe' => "200",
            'periodoCorrespondiente' => "09/2023"
        ]);

        Ahorro::create([
            'descripcion' => "celu agosto",
            'user_id' => "1",
            'meta_id' => "3",
            'importe' => "2000",
            'periodoCorrespondiente' => "08/2023"
        ]);

        

    }
}
