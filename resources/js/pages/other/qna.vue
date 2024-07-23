<template>
    <v-card>
        <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
            FAQ Sistem ECAR
        </VCardTitle>
    </v-card>
    <div>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Apa itu Sistem ECAR ?
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div>
                        <p>
                            ECAR adalah singkatan dari Electronic Credit Arthaya Report. Ini merupakan sebuah
                            sistem
                            elektronik yang digunakan untuk mengelola dan melaporkan proses kredit.
                        </p>
                        <p>
                            Sistem ECAR dirancang untuk mengotomatisasi dan mengefisienkan proses pengajuan,
                            analisis, dan persetujuan kredit. Sistem ini terdiri dari enam fase utama yang
                            mencakup
                            seluruh siklus hidup pengajuan kredit, mulai dari pengumpulan data awal hingga
                            realisasi
                            kredit.
                        </p>
                        <h4>Enam fase utama dalam sistem ECAR adalah:</h4>
                        <ol class="ml-5">
                            <li>Pooling: Pengumpulan dan verifikasi berkas kredit nasabah.</li>
                            <li>SLIK (Sistem Layanan Informasi Keuangan): Pengecekan riwayat kredit nasabah.
                            </li>
                            <li>Analisa Kredit: Evaluasi mendalam terhadap kelayakan nasabah untuk menerima
                                kredit.
                            </li>
                            <li>Komite Kredit: Pengambilan keputusan akhir terkait pengajuan kredit.</li>
                            <li>Operation: Implementasi dan pengelolaan kredit setelah disetujui.</li>
                            <li>Realisasi: Pencairan dana kredit kepada nasabah.</li>
                        </ol>
                        <h4 class="mt-5">
                            Sistem ECAR membantu dalam:
                        </h4>
                        <ul class="ml-5">
                            <li>Menstandarisasi proses kredit</li>
                            <li>Meningkatkan akurasi analisis</li>
                            <li>Mempercepat pengambilan keputusan</li>
                            <li>Meningkatkan transparansi dalam proses kredit</li>
                        </ul>
                        <p class="mt-5">
                            Dengan menggunakan sistem elektronik, ECAR juga memungkinkan pelacakan yang lebih
                            baik
                            terhadap status pengajuan kredit dan memudahkan pelaporan kepada pihak-pihak yang
                            berkepentingan.
                        </p>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase 1 (pooling)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p>Tahap ini meliputi pengumpulan dan verifikasi berkas kredit nasabah. Proses ini dilaksanakan
                        setelah Account Officer (AO) melakukan survei lapangan. Dokumentasi yang terkumpul akan
                        digunakan untuk analisis SLIK (Sistem Layanan Informasi Keuangan) guna menilai kelayakan kredit.
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase 2 (SLIK)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p>Tahap ini melibatkan proses pengecekan riwayat kredit nasabah melalui Sistem Layanan Informasi
                        Keuangan (SLIK). SLIK merupakan sistem yang dikelola oleh Otoritas Jasa Keuangan (OJK) untuk
                        menyediakan informasi pinjaman debitur. Hasil analisis SLIK digunakan untuk menilai kelayakan
                        kredit dan risiko nasabah berdasarkan catatan keuangan sebelumnya.
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase 3 (Analisa Kredit)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p>Tahap ini merupakan proses evaluasi mendalam terhadap kelayakan nasabah untuk menerima kredit.
                        Analisa kredit mencakup penilaian aspek 5C: Character (karakter), Capacity (kapasitas), Capital
                        (modal), Collateral (jaminan), dan Condition (kondisi). Tim analis kredit akan mengevaluasi data
                        finansial, riwayat kredit, dan informasi lainnya untuk menentukan tingkat risiko dan kemampuan
                        nasabah dalam memenuhi kewajiban kreditnya.
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase 4 (Komite)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p>Tahap ini merupakan proses pengambilan keputusan akhir terkait pengajuan kredit. Komite Kredit
                        akan memberikan keputusan apakah pengajuan kredit disetujui, ditolak, atau memerlukan informasi
                        tambahan. Keputusan diambil berdasarkan pertimbangan risiko, kebijakan kredit bank, dan potensi
                        keuntungan. Komite juga dapat memberikan rekomendasi terkait syarat dan ketentuan kredit jika
                        disetujui.
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase 5 (Operation)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p>Tahap Operation merupakan fase implementasi dan pengelolaan kredit setelah disetujui. Tujuan
                        utama tahap ini adalah memastikan kredit berjalan sesuai dengan ketentuan yang disepakati dan
                        meminimalkan risiko operasional.
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="my-4" variant="popout">
            <v-expansion-panel>
                <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-minus">
                    Phase Pencairan
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div>
                        <p>
                            Fase pencairan, juga dikenal sebagai fase realisasi, adalah tahap akhir dalam proses kredit
                            menggunakan sistem ECAR. Ini merupakan langkah krusial di mana dana kredit yang telah
                            disetujui akhirnya disalurkan kepada nasabah.
                        </p>
                        <h4>Aspek-aspek penting dalam fase pencairan:</h4>
                        <ul class="ml-5">
                            <li>Verifikasi akhir: Memastikan semua persyaratan telah dipenuhi.</li>
                            <li>Penandatanganan perjanjian kredit: Formalisasi kesepakatan antara bank dan nasabah.</li>
                            <li>Pengaktifan fasilitas kredit: Menyiapkan akun atau fasilitas untuk pencairan.</li>
                            <li>Proses transfer dana: Mentransfer dana ke rekening nasabah atau pihak yang ditunjuk.
                            </li>
                            <li>Pencatatan dan dokumentasi: Merekam transaksi dalam sistem untuk keperluan audit dan
                                pelaporan.</li>
                        </ul>
                        <p>
                            Fase ini menandai dimulainya kewajiban nasabah untuk membayar cicilan sesuai dengan jadwal
                            yang telah disepakati. Sistem ECAR membantu dalam memastikan proses pencairan berjalan
                            lancar, akurat, dan terdokumentasi dengan baik.
                        </p>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<style scoped></style>
