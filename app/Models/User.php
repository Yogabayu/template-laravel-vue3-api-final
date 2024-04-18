<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nik',
        'name',
        'email',
        'password',
        'telegram_username',
        'telegram_chat_id',
        'isActive',
        'position_id',
        'dirut_id',
        'dir_id',
        'bm_id',
        'asmen_id',
        'brm_id',
        'ca_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the position associated with the user.
     */
    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }

    /**
     * Get the director associated with the user.
     */
    public function director()
    {
        return $this->belongsTo(User::class, 'dir_id');
    }

    /**
     * Get the director general associated with the user.
     */
    public function directorGeneral()
    {
        return $this->belongsTo(User::class, 'dirut_id');
    }

    /**
     * Get the branch manager associated with the user.
     */
    public function branchManager()
    {
        return $this->belongsTo(User::class, 'bm_id');
    }

    /**
     * Get the assistant manager associated with the user.
     */
    public function assistantManager()
    {
        return $this->belongsTo(User::class, 'asmen_id');
    }

    /**
     * Get the branch relation manager associated with the user.
     */
    public function branchRelationManager()
    {
        return $this->belongsTo(User::class, 'brm_id');
    }

    /**
     * Get the client advisor associated with the user.
     */
    public function clientAdvisor()
    {
        return $this->belongsTo(User::class, 'ca_id');
    }

    public function files()
    {
        return $this->hasMany(File::class, 'user_id', 'id');
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

    public function userActivities()
    {
        return $this->hasMany(UserActivity::class);
    }
}
