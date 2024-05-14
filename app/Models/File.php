<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'user_id',
        'phase',
        'plafon',
        'surveyResult',
        'otsResult',
        'cekLingResult',
        'verTelResult',
        'creditScoring',
        'isApproved',
        'isAppealed',
        'type_bussiness',
        'desc_bussiness',
        'reasonRejected',
        // 'file2',
        // 'file3',
        // 'file4',
        // 'file5',
        // 'file6',
        // 'file7',
        // 'file8',
        // 'file9',
        // 'file10',
        // 'file11',
        // 'file12',
        // 'file13',
        // 'file14',
        // 'file15',
        // 'file16',
        // 'file17',
        // 'file18',
        // 'file19',
        // 'file20',
        // 'file21',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function phaseTimes()
    {
        return $this->hasMany(PhaseTime::class);
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function appeals()
    {
        return $this->hasMany(Appeal::class);
    }

    public function fileActivities()
    {
        return $this->hasMany(FileActivity::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
