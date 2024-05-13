<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\NotificationConfiguration;
use App\Models\Office;
use Illuminate\Http\Request;

class NotificationConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // try {
        //     $notif = NotificationConfiguration::with('office', 'position')->get();

        //     return ResponseHelper::successRes('Berhasi mendapatkan data', $notif);
        // } catch (\Exception $e) {
        //     return ResponseHelper::errorRes($e->getMessage());
        // }
        // try {
        //     $notif = NotificationConfiguration::with('office', 'position')
        //         ->orderBy('id')
        //         ->get()
        //         ->groupBy('phase', 'office_id');

        //     return ResponseHelper::successRes('Berhasi mendapatkan data', $notif);
        // } catch (\Exception $e) {
        //     return ResponseHelper::errorRes($e->getMessage());
        // }

        try {
            $office = Office::withCount('notificationConfigurations')->get();
            return ResponseHelper::successRes('Berhasi mendapatkan data', $office);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    public function detailOfficeConfig(Request $request)
    {
        try {
            $notif = NotificationConfiguration::where('office_id', $request->officeId)
                ->where('phase', $request->phase)
                ->with('office', 'position')
                ->orderBy('minPlafon', 'asc')
                ->get();
            return ResponseHelper::successRes('Berhasi mendapatkan data', $notif);
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
            $request->validate([
                'office_id' => 'required',
                'position_id' => 'required',
                'phase' => 'required',
                'minPlafon' => 'required',
                'maxPlafon' => 'required',
                // 'canAppeal' => 'required',
                'canApprove' => 'required',
                'notification' => 'required',
                'canInsertData' => 'required',
                'isSecret' => 'required',
            ], [
                'required' => ':attribute harus diisi',
            ]);

            // Check if a record with the same phase, position_id, and office_id already exists
            $existingNotif = NotificationConfiguration::where('phase', $request->phase)
                ->where('position_id', $request->position_id)
                ->where('office_id', $request->office_id)
                ->where('minPlafon', $request->minPlafon)
                ->where('maxPlafon', $request->maxPlafon)
                ->first();

            if ($existingNotif) {
                return ResponseHelper::errorRes('Data notifikasi yang sama sudah ada');
            }

            $notif = NotificationConfiguration::create($request->all());

            return ResponseHelper::successRes('Berhasi menambahkan data', $notif);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'office_id' => 'required',
                'position_id' => 'required',
                'phase' => 'required',
                'minPlafon' => 'required',
                'maxPlafon' => 'required',
                // 'canAppeal' => 'required',
                'canApprove' => 'required',
                'notification' => 'required',
                'canInsertData' => 'required',
                'isSecret' => 'required',
            ], [
                'required' => ':attribute harus diisi',
            ]);

            // Check if a record with the same phase, position_id, and office_id already exists
            $existingNotif = NotificationConfiguration::where('phase', $request->phase)
                ->where('position_id', $request->position_id)
                ->where('office_id', $request->office_id)
                ->where('minPlafon', $request->minPlafon)
                ->where('maxPlafon', $request->maxPlafon)
                ->where('id', '!=', $id)  // Exclude the current record from the check
                ->first();

            if ($existingNotif) {
                return ResponseHelper::errorRes('Data notifikasi dengan fase, jabatan, dan jabatan yang sama sudah ada');
            }

            $notif = NotificationConfiguration::find($id);
            if (!$notif) {
                return ResponseHelper::errorRes('Data notifikasi tidak ditemukan');
            }

            $notif->update($request->all());

            return ResponseHelper::successRes('Berhasil memperbarui data', $notif);
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
            $notif = NotificationConfiguration::findOrFail($id)->delete();
            return ResponseHelper::successRes('Berhasi menghapus data', $notif);
        } catch (\Exception $e) {
            return ResponseHelper::errorRes($e->getMessage());
        }
    }
}
