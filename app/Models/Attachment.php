<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'file_id',
        'name',
        'path',
        'note',
        'isSecret',
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
