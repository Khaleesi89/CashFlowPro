<?php

namespace App\Http\Controllers;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function user(){
        return Auth::user();
    }


    /* public function register(Request $request){
        return User::create([
            'nombre' => $request->input('nombre'),
            'apellido' => $request->input('apellido'),
            'usuario' => $request->input('usuario'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'color' => $request->input('color')   

        ]);
        
    } */


    public function register(Request $request){
        $rules = [
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'usuario' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|max:10',
            'color' => 'required|string|max:10',
            
    ];
    $validator = \Validator::make($request->input(),$rules);
    if($validator->fails()){
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()->all()]
            ,400); //pongo el codigo de status
    }
    //si todo sale bien creamois registro
    $usuario = User::create([
        'nombre' => $request->input('nombre'),
        'apellido' => $request->input('apellido'),
        'usuario' => $request->input('usuario'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'color' => $request->input('color')   

    ]);
    $usuario->save();
    return response()->json([
        'status' => true,
        'message' => 'Su usuario ha sido creado',
        'usuario'=> $usuario]
        ,200); //pongo el codigo de status
    }


    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Sus credenciales son inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        /*si usamos  la capacidad de utilizar argumentos nombrados, lo que significa que puedes especificar 
        el nombre de los argumentos al llamar a una función. Cuando utilizas argumentos nombrados, todos 
        los argumentos siguientes también deben ser nombrados.*/
        $cookie = cookie(name:'jwt', value: $token, minutes:60*24);//es un día
        return response([
            'message' => 'Login exitoso'
        ], 200)->withCookie($cookie);
    }



    public function logout(Request $request){
        $cookie = Cookie::forget('jwt');
        return response([
            'message' => 'Logout exitoso'
        ])->withCookie($cookie);
    }
}
