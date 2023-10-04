<?php

namespace Database\Seeders;
use App\Models\Meta;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MetasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            Meta::create([
                'user_id' => "1",
                'descripcion' => "vacaciones España",
                'importe' => "300000",
            ]);

            Meta::create([
                'user_id' => "2",
                'descripcion' => "vacaciones Bariloche",
                'importe' => "78000",
            ]);

            Meta::create([
                'user_id' => "1",
                'descripcion' => "compra Celular",
                'importe' => "35000",
            ]);
    }
}
