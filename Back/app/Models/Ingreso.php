<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
    use HasFactory;

    protected $table = 'ingresos';

    protected $fillable = [
        'id',
        'descripcion',
        'importe',
        'user_id',
        'categoria_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
