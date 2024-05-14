<template>
  <div>
    <!-- <v-overlay
      :absolute="true"
      v-model="overlay"
      contained
      persistent
      class="align-center justify-center"
    >
      <v-col>
        <v-progress-circular color="primary" size="32" indeterminate>
        </v-progress-circular>
        <br />
        <span class="font-weight-bold text-lg">Loading....</span>
      </v-col>
    </v-overlay> -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
      Loading...
    </v-overlay>

    <v-card>
      <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
        Credit
      </VCardTitle>
      <v-card-text>
        <v-stepper :model-value="stepperModel" :mobile="isMobile">
          <v-stepper-header v-if="parseInt(dataFile.plafon) > 25000000">
            <v-stepper-item title="Phase 1" value="1" :complete="dataFile.phase > 1">
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 2" value="2" :complete="dataFile.phase > 2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 3" value="3" :complete="dataFile.phase > 3"></v-stepper-item>

            <v-divider v-if="isShowPhase4"></v-divider>

            <v-stepper-item title="Phase 4" value="4" :complete="dataFile.phase > 4"
              v-if="isShowPhase4"></v-stepper-item>

            <!-- khusus approved -->
            <v-divider v-if="isShowPhase5"></v-divider>

            <v-stepper-item title="Approved" value="5" v-if="isShowPhase5"></v-stepper-item>
          </v-stepper-header>
          <v-stepper-header v-else>
            <v-stepper-item title="Phase 1" value="1" :complete="dataFile.phase > 1">
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 2" value="2" :complete="dataFile.phase > 2"></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item title="Phase 3" value="3" :complete="dataFile.phase > 3"></v-stepper-item>

            <!-- khusus approved -->
            <v-divider v-if="isShowPhase5"></v-divider>

            <v-stepper-item title="Approved" value="5" v-if="isShowPhase5"></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <!-- step 1 -->
            <v-stepper-window-item value="1" v-if="userData && userData.position.role.isPhase1Access == 1">
              <phase :dataFile="dataFile" :userData="userData" :insert-note="insertNote"
                :change-approval="changeApproval" :format-date="formatDate" :open-modal="openModal"
                :delete-attachment="deleteAttachment" :delete-note="deleteNote" :get-detail-file="getDetailFile"
                :step="step" :file-id="formatFileId(fileId)" :user-access="userAccess" :reset-note="resetNote"
                :data-note="dataNote" :update-data-note="updateDataNote" :note-phase1="notePhase1"
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote" />
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
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote" />
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
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote" />
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
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote" />
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
                :note-phase2="notePhase2" :note-phase3="notePhase3" :note-phase4="notePhase4" :modal-note="modalNote" />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-card-text>
    </v-card>

    <v-dialog v-model="insertAttch" width="auto" persistent transition="dialog-top-transition">
      <v-card>
        <template v-slot:title> Tambah Data </template>

        <template v-slot:text>
          <v-form @submit.prevent="insertAttachment">
            <v-row>
              <VCol md="12" cols="12">
                <span style="color: red">*</span><span class="subtitle-1 text-center">Keterangan File: </span>

                <VTextField class="my-3" v-model="attachFile.name" autofocus :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <v-file-input class="my-3" accept="image/jpeg,image/png" placeholder="Pick an image"
                  :rules="[rules.required]" @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataFile.phase == 2">
                <v-select label="Apakah Termasuk File Rahasia ? (SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit" :disabled="(attachFile.name && attachFile.path) == null">
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

                <VTextField class="my-3" v-model="attachFile.name" autofocus :rules="[rules.required]" />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"> Upload File: </span>

                <v-file-input class="my-3" accept="image/jpeg,image/png" placeholder="Pick an image"
                  :rules="[rules.required]" @change="(event) => handleFileChange(event)"></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataFile.phase == 2">
                <v-select label="Apakah Termasuk File Rahasia ? (SLIK, dll)" :items="[
                  { value: 1, title: 'Ya' },
                  { value: 0, title: 'Tidak' },
                ]" v-model="attachFile.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
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

    <!-- <v-dialog v-model="isModalPhase" width="auto">
      <v-card>
        <template v-slot:title> Catatan </template>
        <template v-slot:text>
          <v-card>
            <template v-slot:title> Phase 1 </template>
          </v-card>
        </template>
      </v-card>
    </v-dialog> -->

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
              <v-chip color="success" v-if="item.approved == 1"> Disetujui </v-chip>
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
                ]" v-model="changeStatus.status"></v-select>
              </VCol>
              <VCol md="12" cols="12" v-if="changeStatus.status == 3">
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
        name: "",
        type_bussiness: "",
        desc_bussiness: "",
        plafon: "0",
      },

      dataFile: {
        id: null,
        user_id: null,
        phase: 1,
        name: "",
        type_bussiness: "",
        desc_bussiness: "",
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
        name: null,
        path: null,
        note: null,
        isSecret: 0,
      },
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

        if (this.changeStatus.status == '3') {
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
          const confirmNext = window.confirm(
            `Apakah Anda yakin melanjutkan ke tahap selanjutnya`
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
          this.userAccess = response.data.data.userAccess;


          this.dataFile.phase = parseInt(this.dataFile.phase);
          this.isShowPhase4 =
            parseInt(this.dataFile.plafon) < 25000000 ? false : true;

          if (this.dataFile.phase == 5) {
            this.isShowPhase5 = true;
          }

          if (parseInt(this.dataFile.plafon) > 25000000) {
            if (parseInt(this.dataFile.phase) == 5) {
              this.stepperModel = parseInt(this.dataFile.phase) - 1;
            } else {
              this.stepperModel = parseInt(this.dataFile.phase) - 1;
            }
          } else {
            if (parseInt(this.dataFile.phase) == 5) {
              this.stepperModel = parseInt(this.dataFile.phase) - 2;
            } else {
              this.stepperModel = parseInt(this.dataFile.phase) - 1;
            }
          }
          this.generalInfo.id = this.dataFile.id;
          this.generalInfo.name = this.dataFile.name;
          this.generalInfo.type_bussiness = this.dataFile.type_bussiness;
          this.generalInfo.desc_bussiness = this.dataFile.desc_bussiness;
          this.generalInfo.plafon = this.dataFile.plafon;

          for (let index = 0; index < 5; index++) {
            this.separateNotesByPhase(this.dataFile, index);
          }

          this.overlay = false;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
          this.overlay = false;
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
        this.overlay = false;
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
          this.$showToast("success", "Berhasil", response.data.message);
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
      console.log(this.isModalPhase);
    },

    //=>approval section
    async changeApproval(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/change-phase-approve/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
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
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.attachFile.path = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPG, JPEG, dan PNG yang diizinkan."
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
        isSecret: false,
      };
    },
    async insertAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("name", this.attachFile.name);
        formData.append("path", this.attachFile.path);
        if (this.dataFile.phase == 2) {
          formData.append("isSecret", this.attachFile.isSecret);
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
        if (this.attachFile.path != null) {
          formData.append("path", this.attachFile.path);
        }
        if (this.dataFile.phase == 2) {
          formData.append("isSecret", this.attachFile.isSecret);
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
        this.overlay = true;
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data? Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/delete-attach/${id}`);

        if (response.status === 200) {
          this.overlay = false;
          this.getDetailFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
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
