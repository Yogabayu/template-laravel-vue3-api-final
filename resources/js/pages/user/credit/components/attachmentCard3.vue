<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
        Loading...
    </v-overlay>
    <v-card color="warning">
        <v-card-title>
            <v-row class="d-flex justify-space-between">
                <v-col cols="12" sm="6" md="8">
                    <span>Phase 3 (Analisa Kredit) 📄</span>
                </v-col>
            </v-row>
        </v-card-title>

        <div v-for="(attachment, index) in data" :key="index">
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
                                <v-tooltip location="top" text="Lihat File" v-if="(attachment.path !== 'null' || attachment.link !== null)">
                                    <template v-slot:activator="{ props }">
                                        <a v-if="attachment.path !== 'null'" v-bind="props" :href="`${filePath}/${fileId}/${attachment.path}`"
                                            target="_blank" rel="noopener noreferrer">
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
                                    (attachment.path == 'null' && attachment.link == null ) &&
                                    userAccess &&
                                    parseInt(userAccess.canInsertData) == 1
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccess && parseInt(userAccess.canUpdateData)">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <!-- <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccess && parseInt(userAccess.canDeleteData)">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                            <VIcon size="20" icon="bx-trash" color="red" />
                                        </button>
                                    </template>
                                </v-tooltip> -->
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
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
                                @change="handleFileChange($event); formAnalisaKredit.link = null"></v-file-input>
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
                            <v-select label="Apakah Anda Yakin file sudah benar ?" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
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
        // openModal: {
        //     type: Function,
        //     required: true,
        // },

        getDetailFile: {
            type: Function,
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
            selectedOption: "",
            overlay: false,
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
        }
    },
    methods: {
        openModal(type, item = null) {
            if (type == 1) {
                this.formAnalisaKredit.id = item.id;
                this.formAnalisaKredit.name = item.name;
                this.formAnalisaKredit.link = item.link;
                this.formAnalisaKredit.path = item.path;
                this.formAnalisaKredit.isSecret = parseInt(item.isSecret);
                this.formAnalisaKredit.isApprove = parseInt(item.isApprove);

                this.isAnalisaKredit = true;
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formAnalisaKredit.id = null;
                this.formAnalisaKredit.isSecret = 0;
                this.formAnalisaKredit.isApprove = 0;
                this.isAnalisaKredit = false;
            }
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
                "application/vnd.ms-excel",
            ];
            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                this.formAnalisaKredit.path = selectedFile;
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
                this.overlay = true;
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
                this.overlay = false;
                this.closeModal(1);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
    },
}
</script>
