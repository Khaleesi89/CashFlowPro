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
        Prestamo::create([
            'descripcion' => "Cristian",
            'importe' => "2433",
            'user_id' => "1",
           ]);
        Prestamo::create([
            'descripcion' => "Cristian",
            'importe' => "12433",
            'user_id' => "2",
        ]);
        Prestamo::create([
            'descripcion' => "Laura",
            'importe' => "24343",
            'user_id' => "1",
        ]);
    }
}
