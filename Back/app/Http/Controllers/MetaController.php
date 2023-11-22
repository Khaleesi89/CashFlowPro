<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meta;

class MetaController extends Controller
{
    //buscamos todas las metas del usuario logueado
    public function metasUsuario($idUsuario){
        $metas = Meta::where('user_id',$idUsuario)->get();
       /*  if($metas->isEmpty()){
            return 
        } */
        return $metas->toJson();
    }


    

    //crea las metas del usuario logueado

        public function create(Request $request)
        {
        //VALIDA QUE NO EXISTA ESA CATEGORIA CON ESE USUARIO LOGUEADO
        $validator = \Validator::make($request->all(), [
            'descripcion' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    $existeCategoria = Meta::where('descripcion', $value)
                        ->where('user_id', $request->user_id)
                        ->exists();

                    if ($existeCategoria) {
                        $fail('Ya existe una meta con este nombre con el usuario logueado');
                    }
                },
            ],
            'importe' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Si no hay errores de validación, crea la categoría
        $meta = Meta::create($request->all());

        return response()->json(['message' => 'Meta creada exitosamente.', 'meta' => $meta], 201);
    }
}
