<?php

use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/countries', function (){
    return response(Country::get(), 200, [
        'Content-Type' => 'application/json'
    ]);
});

Route::get('/cities/{country}', function ($countryId) {
    // Ellenőrizzük, hogy az ország létezik
    $country = Country::find($countryId);

    if (!$country) {
        return response()->json(['error' => 'Country not found'], 404);
    }

    // Lekérjük az országhoz tartozó városokat
    $cities = $country->cities()->select('id', 'name')->get();

    return response()->json($cities, 200);
});

Route::post('/register', function (Request $request) {

    try {
        $validated = $request->validate([
            'name' => 'required|min:4|max:30',
            'email' => 'required|email|unique:users',
            'country' => 'required',
            'city' => 'required',
            'tel_number' => 'required|numeric',
            'date_of_birth' => 'required',
            'password' => 'required|min:4|max:12|confirmed',
            'sex' => 'required',
            'accept_terms' => 'required'
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
                'sex' => @$errors['sex'],
                'accept_terms' => @$errors['accept_terms']
            ],
            'status' => 'error'], 200);
    }

    $validated['password'] = Hash::make($validated['password']);

    User::create($validated);


    return response(['success' => 'Sikeres regisztráció!']);

});

Route::post('/login', function (Request $request) {

    $found = User::where('email', $request->email)->first();

    if ($found === null) {
        return response(['status'=>'error', 'message' => 'Wrong email.'], 404);
    }

    $attempt = Auth::attempt([
        'email' => $request->email,
        'password' => $request->password,
    ], $request->remember);

    if ($attempt) {
        $token = $request->user()->createToken('token-name')->plainTextToken;
        return response(['status' => 'success', 'message' => 'Sikeres bejelentkezés!', 'token' => $token]);
    }

    return response(['status'=>'error', 'message' => 'Wrong password.'], 422);

});
