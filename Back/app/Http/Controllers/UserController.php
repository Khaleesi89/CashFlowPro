<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
   
    public function setColor(Request $request){
        try {
            
            //$idUsuario = Auth::id();
            $usuario = User::find($request->id);
            $usuario->color = $request->color;
            $usuario->save();    
            return response()->json(true);
        } catch (\Exception $e) {
            return response()->json(false);
        }
    }
        
    
        
}

