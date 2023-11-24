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
            'periodoCorrespondiente' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Si no hay errores de validación, crea la categoría
        $ahorro = Ahorro::create($request->all());

        return response()->json(['message' => 'Ahorro creado exitosamente.', 'ahorro' => $ahorro], 201);
    }



    public function progresoMetas($idUsuario){
        $ahorrosPaJson = [];
        $ahorros = Ahorro::where('user_id', $idUsuario)->get();
        foreach ($ahorros as $ahorro) {
            $idAhorro = $ahorro->id;
            $importe = $ahorro->importe;
            $idMeta = $ahorro->meta_id;
            $existe = false;
            foreach ($ahorrosPaJson as &$meta) { // Agrega el signo "&" para obtener una referencia al elemento
                if ($meta['meta_id'] === $idMeta) { // Corrige la comparación utilizando $meta en lugar de $ahorro
                    // Si existe, actualizar el importe
                    $meta['importe'] += $importe; // Utiliza $meta en lugar de $ahorro
                    $existe = true;
                }
            }
            // Si no existe, agregar un nuevo elemento
            if (!$existe) {
                $infoAhorro = [
                    'id' => $idAhorro,
                    'meta_id' => $idMeta,
                    'descripcion' => $ahorro->descripcion,
                    'importe' => $importe
                ];
                array_push($ahorrosPaJson, $infoAhorro);
            }
        }
        return response()->json($ahorrosPaJson);
    }

    public function ahorroPorMeta($idMeta){
        $ahorros = Ahorro::where('meta_id', $idMeta)->get();
        $importeTotal = 0;
        foreach ($ahorros as $ahorro) {
            $importeMeta = $ahorro->importe;
            $importeTotal += $importeMeta;
        }
        return response()->json($importeTotal);
    }

}
