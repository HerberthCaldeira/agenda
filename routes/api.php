<?php

use App\Http\Controllers\AgendaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'auth:sanctum'
], function () {
    Route::prefix('agenda')->group(function () {
        Route::get('/', [AgendaController::class, 'index'])->name('agenda.index');
        Route::post('/store', [AgendaController::class, 'store'])->name('agenda.store');
        Route::get('/{agenda}/edit', [AgendaController::class, 'edit'])->name('agenda.edit');
        Route::put('/{agenda}/update', [AgendaController::class, 'update'])->name('agenda.update');
        Route::delete('/{agenda}/delete', [AgendaController::class, 'destroy'])->name('agenda.destroy');
    });

});
