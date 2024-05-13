<template>
  <v-card color="backgroundCard">
    <v-card-title class="text-2xl font-weight-bold d-flex justify-center">
      Detail
      <v-chip color="success" v-if="dataFile.isApproved == 1">Approved</v-chip>
      <v-chip color="warning" v-if="dataFile.isApproved == 2">Pending</v-chip>
      <v-chip color="error" v-if="dataFile.isApproved == 3">Rejected</v-chip>
    </v-card-title>
    <v-card-text>
      <v-card class="mb-5">
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Informasi Umum ℹ️</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canInsertData"
            >
              <span>
                <v-btn
                  color="primary"
                  size="small"
                  class="my-3 mx-3"
                  @click="openModal(4)"
                >
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
                <v-icon icon="mdi-person"></v-icon>
              </template>
              <v-list-item-title> Nama Pemohon</v-list-item-title>
              <v-list-item-title>
                <strong>
                  {{ dataFile.name }}
                </strong></v-list-item-title
              >
            </v-list-item>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-cash"></v-icon>
                </template>
                <v-list-item-title> Jumlah Plafon</v-list-item-title>
                <v-list-item-title>
                  <strong>
                    Rp {{ formatInput(dataFile.plafon) }}
                  </strong></v-list-item-title
                >
              </v-list-item>
            </v-list>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-office-building"></v-icon>
                </template>
                <v-list-item-title> Jenis Usaha</v-list-item-title>
                <v-list-item-title>
                  <strong>
                    {{ dataFile.type_bussiness }}
                  </strong></v-list-item-title
                >
              </v-list-item>
            </v-list>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-office-building"></v-icon>
                </template>
                <v-list-item-title> Deskripsi Usaha</v-list-item-title>
                <v-list-item-title>
                  <strong>
                    {{ dataFile.desc_bussiness }}
                  </strong></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Dokumen Pendukung 📄</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canInsertData"
            >
              <span>
                <v-btn
                  color="primary"
                  size="small"
                  class="my-3 mx-3"
                  @click="openModal(1)"
                >
                  Tambah Data Lain
                </v-btn>
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-for="(attachment, index) in dataFile.attachments" :key="index">
            <v-list
              density="compact"
              v-if="attachment.path != null && !attachment.isSecret"
            >
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-file"></v-icon>
                </template>
                <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                <template v-slot:append>
                  <div class="operation-wrapper">
                    <div class="d-flex justify-space-between">
                      <v-tooltip location="top" text="Lihat File">
                        <template v-slot:activator="{ props }">
                          <a
                            v-bind="props"
                            :href="
                              filePath +
                              '/' +
                              dataFile.id +
                              '/' +
                              attachment.path
                            "
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button>
                              <VIcon
                                size="20"
                                icon="bx-link-external"
                                color="blue"
                              />
                            </button>
                          </a>
                        </template>
                      </v-tooltip>

                      <v-tooltip
                        location="top"
                        text="Edit File"
                        v-if="
                          userData.id == dataFile.user_id ||
                          (userAccess && userAccess.canInsertData)
                        "
                      >
                        <template v-slot:activator="{ props }">
                          <button
                            v-bind="props"
                            @click="openModal(2, attachment)"
                          >
                            <VIcon size="20" icon="bx-edit" color="blue" />
                          </button>
                        </template>
                      </v-tooltip>

                      <v-tooltip
                        location="top"
                        text="Hapus File"
                        v-if="
                          userData.id == dataFile.user_id ||
                          (userAccess && userAccess.canInsertData)
                        "
                      >
                        <template v-slot:activator="{ props }">
                          <button
                            v-bind="props"
                            @click="deleteAttachment(attachment.id)"
                          >
                            <VIcon size="20" icon="bx-trash" color="red" />
                          </button>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </template>
              </v-list-item>
            </v-list>
            <v-list density="compact" v-else>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-file"></v-icon>
                </template>
                <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                <template
                  v-slot:append
                  v-if="userAccess && userAccess.isSecret"
                >
                  <div class="operation-wrapper">
                    <div class="d-flex justify-space-between">
                      <v-tooltip location="top" text="Lihat File">
                        <template v-slot:activator="{ props }">
                          <a
                            v-bind="props"
                            :href="
                              filePath +
                              '/' +
                              dataFile.id +
                              '/' +
                              attachment.path
                            "
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button>
                              <VIcon
                                size="20"
                                icon="bx-link-external"
                                color="blue"
                              />
                            </button>
                          </a>
                        </template>
                      </v-tooltip>

                      <v-tooltip
                        location="top"
                        text="Edit File"
                        v-if="
                          userData.id == dataFile.user_id ||
                          (userAccess && userAccess.canInsertData)
                        "
                      >
                        <template v-slot:activator="{ props }">
                          <button
                            v-bind="props"
                            @click="openModal(2, attachment)"
                          >
                            <VIcon size="20" icon="bx-edit" color="blue" />
                          </button>
                        </template>
                      </v-tooltip>

                      <v-tooltip
                        location="top"
                        text="Hapus File"
                        v-if="
                          userData.id == dataFile.user_id ||
                          (userAccess && userAccess.canInsertData)
                        "
                      >
                        <template v-slot:activator="{ props }">
                          <button
                            v-bind="props"
                            @click="deleteAttachment(attachment.id)"
                          >
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
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-text v-if="dataFile.phase > 2">
      <v-card class="mb-5">
        <v-card-title>
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="6" md="8">
              <span>Survey Lapangan ℹ️</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="text-sm-right text-md-right"
              v-if="userAccess && userAccess.canInsertData"
            >
              <span>
                <v-btn
                  color="primary"
                  size="small"
                  class="my-3 mx-3"
                  @click="openModal(5)"
                >
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
                </strong></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- Approval -->
    <v-card-text>
      <v-card>
        <v-card-title> Status Verifikasi ✅ </v-card-title>
        <v-card-text>
          <div
            v-if="dataFile && dataFile.approvals && dataFile.approvals.length"
          >
            <template v-for="(app, index) in dataFile.approvals" :key="index">
              <v-chip
                v-if="dataFile.phase == app.phase"
                :color="app.approved == 1 ? 'success' : 'error'"
                class="mr-2"
                @click="changeApproval(app.id)"
              >
                {{ app.user.name }}
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
              <v-chip color="success" @click="openModal(7)"> Data Riwayat File</v-chip>
              <v-chip color="success" @click="openModal(8)"> Data Riwayat Persetujuan</v-chip>
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
                <v-textarea
                  outlined
                  rows="2"
                  placeholder="Tambahkan catatan disini"
                  v-model="dataNote.note"
                ></v-textarea>
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
            <div
              v-for="(comment, index) in paginatedNotes"
              :key="index"
              class="user-comment"
            >
              <div class="comment-content">
                <p>{{ comment.note }}</p>
                <v-row class="justify-space-between mx-2 mb-2">
                  <small>
                    <strong>
                      {{ comment.user.name }} - {{ comment.user.position.name }}
                    </strong></small
                  >
                  <small>{{ formatDate(comment.created_at) }}</small>
                </v-row>
              </div>

              <v-menu
                transition="scale-transition"
                v-if="userData.id == comment.user_id"
              >
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" class="ellipsis-icon"
                    >mdi-dots-vertical</v-icon
                  >
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
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(dataFile.notes.length / itemsPerPage)"
              @input="onPageChange"
            ></v-pagination>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>

    <!-- prev/next btn -->
    <v-card-actions >
      <v-col
        class="d-flex justify-space-beetwen"
        v-if="dataFile.plafon > 25000000"
      >
        <v-btn
          color="info"
          text="Prev"
          variant="tonal"
          @click="step(fileId, '-')"
          v-if="dataFile && dataFile.phase > 1"
        ></v-btn>

        <v-spacer></v-spacer>
        <v-btn
          color="info"
          text="Next"
          variant="tonal"
          @click="step(fileId, 'next')"
          v-if="dataFile && dataFile.phase < 4"
        ></v-btn>
      </v-col>
      <v-col class="d-flex justify-space-beetwen" v-else>
        <v-btn
          color="info"
          text="Prev"
          variant="tonal"
          @click="step(fileId, '-')"
          v-if="dataFile && dataFile.phase > 1"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          text="Finish"
          variant="tonal"
          @click="step(fileId, 'next')"
          v-if="dataFile && dataFile.phase < 4"
        ></v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Phase",
  props: {
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
</style>
