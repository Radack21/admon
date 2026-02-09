<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/login', function () {
    return inertia('auth/Login');
})->name('login');
