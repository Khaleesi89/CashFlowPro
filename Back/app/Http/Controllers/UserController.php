<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function cambioColor(Request $request,$id){
        try {
            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
            }

            $usuario->color = $request->input('color');
            $usuario->save();

            return response()->json(['mensaje' => 'Color de usuario actualizado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['mensaje' => 'Error al actualizar el color del usuario'], 500);
        }
    }
        
}
