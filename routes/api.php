<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/register', function (Request $request) {

    try {
        $validated = $request->validate([
            'name' => 'required|min:4|max:30',
            'email' => 'required|email|unique:users',
            'country' => 'required',
            'city' => 'required',
            'tel_number' => 'required',
            'date_of_birth' => 'required',
            'password' => 'required|min:4|max:12|confirmed',
        ]);
    } catch (ValidationException $e) {
        $errors = $e->errors();
        return response(['errors' =>
            [
                'name' => @$errors['name'],
                'email' => @$errors['email'],
                'country' => @$errors['country'],
                'city' => @$errors['city'],
                'tel_number' => @$errors['tel_number'],
                'date_of_birth' => @$errors['date_of_birth'],
                'password' => @$errors['password'],
            ],
            'status' => 'error'], 200);
    }

    return response(['success' => 'Sikeres validáció!']);

});
