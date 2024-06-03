<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ActivityHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $files = File::all();
            $userAccess = [
                'canAppeal' => 1,
                'canApprove' => 1,
                'canInsertData' => 1,
                'isSecret' => 1,
            ];

            ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman Dashboard');
            return ResponseHelper::successRes('Berhasill menampilkan datas', ['files' => $files, 'userAccess' => $userAccess]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
