<?php

namespace App\Notifications;

// use Illuminate\Bus\Queueable;

use App\Models\Attachment;
use App\Models\File;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramMessage;

class TelegramNotification extends Notification
{
    // use Queueable;
    protected $message;
    protected $file;
    protected $attachments;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $message, ?File $file, $attachment)
    {
        $this->message    = $message;
        $this->file       = $file;
        $this->attachments = $attachment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [TelegramChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toTelegram(object $notifiable)
    {
        $telegramMessage = TelegramMessage::create()
            ->to($notifiable->telegram_chat_id)
            ->content($this->message);

        if (!empty($this->file) && !empty($this->attachments)) {
            foreach ($this->attachments as $attachment) {
                $urlAttachmentPath = 'https://ecar.bankarthaya.com/file/' . $this->file->id . '/' . $attachment->path;
                $telegramMessage->button($attachment->name, $urlAttachmentPath);
            }
        }
        return $telegramMessage;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
