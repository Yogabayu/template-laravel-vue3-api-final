<?php

namespace App\Http\Controllers\User;

use App\Helpers\ActivityHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Attachment;
use App\Models\File;
use App\Models\Note;
use App\Models\NotificationConfiguration;
use App\Models\Position;
use App\Models\PositionToOffice;
use App\Models\Role;
use App\Models\User;
use App\Notifications\TelegramNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;

// URUNG: need to configure salah input data file 

class FileController extends Controller
{
    public function addNote(Request $request)
    {
        try {
            $request->validate([
                'file_id' => 'required',
                'note' => 'required',
            ], [
                'required' => ':attribute harus diisi',
            ]);
            $file = File::where('id', $request->file_id)->first();
            if (!$file) {
                return ResponseHelper::errorRes('File not found');
            }

            $note = new Note();
            $note->file_id = $request->file_id;
            $note->user_id = Auth::user()->id;
            $note->phase = $file->phase;
            $note->note = $request->note;
            $note->save();

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Menambahkan note');
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan note di file ' . $file->name);

            return ResponseHelper::successRes('Berhasi menambahkan note', $note);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function addAttchment(Request $request)
    {
        try {
            $request->validate([
                'file_id' => 'required ',
                'name' => 'required',
                'path' => 'required | mimes:jpeg,jpg,png',
            ], [
                'required' => ':attribute harus diisi',
                'mimes' => ':attribute harus berupa jpeg, jpg, png',
            ]);

            $attch = new Attachment();
            $attch->file_id = $request->file_id;
            $attch->name = $request->name;

            $rand = Str::random(10);
            $fileObject = $request->file('path');
            $imageEXT = $fileObject->getClientOriginalName();
            $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
            $EXT = $fileObject->getClientOriginalExtension();
            $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
            $path = $fileObject->move(public_path('file/' . $request->file_id), $fileimage);
            $attch->path = $fileimage;
            $attch->save();

            return ResponseHelper::successRes('Berhasi menambahkan attachment', $attch);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function editAttachment(Request $request, $id)
    {
        try {
            $attachment = Attachment::findOrFail($id);
            $attachment->name = $request->name;
            if ($request->hasFile('path')) {
                //delete old file
                $olfPath = public_path('file/' . $attachment->file_id . '/' . $attachment->path);
                if (FacadesFile::exists($olfPath)) {
                    FacadesFile::delete($olfPath);
                }

                //upload new file
                $rand = Str::random(10);
                $fileObject = $request->file('path');
                $imageEXT = $fileObject->getClientOriginalName();
                $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                $EXT = $fileObject->getClientOriginalExtension();
                $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                $path = $fileObject->move(public_path('file/' . $request->file_id), $fileimage);
                $attachment->path = $fileimage;
            }
            $attachment->save();

            return ResponseHelper::successRes('Attachment updated successfully', $attachment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function deleteAttachment($id)
    {
        try {
            $attch = Attachment::find($id);
            $filePath = public_path('file/' . $attch->file_id . '/' . $attch->path);
            if (FacadesFile::exists($filePath)) {
                FacadesFile::delete($filePath);
            }
            $attch->delete();
            return ResponseHelper::successRes('Attachment deleted successfully', $attch);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function index()
    {
        try {
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
            ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

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
            $file->save();

            for ($i = 1; $i <= 10; $i++) {

                // Skip file6 as it's not in the validation rules
                if ($i == 6) continue;

                $fileKey = 'file' . $i;
                $noteFile = 'noteFile' . $i;
                if ($request->hasFile($fileKey)) {
                    $fileObject = $request->file($fileKey);
                    // Check for upload errors
                    if (!$fileObject->isValid()) {
                        return ResponseHelper::errorRes('File upload error: ' . $fileObject->getErrorMessage());
                    }
                    //upload file
                    $rand = Str::random(10);
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $file->id), $fileimage);

                    $attch = new Attachment();
                    $attch->file_id = $file->id;
                    $attch->name =  $request->{$noteFile};
                    $attch->path = $fileimage;
                    $attch->save();
                }
            }

            $userUploaded = User::where('id', $file->user_id)->first();
            $userPosition = Position::where('id', $userUploaded->position_id)->first();
            $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
            $notifPositions = [];

            foreach ($userOffices as $userOffice) {
                $notificationConfigurations = DB::table('notification_configurations')
                    ->where('office_id', $userOffice->office_id)
                    ->where('phase', $file->phase)
                    ->where('minPlafon', '<=', $file->plafon)
                    ->where('maxPlafon', '>=', $file->plafon)
                    ->get();

                $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
            }

            $notifUser = [];
            foreach ($notifPositions as $notifPosition) {
                $users = DB::table('users')
                    ->where('position_id', $notifPosition->position_id)
                    ->get();
                $notifUser = array_merge($notifUser, $users->toArray());
            }
            foreach ($notifUser as $notif) {
                $ao = User::find($file->user_id);
                $user = User::find($notif->id);
                $attachments = Attachment::where('file_id', $file->id)->get();

                // Membuat pesan yang lebih tertata
                $message = "📣 *Ada Data Credit Baru*\n\n"
                    . "*AO*: " . $ao->name . "\n"
                    . "*Pemohon Kredit*: " . $file->name . "\n"
                    . "*Plafon*: Rp. " . number_format($file->plafon, 0, ',', '.') . "\n"
                    . "\nSilakan cek detailnya di Website ECAR.\n";

                $user->notify(new TelegramNotification($message, $file, $attachments));
            }


            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menambahkan file');
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan file');

            return ResponseHelper::successRes('Berhasi menambahkan data', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $file = File::find($id);
            $attachments = Attachment::where('file_id', $file->id)->get();

            if (!$file) {
                return ResponseHelper::errorRes('File not found');
            }

            $file->phaseTimes()->delete();
            $file->approvals()->delete();
            $file->notes()->delete();
            $file->appeals()->delete();
            $file->fileActivities()->delete();
            foreach ($attachments as $attch) {
                $dirPath = public_path('file/' . $file->id);
                $filePath = public_path('file/' . $file->id . '/' . $attch->path);
                if (FacadesFile::exists($filePath)) {
                    FacadesFile::delete($filePath);
                    FacadesFile::deleteDirectory($dirPath);
                }
                $attch->delete();
            }
            $file->delete();

            return ResponseHelper::successRes('File deleted successfully', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function detailFile($id)
    {
        try {
            $file = File::with('user', 'notes', 'fileActivities', 'attachments')->findOrFail($id);
            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengakses detail file');
            return ResponseHelper::successRes('Berhasi menampilkan datas', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
