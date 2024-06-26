<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationConfiguration extends Model
{
    protected $fillable = [
        'office_id',
        'position_id',
        'phase',
        'minPlafon',
        'maxPlafon',
        'canAppeal',
        'canApprove',
        'notification',
        'canInsertData',
        'canUpdateData',
        'canDeleteData',
        'isSecret',
        'canApproveAppeal',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
    public function office()
    {
        return $this->belongsTo(Office::class);
    }
}
