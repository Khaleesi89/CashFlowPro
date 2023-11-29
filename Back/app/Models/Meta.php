<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meta extends Model
{
    use HasFactory;

    protected $table = 'metas';

    protected $fillable = [
        'id',
        'user_id',
        'descripcion',
        'importe',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
