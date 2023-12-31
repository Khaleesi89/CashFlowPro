<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\AhorroController;
use App\Http\Controllers\PresupuestoController;
use App\Http\Controllers\MonedaController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\GastoController;




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
Route::get('/categorias/{id}', [CategoriaController::class, 'categoriasUsuario']);
Route::post('/categoria-alta', [CategoriaController::class, 'create']);
Route::post('/categoria-editar', [CategoriaController::class, 'update']);

/* METAS */
Route::get('/metas/{id}', [MetaController::class, 'metasUsuario']);
Route::post('/metas-alta', [MetaController::class, 'create']);
Route::get('/meta/{id}', [MetaController::class, 'metaEspecifica']);



/* AHORROS */
Route::post('/ahorro-alta', [AhorroController::class, 'create']);
Route::get('/ahorrovsmetas/{id}', [AhorroController::class, 'progresoMetas']);
Route::get('/ahorroPorMeta/{id}', [AhorroController::class, 'ahorroPorMeta']);



/* PRESUPUESTOS */
Route::controller(PresupuestoController::class)->group(function () {
    // Ruta para mostrar el presupuesto del mes actual
    //el problema de este fecha seleccionada que no trae lo del mes sino del dia actual
    Route::get('/presupuestos/{user_id}/{fechaSeleccionada}', 'mostrarPresupuestos');   
    Route::post('/graficos/{user_id}' ,'paraGrafico');   

});

/* MONEDA */
Route::get('/conversion', [MonedaController::class, 'obtenerMonedas']);

/* INGRESOS */
Route::post('/ingreso-alta', [IngresoController::class, 'store']);

/* GASTOS */
Route::post('/gasto-alta', [GastoController::class, 'store']);
