<template>
    <v-overlay :absolute="true" v-model="overlay" contained persistent class="align-center justify-center">
        <v-col>
            <v-progress-circular color="primary" size="32" indeterminate>
            </v-progress-circular>
            <br />
            <span class="font-weight-bold text-lg">Loading....</span>
        </v-col>
    </v-overlay>
    <v-container fluid>
        <v-card class="mx-auto" elevation="4">
            <v-card-item>
                <v-card-title class="text-h5 font-weight-bold mx-2">
                    Filter Bulan dan Kantor
                </v-card-title>
            </v-card-item>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="selectedMonth" label="Pilih Bulan dan Tahun" prepend-icon="mdi-calendar"
                            type="month" outlined dense @click="openMonthPicker" ref="monthPicker"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select v-model="selectedOffice" :items="offices" label="Pilih Kantor"
                            prepend-icon="mdi-office-building" outlined dense></v-select>
                    </v-col>
                </v-row>

                <v-row class="mt-4">
                    <v-col cols="12" class="text-center">
                        <v-btn color="primary" @click="applyFilter" elevation="2">
                            Terapkan Filter
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col cols="12">
                        <p class="text-body-2">
                            <v-icon small left>mdi-information</v-icon>
                            Pilih bulan, tahun, dan kantor untuk menampilkan data
                        </p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="mt-3" elevation="4">
            <v-tabs v-model="tab" class="v-tabs-pill" bg-color="secondary">
                <v-tab value="0">Semua</v-tab>
                <v-tab value="1">Approved</v-tab>
                <v-tab value="2">Pending</v-tab>
                <v-tab value="3">Rejected</v-tab>
                <v-tab value="4">SLIK</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <template v-for="phase in phases">
                        <v-window-item :value="phase.value">
                            <v-row class="d-flex justify-end pa-3">
                                <v-btn color="primary" size="small" class="my-3 mx-3"
                                    v-if="userAccess && parseInt(userAccess.canInsertData)" @click="openModal(1)">
                                    <v-icon icon="mdi-plus"></v-icon> Tambah Data
                                </v-btn>
                                <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(2)">
                                    <v-icon icon="mdi-download"></v-icon> Rekap Data
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search"
                                    single-line flat hide-details variant="solo-filled"
                                    v-model="searchValue"></v-text-field>
                            </v-row>

                            <div class="table-container" @touchstart.stop @touchmove.stop>
                                <EasyDataTable show-index :headers="headers" :items="searchableItems"
                                    :search-value="searchValue" :search-field="searchField" rows-per-page="500"
                                    border-cell buttons-pagination>
                                    <template #empty-message>
                                        <p>Data Kosong</p>
                                    </template>
                                    <template #loading>
                                        <p>loading data .....</p>
                                    </template>
                                    <template #item-plafon="item">Rp. {{ formatInput(item.plafon) }},-</template>
                                    <template #item-isApproved="item">
                                        <span v-if="parseInt(item.isApproved) == 1"> Approved</span>
                                        <span v-if="parseInt(item.isApproved) == 2"> Pending</span>
                                        <span v-if="parseInt(item.isApproved) == 3"> Rejected</span>
                                    </template>
                                    <template #item-aoro="item">
                                        <span>{{ item.user.name }}</span>
                                    </template>
                                    <template #item-slik="item">
                                        <v-tooltip location="top" text="Kondisi SLIK Sudah Terupload"
                                            v-if="hasSlikAttachment(item.attachments)">
                                            <template v-slot:activator="{ props }">
                                                <span v-bind="props">
                                                    <v-icon color="success">mdi-check-circle</v-icon>
                                                </span>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip location="top" text="Kondisi SLIK Belum Terupload" v-else>
                                            <template v-slot:activator="{ props }">
                                                <span v-bind="props">
                                                    <v-icon color="error">mdi-close-circle</v-icon>
                                                </span>
                                            </template>
                                        </v-tooltip>
                                    </template>
                                    <template #item-analisaAO="item">
                                        <v-tooltip location="top" text="Analisa AO Sudah Terupload"
                                            v-if="hasAnalisaAoAttachment(item.attachments)">
                                            <template v-slot:activator="{ props }">
                                                <span v-bind="props">
                                                    <v-icon color="success">mdi-check-circle</v-icon>
                                                </span>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip location="top" text="Analisa AO Belum Terupload" v-else>
                                            <template v-slot:activator="{ props }">
                                                <span v-bind="props">
                                                    <v-icon color="error">mdi-close-circle</v-icon>
                                                </span>
                                            </template>
                                        </v-tooltip>
                                    </template>
                                    <template #item-created_at="item">
                                        <span>{{ formatDate(item.created_at) }} WIB</span>
                                    </template>
                                    <template #item-operation="item">
                                        <div class="operation-wrapper">
                                            <div class="d-flex justify-space-between">
                                                <v-tooltip location="top" text="Detail Kredit">
                                                    <template v-slot:activator="{ props }">
                                                        <button v-bind="props" @click="toDetail(item)">
                                                            <VIcon size="20" icon="bx-link-external" color="blue" />
                                                        </button>
                                                    </template>
                                                </v-tooltip>

                                                <!-- <v-tooltip location="top" text="Hapus Kredit"
                                                    v-if="userData && item.user_id == userData.id">
                                                    <template v-slot:activator="{ props }">
                                                        <button v-bind="props" @click="deleteFile(item)">
                                                            <VIcon size="20" icon="bx-trash" color="red" />
                                                        </button>
                                                    </template>
                                                </v-tooltip> -->

                                                <v-tooltip location="top" text="Download Semua File Kredit"
                                                    v-if="role && role.canDownload == 1">
                                                    <template v-slot:activator="{ props }">
                                                        <button v-bind="props" @click="downloadFile(item.id)">
                                                            <VIcon size="20" icon="bx-download" color="red" />
                                                        </button>
                                                    </template>
                                                </v-tooltip>
                                            </div>
                                        </div>
                                    </template>
                                </EasyDataTable>
                            </div>

                        </v-window-item>
                    </template>
                </v-window>
            </v-card-text>

            <v-dialog v-model="insert" width="auto" persistent transition="dialog-top-transition">
                <v-card>
                    <template v-slot:title> Tambah Data</template>

                    <template v-slot:text>
                        <VForm @submit.prevent="insertData">
                            <VRow>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Nama Pemohon:
                                    </span>

                                    <VTextField class="my-3" v-model="dataForm.name" autofocus
                                        :rules="[rules.required]" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Jumlah Plafon:
                                    </span>

                                    <VTextField class="my-3" v-model="formattedPlafon" type="text"
                                        @input="formatInputIn" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pemohon:
                                    </span>

                                    <VTextField class="my-3" v-model="dataForm.nik_pemohon" type="number"
                                        :rules="[rules.required]" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Alamat
                                        Pemohon: </span>

                                    <VTextField class="my-3" v-model="dataForm.address" :rules="[rules.required]" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">No. HP
                                        Pemohon: </span>

                                    <VTextField class="my-3" v-model="dataForm.no_hp" :rules="[rules.required]" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih sumber
                                        order: </span>
                                    <v-select :items="orderList" autofocus v-model="dataForm.order_source"
                                        prepend-icon="mdi-help-rhombus"></v-select>
                                </VCol>

                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih status
                                        order: </span>
                                    <v-select :items="statusCreditList" autofocus v-model="dataForm.status_kredit"
                                        prepend-icon="mdi-help-rhombus"></v-select>
                                </VCol>

                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">KTP Pemohon :
                                    </span>

                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="(event) => handleFileChange(event, 'file1')"></v-file-input>
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Kartu Keluarga
                                        : </span>

                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="(event) => handleFileChange(event, 'file4')"></v-file-input>
                                </VCol>

                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Jenis
                                        Bukti Kunjungan :
                                    </span>
                                    <v-radio-group v-model="selectedPhoto" :mandatory="true" row>
                                        <v-radio label="Foto Kunjungan" value="fotoKunjungan"></v-radio>
                                        <v-radio label="Foto WhatsApp" value="fotoWhatsApp"></v-radio>
                                    </v-radio-group>
                                </VCol>

                                <VCol md="12" cols="12" v-if="selectedPhoto === 'fotoKunjungan'">
                                    <span style="color: red">*</span>
                                    <span class="subtitle-1 text-center">Foto Kunjungan :</span>
                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="handleFileChange($event, 'file10'); resetFile('file11')"></v-file-input>
                                </VCol>

                                <VCol md="12" cols="12" v-if="selectedPhoto === 'fotoWhatsApp'">
                                    <span style="color: red">*</span>
                                    <span class="subtitle-1 text-center">Foto WhatsApp :</span>
                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="handleFileChange($event, 'file11'); resetFile('file10')"></v-file-input>
                                </VCol>

                                <v-divider :thickness="5"></v-divider>
                                <!-- sudah menikah -->
                                <VCol cols="12" md="12">
                                    <v-checkbox v-model="dataForm.hasFile2" label="Apakah pemohon sudah menikah?"
                                        @change="resetFile('file2'), dataForm.nik_pasangan = null"></v-checkbox>
                                </VCol>

                                <v-divider :thickness="5"></v-divider>
                                <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">KTP Pasangan
                                        Pemohon :
                                    </span>

                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="(event) => handleFileChange(event, 'file2')"></v-file-input>
                                </VCol>

                                <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pasangan
                                        Pemohon: </span>

                                    <VTextField class="my-3" type="number" v-model="dataForm.nik_pasangan"
                                        :rules="[rules.required]" />
                                </VCol>

                                <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Buku
                                        Nikah:</span>
                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="handleFileChange($event, 'file5'); resetFile('file7'); resetFile('file8')"></v-file-input>
                                </VCol>

                                <VCol md="12" cols="12" v-if="selectedOption === 'jaminanSHM'">
                                    <span style="color: red">*</span>
                                    <span class="subtitle-1 text-center">Jaminan SHM:</span>
                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="handleFileChange($event, 'file7'); resetFile('file5'); resetFile('file8')"></v-file-input>
                                </VCol>

                                <VCol md="12" cols="12" v-if="selectedOption === 'jaminanBPKB'">
                                    <span style="color: red">*</span>
                                    <span class="subtitle-1 text-center">Jaminan BPKB:</span>
                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="handleFileChange($event, 'file8'); resetFile('file5'); resetFile('file7')"></v-file-input>
                                </VCol>

                                <v-divider :thickness="5"></v-divider>

                                <!-- ktp atas nama jaminan -->
                                <VCol cols="12" md="12">
                                    <v-checkbox v-model="dataForm.hasFile3"
                                        label="Apakah agunan bukan atas nama pemohon?"
                                        @change="resetFile('file3'), dataForm.nik_jaminan = null"></v-checkbox>
                                </VCol>
                                <VCol md="12" cols="12" v-if="dataForm.hasFile3">
                                    <span style="color: red">*</span>
                                    <span class="subtitle-1 text-center">KTP atas nama Jaminan :
                                    </span>

                                    <v-file-input class="my-3"
                                        accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        placeholder="Pick an image" :rules="[rules.required]"
                                        @change="(event) => handleFileChange(event, 'file3')"></v-file-input>
                                </VCol>
                                <VCol md="12" cols="12" v-if="dataForm.hasFile3">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pemilik
                                        Jaminan: </span>

                                    <VTextField class="my-3" type="number" v-model="dataForm.nik_jaminan"
                                        :rules="[rules.required]" />
                                </VCol>

                                <v-divider :thickness="5"></v-divider>

                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Jenis Usaha:
                                    </span>

                                    <VTextField class="my-3" v-model="dataForm.type_bussiness"
                                        :rules="[rules.required]" />
                                </VCol>
                                <VCol md="12" cols="12">
                                    <span style="color: red">*</span><span class="subtitle-1 text-center">Deskripsi
                                        Usaha: </span>

                                    <VTextField class="my-3" v-model="dataForm.desc_bussiness"
                                        :rules="[rules.required]" />
                                </VCol>

                                <VCol cols="12" class="d-flex flex-wrap gap-4">
                                    <VBtn type="submit"
                                        :disabled="(dataForm.name == null || dataForm.plafon == null || dataForm.type_bussiness == null || dataForm.desc_bussiness == null) || (dataForm.file1 == null || dataForm.file4 == null) || (dataForm.file10 == null && dataForm.file11 == null)">
                                        Simpan
                                    </VBtn>

                                    <button type="button" class="btn btn-blue" @click="closeModal(1)">
                                        Batal
                                    </button>
                                </VCol>
                            </VRow>
                        </VForm>
                    </template>

                    <template v-slot:actions>
                        <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
                    </template>
                </v-card>
            </v-dialog>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import mainURL from "@/axios";
export default {
    computed: {
        formattedPlafon: {
            get() {
                return this.formatNumber(this.dataForm.plafon);
            },
            set(value) {
                this.dataForm.plafon = value.replace(/\D/g, '');
            }
        },
        formattedMaxPlafon: {
            get() {
                return this.formatNumber(this.dataForm.plafon);
            },
            set(value) {
                this.dataForm.plafon = value.replace(/\D/g, '');
            }
        },
        searchableItems() {
            return this.items.map(item => ({
                ...item,
                office_names: item.user.position.offices.map(office => office.name).join(', ')
            }));
        }
    },
    data() {
        return {
            selectedMonth: new Date().toISOString().slice(0, 7),
            selectedOffice: null,
            offices: [],

            monthYear: this.$route.params.monthYear,
            selectedOption: 'bukuNikah',
            selectedPhoto: '',
            overlay: false,
            insert: false,
            searchValue: "",
            userData: null,
            userToken: null,
            uploadProgress: null,
            tab: 0,
            rules: {
                required: (value) => !!value || "Required",
            },

            //role
            role: {
                canDownload: 0,
            },

            items: [],
            originalItems: [],
            userAccess: null,
            headers: [
                { text: "Nama", value: "name", sortable: true },
                { text: "Plafon", value: "plafon", sortable: true },
                { text: "Status", value: "isApproved", sortable: true },
                { text: "AO/RO", value: "aoro", sortable: true },
                { text: "Kantor", value: "office_names", sortable: true },
                { text: "Tanggal", value: "created_at", sortable: true },
                { text: "SLIK", value: "slik", sortable: false },
                { text: "Analisa AO/RO", value: "analisaAO", sortable: false },
                { text: "Operation", value: "operation", width: 100 },
            ],
            phases: [
                { value: 0 },
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
            ],
            orderList: [
                { value: 'AO SENDIRI', title: 'AO SENDIRI' },
                { value: 'C. SERVIS / KANTOR', title: 'C. SERVIS / KANTOR' },
                { value: 'NASABAH', title: 'NASABAH' },
                { value: 'CROSS SALING DIVISI', title: 'CROSS SALING DIVISI' },
                { value: 'AGEN MGM / LAINNYA', title: 'AGEN MGM / LAINNYA' },
                { value: 'WEBSITE / WA / SOSMED', title: 'WEBSITE / WA/ SOSMED' },
                { value: 'TEAM BUSSINES', title: 'TEAM BUSSINES' },
                { value: 'PROGRAM KKB NEW', title: 'PROGRAM KKB NEW' },
                { value: 'PROGRAM KKB SECOND', title: 'PROGRAM KKB SECOND' },
                { value: 'CENTRO', title: 'CENTRO' },
            ],
            statusCreditList: [
                { value: 'FRESH', title: 'FRESH' },
                { value: 'REPEAT ORDER', title: 'REPEAT ORDER' },
                { value: 'TOPUP', title: 'TOPUP' },
            ],
            searchField: [
                "name",
                "plafon",
                "phase",
                "type_bussiness",
                "desc_bussiness",
                "reasonRejected",
                "nik_pemohon",
                "nik_pasangan",
                "nik_jaminan",
                "address",
                "no_hp",
                "order_source",
                "status_kredit",
                "user.name",
                "user.position.name",
                "office_names",
            ],
            dataForm: {
                id: null,
                name: "",
                plafon: null,
                type_bussiness: null,
                desc_bussiness: null,
                nik_pemohon: null,
                nik_pasangan: null,
                nik_jaminan: null,
                address: null,
                no_hp: null,
                order_source: null,
                status_kredit: null,
                file1: null, //ktp pemohon
                hasFile2: false,
                file2: null, //ktp pasangan
                hasFile3: false,
                file3: null, //ktp penjamin
                file4: null, //kk
                file5: null, //buku nikah
                hasFile7: false,
                file7: null, //shm
                hasFile8: false,
                file8: null, //bpkb
                hasFile9: false,
                file9: null, //foto detail mesin
                hasFile10: false,
                file10: null, // foto kunjungan
                hasFile11: false,
                file11: null, // foto wa
            },
            isStatusPhase: false,
            statusPhase: 0,
        };
    },
    watch: {
        tab(newVal) {
            if (newVal == 1) {
                this.filterDataStatus(1);
            } else if (newVal == 2) {
                this.filterDataStatus(2);
            } else if (newVal == 3) {
                this.filterDataStatus(3);
            } else if (newVal == 4) {
                this.filterDataStatus(4);
            }
            else {
                this.items = [...this.originalItems];
            }
        },
    },
    methods: {
        hasSlikAttachment(attachments) {
            return attachments.some(attachment =>
                attachment.name.includes('SLIK') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
            );
        },
        hasAnalisaAoAttachment(attachments) {
            return attachments.some(attachment =>
                attachment.name.includes('Analisa Awal Kredit AO') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
            );
        },
        goBack() {
            this.$router.go(-1);
        },
        async applyFilter() {
            try {
                this.overlay = true;
                const [year, month] = this.selectedMonth.split('-');
                const formData = new FormData();
                formData.append("year", year);
                formData.append("month", month);
                formData.append("office_id", this.selectedOffice);

                const response = await mainURL.post("/user/filterData", formData);

                if (response.status === 200) {
                    this.items = response.data.data;
                    this.originalItems = [...this.items];
                    this.overlay = false;
                } else {
                    this.overlay = false;
                    console.log(response.data.data.message);
                }
            } catch (error) {
                this.overlay = false;
                console.log(error);
            }
        },
        openMonthPicker() {
            this.$refs.monthPicker.$el.querySelector('input').click();
        },

        formatDate(dateString: any) {
            const date = new Date(dateString);
            return date.toLocaleString("id-ID");
        },
        async downloadFile(id) {
            try {
                this.overlay = true;
                const response = await mainURL.get(`/download-all/${id}`, {
                    responseType: 'blob' // tambahkan ini untuk mengunduh file sebagai Blob
                });

                if (response.status === 200) {
                    this.overlay = false;
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${id}.zip`); // Nama file ZIP yang akan diunduh
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    this.$showToast("success", "Berhasil", "File berhasil diunduh");
                } else {
                    this.overlay = false;
                    this.$showToast("error", "Error", "Gagal mengunduh file");
                }
            } catch (error) {
                this.overlay = false;
                this.$showToast("error", "Error", "Terjadi kesalahan saat mengunduh file");
            }
        },
        formatInput(value: string) {
            // Lakukan pemformatan nilai plafon di sini
            value = value.replace(/\D/g, ""); // Remove non-digit characters
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
            return value;
        },
        toDetail(item: any) {
            this.$router.push(`/u-credit/${item.id}`);
        },
        async deleteFile(item: { id: any }) {
            try {
                this.overlay = true;
                const confirmDelete = window.confirm(
                    "Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."
                );
                if (!confirmDelete) return;

                const response = await mainURL.delete(`/user/credit/${item.id}`);

                if (response.status === 200) {
                    this.overlay = false;
                    this.applyFilter();
                    this.$showToast("success", "Berhasill", response.data.message);
                } else {
                    this.overlay = false;
                    this.applyFilter();
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.overlay = false;
                this.applyFilter();
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
        resetFile(fileKey: string | number) {
            if (!this.dataForm[fileKey] != null) {
                this.dataForm[fileKey] = null;
            }
        },
        handleFileChange(
            event: { target: { files: any[]; value: null } },
            fileKey: string | number
        ) {
            const selectedFile = event.target.files[0];
            const allowedTypes = [
                "image/jpeg", // for .jpeg and .jpg
                "image/png",
                "application/pdf",
                "application/msword", // for .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // for .docx
            ];
            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                this.dataForm[fileKey] = selectedFile; // Menambahkan catatan file sesuai dengan file yang dipilih
                if (fileKey == "file1") {
                    this.dataForm.noteFile1 = "KTP Pemohon";
                } else if (fileKey == "file2") {
                    this.dataForm.noteFile2 = "KTP Pasangan";
                } else if (fileKey == "file3") {
                    this.dataForm.noteFile3 = "KTP Atas Nama Jaminan";
                } else if (fileKey == "file4") {
                    this.dataForm.noteFile4 = "Kartu Keluarga";
                } else if (fileKey == "file5") {
                    this.dataForm.noteFile5 = "Buku Nikah";
                } else if (fileKey == "file7") {
                    this.dataForm.noteFile7 = "Jaminan SHM";
                } else if (fileKey == "file8") {
                    this.dataForm.noteFile8 = "Jaminan BPKB";
                } else if (fileKey == "file9") {
                    this.dataForm.noteFile9 = "Foto Detail Mesin";
                } else if (fileKey == "file10") {
                    this.dataForm.noteFile10 = "Foto Kunjungan";
                } else if (fileKey == "file11") {
                    this.dataForm.noteFile11 = "Foto WhatsApp";
                }
            } else {
                this.overlay = false;
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."
                );
                event.target.value = null;
            }
        },
        async getRecaptData(monthYear: any) {
            try {
                this.overlay = true;
                if (this.selectedOffice == null) {
                    alert('Pilih Kantor terlebih dahulu');
                    this.overlay = false;
                    return;
                }
                const [year, month] = this.selectedMonth.split('-');
                const formData = new FormData();
                formData.append("year", year);
                formData.append("month", month);
                formData.append("office_id", this.selectedOffice);

                const response = await mainURL.post(`/user/filterDataReport`, formData, {
                    responseType: 'blob' // tambahkan ini untuk mengunduh file sebagai Blob
                });

                if (response.status === 200) {
                    this.overlay = false;

                    // Dapatkan nama file dari header respons
                    const contentDisposition = response.headers['content-disposition'];
                    let filename = 'download.xlsx'; // Default filename
                    if (contentDisposition) {
                        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                        if (filenameMatch.length === 2)
                            filename = filenameMatch[1];
                    }

                    // Buat Blob dari respons data
                    const blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });

                    // Buat URL objek dan unduh file
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    this.$showToast("success", "Berhasil", "File Excel berhasil diunduh");
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.overlay = false;
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
        async openModal(type: number, item = null) {
            if (type === 1) {
                this.insert = true;
            } else if (type === 2) {
                this.getRecaptData(this.selectedMonth);
            }
        },
        closeModal(type: number) {
            if (type === 1) {
                this.resetForm();
                this.insert = false;
            } else if (type === 2) {
                this.resetForm();
                this.edit = false;
            }
        },
        resetForm() {
            this.dataForm = {
                id: null,
                name: "",
                plafon: null,
                file1: null, //ktp pemohon
                hasFile2: false,
                file2: null, //ktp pasangan
                hasFile3: false,
                file3: null, //ktp penjamin
                file4: null, //kk
                file5: null, //buku nikah
                hasFile7: false,
                file7: null, //shm
                hasFile8: false,
                file8: null, //bpkb
                hasFile9: false,
                file9: null, //foto detail mesin
                hasFile10: false,
                file10: null, // foto kunjungan
            };
        },
        formatInputIn(event: { target: { value: any } }) {
            let value = event.target.value;
            value = value.replace(/\D/g, ""); // Remove non-digit characters
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
            event.target.value = value;
        },
        formatNumber(value) {
            if (!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        filterDataStatus(phase: any) {
            if (phase != 4) {
                this.items = this.originalItems.filter(
                    (item: { isApproved: any }) => item.isApproved == phase
                );
            } else {
                this.items = this.originalItems.filter(
                    (item: { isApproved: any, attachments: any[] }) =>
                        item.attachments.some(attachment =>
                            attachment.name.includes('SLIK') && parseInt(attachment.phase) == 2
                        )
                );
            }
        },
        getUserData() {
            const savedUserData = localStorage.getItem("userData");
            if (savedUserData) {
                this.userData = JSON.parse(savedUserData);
                this.offices = this.userData.position.offices.map(
                    (item: { id: any; name: any }) => ({
                        value: item.id,
                        title: item.name,
                    })
                );
            }
        },
        formatInputPlafon(event: { target: { value: any } }) {
            let value = event.target.value;
            value = value.replace(/\D/g, ""); // Remove non-digit characters
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
            event.target.value = value;
        },
        async insertData() {
            try {
                this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.dataForm.name);
                formData.append("nik_pemohon", this.dataForm.nik_pemohon);
                formData.append("address", this.dataForm.address);
                formData.append("no_hp", this.dataForm.no_hp);
                formData.append("order_source", this.dataForm.order_source);
                formData.append("status_kredit", this.dataForm.status_kredit);
                formData.append("plafon", this.dataForm.plafon.replace(/\D/g, ""));
                formData.append("type_bussiness", this.dataForm.type_bussiness);
                formData.append("desc_bussiness", this.dataForm.desc_bussiness);

                if (this.dataForm.file2 != null) {
                    formData.append('nik_pasangan', this.dataForm.nik_pasangan);
                }
                if (this.dataForm.file3 != null) {
                    formData.append('nik_jaminan', this.dataForm.nik_jaminan);
                }

                // Append files to formData
                for (let i = 1; i <= 11; i++) {
                    if (i === 6) continue;

                    let fileKey = "file" + i;
                    let noteFileKey = "noteFile" + i;
                    let hasFileKey = "hasFile" + i;

                    // Check if the file has a corresponding hasFile property
                    if (
                        (this.dataForm.hasOwnProperty(hasFileKey) &&
                            this.dataForm[hasFileKey]) ||
                        this.dataForm[fileKey]
                    ) {
                        // If it does, check if the file exists
                        if (this.dataForm[fileKey]) {
                            formData.append(fileKey, this.dataForm[fileKey]);
                            formData.append(noteFileKey, this.dataForm[noteFileKey]);
                        }
                    } else {
                        // If it doesn't, just check if the file exists
                        if (this.dataForm[fileKey]) {
                            formData.append(fileKey, this.dataForm[fileKey]);
                        }
                    }
                }

                formData.append("_method", "POST");

                const config = {
                    onUploadProgress: (progressEvent) => {
                        try {
                            this.uploadProgress = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                        } catch (error) {
                            console.error("Error calculating progress:", error);
                        }
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };

                const response = await mainURL.post("/user/credit", formData, config);
                if (response.status === 200) {
                    this.overlay = false;
                    this.closeModal(1);
                    this.applyFilter();
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.overlay = false;
                    this.uploadProgress = null;
                    this.applyFilter();
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.overlay = false;
                this.uploadProgress = null;
                this.closeModal(1);
                this.applyFilter();
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },

        async getUserAccess() {
            try {
                const response = await mainURL.get("/user/userAccess");

                if (response.status === 200) {
                    this.userAccess = response.data.data;
                } else {
                    console.log(response.data.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getUserData();
        this.getUserAccess();
    },
};
</script>

<style scoped>
.v-card {
    border-radius: 12px;
}

.v-btn {
    text-transform: none;
}
</style>
