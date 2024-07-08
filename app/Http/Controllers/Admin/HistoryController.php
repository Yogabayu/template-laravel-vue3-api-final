<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\UserActivity;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function getHistorybyUser($id)
    {
        try {
            $data = UserActivity::where('user_id', $id)->orderBy('created_at', 'desc')->get();

            return ResponseHelper::successRes('berhasil mendapatkan data riwayat dari user', $data);
        } catch (\Throwable $th) {
            return ResponseHelper::errorRes('gagal mendapatkan data riwayat dari user');
        }
    }
}
