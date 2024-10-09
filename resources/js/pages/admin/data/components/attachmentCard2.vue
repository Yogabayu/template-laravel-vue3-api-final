<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
        Loading...
    </v-overlay>
    <v-card color="warning">
        <v-card-title class="py-2">
            <v-row align="center" no-gutters>
                <v-col cols="auto">
                    <span class="text-h6 font-weight-medium">Phase 2 (SLIK) 📄</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-bottom-sheet max-width="400">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" color="on-primary" variant="text">
                                <v-icon color="on-primary">mdi-help-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h6 py-2 px-4">
                                Penjelasan Phase SLIK
                            </v-card-title>
                            <v-card-text class="py-2 px-4">
                                Tahap ini melibatkan proses pengecekan riwayat kredit nasabah melalui Sistem Layanan
                                Informasi Keuangan (SLIK).
                                SLIK merupakan sistem yang dikelola oleh Otoritas Jasa Keuangan (OJK) untuk menyediakan
                                informasi pinjaman
                                debitur. Hasil analisis SLIK digunakan untuk menilai kelayakan kredit dan risiko nasabah
                                berdasarkan catatan
                                keuangan sebelumnya.
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-col>
            </v-row>
        </v-card-title>
        <div v-for="(attachment, index) in data" :key="index">
            <v-list density="compact">
                <v-list-item v-if="shouldDisplay(attachment)">
                    <!-- <v-list-item> -->
                    <template v-slot:prepend>
                        {{ parseInt(attachment.isApprove) ? "✅" : "❌" }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="attachment.note != 'null'"> {{ attachment.note }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="attachment.path !== 'null' || attachment.link !== null">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="`${filePath}/${fileId}/${attachment.path}`"
                                            target="_blank" rel="noopener noreferrer" v-if="attachment.path !== 'null'">
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
                                <v-tooltip location="top" text="Upload File" v-if="
                                    (attachment.path === 'null' && attachment.link === null)
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(1, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File">
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
        <div v-if="showAnalisaAwalCredit()">
            <v-list density="compact">
                <v-list-item>
                    <template v-slot:prepend>
                        {{ parseInt(formAnalytic.isApprove) ? "✅" : "❌" }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ formAnalytic.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="formAnalytic.note != null"> {{ formAnalytic.note }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <!-- {{ formAnalytic.path }}
                                {{ formAnalytic.link }} -->
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="(formAnalytic.path !== 'null' || formAnalytic.link !== null)">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="`${filePath}/${fileId}/${formAnalytic.path}`"
                                            target="_blank" rel="noopener noreferrer"
                                            v-if="formAnalytic.path !== 'null'">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                        <a v-bind="props" :href="`${formAnalytic.link}`" target="_blank"
                                            rel="noopener noreferrer" v-if="formAnalytic.link !== null">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Upload File / Link" >
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, formAnalytic)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, formAnalytic)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccess && parseInt(userAccess.canInsertData) == 1 && phase < 3">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(formAnalytic.id)">
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
        <div v-if="showFileBanding()">
            <v-list density="compact">
                <v-list-item>
                    <template v-slot:prepend>
                        {{ parseInt(formAppeal.isApprove) ? "✅" : "❌" }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ formAppeal.name }} </v-list-item-title>
                    <template v-slot:append>
                        <!-- {{ formAnalytic }} -->
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <!-- <v-tooltip location="top" text="Lihat File"
                                    v-if="formAppeal.path != null && formAppeal.path != 'null'">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="`${filePath}/${fileId}/${formAppeal.path}`"
                                            target="_blank" rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
            </v-tooltip> -->
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="(formAppeal.path !== 'null' || formAppeal.link !== null)">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="`${filePath}/${fileId}/${formAppeal.path}`"
                                            target="_blank" rel="noopener noreferrer" v-if="formAppeal.path !== 'null'">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                        <a v-bind="props" :href="`${formAppeal.link}`" target="_blank"
                                            rel="noopener noreferrer" v-if="formAppeal.link !== null">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Upload File / Link" >
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(3, formAppeal)">
                                            <VIcon size="20" icon="bx-upload" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Edit File">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(3, formAppeal)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>
                                <v-tooltip location="top" text="Hapus File">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(formAppeal.id)">
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

    <v-dialog v-model="isFormDetailSlik" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertSlik">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formDetailSlik.name" autofocus disabled
                                :rules="[rules.required]" />
                        </VCol>

                        <VCol md="12" cols="12">
                            <span class="subtitle-1 text-center">Note: </span>
                            <VTextField class="my-3" v-model="formDetailSlik.note" :rules="[rules.required]" />
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
                                @change="handleFileChange($event); formDetailSlik.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formDetailSlik.link" type="link"
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
                            ]" v-model="formDetailSlik.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formDetailSlik.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
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

    <v-dialog v-model="isFormResumeSlik" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Attachment </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertSlik">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formDetailSlik.name" autofocus disabled
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
                                @change="handleFileChange($event); formDetailSlik.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formDetailSlik.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>
                        <!-- <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleFileChange(event)"></v-file-input>
                        </VCol> -->
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formDetailSlik.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formDetailSlik.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <!-- <VBtn type="submit" :disabled="(formDetailSlik.name && formDetailSlik.path && formDetailSlik.isApprove!=1) == null"> -->
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

    <v-dialog v-model="isAnalytic" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Analisis AO </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertAnalytic">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formAnalytic.name" autofocus disabled
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
                                @change="handleAnalyticChange($event); formAnalytic.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formAnalytic.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>

                        <!-- <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleAnalyticChange(event)"></v-file-input>
                        </VCol> -->
                        <!-- <VCol md="12" cols="12">
                            <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                                { value: 1, title: 'Ya' },
                                { value: 0, title: 'Tidak' },
                            ]" v-model="formAnalytic.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol> -->

                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formAnalytic.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <!-- <VBtn type="submit" :disabled="(formDetailSlik.name && formDetailSlik.path && formDetailSlik.isApprove!=1) == null"> -->
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

    <v-dialog v-model="isAppeal" width="auto" persistent transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Data Banding AO </template>

            <template v-slot:text>
                <v-form @submit.prevent="insertAppeal">
                    <v-row>
                        <VCol md="12" cols="12">
                            <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File:
                            </span>

                            <VTextField class="my-3" v-model="formAppeal.name" autofocus disabled
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
                                @change="handleAppealChange($event); formAppeal.link = null"></v-file-input>
                        </VCol>
                        <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload Link: </span>

                            <VTextField class="my-3" v-model="formDetailSlik.link" type="link"
                                hint="Pastikan menggunakan https://" :rules="[rules.required]" />
                        </VCol>

                        <!-- <VCol md="12" cols="12">
                            <span style="color: red">*</span>
                            <span class="subtitle-1 text-center"> Upload File: </span>

                            <v-file-input class="my-3"
                                accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Pick an image" :rules="[rules.required]"
                                @change="(event) => handleAppealChange(event)"></v-file-input>
                        </VCol> -->
                        <VCol md="12" cols="12">
                            <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                                { value: 1, title: 'Setuju' },
                                { value: 0, title: 'Tidak Setuju' },
                            ]" v-model="formAppeal.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
                        </VCol>
                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                            <!-- <VBtn type="submit" :disabled="(formDetailSlik.name && formDetailSlik.path && formDetailSlik.isApprove!=1) == null"> -->
                            <VBtn type="submit">
                                Simpan
                            </VBtn>
                            <button type="button" class="btn btn-blue" @click="closeModal(4)">
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
import mainURL from "@/axios";

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
        phase: {
            type: Number,
            required: true,
        },
    },
    watch: {
        selectedOption(newVal) {
            if (newVal === 'file') {
                this.formDetailSlik.link = null;
            } else if (newVal === 'link') {
                this.formDetailSlik.path = null;
            }
        }
    },
    data() {
        return {
            overlay: false,
            selectedOption: "",
            uploadProgress: null,
            rules: {
                required: (value) => !!value || "Required",
            },

            isFormDetailSlik: false,
            formDetailSlik: {
                id: null,
                name: null,
                note: null,
                path: null,
                link: null,
                file_id: this.fileId,
                isApprove: 0,
                isSecret: 0,
            },

            isFormResumeSlik: false,
            formResumeSlik: {
                id: null,
                name: null,
                path: null,
                note: null,
                link: null,
                file_id: this.fileId,
                isApprove: 0,
                isSecret: 0,
            },

            isAppeal: false,
            formAppeal: {
                id: null,
                file_id: this.fileId,
                phase: 2,
                name: "File Banding",
                path: null,
                note: null,
                link: null,
                isApprove: 0,
                isSecret: 0,
            },

            isAnalytic: false,
            formAnalytic: {
                id: null,
                file_id: this.fileId,
                link: null,
                note: null,
                phase: 2,
                name: "Analisa Kredit AO",
                path: null,
                isApprove: 0,
                isSecret: 0,
            },
        };
    },
    methods: {
        shouldDisplay(attachment) {
            if (
                attachment.name === "Analisa Kredit AO"
            ) {
                return false;
            }
            if (attachment.name === "File Banding") {
                return false;
            }
            return true;
        },
        showAnalisaAwalCredit() {
            const containsApprovedSLIK = this.data.filter(
                (att) => att.name.includes("SLIK") && att.isApprove == 1 && (att.path != 'null' || att.link != null)
            );

            if (containsApprovedSLIK.length > 0) {
                let analytic = this.data.find((att) => att.name == "Analisa Kredit AO");
                if (analytic) {
                    this.formAnalytic.id = analytic.id;
                    this.formAnalytic.isApprove = parseInt(analytic.isApprove);
                    this.formAnalytic.isSecret = parseInt(analytic.isSecret);
                    this.formAnalytic.path = analytic.path;
                    this.formAnalytic.link = analytic.link;
                }

                return true
            }
            return false;
        },
        showFileBanding() {
            const containsUnapprovedSLIK = this.data.filter(
                (att) => att.name.includes("SLIK") && att.isApprove == 0 && (att.path !== 'null' || att.link !== null)
            );

            const cekFileBanding = this.data.filter(
                (att) => att.name == 'File Banding' && (att.path !== 'null' || att.link !== null)
            );

            if (containsUnapprovedSLIK.length > 0 || cekFileBanding.length > 0) {
                let appeal = this.data.find((att) => att.name === "File Banding");
                if (appeal) {
                    this.formAppeal.id = appeal.id;
                    this.formAppeal.isApprove = parseInt(appeal.isApprove);
                    this.formAppeal.isSecret = parseInt(appeal.isSecret);
                    this.formAppeal.path = appeal.path;
                }
                return true;
            }

            return false;
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
        handleAnalyticChange(event) {
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
                this.formAnalytic.path = selectedFile;
            } else {
                this.$showToast(
                    "error",
                    "Error",
                    "Hanya file JPG, JPEG, PNG, PDF, DOC, dan DOCX yang diizinkan."
                );
                event.target.value = null;
            }
        },
        handleAppealChange(event) {
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
                this.formAppeal.path = selectedFile;
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
                if (item.name == "Detail SLIK") {
                    this.formDetailSlik.id = item.id;
                    this.formDetailSlik.name = item.name;
                    this.formDetailSlik.note = item.note;
                    this.formDetailSlik.isSecret = parseInt(item.isSecret);
                    this.formDetailSlik.isApprove = parseInt(item.isApprove);

                    this.isFormDetailSlik = true;
                } else if (item.name == "Resume SLIK") {
                    this.formDetailSlik.id = item.id;
                    this.formDetailSlik.name = item.name;
                    this.formDetailSlik.note = item.note;
                    this.formDetailSlik.isSecret = parseInt(item.isSecret);
                    this.formDetailSlik.isApprove = parseInt(item.isApprove);

                    this.isFormResumeSlik = true;
                } else {
                    this.formDetailSlik.id = item.id;
                    this.formDetailSlik.name = item.name;
                    this.formDetailSlik.note = item.note;
                    this.formDetailSlik.isSecret = parseInt(item.isSecret);
                    this.formDetailSlik.isApprove = parseInt(item.isApprove);

                    this.isFormResumeSlik = true;
                }
            } else if (type == 2) {
                this.isAnalytic = true;
            } else if (type == 3) {
                this.isAppeal = true;
            }
        },
        closeModal(type) {
            if (type == 1) {
                this.formDetailSlik.id = null;
                this.formDetailSlik.name = null;
                this.formDetailSlik.path = null;
                this.formDetailSlik.link = null;
                this.formDetailSlik.isSecret = 0;
                this.formDetailSlik.isApprove = 0;
                this.selectedOption = "";
                this.isFormDetailSlik = false;
                this.uploadProgress=null;
            } else if (type == 2) {
                this.formDetailSlik.id = null;
                this.formDetailSlik.name = null;
                this.formDetailSlik.path = null;
                this.formDetailSlik.link = null;
                this.formDetailSlik.isSecret = 0;
                this.formDetailSlik.isApprove = 0;
                this.selectedOption = "";
                this.isFormResumeSlik = false;
                this.uploadProgress=null;
            } else if (type == 3) {
                this.formAnalytic.id = null;
                this.formAnalytic.isSecret = 0;
                this.formAnalytic.isApprove = 0;
                this.formAnalytic.path = null;
                this.formAnalytic.link = null;
                this.selectedOption = "";
                this.isAnalytic = false;
                this.uploadProgress=null;
            } else if (type == 4) {
                this.uploadProgress=null;
                this.formAppeal.id = null;
                this.formAppeal.isSecret = 0;
                this.formAppeal.isApprove = 0;
                this.formAppeal.link = null;
                this.selectedOption = "";
                this.formAppeal.path = null;
                this.isAppeal = false;
            }
        },
        async insertSlik() {
            try {
                this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.formDetailSlik.name);
                if (this.formDetailSlik.note != null) {
                    formData.append("note", this.formDetailSlik.note);
                }

                if (this.formDetailSlik.path != null) {
                    formData.append("path", this.formDetailSlik.path);
                } else if (this.formDetailSlik.link != null) {
                    formData.append("link", this.formDetailSlik.link);
                }
                formData.append("isSecret", this.formDetailSlik.isSecret);
                formData.append("isApprove", this.formDetailSlik.isApprove);
                formData.append("file_id", this.formDetailSlik.file_id);
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
                    `/edit-attach/${this.formDetailSlik.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.overlay = false;
                    this.closeModal(1);
                    this.closeModal(2);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.overlay = false;
                    this.closeModal(1);
                    this.closeModal(2);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.overlay = false;
                this.closeModal(1);
                this.closeModal(2);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
        async insertAnalytic() {
            try {
                this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.formAnalytic.name);
                formData.append("note", this.formAnalytic.note);
                if (this.formAnalytic.path != 'null') {
                    formData.append("path", this.formAnalytic.path);
                } else
                    if (this.formAnalytic.link != null) {
                        formData.append("link", this.formAnalytic.link);
                    }
                formData.append("phase", this.formAnalytic.phase);
                formData.append("isSecret", this.formAnalytic.isSecret);
                formData.append("file_id", this.formAnalytic.file_id);
                formData.append("isApprove", this.formAnalytic.isApprove);
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
                    `/edit-attach/${this.formAnalytic.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.overlay = false;
                    this.closeModal(3);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.overlay = false;
                    this.closeModal(3);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.closeModal(3);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
        async insertAppeal() {
            try {
                this.overlay = true;
                const formData = new FormData();
                formData.append("name", this.formAppeal.name);
                formData.append("note", this.formAppeal.note);
                if (this.formAppeal.path != null) {
                    formData.append("path", this.formAppeal.path);
                } else if (this.formAppeal.link != null) {
                    formData.append("link", this.formAppeal.link);
                }
                formData.append("phase", this.formAppeal.phase);
                formData.append("isSecret", this.formAppeal.isSecret);
                formData.append("file_id", this.formAppeal.file_id);
                formData.append("isApprove", this.formAppeal.isApprove);
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
                    `/edit-attach/${this.formAppeal.id}`,
                    formData,
                    config
                );
                if (response.status === 200) {
                    this.overlay = false;
                    this.closeModal(4);
                    this.getDetailFile(this.fileId);
                    this.uploadProgress = null;
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.overlay = false;
                    this.closeModal(4);
                    this.uploadProgress = null;
                    this.getDetailFile(this.fileId);
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.overlay = false;
                this.closeModal(4);
                this.getDetailFile(this.fileId);
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
    },
};
</script>
