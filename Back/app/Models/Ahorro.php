<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ahorro extends Model
{
    use HasFactory;

    protected $table = 'ahorros';

    protected $fillable = [
        'id',
        'descripcion',
        'user_id',
        'meta_id',
        'importe',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

}
