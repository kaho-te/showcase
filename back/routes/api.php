<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostLikeController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\WarehouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
    Route::get('/warehouses/{user}', [WarehouseController::class, 'show'])->name('warehouses.show');
    Route::post('/warehouses', [WarehouseController::class, 'store'])->name('warehouses.store');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/account/{user}', [AccountController::class, 'show'])->name('account.show');
    Route::post('/posts/{post}/like', [PostLikeController::class, 'store']);
    Route::delete('/posts/{post}/like', [PostLikeController::class, 'destroy']);
  });