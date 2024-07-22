<template>
    <v-card>
        <v-card-text class="py-1 header-color">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="mr-auto">
                    <span class="text-subtitle-1 font-weight-bold ml-2">Phase 3 (Analisa Kredit) 📄</span>
                </v-col>
                <v-col cols="auto">
                    <v-bottom-sheet max-width="400">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" color="on-primary" variant="text">
                                <v-icon color="white">mdi-help-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text class="text-h6 py-2 px-4">
                                Penjelasan Phase Analisa Kredit
                            </v-card-text>
                            <v-card-text class="py-2 px-4">
                                Tahap ini merupakan proses evaluasi mendalam terhadap kelayakan nasabah untuk menerima
                                kredit. Analisa kredit
                                mencakup penilaian aspek 5C: Character (karakter), Capacity (kapasitas), Capital
                                (modal), Collateral (jaminan),
                                dan Condition (kondisi). Tim analis kredit akan mengevaluasi data finansial, riwayat
                                kredit, dan informasi
                                lainnya untuk menentukan tingkat risiko dan kemampuan nasabah dalam memenuhi kewajiban
                                kreditnya.
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- <div v-for="(attachment, index) in data" :key="index">
            <v-list density="compact">
                <v-list-item>
                    <template v-slot:prepend>
                        {{ parseInt(attachment.isApprove) ? "✅" : "❌" }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="attachment.note != null"> {{ attachment.note }} </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="(attachment.path !== 'null' || attachment.link !== null)">
                                    <template v-slot:activator="{ props }">
                                        <a v-if="attachment.path !== 'null'" v-bind="props"
                                            :href="`${filePath}/${fileId}/${attachment.path}`" target="_blank"
                                            rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                        <a v-bind="props" :href="`${attachment.link}`" target="_blank"
                                            rel="noopener noreferrer" v-if="attachment.link !== null">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Upload File / Link" v-if="
                                    (attachment.path == 'null' && attachment.link == null) &&
                                    userAccessPhase3 &&
                                    parseInt(userAccessPhase3.canInsertData) == 1
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccessPhase3 && parseInt(userAccessPhase3.canUpdateData) && phase < 4">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccessPhase3 && parseInt(userAccessPhase3.canDeleteData) && phase < 4">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                            <VIcon size="20" icon="bx-trash" color="red" />
                                        </button>
                                    </template>
                                </v-tooltip>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </div> -->

        <div v-for="(attachment, index) in data" :key="index" class="pa-1">
            <v-row no-gutters align="center"
                :class="parseInt(attachment.isSecret) ? 'bg-grey-lighten-4' : ''">
                <v-col cols="auto" class="mr-2">
                    <v-icon :color="parseInt(attachment.isApprove) ? 'success' : 'error'" size="small">
                        {{ parseInt(attachment.isApprove) ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                    <v-icon icon="mdi-file" size="small" class="ml-1"></v-icon>
                </v-col>

                <v-col>
                    <div class="text-subtitle-2 font-weight-medium">{{ attachment.name }}</div>
                    <div v-if="attachment.note !== 'null'" class="text-caption text-grey-darken-1">{{ attachment.note }}
                    </div>
                </v-col>

                <v-col cols="auto">
                    <div class="d-flex">
                        <v-tooltip location="top" text="Lihat File" v-if="canViewFile(attachment)">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-link-external" size="small" color="primary"
                                    variant="text" class="mr-2" :href="getFileUrl(attachment)" target="_blank"
                                    rel="noopener noreferrer">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Upload File" v-if="canUploadFile(attachment)">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-upload" size="small" color="primary" variant="text"
                                    class="mr-2" @click="openModal(1, attachment)">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Edit File" v-if="canEditFile(attachment)">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-edit" size="small" color="info" variant="text"
                                    class="mr-2" @click="openModal(1, attachment)">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Hapus File" v-if="canDeleteFile(attachment)">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-trash" size="small" color="error" variant="text"
                                    @click="deleteAttachment(attachment.id)">
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </v-col>
            </v-row>

            <v-divider v-if="index < data.length - 1" class="mt-3"></v-divider>
        </div>
    </v-card>
    <v-card class="mt-2">
        <v-card-text class="py-1 header-color">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="mr-auto">
                    <span class="text-subtitle-1 font-weight-bold ml-2">Dokumen Penunjang Kredit / Jaminan 📄</span>
                </v-col>
                <v-col cols="auto">
                    <span>
                        <v-btn color="primary" size="x-small" class="my-3 mx-3" @click="openModal(2)">
                            Tambah Data Lain
                        </v-btn>
                    </span>
                </v-col>
            </v-row>
        </v-card-text>


        <div v-if="submission.length == 0">
            <v-list><v-list-item>Belum ada file</v-list-item></v-list>
        </div>
        <div v-for="(sub, index) in sortedSubmission" :key="index" v-if="sortedSubmission.length > 0">
            <!-- <v-list density="compact">
                <v-list-item>
                    <v-list-item-title> {{ sub.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="sub.type == 1"> Dokumen Penunjang Analisa </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="sub.type == 2"> Dokumen Jaminan </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="(sub.path !== 'null' || sub.link !== null)">
                                    <template v-slot:activator="{ props }">
                                        <a v-if="sub.path !== null" v-bind="props"
                                            :href="`${filePath}/${fileId}/${sub.path}`" target="_blank"
                                            rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                        <a v-bind="props" :href="`${sub.link}`" target="_blank"
                                            rel="noopener noreferrer" v-if="sub.link !== null">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccessPhase3 && parseInt(userAccessPhase3.canAppeal) && phase < 4">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(3, sub)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccessPhase3 && parseInt(userAccessPhase3.canAppeal) && phase < 4">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteSubmission(sub.id)">
                                            <VIcon size="20" icon="bx-trash" color="red" />
                                        </button>
                                    </template>
                                </v-tooltip>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list> -->
            
            <v-row no-gutters align="center" class="pa-2">
                <v-col cols="auto" class="mr-2">
                    <v-icon color="success" size="small" icon="mdi-check-circle">
                    </v-icon>
                </v-col>

                <v-col>
                    <div class="text-subtitle-2 font-weight-medium">{{ sub.name }}</div>
                    <div v-if="sub.type == 1" class="text-caption text-grey-darken-1">Dokumen Penunjang Analisa
                    </div>
                </v-col>

                <v-col cols="auto">
                    <div class="d-flex">
                        <v-tooltip location="top" text="Lihat File" v-if="(sub.path !== 'null' || sub.link !== null)">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-link-external" size="small" color="primary"
                                    variant="text" class="mr-2" :href="`${filePath}/${fileId}/${sub.path}`" target="_blank"
                                    rel="noopener noreferrer">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Edit File" v-if="userAccessPhase3 && parseInt(userAccessPhase3.canAppeal) && phase < 4">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-edit" size="small" color="info" variant="text"
                                    class="mr-2" @click="openModal(3, sub)">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Hapus File" v-if="userAccessPhase3 && parseInt(userAccessPhase3.canAppeal) && phase < 4">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-trash" size="small" color="error" variant="text"
                                    @click="deleteSubmission(sub.id)">
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-card>

    <v-dialog v-model="isAnalisaKredit" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertAnalisa">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formAnalisaKredit.name" autofocus disabled
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Salah Satu :
                            </span>
                            <v-radio-group v-model="selectedOption" :mandatory="true" row>
                                <v-radio label="File" value="file"></v-radio>
                                <v-radio label="Link" value="link"></v-radio>
                            </v-radio-group>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'file'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="
                                    handleFileChange($event, this.formAnalisaKredit, 'path'); formAnalisaKredit.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formAnalisaKredit.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>
                        <!-- <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event)"></v-file-input>
                        </VCol> -->
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formAnalisaKredit.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formAnalisaKredit.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <!-- <VBtn type="submit" :disabled="(formDetailSlik.name && formDetailSlik.path&& formDetailSlik.isApprove!=1) == null"> -->
                            <VBtn type="submit">
                                Simpan
                            </VBtn>
                            <button type="button" class="btn btn-blue" @click="closeModal(1)">
                                Batal
                            </button>
                        </VCol>
                    </v-row>
                </v-form>
            </template>

            <template v-slot:actions>
                <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="isSubmission" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Tambah Data </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertSubmission">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formSubmission.name" autofocus
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Salah Satu :
                            </span>
                            <v-radio-group v-model="selectedOption" :mandatory="true" row>
                                <v-radio label="File" value="file"></v-radio>
                                <v-radio label="Link" value="link"></v-radio>
                            </v-radio-group>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'file'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="
                                    handleFileChange($event, this.formSubmission, 'path'); formSubmission.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formSubmission.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Jenis Dokumen :
                            </span>
                            <v-radio-group v-model="formSubmission.type" :mandatory="true" row>
                                <v-radio label="Dokumen Penunjang Analisa" value=1></v-radio>
                                <v-radio label="Dokumen Jaminan" value=2></v-radio>
                            </v-radio-group>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <VBtn type="submit">
                                Simpan
                            </VBtn>
                            <button type="button" class="btn btn-blue" @click="closeModal(2)">
                                Batal
                            </button>
                        </VCol>
                    </v-row>
                </v-form>
            </template>

            <template v-slot:actions>
                <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="isUpdateSubmission" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Update Data </template>

            <template v-slot:text>
                <v-form @submit.prevent="updateSubmission">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formSubmission.name" autofocus
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Salah Satu :
                            </span>
                            <v-radio-group v-model="selectedOption" :mandatory="true" row>
                                <v-radio label="File" value="file"></v-radio>
                                <v-radio label="Link" value="link"></v-radio>
                            </v-radio-group>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'file'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="
                                    handleFileChange($event, this.formSubmission, 'path'); formSubmission.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formSubmission.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Jenis Dokumen :
                            </span>
                            <v-radio-group v-model="formSubmission.type" :mandatory="true" row>
                                <v-radio label="Dokumen Penunjang Kredit" :value="1"></v-radio>
                                <v-radio label="Dokumen Jaminan" :value="2"></v-radio>
                            </v-radio-group>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <VBtn type="submit">
                                Simpan
                            </VBtn>
                            <button type="button" class="btn btn-blue" @click="closeModal(3)">
                                Batal
                            </button>
                        </VCol>
                    </v-row>
                </v-form>
            </template>

            <template v-slot:actions>
                <v-progress-linear v-model="uploadProgress" color="amber" height="25"></v-progress-linear>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
import mainURL from '@/axios';


export default {
    name: 'AttachmentCard3',
    props: {
        data: {
            type: Object,
            required: true,
        },
        submission: {
            type: Object,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        fileId: {
            type: Number,
            required: true,
        },
        userAccess: {
            type: Object,
            required: true,
        },
        deleteAttachment: {
            type: Function,
            required: true,
        },

        getDetailFile: {
            type: Function,
            required: true,
        },
        phase: {
            type: Number,
            required: true,
        },
    },
    watch: {
        selectedOption(newVal) {
            if (newVal === 'file') {
                this.formAnalisaKredit.link = null;
            } else if (newVal === 'link') {
                this.formAnalisaKredit.path = null;
            }
        }
    },
    computed: {
        sortedSubmission() {
            return this.submission.slice().sort((a, b) => {
                // Sort to have type 2 (Dokumen Jaminan) before type 1 (Dokumen Penunjang Kredit)
                if (a.type === 2 && b.type !== 2) return -1;
                if (a.type !== 2 && b.type === 2) return 1;
                return 0; // Maintain the order for other types
            });
        }
    },
    data() {
        return {
            userAccessPhase3: null,
            selectedOption: "",
            uploadProgress: null,
            rules: {
                required: (value) => !!value || "Required",
            },

            isAnalisaKredit: false,
            formAnalisaKredit: {
                id: null,
                name: "Analisa Kredit",
                file_id: this.fileId,
                path: 'null',
                link: null,
                isApprove: 0,
                isSecret: 0,
            },

            isSubmission: false,
            isUpdateSubmission: false,
            formSubmission: {
                id: null,
                file_id: null,
                phase: null,
                name: null,
                path: null,
                link: null,
                note: null,
                type: null,
            },
        }
    },
    methods: {
        canViewFile(attachment) {
            if (parseInt(attachment.isSecret)) {
                return (attachment.path !== 'null' || attachment.link !== null) &&
                    this.userAccessPhase3 &&
                    parseInt(this.userAccessPhase3.isSecret) === 1;
            } else {
                return attachment.path !== 'null' || attachment.link !== null;
            }
        },

        canUploadFile(attachment) {
            return (attachment.path === 'null' && attachment.link === null) &&
                this.userAccessPhase3 &&
                parseInt(this.userAccessPhase3.canInsertData) == 1 && this.phase != 6;
        },

        canEditFile(attachment) {
            return  this.phase < 5 && this.userAccessPhase3 &&
                parseInt(this.userAccessPhase3.canUpdateData)==1 && this.phase != 6;
        },

        canDeleteFile(attachment) {
            return this.phase < 5 && this.userAccessPhase3 &&
                parseInt(this.userAccessPhase3.canDeleteData)==1 && this.phase != 6;
        },

        getFileUrl(attachment) {
            if (attachment.path !== 'null') {
                return `${this.filePath}/${this.fileId}/${attachment.path}`;
            } else if (attachment.link !== null) {
                return attachment.link;
            }
            return '#'; // Atau URL default jika tidak ada yang cocok
        },
        openModal(type, item = null) {
            if (type == 1) {
                this.formAnalisaKredit.id = item.id;
                this.formAnalisaKredit.name = item.name;
                this.formAnalisaKredit.link = item.link;
                this.formAnalisaKredit.path = item.path;
                this.formAnalisaKredit.isSecret = parseInt(item.isSecret);
                this.formAnalisaKredit.isApprove = parseInt(item.isApprove);

                this.isAnalisaKredit = true;
            } else if (type == 2) {
                this.formSubmission.file_id = this.fileId;
                this.formSubmission.phase = 3;
                this.isSubmission = true;
            } else if (type == 3) {
                this.formSubmission.id = item.id;
                this.formSubmission.file_id = this.fileId;
                this.formSubmission.phase = 3;
                this.formSubmission.name = item.name;
                this.formSubmission.type = item.type;
                this.isUpdateSubmission = true;
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formAnalisaKredit.id = null;
                this.formAnalisaKredit.isSecret = 0;
                this.formAnalisaKredit.isApprove = 0;
                this.selectedOption = "";
                this.isAnalisaKredit = false;
            } else if (type == 2) {
                this.formSubmission.id = null;
                this.formSubmission.file_id = null;
                this.formSubmission.phase = null;
                this.formSubmission.name = null;
                this.formSubmission.path = null;
                this.formSubmission.link = null;
                this.formSubmission.note = null;
                this.formSubmission.type = null;
                this.selectedOption = "";

                this.isSubmission = false;
            } else if (type == 3) {
                this.formSubmission.id = null;
                this.formSubmission.file_id = null;
                this.formSubmission.phase = null;
                this.formSubmission.name = null;
                this.formSubmission.path = null;
                this.formSubmission.link = null;
                this.formSubmission.note = null;
                this.formSubmission.type = null;
                this.selectedOption = "";

                this.isUpdateSubmission = false;
            }
        },

        handleFileChange(event, formObject, property) {
            const selectedFile = event.target.files[0];
            const allowedTypes = [
                "image/jpeg", // for .jpeg and .jpg
                "image/png",
                "application/pdf",
                "application/msword", // for .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx
                "application/vnd.ms-excel",
            ];

            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                formObject[property] = selectedFile;
            } else {
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, PDF, DOC, dan DOCX yang diizinkan."
                );
                event.target.value = null;
            }
        },

        async insertAnalisa() {
            try {
                this.loading.show();
                const formData = new FormData();
                formData.append("name", this.formAnalisaKredit.name);
                formData.append("isSecret", this.formAnalisaKredit.isSecret);
                formData.append("isApprove", this.formAnalisaKredit.isApprove);
                formData.append("file_id", this.formAnalisaKredit.file_id);
                if (this.formAnalisaKredit.path != 'null' && this.formAnalisaKredit.path != null) {
                    formData.append("path", this.formAnalisaKredit.path);
                } else
                    if (this.formAnalisaKredit.link != null) {
                        formData.append("link", this.formAnalisaKredit.link);
                    }
                formData.append("_method", "PUT");

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

                const response = await mainURL.post(
                    `/user/edit-attach/${this.formAnalisaKredit.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.loading.hide();
                    this.closeModal(1);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.loading.hide();
                    this.closeModal(1);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.loading.hide();
                this.uploadProgress = null;
                this.closeModal(1);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },

        async insertSubmission() {
            try {
                this.loading.show();

                if (this.formSubmission.link == null && this.formSubmission.path == null) {
                    this.isSubmission = false;
                    this.$showToast("error", "Error", "File / Link harus diisi");
                    this.loading.hide();
                    return;
                }

                const formData = new FormData();
                formData.append("file_id", this.formSubmission.file_id);
                formData.append("name", this.formSubmission.name);
                formData.append("type", this.formSubmission.type);
                formData.append("phase", this.formSubmission.phase);
                if (this.formSubmission.path != null && this.formSubmission.path != null) {
                    formData.append("path", this.formSubmission.path);
                } else
                    if (this.formSubmission.link != null) {
                        formData.append("link", this.formSubmission.link);
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

                const response = await mainURL.post(
                    `/user/file-submission`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.loading.hide();
                    this.closeModal(2);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.loading.hide();
                    this.closeModal(2);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.loading.hide();
                this.uploadProgress = null;
                this.closeModal(2);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },

        async deleteSubmission(id) {
            try {
                const confirmDelete = window.confirm(
                    "Apakah Anda yakin ingin menghapus data? Data akan terhapus secara permanen."
                );
                if (!confirmDelete) return;

                this.loading.show();
                const response = await mainURL.delete(`/user/file-submission/${id}`);

                if (response.status === 200) {
                    this.loading.hide();
                    this.getDetailFile(this.fileId);
                    this.$showToast("success", "Berhasill", response.data.message);
                } else {
                    this.loading.hide();
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", "Terjadi Kesalahan Silahkan Coba Lagi");
                }
            } catch (error) {
                this.loading.hide();
                this.closeModal(2);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },

        async updateSubmission() {
            try {
                this.loading.show();
                const formData = new FormData();
                formData.append("file_id", this.formSubmission.file_id);
                formData.append("name", this.formSubmission.name);
                formData.append("type", this.formSubmission.type);
                formData.append("phase", this.formSubmission.phase);
                if (this.formSubmission.path != null && this.formSubmission.path != null) {
                    formData.append("path", this.formSubmission.path);
                } else
                    if (this.formSubmission.link != null) {
                        formData.append("link", this.formSubmission.link);
                    }
                formData.append("_method", "PUT");

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

                const response = await mainURL.post(
                    `/user/file-submission/${this.formSubmission.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.loading.hide();
                    this.closeModal(3);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.loading.hide();
                    this.closeModal(3);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.loading.hide();
                this.uploadProgress = null;
                this.closeModal(3);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        }
    },
    mounted() {
        this.userAccessPhase3 = this.userAccess['3'];
    },
}
</script>
<style scoped>
.header-color {
    background-color: #FFAB00;
}
</style>
