<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestamo extends Model
{
    use HasFactory;

    protected $table = 'prestamos';

    protected $fillable = [
        'id',
        'descripcion',
        'importe',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
