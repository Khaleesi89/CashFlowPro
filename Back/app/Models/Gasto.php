<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    protected $table = 'gastos';

    protected $fillable = [
        'id',
        'descripcion',
        'importe',
        'fecha_vencimiento',
        'user_id',
        'categoria_id',
        
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
