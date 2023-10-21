<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use Illuminate\Http\Request;

class PrestamoController extends Controller
{
    public function index()     //hay que cambiar DEUDOR POR DESCRIPCION
    {
        $prestamos = Prestamo::all();
        return response()->json($prestamos);
    }

    public function store(Request $request)
    {
        // Valida los datos de entrada
        $request->validate([
            'deudor' => 'required|string',
            'importe' => 'required|numeric',
        ]);

        // Crea un nuevo Prestamo
        $prestamos = Prestamo::create([
            'user_id' => auth()->user()->id, // Asigna el ID del usuario actual
            'deudor' => $request->input('deudor'),
            'importe' => $request->input('importe'),
        ]);

        return response()->json(['message' => 'Prestamo creado con éxito', 'data' => $prestamos], 201);
    }

    public function update(Request $request, $id)
    {
        // Valida los datos de entrada
        $request->validate([
            'deudor' => 'required|string',
            'importe' => 'required|numeric',
        ]);

        // Busca el prestamo por su ID
        $prestamos = Prestamo::find($id);

        if (!$prestamos) {
            return response()->json(['message' => 'Prestamo no encontrado'], 404);
        }

        // Actualiza los campos del prestamo
        $prestamos->update([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
        ]);

        return response()->json(['message' => 'Prestamo actualizado con éxito', 'data' => $prestamos]);
    }

    public function destroy($id)
    {
        // Busca el ingreso por su ID
        $prestamos = Prestamo::find($id);

        if (!$prestamos) {
            return response()->json(['message' => 'Prestamo no encontrado'], 404);
        }

        // Elimina el prestamo
        $prestamos->delete();

        return response()->json(['message' => 'Prestamo eliminado con éxito']);
    }

}