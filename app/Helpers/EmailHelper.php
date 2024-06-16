<?php

namespace App\Helpers;

use App\Mail\AlertEmail;
use App\Models\Attachment;
use App\Models\File;
use App\Models\Position;
use App\Models\PositionToOffice;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailHelper
{
    public static function AddUpdate($fileId)
    {
        $file = File::where('id', $fileId)->first();
        // $sender = User::where('id', $senderId)->first();

        $userUploaded = User::where('id', $file->user_id)->first();
        $userPosition = Position::where('id', $userUploaded->position_id)->first();
        $userOffices = PositionToOffice::where('position_id', $userPosition->id)->get();
        $notifPositions = [];

        foreach ($userOffices as $userOffice) {
            $notificationConfigurations = DB::table('notification_configurations')
                ->where('office_id', $userOffice->office_id)
                ->where('phase', $file->phase)
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
                ->where('email', '!=', null)
                ->get();
            $notifUser = array_merge($notifUser, $users->toArray());
        }

        foreach ($notifUser as $notif) {
            $ao = User::find($file->user_id);
            $user = User::find($notif->id);
            $attachments = Attachment::where('file_id', $file->id)->get();

            // Membuat pesan yang lebih tertata
            $message = "<h1>📣 Ada Update Baru</h1>"
                . "<p><strong>AO:</strong>" . str_pad($ao->name, 25) . "</p>"
                . "<p><strong>Pemohon Kredit:</strong>" . str_pad($file->name, 18) . "</p><br>"
                . "<p><strong>Phase :</strong>" . str_pad($file->phase, 18) . "</p><br>"
                . "<p><strong>Pengguna Yang Memperbarui :</strong>" . str_pad(Auth::user()->name, 18) . "</p><br>"
                . "<p><strong>Plafon:</strong> Rp. " . number_format($file->plafon, 0, ',', '.') . "</p>"
                . "<p>Silakan cek detailnya di <a href='https://ecar.bankarthaya.com' style='color: #348eda; text-decoration: underline;'>Website ECAR</a>.</p>";


            try {
                Mail::to($user->email)->send(new AlertEmail($message));
            } catch (\Exception $e) {
                Log::error("Failed to send email: " . $e->getMessage());
            }
        }
    }
}
