<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Autenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }



    /* public function handle($request, Closure $next) // la lógica que deseas que el middleware ejecute antes de permitir que una solicitud continúe o se redireccione
    {
    // Tu lógica de middleware aquí
    if (!auth()->check()) {
        return redirect('/login');
    }
    
    return $next($request);
    } */

    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('/login');
        }
    }


}
