<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);

            $data['password'] = Hash::make($request->password);

            $user = User::create($data);

            $token = $user->createToken('appToken')->accessToken;

            // return response(['user' => $user, 'token' => $token]);

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate. | ' . $e->getMessage(),
            ], 401);
        }
    }

    public function login(Request $request)
    {
        try {
            $user = User::where('nik', request('nik'))->first();

            if (!$user->isActive) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed | Akun tidak aktif, silahkan hubungi administrator',
                ], 401);
            }

            if ($user && Auth::attempt(['email' => $user->email, 'password' => request('password')])) {

                $user = User::with('position', 'position.role')->find(Auth::user()->id);
                if ($user->isActive == 0) {
                    return  response()->json([
                        'success' => false,
                        'message' => 'Akun tidak aktif. | ',
                    ]);
                }
                $user_token['token'] = $user->createToken('appToken')->accessToken;

                return response()->json([
                    'success' => true,
                    'token' => $user_token,
                    'user' => $user,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed | Email atau Password salah.',
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate. | ' . $e->getMessage(),
            ]);
        }
    }

    public function destroy(Request $request)
    {
        if (Auth::user()) {
            $request->user()->token()->revoke();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);
        }
    }
}
