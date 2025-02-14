<?php

use App\Http\Controllers\ProfileController;
use App\Http\Modules\Tasks\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::resource('tasks', TaskController::class);

    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index']);
        Route::get('/create', [TaskController::class, 'create']);
        Route::post('/', [TaskController::class, 'doCreate']);
        Route::get('/{task}', [TaskController::class, 'show']);
        Route::get('/{task}/edit', [TaskController::class, 'edit']);
        Route::put('/{task}', [TaskController::class, 'doUpdate']);
        Route::delete('/{task}', [TaskController::class, 'doDelete']);
    });
});

require __DIR__ . '/auth.php';
