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
