<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ahorro;
use Illuminate\Http\Request;

class AhorroController extends Controller
{
    public function create(Request $request)
        {
        //VALIDA QUE NO EXISTA ESA CATEGORIA CON ESE USUARIO LOGUEADO
        $validator = \Validator::make($request->all(), [
            'descripcion' => 'required',
            'meta_id' => 'required',
            'importe' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Si no hay errores de validación, crea la categoría
        $ahorro = Ahorro::create($request->all());

        return response()->json(['message' => 'Ahorro creado exitosamente.', 'ahorro' => $ahorro], 201);
    }
}
