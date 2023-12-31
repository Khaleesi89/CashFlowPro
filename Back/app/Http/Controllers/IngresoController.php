<?php

namespace App\Http\Controllers;

use App\Models\Ingreso;
use Illuminate\Http\Request;

class IngresoController extends Controller
{
    public function index()
    {
        $ingresos = Ingreso::all();
        return response()->json($ingresos);
    }

    public function store(Request $request)
    {
        // Valida los datos de entrada
        $request->validate([
            'descripcion' => 'required|string',
            'importe' => 'required|numeric',
            'periodoCorrespondiente' => 'required|string|regex:/^\d{1,2}\/\d{4}$/',
            
            /* 'categoria_id' => 'required', */
        ]);

        // Crea un nuevo ingreso
        $ingreso = Ingreso::create([
            'descripcion' => $request->descripcion,
            'importe' => $request->importe,
            'user_id' =>$request->user_id, // Asigna el ID del usuario actual
            'categoria_id' => $request->categoria_id,
            'periodoCorrespondiente' =>$request->periodoCorrespondiente
        ]);

        return response()->json(['message' => 'Ingreso creado con éxito', 'data' => $ingreso], 201);
    }

    public function update(Request $request, $id)
    {
        // Valida los datos de entrada
        $request->validate([
            'descripcion' => 'required|string',
            'importe' => 'required|numeric',
            'categoria_id' => 'required|integer',
        ]);

        // Busca el ingreso por su ID
        $ingreso = Ingreso::find($id);

        if (!$ingreso) {
            return response()->json(['message' => 'Ingreso no encontrado'], 404);
        }

        // Actualiza los campos del ingreso
        $ingreso->update([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
            'categoria_id' => $request->input('categoria_id'),
        ]);

        return response()->json(['message' => 'Ingreso actualizado con éxito', 'data' => $ingreso]);
    }

    public function destroy($id)
    {
        // Busca el ingreso por su ID
        $ingreso = Ingreso::find($id);

        if (!$ingreso) {
            return response()->json(['message' => 'Ingreso no encontrado'], 404);
        }

        // Elimina el ingreso
        $ingreso->delete();

        return response()->json(['message' => 'Ingreso eliminado con éxito']);
    }

}
