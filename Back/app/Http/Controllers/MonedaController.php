<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MonedaController extends Controller
{
    public function obtenerMonedas(Request $request){
        $accessKey = 'fb1a2c89d89b531e753b7cf0cd712e0c';

        $response = Http::get("http://api.currencylayer.com/live", [
            'access_key' => $accessKey,
            'source' => 'ARS',
            'currencies' => 'EUR,CLP,BRL,AUD,BOB,CAD,CNY,COP,HKD,INR,MXN,PYG,UYU,VEF'
        ]);
        return $response->json();
    }
}
