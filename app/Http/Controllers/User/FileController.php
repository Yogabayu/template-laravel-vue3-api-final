<?php

namespace App\Http\Controllers\User;

use App\Helpers\ActivityHelper;
use App\Helpers\EmailHelper;
use App\Helpers\ResponseHelper;
use App\Helpers\TelegramHelper;
use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\Attachment;
use App\Models\File;
use App\Models\Note;
use App\Models\NotificationConfiguration;
use App\Models\PhaseTime;
use App\Models\Position;
use App\Models\PositionToOffice;
use App\Models\Role;
use App\Models\User;
use App\Notifications\TelegramNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;

// URUNG: need to configure salah input data file 
class FileController extends Controller
{
    //=> change file status
    public function changeStatus($id)
    {
        try {
            //code...
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>survei result phase 3
    public function editSurveiResult(Request $request, $id)
    {
        try {
            $request->validate([
                'surveyResult' => 'required',
            ], [
                'required' => ':attribute harus diisi',
            ]);

            $file = File::findOrFail($id);

            if ($request->has('surveyResult')) {
                $file->surveyResult = $request->surveyResult;
            }
            $file->save();

            return ResponseHelper::successRes('File updated successfully', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>note
    public function deleteNote($id)
    {
        try {
            $note = Note::find($id);
            $fileId = $note->file_id;
            $message = $note->note;
            $note->delete();

            TelegramHelper::AddUpdate($fileId, 'Menghapus Note : ' . $message, Auth::user()->id);
            return ResponseHelper::successRes('Note deleted successfully', $note);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

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
            TelegramHelper::AddUpdate($note->file_id, 'Menambahkan Note : ' . $note->note, Auth::user()->id);

            return ResponseHelper::successRes('Berhasil menambahkan note', $note);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function editNote(Request $request, $id)
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

            $note = Note::where('id', $id)->first();
            $note->file_id = $request->file_id;
            $note->user_id = Auth::user()->id;
            $note->phase = $file->phase;
            $note->note = $request->note;
            $note->save();

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Edit note');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit note di file ' . $file->name);
            TelegramHelper::AddUpdate($note->file_id, 'Mengedit Note : ' . $note->note, Auth::user()->id);

            return ResponseHelper::successRes('Berhasil Mengedit note', $note);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>attchment

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

            if ($request->has('isSecret')) {
                $attch->isSecret = $request->isSecret;
            }
            $attch->save();

            TelegramHelper::AddUpdate($request->file_id, 'Menambahkan Lampiran : ' . $request->name, Auth::user()->id);

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

            TelegramHelper::AddUpdate($attachment->file_id, 'Merubah Lampiran : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('Attachment updated successfully', $attachment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>main FILE
    public function editGeneralInfo(Request $request, $id)
    {
        try {
            $file = File::findOrFail($id);
            $file->plafon = $request->plafon;
            $file->name = $request->name;
            $file->type_bussiness = $request->type_bussiness;
            $file->desc_bussiness = $request->desc_bussiness;
            $file->save();

            TelegramHelper::AddUpdate($file->id, 'Merubah File : ' . $request->name, Auth::user()->id);
            return ResponseHelper::successRes('File updated successfully', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function changePhase(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required',
                'type' => 'required',
            ], [
                'required' => ':attribute harus diisi',
            ]);
            $file = File::findOrFail($request->id);

            if ($request->type == 'next') {
                $cekAllApprove = Approval::where('file_id', $file->id)
                    ->where('phase', $file->phase)
                    ->get();

                if ($cekAllApprove->where('approved', 0)->count() > 0) {
                    return ResponseHelper::errorRes('Maaf, ada Jabatan / User yang masih belum memberikan approve');
                }
                if ($file->plafon > 25000000) {
                    $filephase = $file->phase + 1;
                    $file->phase = $file->phase + 1;

                    $userUploaded = User::where('id', $file->user_id)->first();
                    $userPosition = Position::where('id', $userUploaded->position_id)->first();
                    $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                    $notifPositions = [];

                    //add user to approval
                    foreach ($userOffices as $userOffice) {
                        $notificationConfigurations = DB::table('notification_configurations')
                            ->where('office_id', $userOffice->office_id)
                            // ->where('minPlafon', '<=', $file->plafon)
                            // ->where('maxPlafon', '>=', $file->plafon)
                            ->where('phase', $filephase)
                            ->where('canApprove', 1)
                            ->get();

                        $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                    }
                    $notifUser = [];
                    foreach ($notifPositions as $notifPosition) {
                        $users = DB::table('users')
                            ->where('position_id', $notifPosition->position_id)
                            ->where('isActive', 1)
                            ->get();
                        $notifUser = array_merge($notifUser, $users->toArray());
                    }
                    foreach ($notifPositions as $pos) {
                        foreach ($notifUser as $user) {
                            if ($pos->position_id == $user->position_id) {
                                Approval::firstOrCreate(
                                    ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                                    ['approved' => 0]
                                );
                            }
                        }
                    }

                    $matchFound = false;

                    foreach ($notifPositions as $pos) {
                        foreach ($notifUser as $user) {
                            if ($pos->position_id == $user->position_id) {
                                Approval::firstOrCreate(
                                    ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                                    ['approved' => 0]
                                );
                                $matchFound = true;
                            }
                        }
                    }

                    if (!$matchFound) {
                        return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                    }

                    $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase - 1)->first();
                    //add count time
                    if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                        $phaseTime->endTime = Carbon::now();
                        $phaseTime->save();


                        PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);
                    }


                    // EmailHelper::AddUpdate($file->id);
                    TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                    $file->save();
                    return ResponseHelper::successRes('File telah disetujui successfully', $file);
                } else {
                    $file->isApproved = 1;
                    $file->save();

                    EmailHelper::AddUpdate($file->id);
                    TelegramHelper::AddUpdatePhase($file->id, "File telah disetujui", $file->user_id);

                    return ResponseHelper::successRes('Phase updated successfully', $file);
                }
            } else {
                $dataPhase = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase)->first();

                if ($dataPhase) {
                    $dataPhase->delete();
                }

                $filephase = $file->phase - 1;
                $file->phase = $file->phase - 1;

                $userUploaded = User::where('id', $file->user_id)->first();
                $userPosition = Position::where('id', $userUploaded->position_id)->first();
                $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                $notifPositions = [];

                //add user to approval
                foreach ($userOffices as $userOffice) {
                    $notificationConfigurations = DB::table('notification_configurations')
                        ->where('office_id', $userOffice->office_id)
                        // ->where('minPlafon', '<=', $file->plafon)
                        // ->where('maxPlafon', '>=', $file->plafon)
                        ->where('phase', $filephase)
                        ->where('canApprove', 1)
                        ->get();

                    $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                }

                $notifUser = [];
                foreach ($notifPositions as $notifPosition) {
                    $users = DB::table('users')
                        ->where('position_id', $notifPosition->position_id)
                        ->where('isActive', 1)
                        ->get();
                    $notifUser = array_merge($notifUser, $users->toArray());
                }
                foreach ($notifPositions as $pos) {
                    foreach ($notifUser as $user) {
                        if ($pos->position_id == $user->position_id) {
                            Approval::firstOrCreate(
                                ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                                ['approved' => 0]
                            );
                        }
                    }
                }

                $file->save();
                EmailHelper::AddUpdate($file->id);
                TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                return ResponseHelper::successRes('Phase updated successfully', $file);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function deleteAttachment($id)
    {
        try {
            $attch = Attachment::find($id);
            $attchName = $attch->name;
            $filePath = public_path('file/' . $attch->file_id . '/' . $attch->path);
            if (FacadesFile::exists($filePath)) {
                FacadesFile::delete($filePath);
            }
            $attch->delete();

            TelegramHelper::AddUpdate($attch->file_id, 'Menghapus Lampiran : ' . $attchName, Auth::user()->id);
            return ResponseHelper::successRes('Attachment deleted successfully', $attch);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function index()
    {
        try {
            $userNow = User::with('position')->where('id', Auth::user()->id)->first();

            if ($userNow->position->name == 'Account Officer' || $userNow->position->name == 'AO' || $userNow->position->name == 'ao' || $userNow->position->name == 'accountd officer' || $userNow->position->name == 'Account Officer Exceutive') {

                $positionId = Auth::user()->position_id;
                $position = Position::with('offices')->where('id', $positionId)->first();

                // Dapatkan semua kantor yang terkait dengan posisi
                $offices = $position->offices;

                // dd($offices);
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
                $files = File::where('user_id', Auth::user()->id)->get();

                ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

                return ResponseHelper::successRes('Berhasi menampilkan datas', ['files' => $files, 'userAccess' => $userAccess]);
            } else {
                $positionId = Auth::user()->position_id;
                $position = Position::with('offices')->where('id', $positionId)->first();

                // Dapatkan semua kantor yang terkait dengan posisi
                $offices = $position->offices;

                // dd($offices);
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

                return ResponseHelper::successRes('Berhasi menampilkan datas', ['files' => $files, 'userAccess' => $userAccess]);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name'   => 'required',
                'plafon' => 'required',
                'type_bussiness' => 'required',
                'desc_bussiness' => 'required',
                'file1'  => 'mimes:jpeg,jpg,png',
                'file2'  => 'mimes:jpeg,jpg,png',
                'file3'  => 'mimes:jpeg,jpg,png',
                'file4'  => 'mimes:jpeg,jpg,png',
                'file5'  => 'mimes:jpeg,jpg,png',
                'file7'  => 'mimes:jpeg,jpg,png',
                'file8'  => 'mimes:jpeg,jpg,png',
                'file9'  => 'mimes:jpeg,jpg,png',
                'file10' => 'mimes:jpeg,jpg,png',
            ], [
                'required' => ':attribute harus diisi',
                'mimes' => ':attribute harus berupa jpeg, jpg, png',
            ]);

            $file = new File();
            $file->user_id = Auth::user()->id;
            $file->name = $request->name;
            $file->plafon = $request->plafon;
            $file->type_bussiness = $request->type_bussiness;
            $file->desc_bussiness = $request->desc_bussiness;
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
                    $attch->isSecret = 0;
                    $attch->save();
                }
            }

            // //add user to approval
            $userUploaded = User::where('id', $file->user_id)->first();
            $userPosition = Position::where('id', $userUploaded->position_id)->first();
            $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
            $notifPositions = [];

            //add user to approval
            foreach ($userOffices as $userOffice) {
                $notificationConfigurations = DB::table('notification_configurations')
                    ->where('office_id', $userOffice->office_id)
                    ->whereRaw('CAST(minPlafon AS UNSIGNED) <= ?', [$file->plafon])
                    ->whereRaw('CAST(maxPlafon AS UNSIGNED) >= ?', [$file->plafon])
                    ->where('phase', $file->phase)
                    ->where('canApprove', 1)
                    ->get();

                $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
            }

            $notifUser = [];
            foreach ($notifPositions as $notifPosition) {
                $users = DB::table('users')
                    ->where('position_id', $notifPosition->position_id)
                    ->where('isActive', 1)
                    ->get();
                $notifUser = array_merge($notifUser, $users->toArray());
            }
            foreach ($notifPositions as $pos) {
                foreach ($notifUser as $user) {
                    if ($pos->position_id == $user->position_id) {
                        Approval::firstOrCreate(
                            ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                            ['approved' => 0]
                        );
                    }
                }
            }

            EmailHelper::AddUpdate($file->id);
            TelegramHelper::AddFile($file->id);

            //add count time
            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);

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
            $file->approvals()->delete();
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
            $file = File::with([
                'user',
                'notes' => function ($query) {
                    $query->latest();
                },
                'notes.user',
                'notes.user.position',
                'fileActivities' => function ($query) {
                    $query->latest();
                },
                'fileActivities.user',
                'attachments',
                'approvals',
                'approvals.user',
                'phaseTimes',
            ])->findOrFail($id);


            // //add user to approval
            $userUploaded = User::where('id', $file->user_id)->first();
            $userPosition = Position::where('id', $userUploaded->position_id)->first();
            $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
            $notifPositions = [];

            //add user to approval
            foreach ($userOffices as $userOffice) {
                $notificationConfigurations = DB::table('notification_configurations')
                    ->where('office_id', $userOffice->office_id)
                    ->whereRaw('CAST(minPlafon AS UNSIGNED) <= ?', [$file->plafon])
                    ->whereRaw('CAST(maxPlafon AS UNSIGNED) >= ?', [$file->plafon])
                    ->where('phase', $file->phase)
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

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengakses detail file');

            // Convert notes to a collection and sort by date in descending order
            // $file->notes = collect($file->notes)->sortByDesc('created_at')->values()->all();

            // return ResponseHelper::successRes('Berhasil menampilkan data', $file);
            return ResponseHelper::successRes('Berhasil menampilkan data', ['file' => $file, 'userAccess' => $userAccess]);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>approval
    public function changeApproved($id)
    {
        try {
            $approv = Approval::findOrFail($id);
            if (!$approv) {
                return ResponseHelper::errorRes('Approval not found');
            }
            if ($approv->user_id != Auth::user()->id) {
                return ResponseHelper::errorRes('Posisi Anda berbeda');
            }
            $approv->approved = !$approv->approved;
            $approv->save();

            TelegramHelper::AddUpdatePhase($approv->file_id, "User merubah Status menjadi " . ($approv->approved ? "Disetujui" : "Ditolak"), $approv->user_id);

            return ResponseHelper::successRes('Berhasil mengubah status', $approv);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
