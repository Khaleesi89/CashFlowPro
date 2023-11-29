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
            'fecha_vencimiento' => 'required|date',
            'categoria_id' => 'required|integer',
        ]);

        // Crea un nuevo ingreso
        $gastos = Gasto::create([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
            'fecha_vencimiento' => $request->input('fecha_vencimiento'),
            'user_id' => auth()->user()->id, // Asigna el ID del usuario actual
            'categoria_id' => $request->input('categoria_id'),
        ]);

        return response()->json(['message' => 'Gasto creado con éxito', 'data' => $gastos], 201);
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
