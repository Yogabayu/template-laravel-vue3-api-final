<template>
  <v-card color="backgroundCard" min-width="100%" class="v-card-custom">
    <!-- <v-card-title class="text-2xl font-weight-bold d-flex justify-center"
      v-if="!['Account Officer', 'AO', 'ao', 'account officer', 'Account Officer Executive', 'account officer executive', 'Account Officer / Executive AO', 'AO / RO'].includes(userData.position.name)">
      Detail
      <v-chip color="success" v-if="parseInt(dataFile.isApproved) == 1" @click="openModal(9)">Approved</v-chip>
      <v-chip color="warning" v-if="parseInt(dataFile.isApproved) == 2" @click="openModal(9)">Pending</v-chip>
      <v-chip color="error" v-if="parseInt(dataFile.isApproved) == 3" @click="openModal(9)">Rejected</v-chip>
    </v-card-title>
    <v-card-title class="text-2xl font-weight-bold d-flex justify-center" v-else>
      Detail
      <v-chip color="success" v-if="parseInt(dataFile.isApproved) == 1">Approved</v-chip>
      <v-chip color="warning" v-if="parseInt(dataFile.isApproved) == 2">Pending</v-chip>
      <v-chip color="error" v-if="parseInt(dataFile.isApproved) == 3">Rejected</v-chip>
    </v-card-title> -->
    <v-card-title class="text-2xl font-weight-bold d-flex flex-column align-center">
      <span>Detail</span>
      <v-chip :color="getStatusColor(dataFile.isApproved)" @click="!isAccountOfficer && openModal(9)"
        :class="{ 'mt-2': true, clickable: !isAccountOfficer }" small>
        {{ getStatusText(dataFile.isApproved) }}
      </v-chip>
    </v-card-title>

    <v-card-text class="text-2xl font-weight-bold d-flex flex-column align-center"
      v-if="dataFile && parseInt(dataFile.phase) == 6">
      <v-btn color="primary" @click="generateReport(fileId)" size="x-small">
        Generate Laporan
      </v-btn>
    </v-card-text>

    <v-card-text v-if="dataFile.reasonRejected != null">
      <v-alert type="error" border="left" class="mt-2 mb-0">
        <span>Alasan Ditolak : </span>
        <strong>{{ dataFile && dataFile.reasonRejected }}</strong>
      </v-alert>
    </v-card-text>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mb-5">
              <v-card-title>
                <v-row class="pa-2">
                  <span>Informasi Umum ℹ️</span>
                  <v-spacer></v-spacer>

                  <v-btn v-if="parseInt(dataFile.phase) < 5 &&
                    ((userAccessPhase1 && parseInt(userAccessPhase1.canUpdateData) == 1) ||
                      (userAccessNow && parseInt(userAccessNow.canUpdateData) == 1))
                  " color="primary" size="x-small" class="mt-2" @click="openModal(4)">
                    Edit Data
                  </v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-list density="compact" lines="two">
                  <v-list-item>
                    <v-list-item-title>
                      <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon>
                      Nama AO/RO
                    </v-list-item-title>
                    <v-list-item>
                      <strong> {{ dataFile.user.name }} </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon>
                      Nama Pemohon
                    </v-list-item-title>
                    <v-list-item>
                      <strong> {{ dataFile.name }} </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title> <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> NIK Pemohon </v-list-item-title>
                    <v-list-item>
                      <strong> {{ dataFile.nik_pemohon }} </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title> <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Alamat Pemohon </v-list-item-title>
                    <v-list-item>
                      <strong> {{ dataFile.address }} </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title> <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> No. HP Pemohon</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.no_hp }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Jumlah Plafon</v-list-item-title>
                    <v-list-item>
                      <strong> Rp {{ formatInput(dataFile.plafon) }} </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.nik_pasangan">
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> NIK Pasangan</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.nik_pasangan }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.nik_pasangan">
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Nama Pasangan</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.name_pasangan ?? "-" }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.nik_jaminan">
                    <v-list-item-title>
                      <v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> NIK atas nama Jaminan</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.nik_jaminan }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Jenis Usaha</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.type_bussiness }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Deskripsi Usaha</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.desc_bussiness }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.order_source">
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Sumber Order</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.order_source }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.status_kredit">
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Status Kredit</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.status_kredit }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                  <v-list-item v-if="dataFile.type">
                    <v-list-item-title><v-icon icon="mdi-arrow-right-drop-circle-outline" size="small">
                      </v-icon> Jenis Kredit</v-list-item-title>
                    <v-list-item>
                      <strong>
                        {{ dataFile.type == 1 ? "Reguler" : "Restruktur" }}
                      </strong>
                    </v-list-item>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>
                <v-row class="pa-2 mb-1">
                  <span>Dokumen Pendukung 📄</span>
                  <v-spacer></v-spacer>
                  <!-- <v-btn v-if="parseInt(dataFile.phase) < 5 && (userAccessNow && parseInt(userAccessNow.canInsertData) == 1)" color="primary" size="x-small" class="mt-2" @click="openModal(1)">
                    Tambah Data Lain
                  </v-btn> -->
                  <v-btn color="primary" size="x-small" class="mt-2" @click="openModal(1)">
                    Tambah Data Lain
                  </v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                <div class="mb-5">
                  <AttachmentCard1 :data="phase1Attachments" :fileId="parseInt(dataFile.id)" :filePath="filePath"
                    :userAccess="userAccess" :deleteAttachment="deleteAttachment" :openModal="openModal"
                    :phase="parseInt(dataFile.phase)"></AttachmentCard1>
                </div>
                <div class="mb-5">
                  <AttachmentCard2 v-if="parseInt(dataFile.phase) > 1" :data="phase2Attachments"
                    :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
                    :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile"
                    :phase="parseInt(dataFile.phase)">
                  </AttachmentCard2>
                </div>
                <div class="mb-5">
                  <attachmentCard3 v-if="parseInt(dataFile.phase) > 2" :data="phase3Attachments"
                    :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
                    :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile" :submission="submissions"
                    :phase="parseInt(dataFile.phase)">
                  </attachmentCard3>
                </div>
                <div class="mb-5">
                  <attachmentCard4 v-if="parseInt(dataFile.phase) > 3" :data="phase4Attachments"
                    :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
                    :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile"
                    :phase="parseInt(dataFile.phase)">
                  </attachmentCard4>
                </div>
                <div class="mb-5">
                  <attachmentOperation v-if="parseInt(dataFile.phase) > 4" :data="phase5Attachments"
                    :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
                    :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile"
                    :phase="parseInt(dataFile.phase)">
                  </attachmentOperation>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!-- Approval -->
    <v-card-text class="pa-4" v-if="dataFile && parseInt(dataFile.phase) < 6">
      <v-card>
        <v-card-text class="d-flex justify-center text-center pa-3 font-weight-bold"
          v-if="dataFile && (parseInt(dataFile.phase) === 2 || parseInt(dataFile.phase) === 3)">
          Status Approval Phase ✅ (khusus SLIK dan Survei hanya perlu 1 approval)
        </v-card-text>
        <v-card-text class="d-flex justify-center text-center pa-3 font-weight-bold" v-else>
          Status Approval Phase ✅
        </v-card-text>
        <v-card-text class="pa-3">
          <div class="d-flex flex-wrap justify-center">
            <template v-for="(app, index) in dataFile.approvals" :key="index">
              <v-chip v-if="dataFile.phase == app.phase" class="ma-2 pa-2"
                :color="app.approved == 1 ? 'success' : 'error'" @click="changeApproval(app.id)">
                <span class="chip-text">
                  {{ app.user.name }} - {{ app.user.position.name }}
                </span>
              </v-chip>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- others -->
    <v-card-text>
      <v-card outlined class="p-2">
        <v-card-title class="d-flex justify-center">
          Lain - lain 🔹
        </v-card-title>
        <v-card-text class="d-flex flex-wrap justify-center">
          <v-btn v-for="(button, index) in otherButtons" :key="index" variant="outlined" class="ma-2 mobile-btn"
            @click="openModal(button.id)">
            <span class="button-text">{{ button.name }}</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- tambah note -->
    <v-divider></v-divider>
    <v-card-text>
      <v-card outlined class="py-2 px-4">
        <v-card-title>
          <span>Catatan 📃</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="insertNote">
            <v-textarea outlined rows="2" placeholder="Tambahkan catatan disini" v-model="dataNote.note"></v-textarea>
            <v-btn color="primary" type="submit" block class="mt-2">
              <v-icon>mdi-note-plus</v-icon>
              Tambah Catatan
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card outlined class="my-4">
        <v-card-text class="d-flex justify-center text-center pa-3 font-weight-bold">
          Catatan
        </v-card-text>
        <v-divider class="border-opacity-100"></v-divider>
        <v-card-text v-if="paginatedNotes.length > 0">
          <div v-for="(comment, index) in paginatedNotes" :key="index" class="user-comment">
            <div class="comment-content">
              <p class="pl-2">{{ comment.note }}</p>
              <v-row class="justify-space-between align-center py-2 px-2">
                <small>
                  <strong>
                    {{ comment.user.name }} - {{ comment.user.position.name }}
                  </strong>
                </small>
                --
                <small> {{ formatDate(comment.created_at) }}</small>
                <v-spacer></v-spacer>
                <v-menu v-if="userData.id == comment.user_id" transition="scale-transition" bottom left>
                  <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" variant="text">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item color="primary" @click="openModal(3, comment)">
                      <v-list-item>
                        <v-icon>mdi-pencil</v-icon>
                      </v-list-item>
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item color="error" @click="deleteNote(comment.id)">
                      <v-list-item>
                        <v-icon>mdi-delete</v-icon>
                      </v-list-item>
                      <v-list-item-title>Hapus</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-row>
            </div>
          </div>
          <v-pagination v-model="currentPage" :length="Math.ceil(dataFile.notes.length / itemsPerPage)"
            @input="onPageChange" />
        </v-card-text>
        <v-card-text v-else>
          <p class="text-center">Tidak ada catatan</p>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- prev/next btn -->
    <v-card-actions v-if="
      userAccessNow &&
      parseInt(userAccessNow.canApprove) &&
      (parseInt(dataFile.isApproved) != 3 && parseInt(dataFile.isApproved) != 4)
    ">
      <v-col class="d-flex justify-space-beetwen">
        <v-btn color="info" text="Prev Phase" variant="tonal" @click="step(fileId, '-')"
          v-if="dataFile && parseInt(dataFile.phase) > 1"></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" text="Next Phase" variant="tonal" @click="step(fileId, 'next')"
          v-if="dataFile && parseInt(dataFile.phase) < 5"></v-btn>
        <v-btn color="success" text="Setujui" variant="tonal" @click="step(fileId, 'next')"
          v-if="dataFile && parseInt(dataFile.phase) == 5"></v-btn>
      </v-col>
      <!-- <v-col class="d-flex justify-space-beetwen" v-else>
        <v-btn color="info" text="Prev Phase" variant="tonal" @click="step(fileId, '-')"
          v-if="dataFile && parseInt(dataFile.phase) > 1"></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" text="Next Phase" variant="tonal" @click="step(fileId, 'next')"
          v-if="dataFile && parseInt(dataFile.phase) < 4"></v-btn>
      </v-col> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import mainURL from "@/axios";
import { default as AttachmentCard1 } from "./attachmentCard1.vue";
import { default as AttachmentCard2 } from "./attachmentCard2.vue";
import attachmentCard3, {
  default as AttachmentCard3,
} from "./attachmentCard3.vue";
import attachmentCard4, {
  default as AttachmentCard4,
} from "./attachmentCard4.vue";
import attachmentOperation from "./attachmentOperation.vue";
export default {
  components: {
    AttachmentCard1,
    AttachmentCard2,
    AttachmentCard3,
    attachmentCard3,
    AttachmentCard4,
    attachmentCard4,
    attachmentOperation,
  },
  name: "Phase",
  props: {
    phase1Attachments: {
      type: Object,
      required: true,
    },
    phase2Attachments: {
      type: Object,
      required: true,
    },
    phase3Attachments: {
      type: Object,
      required: true,
    },
    phase4Attachments: {
      type: Object,
      required: true,
    },
    phase5Attachments: {
      type: Object,
      required: true,
    },
    userAccess: {
      type: Object,
      required: true,
    },
    dataFile: {
      type: Object,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    dataNote: {
      type: Object,
      required: true,
    },
    updateDataNote: {
      type: Object,
      required: true,
    },
    insertNote: {
      type: Function,
      required: true,
    },
    changeApproval: {
      type: Function,
      required: true,
    },
    formatDate: {
      type: Function,
      required: true,
    },
    openModal: {
      type: Function,
      required: true,
    },
    deleteAttachment: {
      type: Function,
      required: true,
    },
    deleteNote: {
      type: Function,
      required: true,
    },
    getDetailFile: {
      type: Function,
      required: true,
    },
    step: {
      type: Function,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    resetNote: {
      type: Function,
      required: true,
    },
    notePhase1: {
      type: Object,
      required: true,
    },
    notePhase2: {
      type: Object,
      required: true,
    },
    notePhase3: {
      type: Object,
      required: true,
    },
    notePhase4: {
      type: Object,
      required: true,
    },
    modalNote: {
      type: Function,
      required: true,
    },
    submissions: {
      type: Object,
      required: true,
    },
  },
  inject: ['loading'],
  data() {
    return {
      userAccessNow: null,
      userAccessPhase1: null,
      filePath: this.$filePath,

      //=>note
      isUpdateNote: false,
      // updateDataNote: {
      //   file_id: this.$route.params.fileId,
      //   note: null,
      //   isRead: null,
      // },

      //=>pagination note
      currentPage: 1,
      itemsPerPage: 10,
      otherButtons: [
        { id: 6, name: "Data Durasi Waktu" },
        { id: 7, name: "Data Aktivitas" },
        { id: 8, name: "Data Riwayat Persetujuan" },
        { id: 10, name: "Data Riwayat Dokumen" },
      ],
    };
  },
  computed: {
    paginatedNotes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataFile.notes.slice(startIndex, endIndex);
    },
    isAccountOfficer() {
      const aoPositions = [
        "Account Officer",
        "AO",
        "ao",
        "account officer",
        "Account Officer Executive",
        "account officer executive",
        "Account Officer / Executive AO",
        "AO / RO",
      ];
      return aoPositions.includes(this.userData.position.name);
    },
  },
  methods: {
    getStatusColor(status) {
      const colors = {
        1: "success",
        2: "warning",
        3: "error",
        4: "error",
      };
      return colors[status] || "default";
    },
    getStatusText(status) {
      const texts = {
        1: "Approved",
        2: "Pending",
        3: "Rejected",
        4: "Cancel by debitur",
      };
      return texts[status] || "Unknown";
    },
    async generateReport(id) {
      try {
        this.loading.show();
        const response = await mainURL.get(`/user/generatereport/${id}`, {
          responseType: "blob", // tambahkan ini untuk mengunduh file sebagai Blob
        });

        if (response.status == 200) {
          this.loading.hide();
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${this.dataFile.name}.pdf`); // Nama file ZIP yang akan diunduh
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          this.$showToast("success", "Berhasil", "File berhasil diunduh");
        } else {
          this.loading.hide();
          this.$showToast("error", "Error", "Gagal mengunduh file");
        }
      } catch (error) {
        console.log(error);
        this.loading.hide();
        this.$showToast(
          "error",
          "Error",
          "Terjadi kesalahan saat mengunduh file"
        );
      }
    },

    //=>pagination
    onPageChange(page) {
      this.currentPage = page;
    },
    formatInput(value) {
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
  },

  mounted() {
    this.userAccessNow = this.userAccess[this.dataFile.phase];
    this.userAccessPhase1 = this.userAccess[1];
  },
};
</script>

<style scoped>
.chip-text {
  white-space: normal;
  text-align: center;
  word-break: break-word;
}

@media (max-width: 600px) {
  .v-chip {
    max-width: 100%;
    height: auto !important;
  }
}

.mobile-btn {
  max-width: 100%;
  min-width: 120px;
  height: auto !important;
  white-space: normal;
  text-align: center;
  padding: 8px 16px;
}

.button-text {
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2em;
  max-height: 2.4em;
}

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
  padding: 0.5rem;
}

.blue-text {
  color: blue;
}

.clickable {
  cursor: pointer;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  /* Ensures it does not exceed the parent width */
}

@media (max-width: 600px) {
  .v-card-custom {
    padding: 0 !important;
    /* Ensure the padding is applied */
    margin: 0 !important;
    /* You can also adjust the margin if needed */
  }

  .v-card-custom .v-card__text,
  .v-card-custom .v-card__title,
  .v-card-custom .v-card__actions {
    padding: 0 !important;
    /* Override Vuetify's internal padding */
  }
}
</style>
