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
        Inversion::create([
            'descripcion' => "compra dolares",
            'importe' => "14000",
            'entidad' => "Banco Galicia",
            'user_id' => "2",
           ]);

        Inversion::create([
            'descripcion' => "fondo de inversión",
            'importe' => "12000",
            'entidad' => "Balanz",
            'user_id' => "2",
           ]);

        Inversion::create([
            'descripcion' => "plazo fijo",
            'importe' => "4300",
            'entidad' => "Banco Galicia",
            'user_id' => "1",
           ]);
    }
}
