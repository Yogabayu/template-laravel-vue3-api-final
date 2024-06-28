<?php

namespace App\Http\Controllers\User;

use App\Exports\PhaseTimeReportExport;
use App\Helpers\ActivityHelper;
use App\Helpers\EmailHelper;
use App\Helpers\ResponseHelper;
use App\Helpers\TelegramHelper;
use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\Attachment;
use App\Models\File;
use App\Models\FileSubmission;
use App\Models\Note;
use App\Models\NotificationConfiguration;
use App\Models\PhaseTime;
use App\Models\Position;
use App\Models\PositionToOffice;
use App\Models\Role;
use App\Models\User;
use App\Notifications\TelegramNotification;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Dompdf;
use Dompdf\Options;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;

class FileController extends Controller
{
    public function generateMonthlyReport($monthYear)
    {
        try {
            $monthYear = explode('-', $monthYear);

            $userNow = User::with('position')->where('id', Auth::user()->id)->first();
            $userPos = User::where('id', Auth::user()->id)->first();
            $getPostionData = Position::where('id', $userPos->position_id)->first();
            $role = Role::where('id', $getPostionData->role_id)->first();

            if ($userNow->position->name == 'Account Officer' || $userNow->position->name == 'AO' || $userNow->position->name == 'ao' || $userNow->position->name == 'account officer' || $userNow->position->name == 'Account Officer Executive' || $userNow->position->name == 'account officer executive' || $userNow->position->name == 'Account Officer / Executive AO' || $userNow->position->name == 'AO / RO') {
                // Ambil bulan dan tahun
                $month = $monthYear[0];
                $year = $monthYear[1];

                $data = DB::table('phase_times')
                    ->join('files', 'phase_times.file_id', '=', 'files.id')
                    ->join('users', 'files.user_id', '=', 'users.id')
                    ->select(
                        'phase_times.file_id',
                        'phase_times.phase',
                        'phase_times.startTime',
                        'phase_times.endTime',
                        'files.name as fileName',
                        'files.nik_pemohon as nikPemohon',
                        'files.nik_pasangan as nikPasangan',
                        'files.nik_jaminan as nikJaminan',
                    )
                    ->whereMonth('files.created_at', $month)
                    ->whereYear('files.created_at', $year)
                    ->orderBy('phase_times.file_id')
                    ->orderBy('phase_times.phase')
                    ->where('users.id', Auth::user()->id)
                    ->get();

                // Kelompokkan data berdasarkan file_id
                $groupedData = $data->groupBy('file_id');

                // Format data untuk laporan
                $reportData = [];
                foreach ($groupedData as $fileId => $phases) {
                    $row = ['no' => count($reportData) + 1];
                    $fileName = $phases->first()->fileName;
                    $row['nameFile'] = $fileName;
                    $row['nikPemohon'] = $phases->first()->nikPemohon;
                    $row['nikPasangan'] = $phases->first()->nikPasangan;
                    $row['nikJaminan'] = $phases->first()->nikJaminan;

                    for ($i = 1; $i <= 5; $i++) {
                        $phase = $phases->firstWhere('phase', $i);
                        if ($phase) {
                            $startTime = strtotime($phase->startTime);
                            $endTime = $phase->endTime ? strtotime($phase->endTime) : time();
                            $duration = $endTime - $startTime;
                            $row['phase' . $i . 'Time'] = gmdate('H:i:s', $duration);
                        } else {
                            $row['phase' . $i . 'Time'] = 'N/A';
                        }
                    }
                    $reportData[] = $row;
                }

                $date = \Carbon\Carbon::create($year, $month, 1);
                $fileName = 'phase_time_report_' . $date->format('Y-m') . '.xlsx';

                ActivityHelper::userActivity(Auth::user()->id, 'USER MENDOWNLOAD REKAP DATA FILE KREDIT');

                return Excel::download(new PhaseTimeReportExport($reportData), $fileName);
            } else {
                // Langkah 1: Dapatkan kantor-kantor terkait dengan posisi pengguna yang login
                $positionId = Auth::user()->position_id;
                $position = Position::with('offices')->where('id', $positionId)->first();
                $officeIds = $position->offices->pluck('id')->toArray();

                // Langkah 2: Filter file berdasarkan kantor
                $files = File::with('user')->get(); // Ambil semua file beserta informasi pengunggahnya
                $fileIds = [];

                foreach ($files as $file) {
                    $uploaderPositionId = DB::table('users')
                        ->where('id', $file->user_id)
                        ->value('position_id');

                    $uploaderOfficeIds = DB::table('positiontooffices')
                        ->where('position_id', $uploaderPositionId)
                        ->pluck('office_id')
                        ->toArray();

                    if (array_intersect($uploaderOfficeIds, $officeIds)) {
                        // Jika ada kantor yang sama, tambahkan file_id ke array
                        $fileIds[] = $file->id;
                    }
                }

                // Langkah 3: Ambil data phase_times berdasarkan file_id yang sudah difilter
                $month = $monthYear[0];
                $year = $monthYear[1];

                $data = DB::table('phase_times')
                    ->join('files', 'phase_times.file_id', '=', 'files.id')
                    ->join('users', 'files.user_id', '=', 'users.id')
                    ->select(
                        'phase_times.file_id',
                        'phase_times.phase',
                        'phase_times.startTime',
                        'phase_times.endTime',
                        'files.name as fileName',
                        'files.nik_pemohon as nikPemohon',
                        'files.nik_pasangan as nikPasangan',
                        'files.nik_jaminan as nikJaminan',
                    )
                    ->whereMonth('files.created_at', $month)
                    ->whereYear('files.created_at', $year)
                    ->whereIn('phase_times.file_id', $fileIds)
                    ->orderBy('phase_times.file_id')
                    ->orderBy('phase_times.phase')
                    ->get();

                // Kelompokkan data berdasarkan file_id
                $groupedData = $data->groupBy('file_id');

                // Format data untuk laporan
                $reportData = [];
                foreach ($groupedData as $fileId => $phases) {
                    $row = ['no' => count($reportData) + 1];
                    $fileName = $phases->first()->fileName;
                    $row['nameFile'] = $fileName;
                    $row['nikPemohon'] = $phases->first()->nikPemohon;
                    $row['nikPasangan'] = $phases->first()->nikPasangan;
                    $row['nikJaminan'] = $phases->first()->nikJaminan;

                    for ($i = 1; $i <= 5; $i++) {
                        $phase = $phases->firstWhere('phase', $i);
                        if ($phase) {
                            $startTime = strtotime($phase->startTime);
                            $endTime = $phase->endTime ? strtotime($phase->endTime) : time();
                            $duration = $endTime - $startTime;
                            $row['phase' . $i . 'Time'] = gmdate('H:i:s', $duration);
                        } else {
                            $row['phase' . $i . 'Time'] = 'N/A';
                        }
                    }
                    $reportData[] = $row;
                }

                $date = \Carbon\Carbon::create($year, $month, 1);
                $fileName = 'phase_time_report_' . $date->format('Y-m') . '.xlsx';
                ActivityHelper::userActivity(Auth::user()->id, 'USER MENDOWNLOAD REKAP DATA FILE KREDIT');

                return Excel::download(new PhaseTimeReportExport($reportData), $fileName);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    //=> change file status
    public function changeStatus(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required',
                'status' => 'required',
                'reasonRejected' => 'required_if:status,3',
            ], [
                'id.required' => 'ID harus diisi',
                'status.required' => 'Status harus diisi',
                'reasonRejected.required_if' => 'Alasan penolakan harus diisi ketika status adalah ditolak',
            ]);

            $file = File::findOrFail($request->id);

            // Check if the previous status was 3 and the new status is not 3
            if ($file->isApproved == 3 && $request->status != 3) {
                $file->reasonRejected = null;
            }

            $file->isApproved = $request->status;

            if ($request->status == 3) {
                $file->reasonRejected = $request->reasonRejected;
            }

            $file->save();

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengganti status kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Mengganti status kredit ' . $file->name);
            TelegramHelper::changeStatus($file->id, $request->status, $file->user_id);

            return ResponseHelper::successRes('File updated successfully', $file);
        } catch (ModelNotFoundException $e) {
            return ResponseHelper::errorRes('File not found');
        } catch (ValidationException $e) {
            return ResponseHelper::errorRes($e->errors());
        } catch (\Exception $e) {
            return ResponseHelper::errorRes('An error occurred while updating the file | ' . $e->getMessage());
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

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Mengganti hasil survei kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Mengganti hasil survei kredit ' . $file->name);

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

            $file = File::where('id', $fileId)->first();

            ActivityHelper::fileActivity($note->file_id, Auth::user()->id, 'Menghapus note');

            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus note ' . $file->name);

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

            return ResponseHelper::successRes('Berhasill menambahkan note', $note);
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
                return ResponseHelper::errorRes('Data Kredit tidak ditemukan');
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

            return ResponseHelper::successRes('Berhasill Mengedit note', $note);
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
                'phase' => 'required',
                'name' => 'required',
                'note' => 'required',
                'link' => 'nullable|url|required_without:path',
                'path' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx,xls,xlsx|required_without:link',
                'isApprove' => 'required',
            ], [
                'required' => ':attribute harus diisi',
                'mimes' => ':attribute harus berupa file dengan tipe: jpeg, jpg, png, pdf, doc, docx, xls, atau xlsx',
                'url' => ':attribute harus berupa URL yang valid atau tambahkan https://',
                'path.required_without' => ':attribute harus diisi jika link kosong',
                'link.required_without' => ':attribute harus diisi jika path kosong',
                'file' => ':attribute harus berupa file yang diunggah',
            ]);
            $cekAttach = Attachment::where('name', $request->name)->where('file_id', $request->file_id)->count();

            if ($cekAttach > 0) {
                return ResponseHelper::errorRes('File sudah ada');
            }

            $attch = new Attachment();
            $attch->file_id = $request->file_id;
            $attch->phase = $request->phase;
            $attch->name = $request->name;
            $attch->note = $request->note;
            $attch->startTime = Carbon::now();
            $attch->isApprove = $request->isApprove;
            if ($request->isApprove == 1) {
                $attch->endTime = Carbon::now();
            }

            if ($request->has('link')) {
                $attch->link = $request->link;
                $attch->path = 'null';
                $attch->startTime = Carbon::now();
                $oldPath = public_path('file/' . $request->file_id . '/' . $attch->path);
                if (FacadesFile::exists($oldPath)) {
                    FacadesFile::delete($oldPath);
                }
            } else {
                if ($request->hasFile('path')) {
                    // Upload new file
                    $rand = Str::random(10);
                    $fileObject = $request->file('path');
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $request->file_id . '/'), $fileimage);

                    $attch->link = null;
                    $attch->path = $fileimage;
                }
            }

            if ($request->has('isSecret')) {
                $attch->isSecret = $request->isSecret;
            }
            $attch->save();

            $file = File::where('id', $request->file_id)->first();

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Menambahkan Lampiran');
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan lampiran di kredit ' . $file->name);

            TelegramHelper::AddUpdate($request->file_id, 'Menambahkan Lampiran : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('Berhasil menambahkan attachment', $attch);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function editAttachment(Request $request, $id)
    {
        try {
            $request->validate([
                'link' => 'nullable|url|required_without:path',
                'path' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx,xls,xlsx|required_without:link',
            ], [
                'link.url' => ':attribute harus berupa URL yang valid atau tambahkan https://',
                'path.file' => ':attribute harus berupa file',
                'path.mimes' => ':attribute harus berupa file dengan tipe: jpeg, jpg, png, pdf, doc, docx, xls, atau xlsx',
                'path.required_without' => ':attribute harus diisi jika link kosong',
                'link.required_without' => ':attribute harus diisi jika path kosong',
            ]);

            $attachment = Attachment::findOrFail($id);
            $attachment->name = $request->name;
            $attachment->note = $request->note;

            if ($request->has('link')) {
                $attachment->link = $request->link;
                $attachment->path = 'null';
                $attachment->startTime = Carbon::now();
                $oldPath = public_path('file/' . $request->file_id . '/' . $attachment->path);
                if (FacadesFile::exists($oldPath)) {
                    FacadesFile::delete($oldPath);
                }
            } else {
                if ($request->hasFile('path')) {
                    // Delete old file
                    $oldPath = public_path('file/' . $request->file_id . '/' . $attachment->path);
                    if (FacadesFile::exists($oldPath)) {
                        FacadesFile::delete($oldPath);
                    }

                    // Upload new file
                    $rand = Str::random(10);
                    $fileObject = $request->file('path');
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $request->file_id . '/'), $fileimage);

                    $attachment->link = null;
                    $attachment->path = $fileimage;
                    $attachment->startTime = Carbon::now();
                }
            }

            $attachment->isSecret = $request->isSecret;


            if ($request->isApprove == 1) {
                $attachment->isApprove = $request->isApprove;
                $attachment->endTime = Carbon::now();
            } else {
                $attachment->isApprove = $request->isApprove;
            }

            $attachment->save();

            $file = File::where('id', $attachment->file_id)->first();

            ActivityHelper::fileActivity($attachment->file_id, Auth::user()->id, 'Mengedit Lampiran');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit lampiran di kredit ' . $file->name);

            TelegramHelper::AddUpdate($attachment->file_id, 'Merubah Lampiran : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('Attachment updated successfully', $attachment);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // If the attachment is not found, create a new one
            $attachment = new Attachment();
            $attachment->name = $request->name;
            $attachment->phase = $request->phase;
            $attachment->file_id = $request->file_id;  // Assuming this is available in the request

            if ($request->has('link')) {
                $attachment->link = $request->link;
                $attachment->path = 'null';
                $attachment->startTime = Carbon::now();
                $oldPath = public_path('file/' . $request->file_id . '/' . $attachment->path);
                if (FacadesFile::exists($oldPath)) {
                    FacadesFile::delete($oldPath);
                }
            } else {
                if ($request->hasFile('path')) {
                    // Delete old file
                    $oldPath = public_path('file/' . $request->file_id . '/' . $attachment->path);
                    if (FacadesFile::exists($oldPath)) {
                        FacadesFile::delete($oldPath);
                    }

                    // Upload new file
                    $rand = Str::random(10);
                    $fileObject = $request->file('path');
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $request->file_id . '/'), $fileimage);

                    $attachment->link = null;
                    $attachment->path = $fileimage;
                    $attachment->startTime = Carbon::now();
                }
            }

            $attachment->isSecret = $request->isSecret;

            if ($request->isApprove == 1) {
                $attachment->isApprove = $request->isApprove;
                $attachment->endTime = Carbon::now();
            } else {
                $attachment->isApprove = $request->isApprove;
            }

            $attachment->save();

            TelegramHelper::AddUpdate($attachment->file_id, 'Menambah Lampiran Baru : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('Attachment created successfully', $attachment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function approveAttachment($id)
    {
        try {
            $attachment = Attachment::findOrFail($id);
            $attachment->isApprove = !$attachment->isApprove;
            $attachment->save();

            return ResponseHelper::successRes('Attachment updated successfully', $attachment);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getAttachment($id)
    {
        try {
            $attachment = Attachment::findOrFail($id);

            return ResponseHelper::successRes('Attachment found successfully', $attachment);
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
            $file->order_source = $request->order_source;
            $file->nik_pemohon = $request->nik_pemohon;

            $file->nik_pasangan = $request->nik_pasangan || $request->nik_pasangan != 'null' ? $request->nik_pasangan : null;
            $file->nik_jaminan = $request->nik_jaminan || $request->nik_jaminan != 'null' ? $request->nik_jaminan : null;

            $file->address = $request->address;
            $file->no_hp = $request->no_hp;
            $file->save();

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Edit Informasi Umum');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit Informasi Umum di kredit ' . $file->name);
            TelegramHelper::AddUpdate($file->id, 'Merubah Informasi Umum : ' . $request->name, Auth::user()->id);
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
                // $cekAttchApproval = Attachment::where('file_id', $file->id)->where('phase', $file->phase)
                //     ->get();
                // Memeriksa apakah terdapat lampiran "File Banding" yang nilai atributnya bukan string "null"
                $cekFileBanding = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('File Banding')])
                    ->where('path', '!=', 'null') // Asumsi atribut yang dicek bernama 'path'
                    ->count();

                // Memeriksa apakah terdapat lampiran "Analisa Awal Kredit AO" yang nilai atributnya bukan string "null"
                $cekAnalystAo = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Analisa Awal Kredit AO')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->count();

                // Memeriksa apakah "Detail SLIK" dan "Resume SLIK" memiliki isApprove != 0
                $detailSlikPemohonApproved = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Detail SLIK Pemohon')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->where('isApprove', '!=', 0)
                    ->count();
                $detailSlikPasanganApproved = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Detail SLIK Pasangan')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->where('isApprove', '!=', 0)
                    ->count();
                $detailSlikAtasNamaApproved = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Detail SLIK Atas nama jaminan')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->where('isApprove', '!=', 0)
                    ->count();

                $resumeSlikApproved = Attachment::where('file_id', $file->id)
                    ->where('phase', 2)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Resume SLIK')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->where('isApprove', '!=', 0)
                    ->count();

                $analisaCreditApproved = Attachment::where('file_id', $file->id)
                    ->where('phase', 3)
                    ->whereRaw('LOWER(name) = ?', [Str::lower('Analisa Kredit')])
                    ->where(function ($query) {
                        $query->where('link', '!=', 'null')
                            ->orWhere('path', '!=', 'null');
                    })
                    ->where('isApprove', '!=', 0)
                    ->count();

                if ($file->phase >= 2) {
                    if ($file->nik_pasangan != null && $file->nik_pasangan != 'null') {
                        if ($detailSlikPasanganApproved == 0) {
                            return ResponseHelper::errorRes('Maaf, Karena anda memasukkan data NIK Pasangan maka, Detail SLIK Pasangan wajib dilampirkan / approve');
                        }
                    }

                    if ($file->nik_jaminan != null && $file->nik_jaminan != 'null') {
                        if ($detailSlikAtasNamaApproved == 0) {
                            return ResponseHelper::errorRes('Maaf, Karena anda memasukkan data NIK Atas Nama Jaminan, maka Detail SLIK Atas nama jaminan wajib di isi / approve');
                        }
                    }

                    if ($cekFileBanding == 0 && $cekAnalystAo == 0) {
                        return ResponseHelper::errorRes('Maaf, ada Lampiran yang masih belum disetujui / diyakini kebenarannya / Kosong');
                    }

                    // if (($detailSlikApproved > 0 && $resumeSlikApproved > 0) && ($cekFileBanding > 0 || $cekAnalystAo > 0)) {


                    // } else {
                    //     // Jika kondisi tidak terpenuhi, kembalikan pesan error
                    //     return ResponseHelper::errorRes('Maaf, ada Lampiran yang masih belum disetujui / diyakini kebenarannya / Kosong');
                    // }

                    $filephase = $file->phase + 1;

                    // if ($file->plafon >= 25000000) {
                    if ($file->phase > 6) {
                        return ResponseHelper::errorRes('Sistem hanya sampai phase 5(Operation)');
                    }
                    if ($file->phase == 5) {
                        $cekAllAttcahmentPhase5 = Attachment::where('phase', 5)
                            ->where('file_id', $file->id)
                            ->where(function ($query) {
                                $query->whereNotNull('link')
                                    ->orWhereNotNull('path');
                            })
                            ->where('isApprove', 0)
                            ->count();

                        if ($cekAllAttcahmentPhase5 > 0) {
                            return ResponseHelper::errorRes('File mandatory Belum Lengkap / ada yang belum di setujui');
                        }

                        $file->phase = 6;
                        $file->isApproved = 1;
                        $file->save();

                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();
                        }

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui: ' . $file->name);

                        EmailHelper::AddUpdate($file->id);
                        TelegramHelper::AgreementPhase4($file->id, "File Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);

                        return ResponseHelper::successRes('File Status Telah diubah menjadi disetujui', $file);
                    }
                    if ($file->phase == 4) {
                        $lembarPengesahanApproved = Attachment::where('file_id', $file->id)
                            ->where('phase', 4)
                            ->whereRaw('LOWER(name) = ?', [Str::lower('Lembar Pengesahan')])
                            ->where(function ($query) {
                                $query->where('link', '!=', 'null')
                                    ->orWhere('path', '!=', 'null');
                            })
                            ->where('isApprove', '!=', 0)
                            ->count();
                        $rekomendasiKepatuhanApproved = Attachment::where('file_id', $file->id)
                            ->where('phase', 4)
                            ->whereRaw('LOWER(name) = ?', [Str::lower('Rekomendasi Kepatuhan')])
                            ->where(function ($query) {
                                $query->where('link', '!=', 'null')
                                    ->orWhere('path', '!=', 'null');
                            })
                            ->where('isApprove', '!=', 0)
                            ->count();

                        if ($lembarPengesahanApproved == 0 || $rekomendasiKepatuhanApproved == 0) {
                            return ResponseHelper::errorRes('File mandatory kosong / belum disetujui');
                        }

                        $file->phase = 5;
                        $file->save();

                        $filephase = $file->phase;

                        $phaseTime4 = PhaseTime::where('file_id', $file->id)
                            ->where('phase', 4)
                            ->first();
                        $phaseTime4->endTime = Carbon::now();
                        $phaseTime4->save();

                        $phaseTime = PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase,]);

                        $phaseTime->startTime = Carbon::now();
                        $phaseTime->save();

                        //add count time
                        // if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                        //     $phaseTime->endTime = Carbon::now();
                        //     $phaseTime->save();

                        //     PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                        // }

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
                        $matchFound = false;

                        foreach ($notifPositions as $pos) {
                            foreach ($notifUser as $user) {
                                if ($pos->position_id == $user->position_id && $userUploaded->position_id != $pos->position_id) {
                                    Approval::firstOrCreate(
                                        ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                                        ['approved' => 0]
                                    );
                                    $matchFound = true;
                                }
                            }
                        }


                        if (!$matchFound) {
                            return ResponseHelper::errorRes('Error1, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                        }

                        if ($file->phase == 5) {
                            $attachments = [
                                ['name' => 'SP3K', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                                ['name' => 'Notaris', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);
                        TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);
                        EmailHelper::AddUpdate($file->id);

                        return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    }
                    if ($file->phase < 4) {
                        // if ($detailSlikApproved > 0 && $resumeSlikApproved > 0) {
                        if ($resumeSlikApproved > 0) {

                            // Memeriksa apakah terdapat lampiran "Analisa Awal Kredit AO" yang nilai atributnya bukan string "null"
                            $cekAnalystAoApproved = Attachment::where('file_id', $file->id)
                                ->where('phase', 2)
                                ->whereRaw('LOWER(name) = ?', [Str::lower('Analisa Awal Kredit AO')])
                                ->where(function ($query) {
                                    $query->where('link', '!=', 'null')
                                        ->orWhere('path', '!=', 'null');
                                })
                                ->count();

                            if ($cekAnalystAoApproved == 0) {
                                return ResponseHelper::errorRes('Analisa Awal Kredit AO Belum Disetujui');
                            }
                            // } else if ($detailSlikApproved == 0 && $resumeSlikApproved == 0) {
                        } else if ($resumeSlikApproved == 0) {

                            // Memeriksa apakah terdapat lampiran "File Banding" yang nilai atributnya bukan string "null"
                            $cekFileBandingApproved = Attachment::where('file_id', $file->id)
                                ->where('phase', 2)
                                ->whereRaw('LOWER(name) = ?', [Str::lower('File Banding')])
                                ->where('path', '!=', 'null') // Asumsi atribut yang dicek bernama 'path'
                                ->count();

                            if ($cekFileBandingApproved == 0) {
                                return ResponseHelper::errorRes('File Banding AO Belum Disetujui');
                            }
                        }

                        if ($file->phase == 3 && $analisaCreditApproved == 0) {
                            return ResponseHelper::errorRes('Analisa Kredit CA Belum Disetujui / Kosong, mohon isi ulang');
                        }
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
                        $matchFound = false;

                        if ($file->phase == 3) {
                            foreach ($notifPositions as $pos) {
                                foreach ($notifUser as $user) {
                                    if ($pos->position_id == $user->position_id && $userUploaded->position_id != $pos->position_id) {
                                        Approval::firstOrCreate(
                                            ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                                            ['approved' => 0]
                                        );
                                        $matchFound = true;
                                    }
                                }
                            }

                            Approval::firstOrCreate(
                                ['file_id' => $file->id, 'user_id' => $userUploaded->id, 'phase' => $pos->phase],
                                ['approved' => 0]
                            );
                        } else {
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
                        }

                        if (!$matchFound) {
                            return ResponseHelper::errorRes('Error2, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                        }

                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();


                            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                        }

                        $file->phase = $filephase;
                        $file->save();

                        //add attchament to phase 2
                        if ($file->phase == 2) {
                            $attachments = [
                                ['name' => 'Detail SLIK', 'path' => 'null', 'isSecret' => 1, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'Resume SLIK', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'File Banding', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'Analisa Awal Kredit AO', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,]
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        //add attchament to phase 3
                        if ($file->phase == 3) {
                            $attachments = [
                                ['name' => 'Analisa Kredit', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 3, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        //add attchament to phase 4
                        if ($file->phase == 4) {
                            $attachments = [
                                ['name' => 'Lembar Pengesahan', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 4, 'file_id' => $file->id,],
                                ['name' => 'Rekomendasi Kepatuhan', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 4, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        if ($file->phase == 5) {
                            $attachments = [
                                ['name' => 'SP3K', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                                ['name' => 'Notaris', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }
                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();

                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();


                            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                        }

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);

                        EmailHelper::AddUpdate($file->id);
                        TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                        return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    }
                } else {
                    $filephase = $file->phase + 1;

                    // if ($file->plafon >= 25000000) {
                    if ($file->phase > 6) {
                        return ResponseHelper::errorRes('Sistem hanya sampai phase 5(Operation)');
                    }
                    if ($file->phase == 5) {
                        $file->phase = 6;
                        $file->isApproved = 1;
                        $file->save();
                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();
                        }

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui: ' . $file->name);

                        EmailHelper::AddUpdate($file->id);
                        TelegramHelper::AgreementPhase4($file->id, "File Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);

                        return ResponseHelper::successRes('File Status Telah diubah menjadi disetujui', $file);
                    } else if ($file->phase < 5) {
                        $cekAllAttcahmentPhase1 = Attachment::where('phase', 1)
                            ->where('file_id', $file->id)
                            ->where(function ($query) {
                                $query->whereNotNull('link')
                                    ->orWhereNotNull('path');
                            })
                            ->where('isApprove', 0)
                            ->count();

                        if ($cekAllAttcahmentPhase1 > 0) {
                            return ResponseHelper::errorRes('File Belum Lengkap / ada yang belum di setujui');
                        }

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
                                ->where('phase', $filephase)
                                ->where('canApprove', 1)
                                ->get();

                            $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                        }
                        $notifUser = [];
                        foreach ($notifPositions as $notifPosition) {
                            if (Auth::user()->position_id == $notifPosition->position_id) {
                                $users = DB::table('users')
                                    ->where('position_id', $notifPosition->position_id)
                                    ->where('isActive', 1)
                                    ->where('id', Auth::user()->id)
                                    ->get();

                                $notifUser = array_merge($notifUser, $users->toArray());
                            } else {
                                $users = DB::table('users')
                                    ->where('position_id', $notifPosition->position_id)
                                    ->where('isActive', 1)
                                    ->get();
                                $notifUser = array_merge($notifUser, $users->toArray());
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

                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();

                            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                        }

                        $file->phase = $filephase;
                        $file->save();

                        //add attchament to phase 2
                        if ($file->phase == 2) {
                            $attachments = [
                                ['name' => 'Detail SLIK', 'path' => 'null', 'isSecret' => 1, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'Resume SLIK', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'File Banding', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                                ['name' => 'Analisa Awal Kredit AO', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,]
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    // $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        //add attchament to phase 3
                        if ($file->phase == 3) {
                            $attachments = [
                                ['name' => 'Analisa Kredit', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 3, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }
                        //add attchament to phase 4
                        if ($file->phase == 4) {
                            $attachments = [
                                ['name' => 'Lembar Pengesahan', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 4, 'file_id' => $file->id,],
                                ['name' => 'Rekomendasi Kepatuhan', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 4, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        if ($file->phase == 5) {
                            $attachments = [
                                ['name' => 'SP3K', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                                ['name' => 'Notaris', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                            ];

                            foreach ($attachments as $data) {
                                $existingAttachment = Attachment::where('file_id', $data['file_id'])
                                    ->where('name', $data['name'])
                                    ->where('phase', $data['phase'])
                                    ->first();

                                if (!$existingAttachment) {
                                    // Only create a new attachment if it doesn't already exist
                                    $attachment = new Attachment();
                                    $attachment->phase = $data['phase'];
                                    $attachment->file_id = $data['file_id'];
                                    $attachment->name = $data['name'];
                                    $attachment->path = $data['path'];
                                    $attachment->isSecret = $data['isSecret'];
                                    $attachment->isApprove = $data['isApprove'];
                                    $attachment->startTime = Carbon::now();
                                    $attachment->save();
                                }
                            }
                        }

                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();

                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();

                            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                        }

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);

                        EmailHelper::AddUpdate($file->id);
                        TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                        return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    }
                    // }
                    // if ($file->plafon < 25000000) {
                    //     if ($file->phase > 6) {
                    //         return ResponseHelper::errorRes('Sistem hanya sampai phase 5(Operation)');
                    //     }
                    //     if ($file->phase == 5) {
                    //         $file->phase = 6;
                    //         $file->isApproved = 1;
                    //         $file->save();
                    //         $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                    //         //add count time
                    //         if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                    //             $phaseTime->endTime = Carbon::now();
                    //             $phaseTime->save();
                    //         }

                    //         ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui');
                    //         ActivityHelper::userActivity(Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui: ' . $file->name);

                    //         EmailHelper::AddUpdate($file->id);
                    //         TelegramHelper::AgreementPhase4($file->id, "File Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);

                    //         return ResponseHelper::successRes('File Status Telah diubah menjadi disetujui', $file);
                    //     }
                    //     if ($file->phase == 3) {
                    //         $file->phase = 5;
                    //         $file->save();

                    //         // $userUploaded = User::where('id', $file->user_id)->first();
                    //         // $userPosition = Position::where('id', $userUploaded->position_id)->first();
                    //         // $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                    //         // $notifPositions = [];
                    //         // //add user to approval
                    //         // foreach ($userOffices as $userOffice) {
                    //         //     $notificationConfigurations = DB::table('notification_configurations')
                    //         //         ->where('office_id', $userOffice->office_id)
                    //         //         ->where('phase', $filephase)
                    //         //         ->where('canApprove', 1)
                    //         //         ->get();

                    //         //     $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                    //         // }
                    //         // $notifUser = [];
                    //         // foreach ($notifPositions as $notifPosition) {
                    //         //     $users = DB::table('users')
                    //         //         ->where('position_id', $notifPosition->position_id)
                    //         //         ->where('isActive', 1)
                    //         //         ->get();
                    //         //     $notifUser = array_merge($notifUser, $users->toArray());
                    //         // }
                    //         // $matchFound = false;

                    //         // foreach ($notifPositions as $pos) {
                    //         //     foreach ($notifUser as $user) {
                    //         //         if ($pos->position_id == $user->position_id) {
                    //         //             Approval::firstOrCreate(
                    //         //                 ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                    //         //                 ['approved' => 0]
                    //         //             );
                    //         //             $matchFound = true;
                    //         //         }
                    //         //     }
                    //         // }

                    //         // if (!$matchFound) {
                    //         //     return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                    //         // }

                    //         $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();

                    //         //add count time
                    //         if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                    //             $phaseTime->endTime = Carbon::now();
                    //             $phaseTime->save();


                    //             PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                    //         }

                    //         if ($file->phase == 5) {
                    //             $attachments = [
                    //                 ['name' => 'SP3K', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                    //                 ['name' => 'Notaris', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 5, 'file_id' => $file->id,],
                    //             ];

                    //             foreach ($attachments as $data) {
                    //                 $existingAttachment = Attachment::where('file_id', $data['file_id'])
                    //                     ->where('name', $data['name'])
                    //                     ->where('phase', $data['phase'])
                    //                     ->first();

                    //                 if (!$existingAttachment) {
                    //                     // Only create a new attachment if it doesn't already exist
                    //                     $attachment = new Attachment();
                    //                     $attachment->phase = $data['phase'];
                    //                     $attachment->file_id = $data['file_id'];
                    //                     $attachment->name = $data['name'];
                    //                     $attachment->path = $data['path'];
                    //                     $attachment->isSecret = $data['isSecret'];
                    //                     $attachment->isApprove = $data['isApprove'];
                    //                     $attachment->startTime = Carbon::now();
                    //                     $attachment->save();
                    //                 }
                    //             }
                    //         }

                    //         ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                    //         ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);
                    //         // TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);
                    //         // EmailHelper::AddUpdate($file->id);

                    //         return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    //     }
                    //     if ($file->phase < 3) {
                    //         $userUploaded = User::where('id', $file->user_id)->first();
                    //         $userPosition = Position::where('id', $userUploaded->position_id)->first();
                    //         $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                    //         $notifPositions = [];

                    //         //add user to approval
                    //         foreach ($userOffices as $userOffice) {
                    //             $notificationConfigurations = DB::table('notification_configurations')
                    //                 ->where('office_id', $userOffice->office_id)
                    //                 ->where('phase', $filephase)
                    //                 ->where('canApprove', 1)
                    //                 ->get();

                    //             $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                    //         }
                    //         $notifUser = [];
                    //         foreach ($notifPositions as $notifPosition) {
                    //             $users = DB::table('users')
                    //                 ->where('position_id', $notifPosition->position_id)
                    //                 ->where('isActive', 1)
                    //                 ->get();
                    //             $notifUser = array_merge($notifUser, $users->toArray());
                    //         }
                    //         $matchFound = false;

                    //         foreach ($notifPositions as $pos) {
                    //             foreach ($notifUser as $user) {
                    //                 if ($pos->position_id == $user->position_id) {
                    //                     Approval::firstOrCreate(
                    //                         ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                    //                         ['approved' => 0]
                    //                     );
                    //                     $matchFound = true;
                    //                 }
                    //             }
                    //         }

                    //         if (!$matchFound) {
                    //             return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                    //         }

                    //         $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();

                    //         //add count time
                    //         if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                    //             $phaseTime->endTime = Carbon::now();
                    //             $phaseTime->save();


                    //             PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $filephase, 'startTime' => Carbon::now()]);
                    //         }

                    //         $file->phase = $filephase;
                    //         $file->save();

                    //         //add attchament to phase 2
                    //         if ($file->phase == 2) {
                    //             $attachments = [
                    //                 ['name' => 'Detail SLIK', 'path' => 'null', 'isSecret' => 1, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                    //                 ['name' => 'Resume SLIK', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                    //                 ['name' => 'File Banding', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,],
                    //                 ['name' => 'Analisa Awal Kredit AO', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 2, 'file_id' => $file->id,]
                    //             ];

                    //             foreach ($attachments as $data) {
                    //                 foreach ($attachments as $data) {
                    //                     $existingAttachment = Attachment::where('file_id', $data['file_id'])
                    //                         ->where('name', $data['name'])
                    //                         ->where('phase', $data['phase'])
                    //                         ->first();

                    //                     if (!$existingAttachment) {
                    //                         // Only create a new attachment if it doesn't already exist
                    //                         $attachment = new Attachment();
                    //                         $attachment->phase = $data['phase'];
                    //                         $attachment->file_id = $data['file_id'];
                    //                         $attachment->name = $data['name'];
                    //                         $attachment->path = $data['path'];
                    //                         $attachment->isSecret = $data['isSecret'];
                    //                         $attachment->isApprove = $data['isApprove'];
                    //                         $attachment->startTime = Carbon::now();
                    //                         $attachment->save();
                    //                     }
                    //                 }
                    //             }
                    //         }

                    //         //add attchament to phase 3
                    //         if ($file->phase == 3) {
                    //             $attachments = [
                    //                 ['name' => 'Analisa Kredit', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 3, 'file_id' => $file->id,],
                    //             ];

                    //             foreach ($attachments as $data) {
                    //                 $existingAttachment = Attachment::where('file_id', $data['file_id'])
                    //                     ->where('name', $data['name'])
                    //                     ->where('phase', $data['phase'])
                    //                     ->first();

                    //                 if (!$existingAttachment) {
                    //                     // Only create a new attachment if it doesn't already exist
                    //                     $attachment = new Attachment();
                    //                     $attachment->phase = $data['phase'];
                    //                     $attachment->file_id = $data['file_id'];
                    //                     $attachment->name = $data['name'];
                    //                     $attachment->path = $data['path'];
                    //                     $attachment->isSecret = $data['isSecret'];
                    //                     $attachment->isApprove = $data['isApprove'];
                    //                     $attachment->startTime = Carbon::now();
                    //                     $attachment->save();
                    //                 }
                    //             }
                    //         }

                    //         if ($file->phase == 5) {
                    //             $attachments = [
                    //                 ['name' => 'SP3K', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 3, 'file_id' => $file->id,],
                    //                 ['name' => 'Notaris', 'path' => 'null', 'isSecret' => 0, 'isApprove' => 0, 'phase' => 3, 'file_id' => $file->id,],
                    //             ];

                    //             foreach ($attachments as $data) {
                    //                 $existingAttachment = Attachment::where('file_id', $data['file_id'])
                    //                     ->where('name', $data['name'])
                    //                     ->where('phase', $data['phase'])
                    //                     ->first();

                    //                 if (!$existingAttachment) {
                    //                     // Only create a new attachment if it doesn't already exist
                    //                     $attachment = new Attachment();
                    //                     $attachment->phase = $data['phase'];
                    //                     $attachment->file_id = $data['file_id'];
                    //                     $attachment->name = $data['name'];
                    //                     $attachment->path = $data['path'];
                    //                     $attachment->isSecret = $data['isSecret'];
                    //                     $attachment->isApprove = $data['isApprove'];
                    //                     $attachment->startTime = Carbon::now();
                    //                     $attachment->save();
                    //                 }
                    //             }
                    //         }

                    //         ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                    //         ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);
                    //         // TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);
                    //         // EmailHelper::AddUpdate($file->id);

                    //         return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    //     }
                    // }
                }
            } else {
                $dataPhase = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase)->first();
                $dataApproval = Approval::where('file_id', $file->id)->where('phase', $file->phase)->get();

                if ($dataPhase) {
                    $dataPhase->delete();
                }
                if ($dataApproval) {
                    foreach ($dataApproval as $approval) {
                        $approval->delete();
                    }
                }

                if ($file->phase == 5) {
                    // if ($file->plafon >= 250000000) {
                    $filephase = $file->phase - 1;
                    $file->phase = $file->phase - 1;

                    $file->save();
                    // } 
                    // if {
                    //     $filephase = $file->phase - 2;
                    //     $file->phase = $file->phase - 2;

                    //     $file->save();
                    // }
                } else {
                    $filephase = $file->phase - 1;
                    $file->phase = $file->phase - 1;

                    $file->save();
                }

                ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);

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

            ActivityHelper::fileActivity($attch->file_id, Auth::user()->id, 'Menghapus File Kredit: ' . $attchName);
            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus File Kredit: ' . $attchName);

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
            $userPos = User::where('id', Auth::user()->id)->first();
            $getPostionData = Position::where('id', $userPos->position_id)->first();
            $role = Role::where('id', $getPostionData->role_id)->first();

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
                $files = File::where('user_id', Auth::user()->id)->with('user')->orderBy('created_at', 'desc')->get();

                ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

                return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'role' => $role]);
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

                $fileAll = File::with('user')->orderBy('created_at', 'desc')->get();
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

                return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'role' => $role]);
            }
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function getFile(Request $request)
    {
        try {
            $monthYear = explode('-', $request->monthYear);

            // Ambil bulan dan tahun
            $month = $monthYear[0];
            $year = $monthYear[1];

            $userNow = User::with('position')->where('id', Auth::user()->id)->first();
            $userPos = User::where('id', Auth::user()->id)->first();
            $getPostionData = Position::where('id', $userPos->position_id)->first();
            $role = Role::where('id', $getPostionData->role_id)->first();

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
                    ->with('user')
                    ->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->orderBy('created_at', 'desc')
                    ->get();

                ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

                return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'role' => $role]);
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

                $fileAll = File::with('user')
                    ->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->orderBy('created_at', 'desc')
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

                return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess, 'role' => $role]);
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
                'nik_pemohon' => 'required',
                'address' => 'required',
                'no_hp' => 'required',
                'order_source' => 'required',
                'file1'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file2'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file3'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file4'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file5'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file7'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file8'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file9'  => 'mimes:jpeg,jpg,png,pdf,doc,docx',
                'file10' => 'mimes:jpeg,jpg,png,pdf,doc,docx',
            ], [
                'required' => ':attribute harus diisi',
                'mimes' => ':attribute harus berupa jpeg, jpg, png,pdf,xls,xlsx',
            ]);

            $file = new File();
            $file->user_id = Auth::user()->id;
            $file->name = $request->name;
            $file->plafon = $request->plafon;
            $file->type_bussiness = $request->type_bussiness;
            $file->desc_bussiness = $request->desc_bussiness;
            $file->order_source = $request->order_source;
            $file->nik_pemohon = $request->nik_pemohon;
            $file->address = $request->address;
            $file->no_hp = $request->no_hp;
            $file->isApproved = 2;
            $file->phase = 1;
            if ($request->hasFile('file2')) {
                $file->nik_pasangan = $request->nik_pasangan;
            }

            if ($request->hasFile('file3')) {
                $file->nik_jaminan = $request->nik_jaminan;
            }
            $file->save();

            for ($i = 1; $i <= 11; $i++) {

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
                    $attch->phase = 1;
                    $attch->file_id = $file->id;
                    $attch->name =  $request->{$noteFile};
                    $attch->path = $fileimage;
                    $attch->isSecret = 0;
                    $attch->isApprove = 1;
                    $attch->startTime = Carbon::now();
                    $attch->endTime = Carbon::now();
                    $attch->save();
                }
            }

            $attch = new Attachment();
            $attch->phase = 1;
            $attch->file_id = $file->id;
            $attch->name =  'Form Permohonan SLIK';
            $attch->path = 'null';
            $attch->isSecret = 0;
            $attch->isApprove = 0;
            $attch->startTime = Carbon::now();
            $attch->endTime = Carbon::now();
            $attch->save();

            // //add user to approval
            Approval::firstOrCreate(
                ['file_id' => $file->id, 'user_id' => $file->user_id, 'phase' => $file->phase],
                ['approved' => 0]
            );
            //add count time
            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menambahkan Data Kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan Data Kredit' . $file->name);

            EmailHelper::AddUpdate($file->id);
            TelegramHelper::AddFile($file->id);

            return ResponseHelper::successRes('Berhasil menambahkan data', $file);
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

            $attachments = Attachment::where('file_id', $file->id)->get();

            // Log the activity before deleting the file
            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menghapus Data Kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus Data Kredit: ' . $file->name);

            // Delete related records
            $file->phaseTimes()->delete();
            $file->approvals()->delete();
            $file->notes()->delete();
            $file->appeals()->delete();
            $file->filesubmissions()->delete();
            $file->fileActivities()->delete(); // This line may not be necessary if it is logged after deletion

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
                'approvals.user.position',
                'phaseTimes',
                'filesubmissions',
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
                    // ->where('phase', $file->phase)
                    ->get();

                $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
            }

            $userPosNow = User::where('id', Auth::user()->id)->first();
            $userAccess = [];

            $userAccessByPhase = [
                1 => [],
                2 => [],
                3 => [],
                4 => [],
                5 => [],
                6 => []
            ];

            // Iterate over each notifPosition to categorize user access based on phase.
            foreach ($notifPositions as $notifPosition) {
                // Check if the position_id matches the user's current position.
                if ($notifPosition->position_id == $userPosNow->position_id) {
                    // Extract user access details for the current notifPosition.
                    $userAccess = [
                        'canAppeal' => $notifPosition->canAppeal,
                        'canApproveAppeal' => $notifPosition->canApproveAppeal,
                        'canApprove' => $notifPosition->canApprove,
                        'canInsertData' => $notifPosition->canInsertData,
                        'canUpdateData' => $notifPosition->canUpdateData,
                        'canDeleteData' => $notifPosition->canDeleteData,
                        'isSecret' => $notifPosition->isSecret,
                        'phase' => $notifPosition->phase,
                    ];

                    // Get the phase of the current notifPosition and convert it to an integer.
                    $phase = (int) $notifPosition->phase;

                    // Check if the phase is within the expected range (1 to 6).
                    if (isset($userAccessByPhase[$phase])) {
                        // Add the user access details to the corresponding phase array.
                        $userAccessByPhase[$phase] = $userAccess;
                    } else {
                        // Handle unexpected phase values (optional).
                        // For now, we skip unexpected phase values.
                        continue;
                    }
                }
            }

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengakses detail file');

            return ResponseHelper::successRes('Berhasill menampilkan data', ['file' => $file, 'userAccess' => $userAccessByPhase]);
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
                return ResponseHelper::errorRes('Nama Anda berbeda');
            }
            $approv->approved = !$approv->approved;
            $approv->save();

            $file = File::find($approv->file_id);
            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menghapus Data Kredit ');
            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus Data Kredit: ' . $file->name);
            TelegramHelper::AddUpdatePhase($approv->file_id, "User merubah Status menjadi " . ($approv->approved ? "Disetujui" : "Ditolak"), $approv->user_id);

            return ResponseHelper::successRes('Berhasill mengubah status', $approv);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    //=>file-submission
    public function addFileSubmission(Request $request)
    {
        try {
            $file = new FileSubmission();
            $file->file_id = $request->file_id;
            $file->phase = $request->phase;
            $file->name = $request->name;
            if ($request->has('type')) {
                $file->type = $request->type;
            }

            if ($request->has('link')) {
                $file->link = $request->link;
                $file->path = null;
                $oldPath = public_path('file/' . $request->file_id . '/' . $file->path);
                if (FacadesFile::exists($oldPath)) {
                    FacadesFile::delete($oldPath);
                }
            } else {
                if ($request->hasFile('path')) {
                    // Delete old file
                    $oldPath = public_path('file/' . $request->file_id . '/' . $file->path);
                    if (FacadesFile::exists($oldPath)) {
                        FacadesFile::delete($oldPath);
                    }

                    // Upload new file
                    $rand = Str::random(10);
                    $fileObject = $request->file('path');
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $request->file_id . '/'), $fileimage);

                    $file->link = null;
                    $file->path = $fileimage;
                }
            }

            $file->save();

            ActivityHelper::fileActivity($file->file_id, Auth::user()->id, 'Menambahkan File Penunjang Kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan File Penunjang kredit ' . $file->name);

            TelegramHelper::AddUpdate($file->file_id, 'Menambahkan File Penunjang Kredit : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('Berhasil menambahkan data', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function updateFileSubmission(Request $request, $id)
    {
        try {
            $request->validate([
                'link' => 'nullable|url|required_without:path',
                'path' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx,xls,xlsx|required_without:link',
            ], [
                'mimes' => ':attribute harus berupa file dengan tipe: jpeg, jpg, png, pdf, doc, docx, xls, atau xlsx',
                'url' => ':attribute harus berupa URL yang valid atau tambahkan https://',
                'path.required_without' => ':attribute harus diisi jika link kosong',
                'link.required_without' => ':attribute harus diisi jika path kosong',
                'file' => ':attribute harus berupa file yang diunggah',
            ]);

            $file = FileSubmission::findOrFail($id);
            $file->file_id = $request->file_id;
            $file->name    = $request->name;
            $file->phase   = $request->phase;
            $file->type   = $request->type;

            if ($request->has('link')) {
                $file->link = $request->link;
                $file->path = null;
                $oldPath = public_path('file/' . $request->file_id . '/' . $file->path);
                if (FacadesFile::exists($oldPath)) {
                    FacadesFile::delete($oldPath);
                }
            } else {
                if ($request->hasFile('path')) {
                    // Delete old file
                    $oldPath = public_path('file/' . $request->file_id . '/' . $file->path);
                    if (FacadesFile::exists($oldPath)) {
                        FacadesFile::delete($oldPath);
                    }

                    // Upload new file
                    $rand = Str::random(10);
                    $fileObject = $request->file('path');
                    $imageEXT = $fileObject->getClientOriginalName();
                    $filename = pathinfo($imageEXT, PATHINFO_FILENAME);
                    $EXT = $fileObject->getClientOriginalExtension();
                    $fileimage = $filename . '-' . $rand . '_' . time() . '.' . $EXT;
                    $path = $fileObject->move(public_path('file/' . $request->file_id . '/'), $fileimage);

                    $file->link = null;
                    $file->path = $fileimage;
                }
            }

            $file->save();

            ActivityHelper::fileActivity($file->file_id, Auth::user()->id, 'Mengedit File Penunjang Kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit File Penunjang kredit ' . $file->name);

            TelegramHelper::AddUpdate($file->file_id, 'Merubah File Penunjang Kredit : ' . $request->name, Auth::user()->id);

            return ResponseHelper::successRes('File Penunjang Kredit Berhasil di update', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function destroyFileSubmission($id)
    {
        try {
            $file = FileSubmission::find($id);
            $fileName = $file->name;
            $filePath = public_path('file/' . $file->file_id . '/' . $file->path);
            if (FacadesFile::exists($filePath)) {
                FacadesFile::delete($filePath);
            }
            $file->delete();

            ActivityHelper::fileActivity($file->file_id, Auth::user()->id, 'Menghapus File Penunjang Kredit: ' . $fileName);
            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus File Penunjang Kredit: ' . $fileName);

            TelegramHelper::AddUpdate($file->file_id, 'Menghapus Lampiran : ' . $fileName, Auth::user()->id);
            return ResponseHelper::successRes('Data berhasil dihapus', $file);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
    public function generateReport($id)
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
                'approvals.user.position',
                'phaseTimes',
                'filesubmissions',
            ])->findOrFail($id);

            $pdf = pdf::loadView('report.approve', compact('file'));

            return $pdf->download('laporan-generated.pdf');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
