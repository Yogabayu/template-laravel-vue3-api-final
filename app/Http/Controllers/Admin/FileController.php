<?php

namespace App\Http\Controllers\Admin;

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
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

// URUNG: need to configure salah input data file 
class FileController extends Controller
{
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

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Mengganti status kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Mengganti status kredit ' . $file->name);
            TelegramHelper::changeStatus($file->id, $request->status, $file->user_id);

            return ResponseHelper::successRes('Berhasil Mengganti Status', $file);
        } catch (ModelNotFoundException $e) {
            return ResponseHelper::errorRes('Data Kredit tidak ditemukan');
        } catch (ValidationException $e) {
            return ResponseHelper::errorRes($e->errors());
        } catch (\Exception $e) {
            // Log the exception
            // Log::error('Error changing file status', ['error' => $e->getMessage()]);
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

            ActivityHelper::fileActivity($note->file_id, Auth::user()->id, 'Mengganti status kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Mengganti status kredit ' . $file->name);
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
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan note di kredit : ' . $file->name);
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

            ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Edit Catatan Kredit');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit Kredit di kredit ' . $file->name);
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


            $file = File::where('id', $attachment->file_id)->first();

            ActivityHelper::fileActivity($attachment->file_id, Auth::user()->id, 'Mengedit Lampiran');
            ActivityHelper::userActivity(Auth::user()->id, 'Edit lampiran di kredit ' . $file->name);

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
                $filephase = $file->phase + 1;

                if ($file->plafon > 25000000) {
                    if ($file->phase == 4) {
                        $file->phase = 5;
                        $file->isApproved = 1;
                        $file->save();
                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();
                        }

                        EmailHelper::AddUpdate($file->id);

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui');

                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui: ' . $file->name);
                        TelegramHelper::AgreementPhase4($file->id, "Kredit Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);

                        return ResponseHelper::successRes('File Status Telah diubah menjadi disetujui', $file);
                    } else if ($file->phase < 4) {
                        $userUploaded = User::where('id', $file->user_id)->first();
                        $userPosition = Position::where('id', $userUploaded->position_id)->first();
                        $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                        $notifPositions = [];

                        //add user to approval
                        foreach ($userOffices as $userOffice) {
                            $notificationConfigurations = DB::table('notification_configurations')
                                ->where('office_id', $userOffice->office_id)
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

                        EmailHelper::AddUpdate($file->id);

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengubah Phase Kredit');
                        ActivityHelper::userActivity(Auth::user()->id, 'Mengubah Phase di kredit ' . $file->name);

                        TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                        $file->phase = $filephase;
                        $file->save();
                        return ResponseHelper::successRes('Berhasil Melakukan Perubahan Tahapan Kredit', $file);
                    }
                } else if ($file->plafon < 25000000) {
                    if ($file->phase == 3) {
                        $file->phase = 5;
                        $file->isApproved = 1;
                        $file->save();

                        $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $filephase - 1)->first();
                        //add count time
                        if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                            $phaseTime->endTime = Carbon::now();
                            $phaseTime->save();
                        }

                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Status Kredit Menjadi Disetujui: ' . $file->name);
                        TelegramHelper::AgreementPhase4($file->id, "Kredit Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);

                        EmailHelper::AddUpdate($file->id);

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Fase Kredit Lampiran');
                        ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan lampiran di kredit ' . $file->name);
                        TelegramHelper::AgreementPhase3($file->id, "File Status Telah diubah menjadi disetujui" . ($filephase), $file->user_id);
                    } else if ($file->phase < 3) {
                        $userUploaded = User::where('id', $file->user_id)->first();
                        $userPosition = Position::where('id', $userUploaded->position_id)->first();
                        $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                        $notifPositions = [];

                        //add user to approval
                        foreach ($userOffices as $userOffice) {
                            $notificationConfigurations = DB::table('notification_configurations')
                                ->where('office_id', $userOffice->office_id)
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

                        EmailHelper::AddUpdate($file->id);

                        ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Merubah Phase Kredit ');
                        ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $file->name);
                        TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                        $file->phase = $filephase;
                        $file->save();
                        return ResponseHelper::successRes('Berhasill Melakukan Perubahan Tahapan Kredit', $file);
                    }
                }

                // $filephase = $file->phase + 1;
                // $file->phase = $file->phase + 1;
                // if ($file->plafon > 25000000 && $file->phase <= 3) {


                //     $userUploaded = User::where('id', $file->user_id)->first();
                //     $userPosition = Position::where('id', $userUploaded->position_id)->first();
                //     $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                //     $notifPositions = [];

                //     //add user to approval
                //     foreach ($userOffices as $userOffice) {
                //         $notificationConfigurations = DB::table('notification_configurations')
                //             ->where('office_id', $userOffice->office_id)
                //             // ->where('minPlafon', '<=', $file->plafon)
                //             // ->where('maxPlafon', '>=', $file->plafon)
                //             ->where('phase', $filephase)
                //             ->where('canApprove', 1)
                //             ->get();

                //         $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                //     }
                //     $notifUser = [];
                //     foreach ($notifPositions as $notifPosition) {
                //         $users = DB::table('users')
                //             ->where('position_id', $notifPosition->position_id)
                //             ->where('isActive', 1)
                //             ->get();
                //         $notifUser = array_merge($notifUser, $users->toArray());
                //     }
                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //             }
                //         }
                //     }

                //     $matchFound = false;

                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //                 $matchFound = true;
                //             }
                //         }
                //     }

                //     if (!$matchFound) {
                //         return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                //     }

                //     $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase - 1)->first();
                //     //add count time
                //     if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                //         $phaseTime->endTime = Carbon::now();
                //         $phaseTime->save();


                //         PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);
                //     }
                //     EmailHelper::AddUpdate($file->id);
                //     TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                //     $file->save();
                //     return ResponseHelper::successRes('File telah disetujui successfully', $file);
                // } else if ($file->plafon > 25000000 && $file->phase) {
                //     $filephase = $file->phase + 1;
                //     $file->phase = $file->phase + 1;

                //     $userUploaded = User::where('id', $file->user_id)->first();
                //     $userPosition = Position::where('id', $userUploaded->position_id)->first();
                //     $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                //     $notifPositions = [];

                //     //add user to approval
                //     foreach ($userOffices as $userOffice) {
                //         $notificationConfigurations = DB::table('notification_configurations')
                //             ->where('office_id', $userOffice->office_id)
                //             // ->where('minPlafon', '<=', $file->plafon)
                //             // ->where('maxPlafon', '>=', $file->plafon)
                //             ->where('phase', $filephase)
                //             ->where('canApprove', 1)
                //             ->get();

                //         $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                //     }
                //     $notifUser = [];
                //     foreach ($notifPositions as $notifPosition) {
                //         $users = DB::table('users')
                //             ->where('position_id', $notifPosition->position_id)
                //             ->where('isActive', 1)
                //             ->get();
                //         $notifUser = array_merge($notifUser, $users->toArray());
                //     }
                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //             }
                //         }
                //     }

                //     $matchFound = false;

                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //                 $matchFound = true;
                //             }
                //         }
                //     }

                //     if (!$matchFound) {
                //         return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                //     }

                //     $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase - 1)->first();
                //     //add count time
                //     if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                //         $phaseTime->endTime = Carbon::now();
                //         $phaseTime->save();


                //         PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);
                //     }

                //     EmailHelper::AddUpdate($file->id);
                //     TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                //     $file->save();
                //     return ResponseHelper::successRes('File telah disetujui successfully', $file);
                // } else if ($file->plafon < 25000000 && $file->phase < 2) {
                //     $filephase = $file->phase + 1;
                //     $file->phase = $file->phase + 1;

                //     $userUploaded = User::where('id', $file->user_id)->first();
                //     $userPosition = Position::where('id', $userUploaded->position_id)->first();
                //     $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                //     $notifPositions = [];

                //     //add user to approval
                //     foreach ($userOffices as $userOffice) {
                //         $notificationConfigurations = DB::table('notification_configurations')
                //             ->where('office_id', $userOffice->office_id)
                //             // ->where('minPlafon', '<=', $file->plafon)
                //             // ->where('maxPlafon', '>=', $file->plafon)
                //             ->where('phase', $filephase)
                //             ->where('canApprove', 1)
                //             ->get();

                //         $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                //     }
                //     $notifUser = [];
                //     foreach ($notifPositions as $notifPosition) {
                //         $users = DB::table('users')
                //             ->where('position_id', $notifPosition->position_id)
                //             ->where('isActive', 1)
                //             ->get();
                //         $notifUser = array_merge($notifUser, $users->toArray());
                //     }
                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //             }
                //         }
                //     }

                //     $matchFound = false;

                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //                 $matchFound = true;
                //             }
                //         }
                //     }

                //     if (!$matchFound) {
                //         return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                //     }

                //     $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase - 1)->first();
                //     //add count time
                //     if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                //         $phaseTime->endTime = Carbon::now();
                //         $phaseTime->save();


                //         PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);
                //     }


                //     EmailHelper::AddUpdate($file->id);
                //     TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                //     $file->save();
                //     return ResponseHelper::successRes('File telah disetujui successfully', $file);
                // } else if ($file->plafon < 25000000 && $file->phase == 2) {
                //     $filephase = $file->phase + 1;
                //     $file->phase = $file->phase + 1;

                //     $userUploaded = User::where('id', $file->user_id)->first();
                //     $userPosition = Position::where('id', $userUploaded->position_id)->first();
                //     $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
                //     $notifPositions = [];

                //     //add user to approval
                //     foreach ($userOffices as $userOffice) {
                //         $notificationConfigurations = DB::table('notification_configurations')
                //             ->where('office_id', $userOffice->office_id)
                //             // ->where('minPlafon', '<=', $file->plafon)
                //             // ->where('maxPlafon', '>=', $file->plafon)
                //             ->where('phase', $filephase)
                //             ->where('canApprove', 1)
                //             ->get();

                //         $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                //     }
                //     $notifUser = [];
                //     foreach ($notifPositions as $notifPosition) {
                //         $users = DB::table('users')
                //             ->where('position_id', $notifPosition->position_id)
                //             ->where('isActive', 1)
                //             ->get();
                //         $notifUser = array_merge($notifUser, $users->toArray());
                //     }
                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //             }
                //         }
                //     }

                //     $matchFound = false;

                //     foreach ($notifPositions as $pos) {
                //         foreach ($notifUser as $user) {
                //             if ($pos->position_id == $user->position_id) {
                //                 Approval::firstOrCreate(
                //                     ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
                //                     ['approved' => 0]
                //                 );
                //                 $matchFound = true;
                //             }
                //         }
                //     }

                //     if (!$matchFound) {
                //         return ResponseHelper::errorRes('Error, user yang memiliki akses approve tidak ditemukan, mohon tambahkan User yang dapat memberi aproval di tahap selanjutnya');
                //     }

                //     $phaseTime = PhaseTime::where('file_id', $file->id)->where('phase', $file->phase - 1)->first();
                //     //add count time
                //     if (Carbon::now()->greaterThanOrEqualTo($phaseTime->startTime)) {
                //         $phaseTime->endTime = Carbon::now();
                //         $phaseTime->save();


                //         PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);
                //     }

                //     EmailHelper::AddUpdate($file->id);
                //     TelegramHelper::AddUpdatePhase($file->id, "User mengubah Phase menjadi " . ($filephase), $file->user_id);

                //     $file->save();
                //     return ResponseHelper::successRes('File telah disetujui successfully', $file);
                // } else {
                //     return ResponseHelper::errorRes('Maaf, Sistem perpindahan phase error. hubungi administrator atau coba lagi nanti');
                // }
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

                ActivityHelper::fileActivity($request->file_id, Auth::user()->id, 'Merubah Phase Kredit ');
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

            ActivityHelper::fileActivity($attch->file_id, Auth::user()->id, 'Merubah Phase Kredit ');
            ActivityHelper::userActivity(Auth::user()->id, 'Merubah Phase Kredit: ' . $attch->name);

            TelegramHelper::AddUpdate($attch->file_id, 'Menghapus Lampiran : ' . $attchName, Auth::user()->id);
            return ResponseHelper::successRes('Attachment deleted successfully', $attch);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function index()
    {
        try {
            $userAccess = [
                'canAppeal' => 1,
                'canApprove' => 1,
                'canInsertData' => 1,
                'isSecret' => 1,
            ];
            // Inisialisasi array untuk menampung semua file yang terkait
            $files = File::all();
            ActivityHelper::userActivity(Auth::user()->id, 'Mengakses halaman File Credit');

            return ResponseHelper::successRes('Berhasil menampilkan datas', ['files' => $files, 'userAccess' => $userAccess]);
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
            $file->isApproved = 2;
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
            Approval::firstOrCreate(
                ['file_id' => $file->id, 'user_id' => $file->user_id, 'phase' => $file->phase],
                ['approved' => 0]
            );
            // $userUploaded = User::where('id', $file->user_id)->first();
            // $userPosition = Position::where('id', $userUploaded->position_id)->first();
            // $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
            // $notifPositions = [];

            // //add user to approval
            // foreach ($userOffices as $userOffice) {
            //     $notificationConfigurations = DB::table('notification_configurations')
            //         ->where('office_id', $userOffice->office_id)
            //         ->whereRaw('CAST(minPlafon AS UNSIGNED) <= ?', [$file->plafon])
            //         ->whereRaw('CAST(maxPlafon AS UNSIGNED) >= ?', [$file->plafon])
            //         ->where('phase', $file->phase)
            //         ->where('canApprove', 1)
            //         ->get();

            //     $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
            // }

            // $notifUser = [];
            // foreach ($notifPositions as $notifPosition) {
            //     $users = DB::table('users')
            //         ->where('position_id', $notifPosition->position_id)
            //         ->where('isActive', 1)
            //         ->get();
            //     $notifUser = array_merge($notifUser, $users->toArray());
            // }
            // // dd($notifUser);
            // foreach ($notifPositions as $pos) {
            //     foreach ($notifUser as $user) {
            //         if (($pos->position_id == $user->position_id) && $user->id == $file->user_id) {
            //             Approval::firstOrCreate(
            //                 ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
            //                 ['approved' => 0]
            //             );
            //         }
            //     }
            // }

            EmailHelper::AddUpdate($file->id);
            TelegramHelper::AddFile($file->id);

            //add count time
            PhaseTime::firstOrCreate(['file_id' => $file->id, 'phase' => $file->phase, 'startTime' => Carbon::now()]);

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menambahkan kredit ' . $file->name);
            ActivityHelper::userActivity(Auth::user()->id, 'Menambahkan kredit ' . $file->name);

            return ResponseHelper::successRes('Berhasil menambahkan data', $file);
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

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Menghapus Data Kredit ');
            ActivityHelper::userActivity(Auth::user()->id, 'Menghapus Data Kredit: ' . $file->name);

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
                if ($file->phase == 5) {
                    $notificationConfigurations = DB::table('notification_configurations')
                        ->where('office_id', $userOffice->office_id)
                        ->whereRaw('CAST(minPlafon AS UNSIGNED) <= ?', [$file->plafon])
                        ->whereRaw('CAST(maxPlafon AS UNSIGNED) >= ?', [$file->plafon]);

                    if ($file->phase == 5) {
                        $notificationConfigurations = $notificationConfigurations->where('phase', $file->phase - 1);
                    } else {
                        $notificationConfigurations = $notificationConfigurations->where('phase', $file->phase - 2);
                    };

                    $notificationConfigurations = $notificationConfigurations->get();

                    $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                } else {
                    $notificationConfigurations = DB::table('notification_configurations')
                        ->where('office_id', $userOffice->office_id)
                        ->whereRaw('CAST(minPlafon AS UNSIGNED) <= ?', [$file->plafon])
                        ->whereRaw('CAST(maxPlafon AS UNSIGNED) >= ?', [$file->plafon])
                        ->where('phase', $file->phase)
                        ->get();

                    $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
                }
            }

            $userPosNow = User::where('id', Auth::user()->id)->first();
            $userAccess = [
                'canAppeal' => 1,
                'canApprove' => 1,
                'canInsertData' => 1,
                'isSecret' => 1,
            ];

            foreach ($notifPositions as $notifPosition) {
                if ($notifPosition->position_id == $userPosNow->position_id) {
                    $userAccess = [
                        'canAppeal' => 1,
                        'canApprove' => 1,
                        'canInsertData' => 1,
                        'isSecret' => 1,
                    ];
                    break;
                }
            }

            // //add new approval if exist
            // $approvalPositions = [];

            // //add user to approval
            // foreach ($userOffices as $userOffice) {
            //     $notificationConfigurations = DB::table('notification_configurations')
            //         ->where('office_id', $userOffice->office_id)
            //         ->where('phase', $file->phase)
            //         ->where('canApprove', 1)
            //         ->get();

            //     $approvalPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
            // }

            // $notifApprovalUser = [];
            // foreach ($approvalPositions as $notifPosition) {
            //     $users = DB::table('users')
            //         ->where('position_id', $notifPosition->position_id)
            //         ->where('isActive', 1)
            //         ->get();
            //     $notifApprovalUser = array_merge($notifApprovalUser, $users->toArray());
            // }
            // foreach ($approvalPositions as $pos) {
            //     foreach ($notifApprovalUser as $user) {
            //         if ($pos->position_id == $user->position_id) {
            //             Approval::firstOrCreate(
            //                 ['file_id' => $file->id, 'user_id' => $user->id, 'phase' => $pos->phase],
            //                 ['approved' => 0]
            //             );
            //         }
            //     }
            // }

            ActivityHelper::fileActivity($file->id, Auth::user()->id, 'Mengakses detail file');

            // Convert notes to a collection and sort by date in descending order
            // $file->notes = collect($file->notes)->sortByDesc('created_at')->values()->all();

            // return ResponseHelper::successRes('Berhasill menampilkan data', $file);
            return ResponseHelper::successRes('Berhasill menampilkan data', ['file' => $file, 'userAccess' => $userAccess]);
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
}
