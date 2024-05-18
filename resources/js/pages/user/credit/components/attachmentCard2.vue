<template>
    <v-card color="warning">
        <v-card-title>
            <v-row class="d-flex justify-space-between">
                <v-col cols="12" sm="6" md="8">
                    <span>Phase 2 (SLIK) 📄</span>
                </v-col>
            </v-row>
        </v-card-title>
        <div v-for="(attachment, index) in data" :key="index">
            <v-list density="compact">
                <v-list-item v-if="shouldDisplay(attachment)">
                    <template v-slot:prepend>
                        {{ attachment.isApprove ? '✅' : '❌' }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File" v-if="attachment.path !== 'null'">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="`${filePath}/${fileId}/${attachment.path}`"
                                            target="_blank" rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Upload File"
                                    v-if="attachment.path === 'null' && userAccess && parseInt(userAccess.canInsertData) == 1">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccess && parseInt(userAccess.canUpdateData)">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccess && parseInt(userAccess.canDeleteData)">
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
            <div v-if="showAnalisaAwalCredit()">
                <v-list density="compact">
                    <v-list-item>
                        <v-list-item-title>Analisa Awal Credit</v-list-item-title>
                        <!-- Tambahkan elemen untuk Analisa Awal Credit di sini -->
                    </v-list-item>
                </v-list>
            </div>
            <div v-if="showFileBanding()">
                <v-list density="compact">
                    <v-list-item>
                        <v-list-item-title>Upload File Banding</v-list-item-title>
                        <!-- Tambahkan elemen untuk Upload File Banding di sini -->
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </v-card>

    <v-dialog v-model="isFormDetailSlik" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertDetailSlik">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formDetailSlik.name" autofocus
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event)"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formDetailSlik.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <VBtn type="submit" :disabled="(formDetailSlik.name && formDetailSlik.path) == null">
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
</template>

<script>
import mainURL from '@/axios';

export default {
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
            type: String,
            required: true,
        },
        userAccess: {
            type: Object,
            required: true,
        },
        getDetailFile: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            rules: {
                required: (value) => !!value || "Required",
            },

            isFormDetailSlik: false,
            formDetailSlik: {
                id: null,
                name: null,
                path: null,
                isApprove: 0,
                isSecret: 0,
            },
        }
    },
    methods: {
        shouldDisplay(attachment) {
            if (attachment.name === 'Detail SLIK' && parseInt(this.userAccess.isSecret) == 1) {
                return true;
            }
            if (attachment.name === 'Resume SLIK' && !attachment.isSecret) {
                return true;
            }
            return false;
        },
        showAnalisaAwalCredit() {
            const detailSLIK = this.data.find(att => att.name === 'Detail SLIK' && att.isApprove === 1);
            const resumeSLIK = this.data.find(att => att.name === 'Resume SLIK' && att.isApprove === 1);
            return detailSLIK && resumeSLIK && this.userAccess.canAppeal == 1;
        },
        showFileBanding() {
            const detailSLIKNotApproved = this.data.find(att => att.name === 'Detail SLIK' && att.isApprove !== 1);
            const resumeSLIKNotApproved = this.data.find(att => att.name === 'Resume SLIK' && att.isApprove !== 1);
            return (detailSLIKNotApproved || resumeSLIKNotApproved) && this.userAccess.canAppeal == 1;
        },

        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            const allowedTypes = [
                "image/jpeg", // for .jpeg and .jpg
                "image/png",
                "application/pdf",
                "application/msword", // for .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx
                "application/vnd.ms-excel"
            ];
            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                this.formDetailSlik.path = selectedFile;
            } else {
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, PDF, DOC, dan DOCX yang diizinkan."
                );
                event.target.value = null;
            }
        },
        openModal(type, item = null) {
            if (type == 1) {
                if (item.name == 'Detail SLIK') {
                    this.formDetailSlik.id = item.id;
                    this.formDetailSlik.name = item.name;
                    this.formDetailSlik.isSecret = item.isSecret;
                    this.formDetailSlik.isApprove = item.isApprove;

                    this.isFormDetailSlik = true;
                } else if (item.name == 'Resume SLIK') {
                    console.log('masuk resume SLIK');
                }
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formDetailSlik.id = null;
                this.formDetailSlik.name = null;
                this.formDetailSlik.isSecret = null;
                this.formDetailSlik.isApprove = null;
                this.isFormDetailSlik = false;
            }
        },
        async insertDetailSlik() {
            try {
                // this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.formDetailSlik.name);
                formData.append("path", this.formDetailSlik.path);
                formData.append("isSecret", this.formDetailSlik.isSecret);
                formData.append("isApprove", this.formDetailSlik.isApprove);
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
                    `/user/edit-attach/${this.formDetailSlik.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.overlay = false;
                    this.closeModal(1);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.overlay = false;
                    this.closeModal(1);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.closeModal(1);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
    }
}
</script>
