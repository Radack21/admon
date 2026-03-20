<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModulePermission
{
    /**
     * Handle an incoming request.
     *
     * Usage in routes:
     *   Route::get('/clientes', ...)->middleware('module:clientes,read');
     *   Route::post('/clientes', ...)->middleware('module:clientes,create');
     *   Route::put('/clientes/{id}', ...)->middleware('module:clientes,update');
     *   Route::delete('/clientes/{id}', ...)->middleware('module:clientes,delete');
     */
    public function handle(Request $request, Closure $next, string $module, string $action): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'No autenticado.');
        }

        // Admins bypass permission checks
        if ($user->is_admin) {
            return $next($request);
        }

        $permission = "{$module}.{$action}";

        if (!$user->hasPermissionTo($permission)) {
            abort(403, "No tienes permiso para {$action} en {$module}.");
        }

        return $next($request);
    }
}
