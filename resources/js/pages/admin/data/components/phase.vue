
<template>
  <v-card color="backgroundCard">
    <v-card-title class="text-2xl font-weight-bold d-flex justify-center"
      v-if="!['Account Officer', 'AO', 'ao', 'account officer', 'Account Officer Executive', 'account officer executive','Account Officer / Executive AO','AO / RO'].includes(userData.position.name)">
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
    </v-card-title>
    <v-card-text class="font-weight-bold d-flex justify-end" v-if="dataFile && parseInt(dataFile.phase) == 6">
      <v-btn color="primary" @click="generateReport(fileId)" size="x-small">
        Generate Laporan
      </v-btn>
    </v-card-text>

    <v-card-text v-if="dataFile.reasonRejected != null">
      <v-card>
        <v-card-title> Alasan Ditolak 🔹 </v-card-title>
        <v-card-text>
          <div>
            <span>{{ dataFile && dataFile.reasonRejected }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-text>
      <v-card class="mb-5">
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Informasi Umum ℹ️</span>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canUpdateData">
              <span>
                <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(4)">
                  Edit Data
                </v-btn>
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-list density="compact" lines="two">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-person" size="x-small"></v-icon>
              </template>
              <v-list-item-title> Nama Pemohon </v-list-item-title>
              <v-list-item>
                <strong> {{ dataFile.name }} </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-person" size="x-small"></v-icon>
              </template>
              <v-list-item-title> NIK Pemohon </v-list-item-title>
              <v-list-item>
                <strong> {{ dataFile.nik_pemohon }} </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-map-marker" size="x-small"></v-icon>
              </template>
              <v-list-item-title> Alamat Pemohon </v-list-item-title>
              <v-list-item>
                <strong> {{ dataFile.address }} </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-phone" size="x-small"></v-icon>
              </template>
              <v-list-item-title> No. HP Pemohon</v-list-item-title>
              <v-list-item>
                <strong>
                  {{ dataFile.no_hp }}
                </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-cash" size="x-small"></v-icon>
              </template>
              <v-list-item-title> Jumlah Plafon</v-list-item-title>
              <v-list-item>
                <strong>
                  Rp {{ formatInput(dataFile.plafon) }}
                </strong></v-list-item>
            </v-list-item>
            <v-list-item v-if="dataFile.nik_pasangan != null && dataFile.nik_pasangan != '' && dataFile.nik_pasangan !='null'">
              <template v-slot:prepend>
                <v-icon icon="mdi-code-greater-than" size="x-small"></v-icon>
              </template>
              <v-list-item-title> NIK Pasangan</v-list-item-title>
              <v-list-item>
                <strong>
                  {{ dataFile.nik_pasangan }}
                </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item v-if="dataFile.nik_jaminan != null && dataFile.nik_jaminan != '' && dataFile.nik_jaminan !='null'">
              <template v-slot:prepend>
                <v-icon icon="mdi-code-greater-than" size="x-small"></v-icon>
              </template>
              <v-list-item-title> NIK atas nama Jaminan</v-list-item-title>
              <v-list-item>
                <strong>
                  {{ dataFile.nik_jaminan }}
                </strong>
              </v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-office-building" size="x-small"></v-icon>
              </template>
              <v-list-item-title> Jenis Usaha</v-list-item-title>
              <v-list-item>
                <strong>
                  {{ dataFile.type_bussiness }}
                </strong></v-list-item>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-office-building" size="x-small"></v-icon>
              </template>
              <v-list-item-title> Deskripsi Usaha</v-list-item-title>
              <v-list-item>
                <strong>
                  {{ dataFile.desc_bussiness }}
                </strong></v-list-item>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Dokumen Pendukung 📄</span>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canInsertData">
              <span>
                <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(1)">
                  Tambah Data Lain
                </v-btn>
              </span>
            </v-col>
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
              :phase="parseInt(dataFile.phase)"></AttachmentCard2>
          </div>
          <div class="mb-5">
            <attachmentCard3 v-if="parseInt(dataFile.phase) > 2" :data="phase3Attachments"
              :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
              :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile" 
              :phase="parseInt(dataFile.phase)"></attachmentCard3>
          </div>
          <div class="mb-5">
            <attachmentCard4 v-if="parseInt(dataFile.phase) > 3" :data="phase4Attachments"
              :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
              :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile" 
              :phase="parseInt(dataFile.phase)"></attachmentCard4>
          </div>
          <div class="mb-5">
            <attachmentOperation v-if="parseInt(dataFile.phase) > 4" :data="phase5Attachments"
              :fileId="parseInt(dataFile.id)" :filePath="filePath" :userAccess="userAccess"
              :deleteAttachment="deleteAttachment" :getDetailFile="getDetailFile" 
              :phase="parseInt(dataFile.phase)"></attachmentOperation>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- <v-card-text v-if="dataFile.phase > 2">
      <v-card class="mb-5">
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Survey Lapangan ℹ️</span>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canInsertData">
              <span>
                <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(5)">
                  Edit Data
                </v-btn>
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-note-text-outline"></v-icon>
              </template>
              <v-list-item-title> Hasil Survei</v-list-item-title>
              <v-list-item-title>
                <strong>
                  {{ dataFile.surveyResult }}
                </strong></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text> -->

    <!-- Approval -->
    <v-card-text v-if="dataFile && parseInt(dataFile.phase) < 6">
      <v-card>
        <v-card-title> Status Approval Phase ✅ </v-card-title>
        <v-card-text>
          <div v-if="dataFile && dataFile.approvals && dataFile.approvals.length">
            <template v-for="(app, index) in dataFile.approvals" :key="index">
              <v-chip v-if="dataFile.phase == app.phase" :color="app.approved == 1 ? 'success' : 'error'" class="mr-2"
                @click="changeApproval(app.id)">
                {{ app.user.name }} - {{ app.user.position.name }}
              </v-chip>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- others -->
    <v-card-text>
      <v-card>
        <v-card-title> Lain - lain 🔹 </v-card-title>
        <v-card-text>
          <div>
            <v-chip-group>
              <v-chip color="success" @click="openModal(6)"> Data Durasi Waktu </v-chip>
              <v-chip color="success" @click="openModal(7)"> Data Aktivitas</v-chip>
              <v-chip color="success" @click="openModal(8)"> Data Riwayat Persetujuan</v-chip>
              <v-chip color="success" @click="openModal(10)"> Data Riwayat Dokumen Pendukung</v-chip>
            </v-chip-group>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- tambah note -->
    <v-divider></v-divider>
    <v-card-text>
      <v-card>
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Catatan 📃</span>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-sm-right text-md-right">
              <!-- <span class="text-sm blue-text clickable" @click="modalNote">Lihat Catatan Berdasarkan Fase</span> -->
            </v-col>
          </v-row>
          <v-form @submit.prevent="insertNote">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="10">
                <v-textarea outlined rows="2" placeholder="Tambahkan catatan disini"
                  v-model="dataNote.note"></v-textarea>
              </v-col>
              <v-col cols="12" sm="4" md="2">
                <v-btn color="primary" icon type="submit">
                  <v-icon>mdi-note-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-title>

        <v-card-text>
          <div>
            <div v-for="(comment, index) in paginatedNotes" :key="index" class="user-comment">
              <div class="comment-content">
                <p>{{ comment.note }}</p>
                <v-row class="justify-space-between mx-2 mb-2">
                  <small>
                    <strong>
                      {{ comment.user.name }} - {{ comment.user.position.name }}
                    </strong></small>
                  <small>{{ formatDate(comment.created_at) }}</small>
                </v-row>
              </div>

              <v-menu transition="scale-transition" v-if="userData.id == comment.user_id">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" class="ellipsis-icon">mdi-dots-vertical</v-icon>
                </template>

                <v-list>
                  <v-list-item color="primary" @click="openModal(3, comment)">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-edit"></v-icon>
                    </template>

                    <v-list-item-title> edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item color="primary" @click="deleteNote(comment.id)">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-trash"></v-icon>
                    </template>

                    <v-list-item-title> hapus</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-pagination v-model="currentPage" :length="Math.ceil(dataFile.notes.length / itemsPerPage)"
              @input="onPageChange"></v-pagination>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- prev/next btn -->
    <v-card-actions v-if="userAccess && parseInt(userAccess.canApprove)">
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
import attachmentCard3, { default as AttachmentCard3 } from './attachmentCard3.vue';
import attachmentCard4, { default as AttachmentCard4 } from './attachmentCard4.vue';
import attachmentOperation from './attachmentOperation.vue';
export default {
  components: { AttachmentCard1, AttachmentCard2, AttachmentCard3, attachmentCard3, AttachmentCard4, attachmentCard4,attachmentOperation },
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
  },
  data() {
    return {
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
    async generateReport(id) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/generatereport/${id}`, {
          responseType: 'blob' // tambahkan ini untuk mengunduh file sebagai Blob
        });

        if (response.status == 200) {
          this.overlay = false;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.dataFile.name}.pdf`); // Nama file ZIP yang akan diunduh
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          this.$showToast("success", "Berhasil", "File berhasil diunduh");
        } else {
          this.overlay = false;
          this.$showToast("error", "Error", "Gagal mengunduh file");
        }
      } catch (error) {
        console.log(error);
        this.overlay = false;
        this.$showToast("error", "Error", "Terjadi kesalahan saat mengunduh file");
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
</style>
