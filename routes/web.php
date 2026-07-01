<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->middleware('guest')->name('password.request');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', [App\Http\Controllers\Auth\NewPasswordController::class, 'create'])
    ->middleware('guest')
    ->name('password.reset');
Route::post('/reset-password', [App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/home', function () {
    return inertia('Home');
})->middleware(['auth'])->name('home');

Route::get('/ingresos', function () {
    return inertia('Ingresos/Index');
})->middleware(['auth'])->name('ingresos.index');

Route::prefix('clientes')->middleware(['auth'])->group(function () {
    Route::get('/', [App\Http\Controllers\Clients\ClientController::class, 'index'])
        ->name('clientes.index');
    Route::post('/', [App\Http\Controllers\Clients\ClientController::class, 'store'])
        ->name('clientes.store');
});

Route::prefix('api')->group(function () {
    Route::get('/clientes/catalogos', [App\Http\Controllers\Clients\ClientApiController::class, 'catalogos'])
        ->name('api.clientes.catalogos');
    Route::get('/estados/{pais}', [App\Http\Controllers\Clients\ClientApiController::class, 'estados'])
        ->name('api.estados');
    Route::get('/ciudades/{estado}', [App\Http\Controllers\Clients\ClientApiController::class, 'ciudades'])
        ->name('api.ciudades');
    Route::get('/subtipos', [App\Http\Controllers\Clients\ClientApiController::class, 'subtipos'])
        ->name('api.subtipos');
});
