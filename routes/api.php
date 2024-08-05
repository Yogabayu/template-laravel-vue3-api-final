<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\FileController as AdminFileController;
use App\Http\Controllers\Admin\HelperController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\NotificationConfigController;
use App\Http\Controllers\Admin\OfficeController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ZipController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\FileController;
use App\Http\Controllers\User\HelperController as UserHelperController;
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

Route::group(['namespace' => 'Api', 'prefix' => 'v1', 'throttle:60,1'], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        Route::get('generatereport/{id}', [FileController::class, 'generateReport']);
        Route::get('generatemonthly/{monthYear}', [AdminFileController::class, 'generateMonthlyReport']);

        //history
        Route::get('history/{id}', [HistoryController::class, 'getHistorybyUser']);

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
        Route::post('getCredit', [AdminFileController::class, 'getCredit']);
        Route::get('credit/{id}', [AdminFileController::class, 'detailFile']);
        Route::post('credit', [AdminFileController::class, 'store']);
        Route::delete('credit/{id}', [AdminFileController::class, 'destroy']);
        Route::post('change-phase-approve', [AdminFileController::class, 'changePhase']);
        Route::get('change-phase-approve/{id}', [AdminFileController::class, 'changeApproved']);
        Route::put('edit-general-info/{id}', [AdminFileController::class, 'editGeneralInfo']);
        Route::put('survey-credit/{id}', [FileController::class, 'editSurveiResult']);
        Route::post('change-status', [FileController::class, 'changeStatus']);
        Route::get('list-approval/{id}', [AdminFileController::class, 'getSignatureUser']);
        Route::put('signature/{id}', [AdminFileController::class, 'signaturefile']);
        Route::post('add-approval', [AdminFileController::class, 'addNewApproval']);
        Route::post('delete-approval', [AdminFileController::class, 'deleteApproval']);

        ////filter
        Route::get('userAccess', [AdminFileController::class, 'userAccess']);
        Route::post('filterData', [AdminFileController::class, 'filterData']);
        Route::post('filterDataReport', [AdminFileController::class, 'filterDataReport']);
        Route::get('getAllUser', [AdminFileController::class, 'getAllUser']);

        //dashboard-Credit
        Route::get('dashboardCredit', [HelperController::class, 'getYears']);

        //=>note
        Route::post('note', [AdminFileController::class, 'addNote']);
        Route::put('note/{id}', [AdminFileController::class, 'editNote']);
        Route::delete('note/{id}', [AdminFileController::class, 'deleteNote']);

        //=>attchment
        Route::post('add-attach', [AdminFileController::class, 'addAttchment']);
        Route::put('edit-attach/{id}', [AdminFileController::class, 'editAttachment']);
        Route::delete('delete-attach/{id}', [AdminFileController::class, 'deleteAttachment']);
        Route::get('get-attach/{id}', [AdminFileController::class, 'getAttachment']);

        //=>filepenunjang [file-submission]
        Route::post('file-submission', [AdminFileController::class, 'addFileSubmission']);
        Route::put('file-submission/{id}', [AdminFileController::class, 'updateFileSubmission']);
        Route::delete('file-submission/{id}', [AdminFileController::class, 'destroyFileSubmission']);

        //////// Route User \\\\\\\\\
        Route::group(['prefix' => 'user'], function () {
            Route::get('generatereport/{id}', [FileController::class, 'generateReport']);
            Route::get('generatemonthly/{monthYear}', [FileController::class, 'generateMonthlyReport']);

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
            Route::get('dashboardCredit', [UserHelperController::class, 'getYears']);
            Route::post('getCredit', [FileController::class, 'getFile']);
            //bulan ini
            Route::get('getCredit/{id}', [FileController::class, 'getFilesByType']);

            ////filter
            Route::get('userAccess', [FileController::class, 'userAccess']);
            Route::post('filterData', [FileController::class, 'filterData']);
            Route::post('filterDataReport', [FileController::class, 'filterDataReport']);

            //=>note
            Route::post('note', [FileController::class, 'addNote']);
            Route::put('note/{id}', [FileController::class, 'editNote']);
            Route::delete('note/{id}', [FileController::class, 'deleteNote']);

            //=>attchment
            Route::post('add-attach', [FileController::class, 'addAttchment']);
            Route::put('edit-attach/{id}', [FileController::class, 'editAttachment']);
            Route::delete('delete-attach/{id}', [FileController::class, 'deleteAttachment']);
            Route::get('get-attach/{id}', [FileController::class, 'getAttachment']);
            Route::put('signature/{id}', [FileController::class, 'signaturefile']);

            //=>filepenunjang [file-submission]
            Route::post('file-submission', [FileController::class, 'addFileSubmission']);
            Route::put('file-submission/{id}', [FileController::class, 'updateFileSubmission']);
            Route::delete('file-submission/{id}', [FileController::class, 'destroyFileSubmission']);
        });
    });
});
