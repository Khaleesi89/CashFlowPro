<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Gasto;
use App\Models\Ingreso;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';

    protected $fillable = [
        'id',
        'descripcion',
        'user_id',
        'tipo_categoria',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function ingresos():HasMany
    {
        return $this->hasMany(Ingreso::class, 'categoria_id');
    }

    public function gastos():HasMany
    {
        return $this->hasMany(Gasto::class, 'categoria_id');
    }
}
