<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


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


    public function categorias():BelongsTo{
        return $this->belongsTo(Categoria::class, 'categoria_id');

    }
    
}
