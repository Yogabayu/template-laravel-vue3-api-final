<?php

namespace App\Helpers;

use App\Models\Attachment;
use App\Models\File;
use App\Models\FileActivity;
use App\Models\Position;
use App\Models\PositionToOffice;
use App\Models\User;
use App\Models\UserActivity;
use App\Notifications\TelegramNotification;
use Illuminate\Support\Facades\DB;

class TelegramHelper
{
    public static function AddUpdate($fileId, $note, $senderId)
    {
        $file = File::where('id', $fileId)->first();
        $sender = User::where('id', $senderId)->first();

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
                ->where('telegram_chat_id', '!=', null)
                ->get();
            $notifUser = array_merge($notifUser, $users->toArray());
        }
        foreach ($notifUser as $notif) {
            $ao = User::find($file->user_id);
            $user = User::find($notif->id);
            $attachments = Attachment::where('file_id', $file->id)->get();

            // Membuat pesan yang lebih tertata
            $message = "📣 *Ada Update Baru*\n\n"
                . str_pad("*AO*", 25) . ": " . $ao->name . "\n"
                . str_pad("*Pemohon Kredit*", 18) . ": " . $file->name . "\n\n"
                . str_pad("*Pengguna Yang Memperbarui*", 18) . ": " . ($sender->name ?? '-') . "\n"
                . ($note ?? '-') . "\n\n"
                . str_pad("*Plafon*", 25) . ": Rp. " . number_format($file->plafon, 0, ',', '.') . "\n"
                . "\nSilakan cek detailnya di Website ECAR.\n";


            $user->notify(new TelegramNotification($message, $file, $attachments));
        }
    }

    public static function AddFile($fileId)
    {
        $file = File::where('id', $fileId)->first();
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
                ->where('telegram_chat_id', '!=', null)
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
                . "*Plafon*: " . number_format($file->plafon, 0, ',', '.') . "\n"
                . "*Jenis Usaha*: " . $file->type_bussiness . "\n"
                . "*Deskripsi Usaha*: " . $file->desc_bussiness . "\n"
                . "\nSilakan cek detailnya di Website ECAR.\n";

            $user->notify(new TelegramNotification($message, $file, $attachments));
        }
    }
    public static function AddUpdatePhase($fileId, $note, $senderId)
    {
        $file = File::where('id', $fileId)->first();
        $sender = User::where('id', $senderId)->first();

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
                ->where('phase', $file->phase)
                ->get();

            $notifPositions = array_merge($notifPositions, $notificationConfigurations->toArray());
        }

        $notifUser = [];
        foreach ($notifPositions as $notifPosition) {
            $users = DB::table('users')
                ->where('position_id', $notifPosition->position_id)
                ->where('isActive', 1)
                ->where('telegram_chat_id', '!=', null)
                ->get();
            $notifUser = array_merge($notifUser, $users->toArray());
        }
        foreach ($notifUser as $notif) {
            $ao = User::find($file->user_id);
            $user = User::find($notif->id);
            $attachments = Attachment::where('file_id', $file->id)->get();

            // Membuat pesan yang lebih tertata
            $message = "📣 *Ada Update Baru*\n\n"
                . str_pad("*AO*", 25) . ": " . $ao->name . "\n"
                . str_pad("*Pemohon Kredit*", 18) . ": " . $file->name . "\n\n"
                . str_pad("*Phase*", 18) . ": " . $file->phase . "\n"
                . str_pad("*Pengguna Yang Memperbarui*", 18) . ": " . ($sender->name ?? '-') . "\n"
                . ($note ?? '-') . "\n\n"
                . str_pad("*Plafon*", 25) . ": Rp. " . number_format($file->plafon, 0, ',', '.') . "\n"
                . "\nSilakan cek detailnya di Website ECAR.\n";


            $user->notify(new TelegramNotification($message, $file, $attachments));
        }
    }

    public static function connectNotif()
    {
    }
}
