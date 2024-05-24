<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'file_id',
        'phase',
        'name',
        'path',
        'link',
        'note',
        'isSecret',
        'isApprove',
        'startTime',
        'endTime',
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
