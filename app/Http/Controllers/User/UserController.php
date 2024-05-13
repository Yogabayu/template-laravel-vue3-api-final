<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\TelegramNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use NotificationChannels\Telegram\TelegramUpdates;

class UserController extends Controller
{
    public function getProfile()
    {
        try {
            $userData = User::where('id', auth()->user()->id)->first();

            return ResponseHelper::successRes('Berhasi mendapatkan data', $userData);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . Auth::user()->id . ',id',
                'nik' => 'required|unique:users,nik,' . Auth::user()->id . ',id',
                'password' => 'min:8',
            ], [
                'name.required' => 'User name is required.',
                'email.required' => 'Email is required.',
                'email.unique' => 'The email has already been taken.',
                'nik.required' => 'NIK is required.',
                'nik.unique' => 'The NIK has already been taken.',
                'password.min' => 'Password must be at least 8 characters.',
            ]);

            $user = User::where('id', Auth::user()->id)->first();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->nik = $request->nik;

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }
            $user->save();

            return ResponseHelper::successRes('berhasil update data user', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getChatIdByUsername(Request $request)
    {
        try {
            if ($request->type == '2') {
                $user = User::findOrFail(Auth::user()->id);

                $user->notify(new TelegramNotification('Akun anda tidak terkoneksi dengan sistem', null, null));

                $user->telegram_username = null;
                $user->telegram_chat_id = null;
                $user->save();

                return ResponseHelper::successRes('Sukses, user tidak terkoneksi dengan telegram sistem', $user);
            }
            // Check if the requested username already exists
            $existingUser = User::where('telegram_username', $request->username)->first();
            if ($existingUser) {
                return ResponseHelper::errorRes('Username Telegram sudah digunakan.');
            }
            $chatId = null;
            $user = User::findOrFail(Auth::user()->id);

            $updates = TelegramUpdates::create()
                ->options([
                    'timeout' => 0,
                ])
                ->get();
            dd($updates);
            if ($updates['ok']) {
                $update = $updates['result'];
                foreach ($update as $updt) {
                    if (isset($updt['message']['chat']['username'])) {
                        if ($updt['message']['chat']['username'] == $request->username) {
                            $chatId = $updt['message']['chat']['id'];
                            $user->telegram_username = $request->username;
                            $user->telegram_chat_id = $chatId;
                            $user->save();

                            $user->notify(new TelegramNotification('Berhasil mengkoneksikan ke sistem', null, null));
                            return ResponseHelper::successRes('Selamat, Berhasil Terkoneksi Dengan sistem', $chatId);
                        }
                    }
                }
                return ResponseHelper::errorRes('Gagal Username tidak ditemukan');
            } else {
                return ResponseHelper::errorRes('Gagal Username tidak ditemukan 3');
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
