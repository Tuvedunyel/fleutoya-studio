<?php

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

    Route::resource('secrets', SecretController::class)->except(['show']);
});

Route::get('secrets/{secret}', [SecretController::class, 'show'])->name('secrets.show');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
