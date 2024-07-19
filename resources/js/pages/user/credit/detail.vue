<template>
  <div>
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
      Loading...
    </v-overlay>

    <v-card v-if="dataLoaded">
      <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
        Detail Kredit
      </VCardTitle>
      <v-card-text>
        <v-stepper :model-value="stepperModel" :mobile="isMobile">
          <v-stepper-header>
            <v-stepper-item title="Phase 1 (Pooling)" value="1" :complete="stepperModel > 1">
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 2 (SLIK)" value="2" :complete="stepperModel > 2"></v-stepper-item>

            <v-divider></v-divider>
            <v-stepper-item title="Phase 3 (Survei)" value="3" :complete="stepperModel > 3"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 4 (Komite)" value="4" :complete="stepperModel > 4"></v-stepper-item>

            <!-- khusus operation -->
            <v-divider></v-divider>

            <v-stepper-item title="Operation" value="5" :complete="stepperModel > 5"></v-stepper-item>
            <!-- khusus approved -->
            <v-divider></v-divider>

            <v-stepper-item title="Pencairan" value="6" :complete="stepperModel > 6"></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <!-- step 1 -->
            <v-stepper-window-item value="1" v-if="userData && userData.position.role.isPhase1Access == 1">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
            <v-stepper-window-item value="1" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <!-- step 2 -->
            <v-stepper-window-item value="2" v-if="userData && userData.position.role.isPhase2Access == 1">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
            <v-stepper-window-item value="2" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <!-- step 3 -->
            <v-stepper-window-item value="3" v-if="userData && userData.position.role.isPhase3Access == 1">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
            <v-stepper-window-item value="3" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <!-- step 4 -->
            <v-stepper-window-item value="4" v-if="userData && userData.position.role.isPhase4Access == 1">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
            <v-stepper-window-item value="4" v-else>
              <div style="
                  color: red;
                  font-size: 20px;
                  text-align: center;
                  padding: 10px;
                ">
                Anda Dilarang melihat Phase ini
              </div>
            </v-stepper-window-item>

            <v-stepper-window-item value="5">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
            <v-stepper-window-item value="6">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote"
                :phase1Attachments="dataAttachPhase1" :phase2Attachments="dataAttachPhase2"
                :phase3Attachments="dataAttachPhase3" :phase4Attachments="dataAttachPhase4"
                :phase5Attachments="dataAttachPhase5" :submissions="fileSubmissions" />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-card-text>
    </v-card>

    <v-card v-else>
      <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
        Mempersiapkan data.....
      </VCardTitle>
    </v-card>

    <v-dialog v-model="insertAttch" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Tambah Data </template>

        <template v-slot:text>
          <v-form @submit.prevent="insertAttachment">
            <v-row>
              <VCol md="12" cols="12">
                <v-select label="Pilih Keterangan File" :items="nameFileList" autofocus v-model="attachFile.name"
                  prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Note: </span>
                <VTextField class="my-3" v-model="attachFile.note" :rules="[rules.required]" />
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
                  @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="selectedOption === 'link'">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <VTextField class="my-3" v-model="attachFile.link" autofocus :rules="[rules.required]" />
              </VCol>

              <VCol md="12" cols="12" v-if="dataFile.phase >= 2">
                <v-select label="Apakah Termasuk File Rahasia ? (Detail SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol md="12" cols="12">
                <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                  { value: 1, title: 'Setuju' },
                  { value: 0, title: 'Tidak Setuju' },
                ]" v-model="attachFile.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"
                  :disabled="!(attachFile.name && (attachFile.path || attachFile.link) && attachFile.note !== null)">
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

    <v-dialog v-model="updateAttch" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Edit Data </template>

        <template v-slot:text>
          <v-form @submit.prevent="editAttachment">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center">Keterangan File: </span>

                <VTextField class="my-3" v-model="attachFile.name" autofocus :rules="[rules.required]" disabled />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <v-file-input class="my-3"
                  accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  placeholder="Pick an image" :rules="[rules.required]"
                  @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataFile.phase == 2">
                <v-select label="Apakah Termasuk File Rahasia ? (SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol md="12" cols="12">
                <v-select label="Apakah Anda menyetujui file ini ?" :items="[
                  { value: 1, title: 'Setuju' },
                  { value: 0, title: 'Tidak Setuju' },
                ]" v-model="attachFile.isApprove" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"> Update </VBtn>
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

    <v-dialog v-model="isUpdateGeneralInfo" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Edit Informasi Umum </template>

        <template v-slot:text>
          <v-form @submit.prevent="updateGeneralInfo">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Nama Pemohon: </span>

                <VTextField class="my-3" v-model="generalInfo.name" autofocus :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Jumlah Plafon: </span>

                <VTextField class="my-3" v-model="generalInfo.plafon" type="text" @input="formatInputPlafon" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Jenis Usaha: </span>

                <VTextField class="my-3" v-model="generalInfo.type_bussiness" :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Deskripsi Usaha: </span>

                <VTextField class="my-3" v-model="generalInfo.desc_bussiness" :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih sumber order: </span>
                <v-select :items="orderList" v-model="generalInfo.order_source"
                  prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Pilih status kredit: </span>
                <v-select :items="statusCreditList" v-model="generalInfo.status_kredit"
                  prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">NIK Pemohon: </span>

                <VTextField type="number" class="my-3" v-model="generalInfo.nik_pemohon" :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Alamat Pemohon: </span>

                <VTextField class="my-3" v-model="generalInfo.address" :rules="[rules.required]" />
              </VCol>

              <VCol md="12" cols="12">
                <span class="subtitle-1 text-center">NIK Pasangan (kosongkan jika tidak ada): </span>

                <VTextField type="number" class="my-3" v-model="generalInfo.nik_pasangan" hint="kosongkan jika tidak ada" />
              </VCol>

              <VCol md="12" cols="12">
                <span class="subtitle-1 text-center">NIK Pemilik Jaminan (kosongkan jika tidak ada): </span>

                <VTextField type="number" class="my-3" v-model="generalInfo.nik_jaminan" hint="kosongkan jika tidak ada" />
              </VCol>

              <VCol md="12" cols="12">
                <span class="subtitle-1 text-center">No. HP: </span>

                <VTextField class="my-3" v-model="generalInfo.no_hp" :rules="[rules.required]" />
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"> Update </VBtn>
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

    <v-dialog v-model="isUpdateNote" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Update Note </template>
        <template v-slot:text>
          <VForm @submit.prevent="updateNote">
            <v-row align="center" justify="center">
              <VCol md="10" cols="10">
                <v-textarea bg-color="grey-lighten-2" color="cyan" v-model="updateDataNote.note" rows="2"></v-textarea>
              </VCol>
              <VCol md="2" cols="2">
                <v-btn density="compact" icon="mdi-note-plus" type="submit"></v-btn>
              </VCol>
            </v-row>
          </VForm>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDataPhase3" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Hasil Survey </template>
        <template v-slot:text>
          <VForm @submit.prevent="updatePhase3">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Hasil Survei: </span>
                <v-textarea bg-color="grey-lighten-2" color="cyan" v-model="dataPhase3.surveyResult"
                  rows="3"></v-textarea>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <v-btn type="submit">Update</v-btn>

                <button type="button" class="btn btn-blue" @click="closeModal(5)">
                  Batal
                </button>
              </VCol>
            </v-row>
          </VForm>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isShowTimers" width="auto" transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Data Waktu </template>
        <template v-slot:text>
          <EasyDataTable :headers="timerHeaders" :items="dataFile.phase_times">
            <template #item-timeDiff="item">{{
              calculateTimeDiff(item.startTime, item.endTime)
              }}</template>
          </EasyDataTable>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isShowAttachment" width="auto" transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Data Waktu </template>
        <template v-slot:text>
          <EasyDataTable :headers="attachmentHeaders" :items="attachments">
          </EasyDataTable>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isShowHistory" width="auto" transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Data Riwayat </template>
        <template v-slot:text>
          <EasyDataTable show-index :headers="historyHeaders" :items="dataFile.file_activities">
            <template #item-created_at="item">
              {{ formatDate(item.created_at) }}
            </template>
          </EasyDataTable>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isShowApprovals" width="auto" transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Riwayat Persetujuan </template>
        <template v-slot:text>
          <EasyDataTable :headers="approvalHeaders" :items="dataFile.approvals">
            <template #item-approved="item">
              <v-chip color="success" v-if="parseInt(item.approved) == 1"> Disetujui </v-chip>
              <v-chip color="error" v-else> Belum disetujui </v-chip>
            </template>
            <template #item-created_at="item">
              {{ formatDate(item.created_at) }}
            </template>
          </EasyDataTable>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isChangeStatusCredit" width="auto" transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Ubah Status File </template>
        <template v-slot:text>
          <v-form @submit.prevent="updateStatusCredit">
            <v-row>
              <VCol md="12" cols="12">
                <v-select label="Ubah Status File" :items="[
                  { value: 1, title: 'Approved' },
                  { value: 2, title: 'Pending' },
                  { value: 3, title: 'Rejected' },
                  { value: 4, title: 'Cancel by Debitur' },
                ]" v-model="changeStatus.status"></v-select>
              </VCol>
              <VCol md="12" cols="12" v-if="changeStatus.status == 3 || changeStatus.status == 4">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Alasan: </span>
                <v-textarea bg-color="grey-lighten-2" color="cyan" v-model="changeStatus.reasonRejected"
                  rows="2"></v-textarea>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit">
                  Simpan
                </VBtn>

                <button type="button" class="btn btn-blue" @click="closeModal(9)">
                  Batal
                </button>
              </VCol>
            </v-row>
          </v-form>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import mainURL from "@/axios";
import phase from "./components/phase.vue";

export default {
  components: { phase },
  data() {
    return {
      dataLoaded: false,
      selectedOption: "",
      overlay: false,
      isMobile: false,
      userData: null,
      userAccess: {},
      fileId: this.$route.params.fileId,
      isShowPhase4: false,
      isShowPhase5: false,
      isShowTimers: false,
      isShowHistory: false,
      isShowApprovals: false,
      isChangeStatusCredit: false,
      isShowAttachment: false,

      statusCreditList :[
        { value: 'FRESH', title: 'FRESH' },
        { value: 'REPEAT ORDER', title: 'REPEAT ORDER' },
        { value: 'TOPUP', title: 'TOPUP' },
      ],

      //=>list nama File
      nameFileList: [
        { value: 'KTP Pemohon', title: 'KTP Pemohon' },
        { value: 'Kartu Keluarga', title: 'Kartu Keluarga' },
        { value: 'Jaminan SHM', title: 'Jaminan SHM' },
        { value: 'Foto Kunjungan', title: 'Foto Kunjungan' },
        { value: 'Foto WhatsApp', title: 'Foto WhatsApp' },
        { value: 'Buku Nikah', title: 'Buku Nikah' },
        { value: 'SHM', title: 'Jaminan SHM' },
        { value: 'BPKB', title: 'Jaminan BPKB' },
        // { value: 'Mesin', title: 'Jaminan Mesin Produksi' },
        { value: 'KTP Pasangan', title: 'KTP Pasangan' },
        { value: 'KTP Atas Nama Jaminan', title: 'KTP Atas Nama Jaminan' },
        { value: 'Resume SLIK', title: 'Resume SLIK' },
        { value: 'Detail SLIK', title: 'Detail SLIK' },
        { value: 'Detail SLIK Pasangan', title: 'Detail SLIK Pasangan' },
        { value: 'Detail SLIK Atas Nama jaminan', title: 'Detail SLIK Atas Nama jaminan' },
        { value: 'File Banding', title: 'File Banding' },
        { value: 'Analisa Awal Kredit AO', title: 'Analisa Awal Kredit AO' },
        { value: 'Analisa Kredit', title: 'Analisa Kredit' },
        { value: 'Lembar Pengesahan', title: 'Lembar Pengesahan' },
        { value: 'Rekomendasi Kepatuhan', title: 'Rekomendasi Kepatuhan' },
        { value: 'SP3K', title: 'SP3K' },
        { value: 'Notaris', title: 'Notaris' },
        { value: 'Lain-lain', title: 'Lain-lain' },
      ],

      //=>paksa langsung ganti status kredit
      changeStatus: {
        id: null,
        status: null,
        reasonRejected: null,
      },

      stepperModel: 0,

      isUpdateGeneralInfo: false,
      generalInfo: {
        id: null,
        name: null,
        type_bussiness: null,
        desc_bussiness: null,
        order_source: null,
        status_kredit: null,
        plafon: null,
        nik_pemohon: null,
        nik_pasangan: null,
        nik_jaminan: null,
        address: null,
        no_hp: null,
      },

      dataFile: {
        id: this.$route.params.fileId,
        user_id: null,
        phase: 1,
        name: "",
        type_bussiness: "",
        desc_bussiness: "",
        order_source: "",
        status_kredit: "",
        nik_pemohon: null,
        nik_pasangan: null,
        nik_jaminan: null,
        address: null,
        no_hp: null,
        plafon: "0",
        surveyResult: "-",
        otsResult: "-",
        cekLingResult: "-",
        verTelResult: "-",
        creditScoring: "-",
        attachments: [],
        notes: [],
        approvals: [],
        phase_times: [],
        file_activities: [],
        reasonRejected: "",
      },
      filePath: this.$filePath,

      //=>timers header
      timerHeaders: [
        { text: "Phase", value: "phase", sortable: true },
        { text: "Waktu Mulai", value: "startTime", sortable: true },
        { text: "Waktu Selesai", value: "endTime", sortable: true },
        { text: "Rentang Waktu", value: "timeDiff", sortable: true },
      ],

      //=>attachment header
      attachmentHeaders: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Phase", value: "phase", sortable: true },
        { text: "Waktu", value: "startTime", sortable: true },
      ],

      //=history
      historyHeaders: [
        { text: "User", value: "user.name", sortable: true },
        { text: "Aktivitas", value: "activity", sortable: true },
        { text: "Tanggal", value: "created_at", sortable: true },
      ],
      //=approval
      approvalHeaders: [
        { text: "Phase", value: "phase", sortable: true },
        { text: "Nama", value: "user.name", sortable: true },
        { text: "Status", value: "approved", sortable: true },
        { text: "Tanggal", value: "created_at", sortable: true },
      ],

      //=>note
      isUpdateNote: false,
      dataNote: {
        file_id: this.$route.params.fileId,
        note: null,
        isRead: null,
      },
      updateDataNote: {
        file_id: this.$route.params.fileId,
        note: null,
        isRead: null,
      },
      phaseNote: [],
      notesByPhase: {},
      isModalPhase: false,

      //=>attachment
      insertAttch: false,
      updateAttch: false,
      rules: {
        required: (value) => !!value || "Required",
      },
      uploadProgress: null,
      attachFile: {
        id: null,
        file_id: this.$route.params.fileId,
        phase: null,
        name: null,
        path: null,
        note: null,
        link: null,
        isSecret: 0,
        isApprove: 1,
      },
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
      notePhase1: [],
      notePhase2: [],
      notePhase3: [],
      notePhase4: [],

      //=>pagination note
      currentPage: 1,
      itemsPerPage: 10,

      //=>khusus attachment
      isDataPhase3: false,
      dataPhase3: {
        surveyResult: "",
      },

      attachments: [],
      fileSubmissions: [],
      //=> data attachment phase 
      dataAttachPhase1: [],
      dataAttachPhase2: [],
      dataAttachPhase3: [],
      dataAttachPhase4: [],
      dataAttachPhase5: [],
    };
  },
  computed: {
    paginatedNotes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataFile.notes.slice(startIndex, endIndex);
    },
  },
  methods: {
    async updateStatusCredit() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("id", this.fileId);
        formData.append("status", this.changeStatus.status);

        if (this.changeStatus.status == '3' || this.changeStatus.status == '4') {
          if (this.changeStatus.reasonRejected == null) {
            this.overlay = false;
            this.closeModal(9);
            this.$showToast("error", "Sorry", "Alasan Penolakan wajib diisi");
            return; // Tambahkan return di sini untuk menghentikan eksekusi
          }
          formData.append("reasonRejected", this.changeStatus.reasonRejected);
        }

        const response = await mainURL.post(`/user/change-status`, formData);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isDataPhase3 = false;
          this.closeModal(9);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isDataPhase3 = false;
          this.closeModal(9);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.closeModal(9);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    calculateTimeDiff(startTime: any, endTime: any) {
      let start = new Date(startTime);
      let end = endTime ? new Date(endTime) : new Date();
      let diffInMs = end.valueOf() - start.valueOf();
      let diffInMinutes = Math.floor(diffInMs / 1000 / 60);

      // Menghitung jumlah jam dan menit
      let hours = Math.floor(diffInMinutes / 60);
      let minutes = diffInMinutes % 60;

      return `${hours} jam ${minutes} menit`;
    },
    formatFileId(fileId: any) {
      if (Array.isArray(fileId)) {
        // Convert array of strings to a single string, or choose one string from the array
        return fileId.join(", ");
      }
      // If fileId is already a string, return it as is
      return fileId;
    },

    //=>phase3
    async updatePhase3() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("surveyResult", this.dataPhase3.surveyResult);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/user/survey-credit/${this.fileId}`,
          formData
        );
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isDataPhase3 = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isDataPhase3 = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    //=>pagination
    onPageChange(page) {
      this.currentPage = page;
    },
    formatInputPlafon(event: { target: { value: any } }) {
      let value = event.target.value;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      event.target.value = value;
    },
    formatDate(dateString: any) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    resetNote() {
      this.dataNote = {
        file_id: this.$route.params.fileId,
        user_id: null,
        phase: null,
        note: null,
        isRead: null,
      };
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 728 ? true : false;
    },
    formatInput(value: string) {
      // Lakukan pemformatan nilai plafon di sini
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
    async step(id: any, type: any) {
      try {
        if (type == "next") {

          if (this.dataFile.phase === 3 && this.fileSubmissions.length === 0) {
            const confirmNext = window.confirm(
              `Tidak ada file Pendukung yang diajukan. Apakah Anda yakin melanjutkan ke tahap selanjutnya?`
            );
            if (!confirmNext) return;
          } else {
            const confirmNext = window.confirm(
              `Apakah Anda yakin melanjutkan ke tahap selanjutnya`
            );
            if (!confirmNext) return;
          }

          this.overlay = true;
          const formData = new FormData();
          formData.append("id", id);
          formData.append("type", type);
          formData.append("_method", "POST");

          const response = await mainURL.post(
            "/user/change-phase-approve",
            formData
          );
          if (response.status === 200) {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("error", "Sorry", response.data.data.message);
          }
        } else {
          const confirmNext = window.confirm(
            `Apakah Anda yakin Kembali ke phase sebelumnya`
          );
          if (!confirmNext) return;
          this.overlay = true;
          const formData = new FormData();
          formData.append("id", id);
          formData.append("type", type);
          formData.append("_method", "POST");
          const response = await mainURL.post(
            "/user/change-phase-approve",
            formData
          );
          if (response.status === 200) {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.overlay = false;
            this.getDetailFile(this.fileId);
            this.$showToast("error", "Sorry", response.data.message);
          }
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    async getDetailFile(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/credit/${id}`);

        if (response.status === 200) {                
          this.dataFile = response.data.data.file;
          this.attachments = this.dataFile.attachments.filter(item => item.path && item.path !== 'null' || item.link && item.link !== 'null');
          this.fileSubmissions = this.dataFile.filesubmissions;

          this.userAccess = response.data.data.userAccess;

          //attach
          this.dataAttachPhase1 = response.data.data.file.attachments.filter(
            (item: { phase: number }) => item.phase == 1
          )
          this.dataAttachPhase2 = response.data.data.file.attachments.filter(
            (item: { phase: number }) => item.phase == 2
          )

          this.dataAttachPhase3 = response.data.data.file.attachments.filter(
            (item: { phase: number }) => item.phase == 3
          )
          this.dataAttachPhase4 = response.data.data.file.attachments.filter(
            (item: { phase: number }) => item.phase == 4
          )

          this.dataAttachPhase5 = response.data.data.file.attachments.filter(
            (item: { phase: number }) => item.phase == 5
          )

          this.dataFile.phase = parseInt(this.dataFile.phase);
          this.isShowPhase4 =
            parseInt(this.dataFile.plafon) < 25000000 ? false : true;

          if (this.dataFile.phase == 5) {
            this.isShowPhase5 = true;
          }

          if (parseInt(this.dataFile.phase) == 5) {
            this.stepperModel = parseInt(this.dataFile.phase) - 1;
          } else {
            this.stepperModel = parseInt(this.dataFile.phase) - 1;
          }

          this.generalInfo.id = this.dataFile.id;
          this.generalInfo.name = this.dataFile.name;
          this.generalInfo.type_bussiness = this.dataFile.type_bussiness;
          this.generalInfo.desc_bussiness = this.dataFile.desc_bussiness;
          this.generalInfo.order_source = this.dataFile.order_source;
          this.generalInfo.status_kredit = this.dataFile.status_kredit;
          this.generalInfo.plafon = this.dataFile.plafon;
          this.generalInfo.nik_pemohon = this.dataFile.nik_pemohon;
          this.generalInfo.nik_pasangan = this.dataFile.nik_pasangan;
          this.generalInfo.nik_jaminan = this.dataFile.nik_jaminan;
          this.generalInfo.address = this.dataFile.address;
          this.generalInfo.no_hp = this.dataFile.no_hp;

          for (let index = 0; index < 5; index++) {
            this.separateNotesByPhase(this.dataFile, index);
          }
          this.dataLoaded = true;
          this.overlay = false;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
          this.overlay = false;
        }
      } catch (error) {
        this.overlay = false;
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    getUserData() {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        this.userData = JSON.parse(savedUserData);
      }
    },
    openModal(type: number, item = null) {
      if (type == 1) {
        this.insertAttch = true;
      } else if (type == 2) {
        this.attachFile.id = item.id;
        this.attachFile.file_id = item.file_id;
        this.attachFile.name = item.name;
        this.attachFile.isSecret = parseInt(item.isSecret);
        this.attachFile.isApprove = parseInt(item.isApprove);
        this.attachFile.link = item.link;
        this.updateAttch = true;
      } else if (type == 3) {
        this.updateDataNote.id = item.id;
        this.updateDataNote.file_id = item.file_id;
        this.updateDataNote.note = item.note;
        this.isUpdateNote = true;
      } else if (type == 4) {
        this.isUpdateGeneralInfo = true;
      } else if (type == 5) {
        this.dataPhase3.surveyResult = this.dataFile.surveyResult;
        this.isDataPhase3 = true;
      } else if (type == 6) {
        this.isShowTimers = true;
      } else if (type == 7) {
        this.isShowHistory = true;
      } else if (type == 8) {
        this.isShowApprovals = true;
      } else if (type == 9) {
        this.isChangeStatusCredit = true;
      } else if (type == 10) {
        this.isShowAttachment = true;
      }
    },
    closeModal(type: number) {
      if (type === 1) {
        this.resetAttch();
        this.insertAttch = false;
      } else if (type === 2) {
        this.updateAttch = false;
      } else if (type === 3) {
        this.resetNote();
        this.updateNote = false;
      } else if (type == 4) {
        this.isUpdateGeneralInfo = false;
      } else if (type == 5) {
        this.dataPhase3.surveyResult = "";
        this.isDataPhase3 = false;
      } else if (type == 9) {
        this.isChangeStatusCredit = false;
        this.changeStatus.id = null;
        this.changeStatus.status = null;
        this.changeStatus.reasonRejected = null;
      }
    },

    //=>edit general info
    async updateGeneralInfo() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("name", this.generalInfo.name);
        formData.append("plafon", this.generalInfo.plafon.replace(/\D/g, ""));
        formData.append("type_bussiness", this.generalInfo.type_bussiness);
        formData.append("desc_bussiness", this.generalInfo.desc_bussiness);
        formData.append("order_source", this.generalInfo.order_source);
        formData.append("status_kredit", this.generalInfo.status_kredit);
        if (this.generalInfo.nik_pemohon != "") {
          formData.append("nik_pemohon", this.generalInfo.nik_pemohon);
        }
        if (this.generalInfo.nik_pasangan != "" && this.generalInfo.nik_pasangan != null && this.generalInfo.nik_pasangan != 'null' && this.generalInfo.nik_pasangan != '-') {
          formData.append("nik_pasangan", this.generalInfo.nik_pasangan);
        }
        if (this.generalInfo.nik_jaminan != "" && this.generalInfo.nik_jaminan != null && this.generalInfo.nik_jaminan != 'null' && this.generalInfo.nik_jaminan != '-') {
          formData.append("nik_jaminan", this.generalInfo.nik_jaminan);
        }
        if (this.generalInfo.address != "") {
          formData.append("address", this.generalInfo.address);
        }
        if (this.generalInfo.no_hp != "") {
          formData.append("no_hp", this.generalInfo.no_hp);
        }
        formData.append("_method", "PUT");
        
        const response = await mainURL.post(
          `/user/edit-general-info/${this.generalInfo.id}`,
          formData
        );
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateGeneralInfo = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateGeneralInfo = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.isUpdateGeneralInfo = false;
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    //=>NOTE section
    async insertNote() {
      try {
        this.overlay = true;

        if (this.dataNote.note == null) {
          this.$showToast("error", "Sorry", "Note cannot be empty");
          this.overlay = false;
          return;
        }

        const formData = new FormData();
        formData.append("file_id", this.dataNote.file_id);
        formData.append("note", this.dataNote.note);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/note", formData);
        if (response.status === 200) {
          this.resetNote();
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.resetNote();
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.resetNote();
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateNote() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.updateDataNote.file_id);
        formData.append("note", this.updateDataNote.note);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/user/note/${this.updateDataNote.id}`,
          formData
        );
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateNote = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.isUpdateNote = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.isUpdateNote = false;
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteNote(id: any) {
      try {
        this.overlay = true;
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data? Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/note/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasill", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    separateNotesByPhase(data: any, phase: any) {
      data.notes.forEach((note: any) => {
        if (note.phase == phase) {
          switch (phase) {
            case 1:
              this.notePhase1.push(note);
              break;
            case 2:
              this.notePhase2.push(note);
              break;
            case 3:
              this.notePhase3.push(note);
              break;
            case 4:
              this.notePhase4.push(note);
              break;
            default:
              console.log("Invalid phase");
          }
        }
      });
    },
    modalNote() {
      this.isModalPhase = !this.isModalPhase;
    },

    //=>approval section
    async changeApproval(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/change-phase-approve/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasill", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////
    //Attachmen upload
    handleFileChange(event: { target: { files: any[]; value: null } }) {
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
        this.attachFile.path = selectedFile;
      } else {
        this.closeModal(1);
        this.closeModal(2);
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPG, JPEG, PNG, PDF, DOC, DOCX, XLS, dan XLSX yang diizinkan."
        );
        event.target.value = null;
      }
    },
    resetAttch() {
      this.attachFile = {
        id: null,
        file_id: this.$route.params.fileId,
        name: null,
        path: null,
        note: null,
        link: null,
        isSecret: false,
      };
    },
    async insertAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("phase", this.dataFile.phase);
        formData.append("name", this.attachFile.name);
        if (this.attachFile.path != null) {
          formData.append("path", this.attachFile.path);
        }
        if (this.attachFile.link != null) {
          formData.append("link", this.attachFile.link);
        }
        formData.append("note", this.attachFile.note);
        formData.append("isApprove", this.attachFile.isApprove);
        if (this.dataFile.phase >= 2) {
          if (this.attachFile.isSecret === false) {
            // Konversi nilai 0 menjadi string
            formData.append("isSecret", "0");
          } else {
            // Konversi nilai isSecret menjadi string jika dia merupakan angka
            formData.append("isSecret", String(this.attachFile.isSecret));
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

        const response = await mainURL.post(
          "/user/add-attach",
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
    async editAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("name", this.attachFile.name);
        formData.append("path", this.attachFile.path);
        formData.append("phase", this.dataFile.phase);
        formData.append("isApprove", this.attachFile.isApprove);
        if (this.attachFile.path != null) {
          formData.append("path", this.attachFile.path);
        }
        // if (this.dataFile.phase == 2) {
        formData.append("isSecret", this.attachFile.isSecret);
        // }
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
          `/user/edit-attach/${this.attachFile.id}`,
          formData,
          config
        );
        if (response.status === 200) {
          this.overlay = false;
          this.closeModal(2);
          this.getDetailFile(this.fileId);
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.closeModal(2);
          this.uploadProgress = null;
          this.getDetailFile(this.fileId);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(2);
        this.getDetailFile(this.fileId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteAttachment(id: any) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data ? Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        this.overlay = true;
        const response = await mainURL.delete(`/user/delete-attach/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          // this.$showToast("success", "Berhasill", response.data.message);
          this.$showToast("success", "Berhasill", response.data.message);
          // window.location.reload();
        } else {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          // this.$showToast("error", "Sorry", response.data.message);
          this.$showToast("error", "Sorry", "Terjadi Kesalahan Silahkan Coba Lagi");
          // window.location.reload();
        }

      } catch (error) {
        this.overlay = false;
        this.getDetailFile(this.fileId);
        // this.$showToast("error", "Sorry", error.response.data.message);
        this.$showToast("error", "Sorry", "Terjadi Kesalahan Silahkan Coba Lagi");
        // window.location.reload();
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////
  },
  mounted() {
    this.checkMobile();
    this.getUserData();
    this.getDetailFile(this.fileId);
  },
};
</script>

<style scoped>
.user-comment {
  background-color: #e6f7ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
}

.ellipsis-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.comment-content {
  position: relative;
}
</style>
