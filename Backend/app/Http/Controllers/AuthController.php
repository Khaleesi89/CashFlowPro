<?php

namespace App\Http\Controllers;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

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
    $validator = Validator::make($request->input(),$rules);
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
        'usuario'=> $usuario,
        /* 'token' => $usuario->createToken('API TOKEN')->plainTextToken */]
        ,200); //pongo el codigo de status
    }


   /*  public function login(Request $request){   //EL LOGIN QUE ESTABA USANDO
        if(!Auth::attempt($request->only('usuario','password'))){
            return response([
                'message' => 'Sus credenciales son inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken; */
        /*si usamos  la capacidad de utilizar argumentos nombrados, lo que significa que puedes especificar 
        el nombre de los argumentos al llamar a una función. Cuando utilizas argumentos nombrados, todos 
        los argumentos siguientes también deben ser nombrados.*/
        /* $cookie = cookie(name:'jwt', value: $token, minutes:60*24);//es un día
        return response([
            'message' => 'Login exitoso'
        ], 200)->withCookie($cookie);
    } */



    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'usuario' => 'required',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Sus credenciales son inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = User::where('usuario', $request->usuario)->first();
        if($user){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('token')->accessToken;
                return response()->json([
                    "status" => 200,
                    "message" => "Usuario logeado correctamente!",
                    "access_token" => $token,
                    "auth_usuario" => $user
                ]);
            }else{
                return response()->json([
                    "status" => 401,
                    "message" => "Alguno de los datos ingresados no son correctos."
                ]);
            }
        }else{
            return response()->json([
                "status" => 401,
                "message" => "Usuario no registrado en ntras bases."
            ]);
        }
    }


    public function buscarPerfil(Request $request){
        return response()->json([
            "status" => 200,
            "message" => "Acerca del perfil de usuario",
            "data" => $request->user()
        ]);

    }

    //LOGOUT Y ELIMINACION DEL TOKEN
    public function logout(Request $request){
        $token = $request->user()->token();
            $token->revoke();
            return response()->json([
                "status" => 200,
                "message" => 'Logout exitoso',
            ]);
    }


    /* public function logout(Request $request){
        $cookie = Cookie::forget('jwt');
        return response([
            'message' => 'Logout exitoso'
        ])->withCookie($cookie);
    } */
}
