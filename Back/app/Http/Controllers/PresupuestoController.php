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
        $arrayFechaActual = explode("-", $fechaSeleccionada);
        $fechaActual = $arrayFechaActual[1].'/'.$arrayFechaActual[0];

        if($fechaDesde) {
            $arrayFechaDesde = explode("-", $fechaDesde);//divide la cadena en un array
            $nuevaDesde = $arrayFechaDesde[1].'/'.$arrayFechaDesde[0];
            //$fechaDesde = Carbon::create($fechaDesde[0], $fechaDesde[1], $fechaDesde[2])->format('Y-m-d H:i:s', "America/Argentina/Buenos_Aires");
        }

        if($fechaHasta) {
            $arrayFechaHasta = explode("-", $fechaHasta); 
            $nuevaHasta = $arrayFechaHasta[1].'/'.$arrayFechaHasta[0];
        }
        
        //codigo que se ejecuta para el mes en curso sin tner fechas de filtrado
        if (!$fechaDesde && !$fechaHasta) {
            $ahorroUsuario = Ahorro::where('user_id', $user_id)->where('periodoCorrespondiente', $fechaActual)->get(); //2023-10-05 00:00:00
            $inversionesUsuario = Inversion::where('user_id', $user_id)->where('periodoCorrespondiente', $fechaActual)->get();
            $gastosUsuario = Gasto::where('user_id', $user_id)->where('periodoCorrespondiente', $fechaActual)->get();
            $ingresosUsuario = Ingreso::where('user_id', $user_id)->where('periodoCorrespondiente', $fechaActual)->get();
            $prestamosUsuario = Prestamo::where('user_id', $user_id)->where('periodoCorrespondiente', $fechaActual)->get();
        } else {
            
            /* $fechaDesde = $fechaDesde ?? $fechaActual;
            $fechaHasta = $fechaHasta ?? $fechaActual; */

            $ahorroUsuario = Ahorro::where('user_id', $user_id)->where('periodoCorrespondiente', '>=', $nuevaDesde)->where('periodoCorrespondiente', '<=', $nuevaHasta)->get(); //2023-10-05 00:00:00
            $inversionesUsuario = Inversion::where('user_id', $user_id)->where('periodoCorrespondiente', '>=', $nuevaDesde)->where('periodoCorrespondiente', '<=', $nuevaHasta)->get();
            $gastosUsuario = Gasto::where('user_id', $user_id)->where('periodoCorrespondiente', '>=', $nuevaDesde)->where('periodoCorrespondiente', '<=', $nuevaHasta)->get();
            $ingresosUsuario = Ingreso::where('user_id', $user_id)->where('periodoCorrespondiente', '>=', $nuevaDesde)->where('periodoCorrespondiente', '<=', $nuevaHasta)->get();
            $prestamosUsuario = Prestamo::where('user_id', $user_id)->where('periodoCorrespondiente', '>=', $nuevaDesde)->where('periodoCorrespondiente', '<=', $nuevaHasta)->get();
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
            'ahorros' => $ahorroUsuario,
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

    public function paraGrafico(Request $request, $idUsuario){
        
        //fecha para buscar
        $actual = $request->periodo;
        //buscar los ingresos, gastos, inversion, prestamos y ahorros que sean de esa fecha (mes y año)
        $ingresosMes = Ingreso::with('categorias')
                        ->where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->where('periodoCorrespondiente', $actual)
                        ->get();
        $gastosMes = Gasto::with('categorias')
                        ->where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->where('periodoCorrespondiente', $actual)
                        ->get();
        $inversionesMes = Inversion::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->where('periodoCorrespondiente', $actual)
                        ->get();
        $prestamosMes = Prestamo::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->where('periodoCorrespondiente', $actual)
                        ->get();
        $ahorrosMes = Ahorro::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->where('periodoCorrespondiente', $actual)
                        ->get();
        return response()->json([
                            'ingresos' => $ingresosMes,
                            'ahorros' => $ahorrosMes,
                            'inversiones' => $inversionesMes,
                            'gastos' => $gastosMes,
                            'prestamos' => $prestamosMes,
                            ]);                
    }


    /* // Mostrar el presupuesto del mes actual                ORIGINAL
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
            'ahorros' => $ahorroUsuario,
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
    } */

    /* public function paraGrafico($idUsuario, $fechaSeleccionada){//ORIGINAL
        //vamos a desmembrar la fecha para que quede mes y año segun la fecha seleccionada
        $fechaCarbon = Carbon::parse($fechaSeleccionada);
        // Obtener el mes y el año en formato "Y-m"
        //$mesYAnio = $fechaCarbon->format("Y-m");
        //buscar los ingresos, gastos, inversion, prestamos y ahorros que sean de esa fecha (mes y año)
        $ingresosMes = Ingreso::with('categorias')
                        ->where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->whereYear('created_at', $fechaCarbon->year)
                        ->whereMonth('created_at', $fechaCarbon->month)
                        ->get();
        $gastosMes = Gasto::with('categorias')
                        ->where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->whereYear('created_at', $fechaCarbon->year)
                        ->whereMonth('created_at', $fechaCarbon->month)
                        ->get();
        $inversionesMes = Inversion::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->whereYear('created_at', $fechaCarbon->year)
                        ->whereMonth('created_at', $fechaCarbon->month)
                        ->get();
        $prestamosMes = Prestamo::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->whereYear('created_at', $fechaCarbon->year)
                        ->whereMonth('created_at', $fechaCarbon->month)
                        ->get();
        $ahorrosMes = Ahorro::where('user_id', $idUsuario) // Reemplaza $usuarioId con el ID del usuario deseado
                        ->whereYear('created_at', $fechaCarbon->year)
                        ->whereMonth('created_at', $fechaCarbon->month)
                        ->get();
        return response()->json([
                            'ingresos' => $ingresosMes,
                            'ahorros' => $ahorrosMes,
                            'inversiones' => $inversionesMes,
                            'gastos' => $gastosMes,
                            'prestamos' => $prestamosMes,
                            ]);                 */

        //CREAR EL JSON DE INGRESO
        
       
    


    
}
