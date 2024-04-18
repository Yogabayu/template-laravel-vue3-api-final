<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $fillable = [
        'file_id',
        'user_id',
        'phase',
        'approved',
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
