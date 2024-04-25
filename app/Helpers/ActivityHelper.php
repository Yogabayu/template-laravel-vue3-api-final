<?php

namespace App\Helpers;

use App\Models\FileActivity;
use App\Models\UserActivity;

class ActivityHelper
{
    public static function fileActivity($fileId, $userId, $message)
    {
        FileActivity::create([
            'file_id' => $fileId,
            'user_id' => $userId,
            'activity' => $message,
        ]);
    }

    public static function userActivity($userId, $message)
    {
        UserActivity::create([
            'user_id' => $userId,
            'activity' => $message,
        ]);
    }
}
