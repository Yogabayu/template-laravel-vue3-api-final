<template>
    <v-card>
        <v-card-text class="py-1 header-color">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="mr-auto">
                    <span class="text-subtitle-1 font-weight-bold ml-2">Phase 4 (KOMITE) 📄</span>
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
                                Penjelasan Phase Komite
                            </v-card-text>
                            <v-card-text class="py-2 px-4">
                                Tahap ini merupakan proses pengambilan keputusan akhir terkait pengajuan kredit. Komite
                                Kredit akan memberikan keputusan
                                apakah pengajuan kredit
                                disetujui, ditolak, atau memerlukan informasi tambahan. Keputusan diambil berdasarkan
                                pertimbangan risiko,
                                kebijakan kredit bank, dan potensi keuntungan. Komite juga dapat memberikan rekomendasi
                                terkait syarat dan
                                ketentuan kredit jika disetujui.
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-col>
            </v-row>
            <span>Tutorial tanda tangan file ( <a href="https://file.yogabayuap.com/index.php/s/6YSRSgcEwaeRAip" target="_blank">disini</a> )</span>
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
                                    userAccessPhase4 &&
                                    parseInt(userAccessPhase4.canInsertData) == 1
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccessPhase4 && parseInt(userAccessPhase4.canUpdateData) && phase < 5">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Tanda Tangan File"
                                    v-if="userAccessPhase4 && parseInt(userAccessPhase4.canApprove) && phase < 5">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="toSignature(attachment)">
                                            <VIcon size="20" icon="bx-pen" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccessPhase4 && parseInt(userAccessPhase4.canDeleteData) && phase < 5">
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
            <v-row no-gutters align="center" :class="parseInt(attachment.isSecret) ? 'bg-grey-lighten-4' : ''">
                <v-col cols="auto" class="mr-2">
                    <v-icon :color="parseInt(attachment.isApprove) ? 'success' : 'error'" size="small">
                        {{ parseInt(attachment.isApprove) ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                    <!-- <v-icon icon="mdi-file" size="small" class="ml-1"></v-icon> -->
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

                        <v-tooltip location="top" text="Tanda Tangan File"
                            v-if="userAccessPhase4 && parseInt(userAccessPhase4.canApprove) && phase < 5">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-pen" size="small" color="info" variant="text"
                                    class="mr-2" @click="toSignature(attachment)">
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

    <v-dialog v-model="isKomite" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertKomite">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formKomite.name" autofocus disabled
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3" accept="application/pdf" placeholder="Pick an image"
                                :rules="[rules.required]" @change="(event) => handleFileChange(event)"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formKomite.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>

                        <v-divider :thickness="5" class="border-opacity-75" color="info"></v-divider>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ? (ubah jika semua sudah menandatangani)" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formKomite.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
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

    <v-dialog v-model="showDesktopDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Perhatian</v-card-title>
            <v-card-text>
                Maaf, fitur ini hanya dapat digunakan pada komputer desktop untuk pengalaman terbaik.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDesktopDialog">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import mainURL from '@/axios';


export default {
    name: 'AttachmentCard4',
    props: {
        data: {
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
    data() {
        return {
            showDesktopDialog: false,
            userAccessPhase4: null,
            selectedOption: "",
            uploadProgress: null,
            rules: {
                required: (value) => !!value || "Required",
            },

            isKomite: false,
            formKomite: {
                id: null,
                name: "Analisa Kredit",
                file_id: this.fileId,
                path: 'null',
                link: null,
                isApprove: 0,
                isSecret: 0,
            },
        }
    },
    methods: {
        canViewFile(attachment) {
            if (parseInt(attachment.isSecret)) {
                return (attachment.path !== 'null' || attachment.link !== null) &&
                    this.userAccessPhase4 &&
                    parseInt(this.userAccessPhase4.isSecret) === 1;
            } else {
                return attachment.path !== 'null' || attachment.link !== null;
            }
        },

        canUploadFile(attachment) {
            return this.phase < 5 && (attachment.path === 'null' && attachment.link === null) &&
                this.userAccessPhase4 &&
                parseInt(this.userAccessPhase4.canInsertData) == 1;
        },

        canEditFile(attachment) {
            return this.phase < 5 && (attachment.path != 'null' || attachment.link != null) && this.userAccessPhase4 &&
                parseInt(this.userAccessPhase4.canUpdateData) == 1 && this.phase != 6;
        },

        canDeleteFile(attachment) {
            return this.phase < 5 && this.userAccessPhase4 &&
                parseInt(this.userAccessPhase4.canDeleteData) == 1 && this.phase != 6;
        },

        getFileUrl(attachment) {
            if (attachment.path !== 'null') {
                return `${this.filePath}/${this.fileId}/${attachment.path}`;
            } else if (attachment.link !== null) {
                return attachment.link;
            }
            return '#'; // Atau URL default jika tidak ada yang cocok
        },
        toSignature(attach) {
            if (attach.path == 'null' && attach.link == null) {
                this.$showToast('info', 'Perhatian', 'File harus di upload terlebih dahulu');
                return;
            }
            const isMobile = () => {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
                    || window.innerWidth <= 800;
            };

            if (isMobile()) {
                this.$showToast('info', 'Perhatian', 'Disarankan menggunakan komputer untuk tampilan dan pengalaman terbaik');
                return;
            }

            this.$router.push(`/u-pdfeditor/${attach.id}`);
        },
        openModal(type, item = null) {
            if (type == 1) {
                this.formKomite.id = item.id;
                this.formKomite.name = item.name;
                // this.formKomite.link = item.link;
                // this.formKomite.path = item.path;
                this.formKomite.isSecret = parseInt(item.isSecret);
                this.formKomite.isApprove = parseInt(item.isApprove);

                this.isKomite = true;
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formKomite.id = null;
                this.formKomite.isSecret = 0;
                this.formKomite.isApprove = 0;
                this.isKomite = false;
            }
        },

        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            const allowedTypes = [
                // "image/jpeg", // for .jpeg and .jpg
                // "image/png",
                "application/pdf",
                // "application/msword", // for .doc
                // "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx
                // "application/vnd.ms-excel",
            ];
            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                this.formKomite.path = selectedFile;
            } else {
                this.isKomite = false;
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file PDF yang diizinkan."
                );
                event.target.value = null;
            }
        },

        async insertKomite() {
            try {
                this.loading.show();
                const formData = new FormData();
                formData.append("name", this.formKomite.name);
                formData.append("isSecret", this.formKomite.isSecret);
                formData.append("isApprove", this.formKomite.isApprove);
                formData.append("file_id", this.formKomite.file_id);
                if (this.formKomite.path != 'null' && this.formKomite.path != null) {
                    formData.append("path", this.formKomite.path);
                } else
                    if (this.formKomite.link != null) {
                        formData.append("link", this.formKomite.link);
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
                    `/user/edit-attach/${this.formKomite.id}`,
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
                this.closeModal(1);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
    },
    mounted() {
        this.userAccessPhase4 = this.userAccess['4'];
    },
}
</script>
<style scoped>
.header-color {
    background-color: #FFAB00;
}
</style>
