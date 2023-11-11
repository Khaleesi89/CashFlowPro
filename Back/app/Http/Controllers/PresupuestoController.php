<?php

namespace App\Http\Controllers;

use App\Models\Ahorro;
use App\Models\Gasto;
use App\Models\Ingreso;
use App\Models\Inversion;
use App\Models\Prestamo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PresupuestoController extends Controller
{
    // Mostrar el presupuesto del mes actual
    public function mostrarPresupuestos(Request $request, $user_id, $fechaSeleccionada)
    {
        $fechaDesde = $request->query('fechaDesde');
        $fechaHasta = $request->query('fechaHasta');

        if($fechaDesde) {
            $fechaDesde = explode("-", $fechaDesde);
            $fechaDesde = Carbon::create($fechaDesde[0], $fechaDesde[1], $fechaDesde[2])->format('Y-m-d H:i:s', "America/Argentina/Buenos_Aires");
        }

        if($fechaHasta) {
            $fechaHasta = explode("-", $fechaHasta); 
            $fechaHasta = Carbon::create($fechaHasta[0], $fechaHasta[1], $fechaHasta[2])->format('Y-m-d H:i:s', "America/Argentina/Buenos_Aires");
        }
        

        $ahorroUsuario = Ahorro::where('user_id', $user_id)->get();
        $inversionesUsuario = Inversion::where('user_id', $user_id)->get();
        $gastosUsuario = Gasto::where('user_id', $user_id)->get();
        $ingresosUsuario = Ingreso::where('user_id', $user_id)->get();
        $prestamosUsuario = Prestamo::where('user_id', $user_id)->get();

        if (!$fechaDesde && !$fechaHasta) {
            $ahorroUsuario = Ahorro::where('user_id', $user_id)->where('created_at', 'like', "%$fechaSeleccionada%")->get(); //2023-10-05 00:00:00
            $inversionesUsuario = Inversion::where('user_id', $user_id)->where('created_at', 'like', "%$fechaSeleccionada%")->get();
            $gastosUsuario = Gasto::where('user_id', $user_id)->where('created_at', 'like', "%$fechaSeleccionada%")->get();
            $ingresosUsuario = Ingreso::where('user_id', $user_id)->where('created_at', 'like', "%$fechaSeleccionada%")->get();
            $prestamosUsuario = Prestamo::where('user_id', $user_id)->where('created_at', 'like', "%$fechaSeleccionada%")->get();
        } else {
            $fechaSeleccionada = explode("-", $fechaSeleccionada);
            $fechaSeleccionada = Carbon::create($fechaSeleccionada[0], $fechaSeleccionada[1], $fechaSeleccionada[2])->format('Y-m-d H:i:s', "America/Argentina/Buenos_Aires");
            
            $fechaDesde = $fechaDesde ?? $fechaSeleccionada;
            $fechaHasta = $fechaHasta ?? $fechaSeleccionada;

            $ahorroUsuario = Ahorro::where('user_id', $user_id)->where('created_at', '>=', $fechaDesde)->where('created_at', '<=', $fechaHasta)->get(); //2023-10-05 00:00:00
            $inversionesUsuario = Inversion::where('user_id', $user_id)->where('created_at', '>=', $fechaDesde)->where('created_at', '<=', $fechaHasta)->get();
            $gastosUsuario = Gasto::where('user_id', $user_id)->where('created_at', '>=', $fechaDesde)->where('created_at', '<=', $fechaHasta)->get();
            $ingresosUsuario = Ingreso::where('user_id', $user_id)->where('created_at', '>=', $fechaDesde)->where('created_at', '<=', $fechaHasta)->get();
            $prestamosUsuario = Prestamo::where('user_id', $user_id)->where('created_at', '>=', $fechaDesde)->where('created_at', '<=', $fechaHasta)->get();
        }

        // Calculo los totales de ingresos, gastos, préstamos, ahorros e inversiones
        // $importe = $ingresosUsuario[0]->importe;
        $totalIngresos = 0;
        foreach ($ingresosUsuario as $ingreso) {
            $totalIngresos += $ingreso->importe;
        }

        $totalGastos = 0;
        foreach ($gastosUsuario as $gasto) {
            $totalGastos += $gasto->importe;
        }

        $totalPrestamos = 0;
        foreach ($prestamosUsuario as $prestamo) {
            $totalPrestamos += $prestamo->importe;
        }

        $totalAhorros = 0;
        foreach ($ahorroUsuario as $ahorro) {
            $totalAhorros += $ahorro->importe;
        }
        // return $totalAhorros;

        $totalInversiones = 0;
        foreach ($inversionesUsuario as $inversion) {
            $totalInversiones += $inversion->importe;
        }

        //Calculo el historial completo restando los totales
        $totalHistorial = $totalIngresos - ($totalGastos + $totalPrestamos + $totalAhorros + $totalInversiones);
        // return $historial;

        return response()->json([
            'ingresos' => $ingresosUsuario,
            'ahorro' => $ahorroUsuario,
            'inversiones' => $inversionesUsuario,
            'gastos' => $gastosUsuario,
            'prestamos' => $prestamosUsuario,
            'totalIngresos' => $totalIngresos,
            'totalGastos' => $totalGastos,
            'totalPrestamos' => $totalPrestamos,
            'totalAhorros' => $totalAhorros,
            'totalInversiones' => $totalInversiones,
            'totalHistorial' => $totalHistorial,
        ]);
    }

    public function paraGrafio(Request $request, $id, $fechaSeleccionada){
        //vamos a desmembrar la fecha para que quede mes y año segun la fecha seleccionada

        //hacemos un like en donde busque todo con ese parametro en cada tipo de parametro
        //como ingresos , ahorro, inversiones, gastos y prestamos

        //luego haremos la suma total de todos esos parametros segun lo que venga en el back

        //y retomaremos el con json pero creando una estructurar al la que permite el grafico

        //el json debe tener
        /* {
            "id": "rust", //AQUI IRIA SI ES INGRESO, GASTO, ETC
            "label": "rust",
            "value": 307, //IRIA LA SUMATORIA DE TODO LO QUE TIENE CADA CATEGORIA
            "color": "hsl(177, 70%, 50%)" //VOY A HACER UNA FUNCION RANDOW PAR QUE DECIDA A CADA
            OPCION, UNA OPCION DE COLORES. LA MISMA TIENE QUE SER IRREPETIBLE 
          }, */
    }
}
