<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


/* NO SE USO SANCTUM PORQUE NO VALIDABA LAS SESIONES */
Route::middleware('auth:sanctum')->group(function(){
    /* Route::get('/user', [AuthController::class, 'user']); */
    /* Route::post('/logout', [AuthController::class, 'logout']); */
    
});

/* PERSONALIZACION */
Route::post('/color', [UserController::class, 'setColor']);

/* CATEGORIAS */
Route::post('/categorias/{id}', [CategoriaController::class, 'categoriasUsuario']);
Route::post('/categoria-alta', [CategoriaController::class, 'create']);
Route::post('/categoria-editar', [CategoriaController::class, 'update']);