<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\TelegramNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use NotificationChannels\Telegram\TelegramUpdates;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = User::with('position', 'position.offices')->get();

            return ResponseHelper::successRes('Berhasi mendapatkan data', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validasi request
            $request->validate([
                'nik' => 'required|unique:users,nik',
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8',
                // 'password' => 'required|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',
                'position_id' => 'required',
            ], [
                'nik.required' => 'NIK harus diisi',
                'nik.unique' => 'NIK sudah terdaftar',
                'name.required' => 'Nama harus diisi',
                'email.required' => 'Email harus diisi',
                'email.unique' => 'Email sudah terdaftar',
                'password.required' => 'Password harus diisi',
                'password.min' => 'Password minimal 8 karakter',
                // 'password.regex' => 'Password harus terdiri dari setidaknya satu huruf kecil, satu huruf besar, satu digit, dan satu simbol',
                'position_id.required' => 'Posisi harus diisi',
            ]);

            // Simpan data
            $user = User::create([
                'nik' => $request->nik,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'isActive' => 1,
                'position_id' => $request->position_id,
            ]);

            return ResponseHelper::successRes('Berhasi menambahkan data', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function changeUserStatus($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->isActive = $user->isActive ? 0 : 1;
            $user->save();
            return ResponseHelper::successRes('Berhasi mengubah status user', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $rules = [
                'nik' => 'required|unique:users,nik,' . $id . ',id',
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id . ',id',
                'position_id' => 'required',
            ];

            $messages = [
                'nik.required' => 'NIK harus diisi',
                'nik.unique' => 'NIK sudah terdaftar',
                'name.required' => 'Nama harus diisi',
                'email.required' => 'Email harus diisi',
                'email.unique' => 'Email sudah terdaftar',
                'position_id.required' => 'Posisi harus diisi',
            ];

            // Tambahkan validasi untuk panjang kata sandi hanya jika password dikirim dalam permintaan
            if ($request->has('password')) {
                $rules['password'] = 'min:8';
                $messages['password.min'] = 'Password minimal 8 karakter';
            }

            $request->validate($rules, $messages);

            // Simpan data
            $user = User::findOrFail($id);
            $user->nik = $request->nik;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->position_id = $request->position_id;

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->position_id = $request->position_id;
            $user->save();

            return ResponseHelper::successRes('Berhasil memperbarui data', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return ResponseHelper::successRes('Berhasi menghapus data', $user);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getChatIdByUsername(Request $request)
    {
        try {
            if ($request->type == '2') {
                $user = User::findOrFail($request->id);

                $user->notify(new TelegramNotification('Akun anda tidak terkoneksi dengan sistem'));

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
            $user = User::findOrFail($request->id);

            $updates = TelegramUpdates::create()
                ->options([
                    'timeout' => 0,
                ])
                ->get();
            if ($updates['ok']) {
                $update = $updates['result'];
                foreach ($update as $updt) {
                    if (isset($updt['message']['chat']['username'])) {
                        if ($updt['message']['chat']['username'] == $request->username) {
                            $chatId = $updt['message']['chat']['id'];
                            $user->telegram_username = $request->username;
                            $user->telegram_chat_id = $chatId;
                            $user->save();

                            $user->notify(new TelegramNotification('Berhasil mengkoneksikan ke sistem'));
                            return ResponseHelper::successRes('Selamat, Berhasil Terkoneksi Dengan sistem', $chatId);
                        }
                    }
                }
                return ResponseHelper::errorRes('Gagal Username tidak ditemukan');
            } else {
                return ResponseHelper::errorRes('Gagal Username tidak ditemukan');
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
