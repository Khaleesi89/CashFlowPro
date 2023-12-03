<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;

class GastoController extends Controller
{
    public function index()
    {
        $gastos = Gasto::all();
        return response()->json($gastos);
    }

    // Implementa otros métodos para crear, actualizar y eliminar gastos.
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
        $ingreso = Gasto::create([
            'descripcion' => $request->descripcion,
            'importe' => $request->importe,
            'user_id' =>$request->user_id, // Asigna el ID del usuario actual
            'categoria_id' => $request->categoria_id,
            'periodoCorrespondiente' =>$request->periodoCorrespondiente
        ]);

        return response()->json(['message' => 'Gasto creado con éxito', 'data' => $ingreso], 201);
    }


    public function update(Request $request, $id)
    {
        // Valida los datos de entrada
        $request->validate([
            'descripcion' => 'required|string',
            'importe' => 'required|numeric',
            'fecha_vencimiento' => 'required|date',
            'categoria_id' => 'required|integer',
        ]);

        // Busca el gasto por su ID
        $gastos = Gasto::find($id);

        if (!$gastos) {
            return response()->json(['message' => 'Gasto no encontrado'], 404);
        }

        // Actualiza los campos del gasto
        $gastos->update([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
            'fecha_vencimiento' => $request->input('fecha_vencimiento'),
            'categoria_id' => $request->input('categoria_id'),
        ]);

        return response()->json(['message' => 'Gasto actualizado con éxito', 'data' => $gastos]);
    }

    public function destroy($id)
    {
        // Busca el gasto por su ID
        $gastos = Gasto::find($id);

        if (!$gastos) {
            return response()->json(['message' => 'Gasto no encontrado'], 404);
        }

        // Elimina el gasto
        $gastos->delete();

        return response()->json(['message' => 'Gasto eliminado con éxito']);
    }
}
