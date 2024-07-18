<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
        Loading...
    </v-overlay>
    <v-card>
        <v-card-text class="py-1 header-color">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="mr-auto">
                    <span class="text-subtitle-1 font-weight-bold ml-2">Phase Operation 📄</span>
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
                                Penjelasan Phase Operation
                            </v-card-text>
                            <v-card-text class="py-2 px-4">
                                Tahap Operation merupakan fase implementasi dan pengelolaan kredit setelah disetujui. Tujuan utama tahap ini adalah memastikan kredit berjalan sesuai dengan ketentuan yang disepakati dan meminimalkan risiko operasional.
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
                                <v-tooltip location="top" text="Upload File" v-if="
                                    attachment.path === 'null' &&
                                    userAccessPhase5 &&
                                    parseInt(userAccessPhase5.canInsertData) == 1
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File"
                                    v-if="userAccessPhase5 && parseInt(userAccessPhase5.canUpdateData) && phase < 6">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccessPhase5 && parseInt(userAccessPhase5.canDeleteData) && phase < 6">
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

    <v-dialog v-model="isSp3k" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertSpk3k">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formsp3k.name" autofocus disabled
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
                            ]" v-model="formsp3k.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formsp3k.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
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
    name: 'AttachmentOperation',
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
        
        phase : {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            userAccessPhase5: null,
            overlay: false,
            uploadProgress: null,
            rules: {
                required: (value) => !!value || "Required",
            },

            isSp3k: false,
            formsp3k: {
                id: null,
                name: "SP3K",
                file_id: this.fileId,
                path: null,
                isApprove: 0,
                isSecret: 0,
            },
        }
    },
    methods: {
        canViewFile(attachment) {
            if (parseInt(attachment.isSecret)) {
                return (attachment.path !== 'null' || attachment.link !== null) &&
                    this.userAccessPhase5 &&
                    parseInt(this.userAccessPhase5.isSecret) === 1;
            } else {
                return attachment.path !== 'null' || attachment.link !== null;
            }
        },

        canUploadFile(attachment) {
            return this.phase < 6 &&  (attachment.path === 'null' && attachment.link === null) &&
                this.userAccessPhase5 &&
                parseInt(this.userAccessPhase5.canInsertData) == 1;
        },

        canEditFile(attachment) {
            return this.phase < 6 && this.userAccessPhase5 &&
                parseInt(this.userAccessPhase5.canUpdateData) == 1 && this.phase != 6;
        },

        canDeleteFile(attachment) {
            return this.phase < 6 &&  this.userAccessPhase5 &&
                parseInt(this.userAccessPhase5.canDeleteData) == 1 && this.phase != 6;
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
                this.formsp3k.id = item.id;
                this.formsp3k.name = item.name;
                this.formsp3k.isSecret = parseInt(item.isSecret);
                this.formsp3k.isApprove = parseInt(item.isApprove);

                this.isSp3k = true;
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formsp3k.id = null;
                this.formsp3k.isSecret = 0;
                this.formsp3k.path = null;
                this.formsp3k.isApprove = 0;
                this.isSp3k = false;
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
                this.formsp3k.path = selectedFile;
            } else {
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, PDF, DOC, dan DOCX yang diizinkan."
                );
                event.target.value = null;
            }
        },

        async insertSpk3k() {
            try {
                this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.formsp3k.name);
                formData.append("path", this.formsp3k.path);
                formData.append("isSecret", this.formsp3k.isSecret);
                formData.append("isApprove", this.formsp3k.isApprove);
                formData.append("file_id", this.formsp3k.file_id);
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
                    `/user/edit-attach/${this.formsp3k.id}`,
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
    },
    mounted() {
        this.userAccessPhase5 = this.userAccess['5'];
    },
}
</script>
<style scoped>
.header-color {
    background-color: #FFAB00;
}
</style>
