<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presupuesto extends Model
{
    use HasFactory;

    protected $table = 'presupuestos';

    protected $fillable = [
        'id',
        'descripcion',
        'importe',
        'entidad',
        'user_id',
        'ingreso_id',
        'gasto_id',
        'ahorro_id',
        'inversion_id',
        'prestamo_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function ingreso()
    {
        return $this->belongsTo(Ingreso::class, 'ingreso_id');
    }

    public function gasto()
    {
        return $this->belongsTo(Gasto::class, 'gasto_id');
    }

    public function ahorro()
    {
        return $this->belongsTo(Ahorro::class, 'ahorro_id');
    }

    public function inversion()
    {
        return $this->belongsTo(Inversion::class, 'inversion_id');
    }

    public function prestamo()
    {
        return $this->belongsTo(Prestamo::class, 'prestamo_id');
    }

}
