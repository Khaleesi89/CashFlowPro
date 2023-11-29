<?php

namespace App\Http\Controllers;

use App\Models\Inversion;
use Illuminate\Http\Request;

class InversionController extends Controller
{
    public function index()
    {
        $inversiones = Inversion::all();
        return response()->json($inversiones);
    }

    public function store(Request $request)
    {
        // Valida los datos de entrada
        $request->validate([
            'descripcion' => 'required|string',
            'importe' => 'required|numeric',
            'entidad' => 'required|string',
        ]);

        // Crea un nuevo ingreso
        $inversiones = Inversion::create([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
            'entidad' => $request->input('entidad'),
            'user_id' => auth()->user()->id, // Asigna el ID del usuario actual
        ]);

        return response()->json(['message' => 'Inversión creada con éxito', 'data' => $inversiones], 201);
    }

    public function update(Request $request, $id)
    {
        // Valida los datos de entrada
        $request->validate([
            'descripcion' => 'required|string',
            'importe' => 'required|numeric',
            'entidad' => 'required|string',
        ]);

        // Busca la inversion por su ID
        $inversiones = Inversion::find($id);

        if (!$inversiones) {
            return response()->json(['message' => 'Inversión no encontrada'], 404);
        }

        // Actualiza los campos de la inversion
        $inversiones->update([
            'descripcion' => $request->input('descripcion'),
            'importe' => $request->input('importe'),
            'entidad' => $request->input('entidad'),
        ]);

        return response()->json(['message' => 'Inversión actualizada con éxito', 'data' => $inversiones]);
    }

    public function destroy($id)
    {
        // Busca la inversion por su ID
        $inversiones = Inversion::find($id);

        if (!$inversiones) {
            return response()->json(['message' => 'Inversión no encontrada'], 404);
        }

        // Elimina la inversion
        $inversiones->delete();

        return response()->json(['message' => 'Inversión eliminada con éxito']);
    }

}