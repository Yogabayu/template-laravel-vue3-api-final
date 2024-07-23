<!-- InsertModal.vue -->
<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" width="auto" persistent
        transition="dialog-top-transition">
        <v-card>
            <template v-slot:title>Tambah Data</template>

            <template v-slot:text>
                <VForm @submit.prevent="insertData">
                    <VRow>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Jenis Kredit:
                            </span>
                            <v-select :items="typeCreditList" autofocus v-model="dataForm.type"
                                prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Nama Pemohon: </span>

                            <VTextField class="my-3" v-model="dataForm.name" :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Jumlah Plafon: </span>

                            <VTextField class="my-3" v-model="formattedPlafon" type="text" @input="formatInputIn" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pemohon: </span>

                            <VTextField class="my-3" v-model="dataForm.nik_pemohon" type="number"
                                :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Alamat Pemohon:
                            </span>

                            <VTextField class="my-3" v-model="dataForm.address" :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">No. HP Pemohon:
                            </span>

                            <VTextField class="my-3" v-model="dataForm.no_hp" :rules="[rules.required]" />
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">KTP Pemohon : </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event, 'file1')"></v-file-input>
                        </VCol>

                        <!-- <VCol md="12" cols="12" v-if="dataForm.hasFile2"> -->
                        <VCol md="12" cols="12">
                            <!-- <span style="color: red">*</span> -->
                            <span class="subtitle-1 text-center">NIK Pasangan / Pendamping : </span>

                            <!-- <VTextField class="my-3" type="number" v-model="dataForm.nik_pasangan" :rules="[rules.required]" /> -->
                            <VTextField class="my-3" type="number" v-model="dataForm.nik_pasangan" />
                        </VCol>

                        <VCol md="12" cols="12">
                            <!-- <span style="color: red">*</span> -->
                            <span class="subtitle-1 text-center">KTP Pasangan / Pendamping Pemohon :
                            </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event, 'file2')"></v-file-input>
                        </VCol>

                        <VCol cols="12" md="12">
                            <v-checkbox v-model="dataForm.hasFile2" label="Apakah pemohon sudah menikah?"
                                @change="resetFile('file5')"></v-checkbox>
                        </VCol>

                        <!-- <VCol md="12" cols="12"> -->
                        <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                            <span class="subtitle-1 text-center">Buku Nikah:</span>
                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="handleFileChange($event, 'file5'); resetFile('file7'); resetFile('file8')"></v-file-input>
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Kartu Keluarga :
                            </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event, 'file4')"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih sumber order:
                            </span>
                            <v-select :items="orderList" autofocus v-model="dataForm.order_source"
                                prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih status order:
                            </span>
                            <v-select :items="statusCreditList" autofocus v-model="dataForm.status_kredit"
                                prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih Jenis Bukti
                                Kunjungan :
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

                        <!-- ktp atas nama jaminan -->
                        <VCol cols="12" md="12">
                            <v-checkbox v-model="dataForm.hasFile3" label="Apakah agunan bukan atas nama pemohon?"
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
                            <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pemilik Jaminan:
                            </span>

                            <VTextField class="my-3" type="number" v-model="dataForm.nik_jaminan"
                                :rules="[rules.required]" />
                        </VCol>

                        <v-divider :thickness="5"></v-divider>

                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Jenis Usaha: </span>

                            <VTextField class="my-3" v-model="dataForm.type_bussiness" :rules="[rules.required]" />
                        </VCol>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Deskripsi Usaha:
                            </span>

                            <VTextField class="my-3" v-model="dataForm.desc_bussiness" :rules="[rules.required]" />
                        </VCol>

                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <VBtn type="submit"
                                :disabled="(dataForm.name == null || dataForm.plafon == null || dataForm.type_bussiness == null || dataForm.desc_bussiness == null || dataForm.order_source == null || dataForm.status_kredit == null) || (dataForm.file1 == null || dataForm.file4 == null) || (dataForm.file10 == null && dataForm.file11 == null)">
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
</template>

<script lang="ts">
import mainURL from '@/axios';

export default {
    name: 'InsertModal',
    props: {
        modelValue: Boolean,
        orderList: {
            type: Array,
            required: true
        },
        statusCreditList: {
            type: Array,
            required: true
        },
        closeModal: {
            type: Function,
            required: true,
        },
        getAllFiles: {
            type: Function,
            required: false,
        }
    },
    inject: ['loading'],
    emits: ['update:modelValue', 'insert'],
    data() {
        return {
            dataForm: {
                id: null,
                name: "",
                plafon: null,
                type: null,
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
            uploadProgress: 0,
            selectedPhoto: null,
            typeCreditList: [
                { value: 1, title: 'Reguler' },
                { value: 2, title: 'Restruktur' },
            ],
        };
    },
    methods: {
        async insertData() {
            try {
                this.loading.show();
                const formData = new FormData();
                formData.append("name", this.dataForm.name);
                formData.append("nik_pemohon", this.dataForm.nik_pemohon);
                formData.append("address", this.dataForm.address);
                formData.append("type", this.dataForm.type);
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
                    this.loading.hide();
                    this.closeModal(1);
                    this.getAllFiles();
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.loading.hide();
                    this.uploadProgress = null;
                    this.getAllFiles();
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.loading.hide();
                this.uploadProgress = null;
                this.closeModal(1);
                this.getAllFiles();
                this.$showToast("error", "Sorry", error.response.data.message);
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
                this.loading.hide();
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."
                );
                event.target.value = null;
            }
        },
        resetFile(fileKey) {
            this.dataForm[fileKey] = null;
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
    },
    computed: {
        rules() {
            return {
                required: value => !!value || 'Field ini harus diisi.',
            };
        },
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
    },
};
</script>
