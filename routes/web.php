<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SecretController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('secrets', SecretController::class)->except(['show', 'update']);

    Route::controller(UserController::class)->group(function () {
        Route::get('users', 'index')->name('users.index');
        Route::delete('users/{user}', 'destroy')->name('users.destroy');
    });
});


Route::controller(SecretController::class)->group(function () {
    Route::get('secrets/{secret}', 'show')->name('secrets.show');
    Route::patch('secrets/{secret}', 'update')->name('secrets.update');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
