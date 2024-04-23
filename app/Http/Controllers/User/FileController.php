<?php

namespace App\Http\Controllers\User;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\Position;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;

// URUNG: need to configure

class FileController extends Controller
{
    public function index()
    {
        try {
            // $positionId = '501b8fc1-f423-4c35-a323-6f4f8e633144'; // Ganti dengan id posisi yang Anda inginkan
            $positionId = Auth::user()->position_id;
            $position = Position::with('offices')->where('id', $positionId)->first();

            // Dapatkan semua kantor yang terkait dengan posisi
            $offices = $position->offices;

            // Inisialisasi array untuk menampung semua file yang terkait
            $files = [];

            $fileAll = File::all();
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
            return ResponseHelper::successRes('Berhasi menampilkan datas', $files);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'plafon' => 'required',
                'file1' => 'mimes:jpeg,jpg,png',
                'file2' => 'mimes:jpeg,jpg,png',
                'file3' => 'mimes:jpeg,jpg,png',
                'file4' => 'mimes:jpeg,jpg,png',
                'file5' => 'mimes:jpeg,jpg,png',
                'file7' => 'mimes:jpeg,jpg,png',
                'file8' => 'mimes:jpeg,jpg,png',
                'file9' => 'mimes:jpeg,jpg,png',
                'file10' => 'mimes:jpeg,jpg,png',
            ], [
                'required' => ':attribute harus diisi',
                'mimes' => ':attribute harus berupa jpeg, jpg, png',
            ]);

            $file = new File();
            $file->user_id = Auth::user()->id;
            $file->name = $request->name;
            $file->plafon = $request->plafon;
            $file->phase = 1;

            // Loop through each file
            for ($i = 1; $i <= 10; $i++) {
                // Skip file6 as it's not in the validation rules
                if ($i == 6) continue;

                $fileKey = 'file' . $i;

                if ($request->hasFile($fileKey)) {
                    //upload file
                    $imageEXT = $request->file($fileKey)->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $request->file($fileKey)->getClientOriginalExtension();
                    $fileimage = $filename . '_' . time() . '.' . $EXT;
                    $path = $request->file($fileKey)->move(public_path('file/' . $fileKey), $fileimage);
                    $file->$fileKey = $fileimage;
                }
            }

            $file->save();

            return ResponseHelper::successRes('Berhasi menambahkan data', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $file = File::find($id);

            if (!$file) {
                return ResponseHelper::errorRes('File not found');
            }

            // Delete the physical files
            for ($i = 1; $i <= 10; $i++) {
                // Skip file6 as it's not in the validation rules
                if ($i == 6) continue;

                $fileKey = 'file' . $i;
                $filePath = public_path('file/' . $fileKey . '/' . $file->$fileKey);

                if (FacadesFile::exists($filePath)) {
                    FacadesFile::delete($filePath);
                }
            }

            // Delete the file record
            $file->delete();

            return ResponseHelper::successRes('File deleted successfully', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function detailFile($id)
    {
        try {
            $file = File::find($id);
            return ResponseHelper::successRes('Berhasi menampilkan datas', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
