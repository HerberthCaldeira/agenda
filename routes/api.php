<?php

use App\Http\Controllers\Agenda\AgendaController;
use App\Http\Controllers\Agenda\ShareAgendaController;
use App\Http\Controllers\Contact\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    /* AGENDA */
    Route::prefix('agenda')->group(function () {


        Route::get('/', [AgendaController::class, 'index'])->name('agenda.index');
        Route::post('/store', [AgendaController::class, 'store'])->name('agenda.store');
        Route::get('/{agenda}/edit', [AgendaController::class, 'edit'])->name('agenda.edit');
        Route::put('/{agenda}/update', [AgendaController::class, 'update'])->name('agenda.update');
        Route::delete('/{agenda}/delete', [AgendaController::class, 'destroy'])->name('agenda.destroy');
        /** SHARE AGENDA */
        Route::get('/{agenda}/users', [ShareAgendaController::class, 'users'])->name('agenda.users');
        Route::post('/{agenda}/user/{user}/share', [ShareAgendaController::class, 'share'])->name('agenda.share');


        Route::prefix('{agenda}/contact')->group(function () {
            Route::get('/', [ContactController::class, 'index'])->name('contact.index');
            Route::post('/store', [ContactController::class, 'store'])->name('contact.store');
            Route::get('/{contact}/edit', [ContactController::class, 'edit'])->name('contact.edit');
            Route::put('/{contact}/update', [ContactController::class, 'update'])->name('contact.update');
            Route::delete('/{contact}/delete', [ContactController::class, 'destroy'])->name('contact.destroy');
        });



    });





});
