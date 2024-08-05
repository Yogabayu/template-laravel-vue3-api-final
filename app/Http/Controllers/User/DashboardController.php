<?php

namespace App\Http\Controllers\User;

use App\Helpers\ActivityHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\Position;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Mengambil tanggal 3 bulan yang lalu dari sekarang
            $threeMonthsAgo = Carbon::now()->subMonths(3)->format('Y-m-d H:i:s');
            $currentDate = Carbon::now();

            // Mengambil data rata-rata selisih waktu per fase selama 3 bulan terakhir
            $averageTimes = DB::table('phase_times')
                ->join('files', 'phase_times.file_id', '=', 'files.id')
                ->select('phase_times.phase')
                ->selectRaw('AVG(TIMESTAMPDIFF(MINUTE, phase_times.startTime, phase_times.endTime)) AS average_time_minutes')
                ->where('phase_times.endTime', '>=', $threeMonthsAgo)
                ->where('files.user_id', Auth::user()->id)
                ->groupBy('phase_times.phase')
                ->get();

            // Persiapkan data untuk Chart.js
            $labelsAverageTimes = $averageTimes->pluck('phase');
            $dataAverageTimes = $averageTimes->pluck('average_time_minutes');

            $results = DB::table('files')
                ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month')
                ->selectRaw('SUM(CASE WHEN isApproved = 1 THEN 1 ELSE 0 END) as approved')
                ->selectRaw('SUM(CASE WHEN isApproved = 2 THEN 1 ELSE 0 END) as pending')
                ->selectRaw('SUM(CASE WHEN isApproved = 3 THEN 1 ELSE 0 END) as rejected')
                ->where('created_at', '>=', DB::raw('DATE_SUB(CURDATE(), INTERVAL 6 MONTH)'))
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->where('user_id', Auth::user()->id)
                ->get();

            $userNow = User::with('position')->where('id', Auth::user()->id)->first();

            if ($userNow->position->name == 'Account Officer' || $userNow->position->name == 'AO' || $userNow->position->name == 'ao' || $userNow->position->name == 'account officer' || $userNow->position->name == 'Account Officer Executive' || $userNow->position->name == 'account officer executive' || $userNow->position->name == 'Account Officer / Executive AO' || $userNow->position->name == 'AO / RO') {
                $positionId = Auth::user()->position_id;
                $position = Position::with('offices')->where('id', $positionId)->first();

                // Dapatkan semua kantor yang terkait dengan posisi
                $offices = $position->offices;

                //get list access for user
                $notifPositions = [];
                foreach ($offices as $office) {
                    $notificationConfigurations = DB::table('notification_configurations')
                        ->where('office_id', $office->id)
                        ->where('phase', 1)
                        ->get();

                    $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                }
                $userPosNow = User::where('id', Auth::user()->id)->first();
                $userAccess = [];

                foreach ($notifPositions as $notifPosition) {
                    if ($notifPosition->position_id == $userPosNow->position_id) {
                        $userAccess = [
                            'canAppeal' => $notifPosition->canAppeal,
                            'canApprove' => $notifPosition->canApprove,
                            'canInsertData' => $notifPosition->canInsertData,
                            'isSecret' => $notifPosition->isSecret,
                        ];
                        break;
                    }
                }
                $files = File::where('user_id', Auth::user()->id)
                    ->whereMonth('created_at', $currentDate->month)
                    ->whereYear('created_at', $currentDate->year)
                    ->get();

                ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

                return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'results' => $results, 'labelsAverageTimes' => $labelsAverageTimes, 'dataAverageTimes' => $dataAverageTimes]);
            } else {
                $positionId = Auth::user()->position_id;
                $position = Position::with('offices')->where('id', $positionId)->first();

                // Dapatkan semua kantor yang terkait dengan posisi
                $offices = $position->offices;
                //get list access for user
                $notifPositions = [];
                foreach ($offices as $office) {
                    $notificationConfigurations = DB::table('notification_configurations')
                        ->where('office_id', $office->id)
                        ->where('phase', 1)
                        ->get();

                    $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                }
                $userPosNow = User::where('id', Auth::user()->id)->first();
                $userAccess = [];

                foreach ($notifPositions as $notifPosition) {
                    if ($notifPosition->position_id == $userPosNow->position_id) {
                        $userAccess = [
                            'canAppeal' => $notifPosition->canAppeal,
                            'canApprove' => $notifPosition->canApprove,
                            'canInsertData' => $notifPosition->canInsertData,
                            'isSecret' => $notifPosition->isSecret,
                        ];
                        break;
                    }
                }

                // Inisialisasi array untuk menampung semua file yang terkait
                $files = [];

                $fileAll = File::whereMonth('created_at', $currentDate->month)
                    ->whereYear('created_at', $currentDate->year)
                    ->get();
                foreach ($fileAll as $eachFile) {
                    // Periksa posisi pengguna yang mengunggah file
                    $uploaderPositionId = DB::table('users')
                        ->where('id', $eachFile->user_id)
                        ->value('position_id');

                    // Dapatkan daftar kantor yang terkait dengan posisi pengguna
                    $uploaderOfficeIds = DB::table('positiontooffices')
                        ->where('position_id', $uploaderPositionId)
                        ->pluck('office_id')
                        ->toArray();

                    // Periksa apakah ada kantor yang sama antara kantor pengguna dan kantor-kantor yang terkait dengan posisi yang dicari
                    if (array_intersect($uploaderOfficeIds, $offices->pluck('id')->toArray())) {
                        // Jika ada, tambahkan file ke dalam array files
                        $files[] = $eachFile;
                    }
                }
                ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

                return ResponseHelper::successRes('Berhasill menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'results' => $results, 'labelsAverageTimes' => $labelsAverageTimes, 'dataAverageTimes' => $dataAverageTimes]);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
