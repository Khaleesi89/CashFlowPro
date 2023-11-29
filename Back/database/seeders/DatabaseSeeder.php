<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //para poder ejecutar los seeders y tenga datos precargados en la base de datos
        $this->call(UsersSeeder::class);
        $this->call(CategoriasSeeder::class);
        $this->call(MetasSeeder::class);
        $this->call(AhorrosSeeder::class);
        $this->call(GastosSeeder::class);
        $this->call(IngresosSeeder::class);
        $this->call(InversionesSeeder::class);
        $this->call(PrestamosSeeder::class);
    }
}
