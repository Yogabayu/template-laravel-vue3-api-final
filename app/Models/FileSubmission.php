<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileSubmission extends Model
{
    use HasFactory;
    protected $fillable = [
        'file_id',
        'phase',
        'name',
        'path',
        'link',
        'note',
        'type',
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
