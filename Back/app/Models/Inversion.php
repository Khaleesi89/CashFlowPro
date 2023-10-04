<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inversion extends Model
{
    use HasFactory;

    protected $table = 'inversiones';

    protected $fillable = [
        'id',
        'descripcion',
        'importe',
        'entidad',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
