<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nombre' => "Mario",
            'apellido' => "Perez",
            'usuario' => "marito",
            'email' => "marito@gmail.com",
            'password' => "123",
            'color' => "#C2185B",
        ]);

        User::create([
            'nombre' => "Marcia",
            'apellido' => "Kiimisch",
            'usuario' => "khaleesi",
            'email' => "mar@gmail.com",
            'password' => "123",
            'color' => "#C2185B",
           ]);


        User::create([
            'nombre' => "Maximiliano",
            'apellido' => "Hitter",
            'usuario' => "vikingo",
            'email' => "vikingo@gmail.com",
            'password' => "123",
            'color' => "#C2185B",
           ]);

        User::create([
            'nombre' => "Ramona",
            'apellido' => "Ortega",
            'usuario' => "mona",
            'email' => "mona@gmail.com",
            'password' => "123",
            'color' => "#C2185B",
           ]);
    }
}
