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
        Ahorro::create([
            'descripcion' => "vacaciones",
            'user_id' => "1",
            'meta_id' => "1",
            'importe' => "23000",
        ]);

        Ahorro::create([
            'descripcion' => "barilo",
            'user_id' => "2",
            'meta_id' => "2",
            'importe' => "5000",
        ]);

        Ahorro::create([
            'descripcion' => "celu",
            'user_id' => "1",
            'meta_id' => "3",
            'importe' => "20000",
        ]);

    }
}
