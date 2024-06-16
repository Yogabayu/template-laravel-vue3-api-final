<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\FileController as AdminFileController;
use App\Http\Controllers\Admin\NotificationConfigController;
use App\Http\Controllers\Admin\OfficeController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ZipController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\FileController;
use App\Http\Controllers\User\UserController as UserUserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        //all
        /////=>download all
        Route::get('download-all/{id}', [ZipController::class, 'downloadAll']);

        // // route admin
        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

        //dashboard
        Route::get('dashboard', [AdminDashboardController::class, 'index']);

        //office
        Route::get('office', [OfficeController::class, 'index']);
        Route::post('office', [OfficeController::class, 'store']);
        Route::put('office/{id}', [OfficeController::class, 'update']);
        Route::delete('office/{id}', [OfficeController::class, 'destroy']);

        //role
        Route::get('role', [RoleController::class, 'index']);
        Route::post('role', [RoleController::class, 'store']);
        Route::put('role/{id}', [RoleController::class, 'update']);
        Route::delete('role/{id}', [RoleController::class, 'destroy']);

        //position
        Route::get('position', [PositionController::class, 'index']);
        Route::post('position', [PositionController::class, 'store']);
        Route::put('position/{id}', [PositionController::class, 'update']);
        Route::delete('position/{id}', [PositionController::class, 'destroy']);

        //user
        Route::get('user', [UserController::class, 'index']);
        Route::post('user', [UserController::class, 'store']);
        Route::put('user/{id}', [UserController::class, 'update']);
        Route::delete('user/{id}', [UserController::class, 'destroy']);
        Route::get('changeStatusUser/{id}', [UserController::class, 'changeUserStatus']);
        Route::post('userGetChatId', [UserController::class, 'getChatIdByUsername']);

        //notif-conf
        Route::get('notifconf', [NotificationConfigController::class, 'index']);
        Route::post('notifconf', [NotificationConfigController::class, 'store']);
        Route::put('notifconf/{id}', [NotificationConfigController::class, 'update']);
        Route::delete('notifconf/{id}', [NotificationConfigController::class, 'destroy']);
        Route::post('detailnotifconf', [NotificationConfigController::class, 'detailOfficeConfig']);

        //credit
        Route::get('credit', [AdminFileController::class, 'index']);
        Route::get('credit/{id}', [AdminFileController::class, 'detailFile']);
        Route::post('credit', [AdminFileController::class, 'store']);
        Route::delete('credit/{id}', [AdminFileController::class, 'destroy']);
        Route::post('change-phase-approve', [AdminFileController::class, 'changePhase']);
        Route::get('change-phase-approve/{id}', [AdminFileController::class, 'changeApproved']);
        Route::put('edit-general-info/{id}', [AdminFileController::class, 'editGeneralInfo']);
        Route::put('survey-credit/{id}', [FileController::class, 'editSurveiResult']);
        Route::post('change-status', [FileController::class, 'changeStatus']);

        //=>note
        Route::post('note', [AdminFileController::class, 'addNote']);
        Route::put('note/{id}', [AdminFileController::class, 'editNote']);
        Route::delete('note/{id}', [AdminFileController::class, 'deleteNote']);

        //=>attchment
        Route::post('add-attach', [AdminFileController::class, 'addAttchment']);
        Route::put('edit-attach/{id}', [AdminFileController::class, 'editAttachment']);
        Route::delete('delete-attach/{id}', [AdminFileController::class, 'deleteAttachment']);
        Route::get('get-attach/{id}', [AdminFileController::class, 'getAttachment']);


        //////// Route User \\\\\\\\\
        Route::group(['prefix' => 'user'], function () {

            //dashboard
            Route::get('dashboard', [DashboardController::class, 'index']);

            //profile
            Route::get('user-profile', [UserUserController::class, 'getProfile']);
            Route::post('update-user-profile', [UserUserController::class, 'updateProfile']);
            Route::post('update-user-telegram', [UserUserController::class, 'getChatIdByUsername']);

            //credit
            Route::get('credit', [FileController::class, 'index']);
            Route::get('credit/{id}', [FileController::class, 'detailFile']);
            Route::post('credit', [FileController::class, 'store']);
            Route::delete('credit/{id}', [FileController::class, 'destroy']);
            Route::post('change-phase-approve', [FileController::class, 'changePhase']);
            Route::get('change-phase-approve/{id}', [FileController::class, 'changeApproved']);
            Route::put('edit-general-info/{id}', [FileController::class, 'editGeneralInfo']);
            Route::put('survey-credit/{id}', [FileController::class, 'editSurveiResult']);
            Route::post('change-status', [FileController::class, 'changeStatus']);

            //=>note
            Route::post('note', [FileController::class, 'addNote']);
            Route::put('note/{id}', [FileController::class, 'editNote']);
            Route::delete('note/{id}', [FileController::class, 'deleteNote']);

            //=>attchment
            Route::post('add-attach', [FileController::class, 'addAttchment']);
            Route::put('edit-attach/{id}', [FileController::class, 'editAttachment']);
            Route::delete('delete-attach/{id}', [FileController::class, 'deleteAttachment']);
            Route::get('get-attach/{id}', [FileController::class, 'getAttachment']);

            //=>filepenunjang [file-submission]
            Route::post('file-submission', [FileController::class, 'addFileSubmission']);
            Route::put('file-submission/{id}', [FileController::class, 'updateFileSubmission']);
            Route::delete('file-submission/{id}', [FileController::class, 'destroyFileSubmission']);
        });
    });
});
