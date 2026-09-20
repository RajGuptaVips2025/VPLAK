<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/app/');
});

Route::get('/app/{any?}', function () {
    $indexPath = public_path('app/index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    return view('welcome');
})->where('any', '.*');
