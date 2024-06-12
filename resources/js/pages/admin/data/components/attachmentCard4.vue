<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
        Loading...
    </v-overlay>
    <v-card color="warning">
        <v-card-title>
            <v-row class="d-flex justify-space-between">
                <v-col cols="12" sm="6" md="8">
                    <span>Phase 4 (KOMITE) 📄</span>
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
                                <v-tooltip location="top" text="Tanda Tangan File" v-if="userAccess && parseInt(userAccess.canUpdateData)">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="toSignature(attachment)">
                                            <VIcon size="20" icon="bx-pen" color="blue" />
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

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event)"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formKomite.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda Yakin file sudah benar ?" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
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
        toSignature(attach) {
            if (attach.path == 'null' && attach.link == null) {
                alert('Silahkan upload file terlebih dahulu');
                return;
            }
            
            this.$router.push(`/u-pdfeditor/${attach.id}`);
        },
        openModal(type, item = null) {
            if (type == 1) {
                this.formKomite.id = item.id;
                this.formKomite.name = item.name;
                this.formKomite.link = item.link;
                this.formKomite.path = item.path;
                this.formKomite.isSecret = parseInt(item.isSecret);
                this.formKomite.isApprove = parseInt(item.isApprove);

                // console.log(this.formKomite);
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
                "image/jpeg", // for .jpeg and .jpg
                "image/png",
                "application/pdf",
                "application/msword", // for .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx
                "application/vnd.ms-excel",
            ];
            if (selectedFile && allowedTypes.includes(selectedFile.type)) {
                this.formKomite.path = selectedFile;
            } else {
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, PDF, DOC, dan DOCX yang diizinkan."
                );
                event.target.value = null;
            }
        },

        async insertKomite() {
            try {
                this.overlay = true;
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
                    `/edit-attach/${this.formKomite.id}`,
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
