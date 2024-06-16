<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
<head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Notification Alert</title>
    <style type="text/css">
        body {
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100%;
            line-height: 1.6em;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            display: block !important;
            max-width: 600px !important;
            margin: 0 auto !important;
            padding: 20px;
        }
        .content {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e9e9e9;
            border-radius: 3px;
        }
        .alert {
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            padding: 20px;
            color: #fff;
            background-color: #FF9F00;
            border-radius: 3px 3px 0 0;
        }
        .content-block {
            padding: 20px;
        }
        .content-block strong {
            color: #2f2f2f;
        }
        .content-block p {
            margin: 0 0 10px;
        }
        .btn-primary {
            text-align: center;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            padding: 10px 20px;
            color: #FFF;
            background-color: #348eda;
            border-radius: 5px;
            margin: 0 0 10px;
            cursor: pointer;
        }
        .footer {
            width: 100%;
            clear: both;
            color: #999;
            padding: 20px;
            text-align: center;
        }
        .footer a {
            color: #999;
            text-decoration: underline;
        }
        @media only screen and (max-width: 640px) {
            body, h1, h2, h3, h4 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }
            .container, .content, .content-wrap, .invoice {
                padding: 10px !important;
                width: 100% !important;
            }
        }
    </style>
</head>

<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0; padding: 0;" bgcolor="#f6f6f6">
    <table class="body-wrap" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
        <tr>
            <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff">
                        <tr>
                            <td class="alert alert-warning" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #FF9F00; margin: 0; padding: 20px;" align="center" bgcolor="#FF9F00" valign="top">
                                Notifikasi
                            </td>
                        </tr>
                        <tr>
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0;">
                                    <tr>
                                        <td class="content-block" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            {!! $emailMessage !!}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Thanks for your attention.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0;">
                            <tr>
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">
                                    <a href="#" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">Unsubscribe</a> from these alerts.
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </td>
            <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
        </tr>
    </table>
</body>
</html>
