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
            'user_id' => "1",
            'deudor' => "Cristian",
            'importe' => "2433",
           ]);
        Prestamo::create([
            'user_id' => "2",
            'deudor' => "Cristian",
            'importe' => "12433",
        ]);
        Prestamo::create([
            'user_id' => "1",
            'deudor' => "Laura",
            'importe' => "24343",
        ]);
    }
}
