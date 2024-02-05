<?php

use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;


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

Route::get('/countries', function () {
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

    $validator = Validator::make($request->all(), [
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

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else {

        $validatedData = $validator->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);
        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'username' => $user->name,
            'token' => $token,
            'message' => 'Registered Successfully!'
        ]);
    }
});


Route::post('/loginmy', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'email' => 'required|max:191',
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    }
    else {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credentials',
            ]);
        }

        else {
            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Logged In Successfully!'
            ]);
        }

    }
});
