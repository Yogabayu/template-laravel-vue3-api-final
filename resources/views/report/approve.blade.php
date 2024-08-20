<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ECAR - Electronic Credit Arthaya Report">
    <title>ECAR - Electronic Credit Arthaya Report</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
        }

        main {
            margin: 20px auto;
            padding: 20px;
            max-width: 800px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2,
        h3 {
            margin-bottom: 10px;
        }

        .card {
            border-radius: 8px;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
            vertical-align: top;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #555;
        }

        .attachment-link {
            background-color: #007BFF;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
        }

        .attachment-link:hover {
            background-color: #0056b3;
        }

        @page {
            margin: 100px 25px;
        }

        header {
            width: 100%;
            color: white;
            text-align: center;
            padding: 10px 0;
            position: fixed;
            top: -100px;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        footer {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100%;
            padding: 10px;
            text-align: right;
            color: #555;
            background-color: #f4f4f4;
            border-top: 1px solid #ddd;
        }

        .footer-content {
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <header>
        <img src="{{ public_path() }}/header.jpeg" alt="Header Image" width="80%" />
    </header>

    <div class="container">
        <main>
            <div class="card">
                <div class="card-title">Informasi Umum Kredit</div>
                <table>
                    <tbody>
                        <tr>
                            <th>Nama Pemohon:</th>
                            <td>{{ $file->name }}</td>
                        </tr>
                        <tr>
                            <th>NIK Pemohon:</th>
                            <td>{{ $file->nik_pemohon }}</td>
                        </tr>
                        <tr>
                            <th>Alamat Pemohon:</th>
                            <td>{{ $file->address }}</td>
                        </tr>
                        <tr>
                            <th>No. HP Pemohon:</th>
                            <td>{{ $file->no_hp }}</td>
                        </tr>
                        <tr>
                            <th>Jumlah Plafon:</th>
                            <td>Rp {{ number_format($file->plafon, 2, ',', '.') }}</td>
                        </tr>

                        @if (!empty($file->nik_pasangan) && $file->nik_pasangan !== 'null' && $file->nik_pasangan !== null)
                            <tr>
                                <th>NIK Pasangan:</th>
                                <td>{{ $file->nik_pasangan }}</td>
                            </tr>
                        @endif

                        @if (!empty($file->nik_jaminan) && $file->nik_jaminan !== 'null' && $file->nik_jaminan !== null)
                            <tr>
                                <th>NIK atas nama Jaminan:</th>
                                <td>{{ $file->nik_jaminan }}</td>
                            </tr>
                        @endif

                        <tr>
                            <th>Jenis Usaha:</th>
                            <td>{{ $file->type_bussiness }}</td>
                        </tr>
                        <tr>
                            <th>Deskripsi Usaha:</th>
                            <td>{{ $file->desc_bussiness }}</td>
                        </tr>
                        <tr>
                            <th>Sumber Order:</th>
                            <td>{{ $file->order_source }}</td>
                        </tr>
                        <tr>
                            <th>Status Kredit:</th>
                            <td>{{ $file->status_kredit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Tambahkan ini setelah bagian "Informasi Umum Kredit" -->
            <div class="card">
                <div class="card-title">Informasi Fase</div>
                <table>
                    <thead>
                        <tr>
                            <th>Fase</th>
                            <th>Durasi</th>
                            <th>Waktu Pembuatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($phaseData as $phaseName => $data)
                            <tr>
                                <th>{{ $phaseName }}</th>
                                <td>{{ $data['duration'] }}</td>
                                <td>{{ $data['created_at'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="card">
                <div class="card-title">Attachments</div>
                <table>
                    <tbody>
                        @foreach ($file->attachments as $attachment)
                            <tr>
                                <th>{{ $attachment->name }}:</th>
                                <td>
                                    @if ($attachment->path != 'null')
                                        <a href="{{ url('/file/' . $file->id . '/' . $attachment->path) }}"
                                            class="attachment-link">Buka File</a>
                                    @else
                                        <a href="{{ $attachment->link }}" class="attachment-link">Buka Link</a>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        @foreach ($file->filesubmissions as $attachment)
                            <tr>
                                <th>{{ $attachment->name }}:</th>
                                <td>
                                    @if ($attachment->path != 'null')
                                        <a href="{{ url('/file/' . $file->id . '/' . $attachment->path) }}"
                                            class="attachment-link">Buka File</a>
                                    @else
                                        <a href="{{ $attachment->link }}" class="attachment-link">Buka Link</a>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

        </main>
    </div>

    <!-- Footer for each page -->
    <footer>
        <div class="footer-content">
            Autogenerated from system
        </div>
    </footer>

</body>

</html>
