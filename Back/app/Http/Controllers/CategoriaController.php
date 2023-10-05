<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{


    /* FUNCION PARA CREAR UNA CATEGORIA NUEVA */
    public function create(Request $request)
    {
        //VALIDA QUE NO EXISTA ESA CATEGORIA CON ESE USUARIO LOGUEADO
        $validator = \Validator::make($request->all(), [
            'descripcion' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    $existeCategoria = Categoria::where('descripcion', $value)
                        ->where('user_id', $request->user_id)
                        ->where('tipo_categoria', $request->tipo_categoria)
                        ->exists();

                    if ($existeCategoria) {
                        $fail('Ya existe una categoría con este nombre, usuario y tipo de categoria para este usuario.');
                    }
                },
            ],
            'tipo_categoria' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Si no hay errores de validación, crea la categoría
        $categoria = Categoria::create($request->all());

        return response()->json(['message' => 'Categoría creada exitosamente.', 'categoria' => $categoria], 201);
    }



    /* FUNCION PARA MODIFICAR LA CATEGORIA YA EXISTENTE */
    //debo pasar el id de la categoria, el id usuario, la descripicion y el tipo de categoria


    public function update(Request $request) {
            //VALIDA QUE NO EXISTA ESA CATEGORIA CON ESE USUARIO LOGUEADO
            $validator = \Validator::make($request->all(), [
                'descripcion' => [
                    'required',
                    function ($attribute, $value, $fail) use ($request) {
                        $existeCategoria = Categoria::where('descripcion', $value)
                            ->where('user_id', $request->user_id)
                            ->where('tipo_categoria', $request->tipo_categoria)
                            ->exists();

                        if ($existeCategoria) {
                            $fail('Ya existe una categoría con este nombre, usuario y tipo de categoria para este usuario.');
                        }
                    },
                ],
                'tipo_categoria' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            // Si no hay errores de validación, busca la categoria y la modifica 
            $categoria = Categoria::find($request->id);
            $categoria->update($request->all());

            return response()->json(['message' => 'Categoría modificada exitosamente.', 'categoria' => $categoria], 201);
    }






    /* devuelve todas las categorías de un usuario específico en formato JSON */
    public function categoriasUsuario($id){
        $categorias = Categoria::where('user_id',$id)->get();
        return $categorias->toJson();
    }


    /* BUSCAR CATEGORIA POR ID */

    /* public function categoriasBuscarId($idCategoria, $idUsuario){
        //primero corroboro que ese usuario tenga la categoria que le llego por parametro
        $categoriaEsUsuario = Categoria::where('user_id', $idUsuario)->where('id', $idCategoria)->exists();
        if($categoriaEsUsuario){
            $categoriaModificar = Categoria::find($idCategoria);
            return $categoriaModificar->toJson();
        }
    } */
    
}
