<template>
  <v-overlay
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
  </v-overlay>

  <v-card>
    <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
      Credit
    </VCardTitle>
    <v-card-text>
      <v-stepper :model-value="dataFile.phase - 1" :mobile="isMobile">
        <v-stepper-header>
          <v-stepper-item
            title="Phase 1"
            value="1"
            :complete="dataFile.phase > 2"
          >
          </v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            title="Phase 2"
            value="2"
            :complete="dataFile.phase > 3"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            title="Phase 3"
            value="3"
            :complete="dataFile.phase > 4"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            title="Phase 4"
            value="4"
            :complete="dataFile.phase > 5"
          ></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
          <!-- step 1 -->
          <v-stepper-window-item
            value="1"
            v-if="userData && userData.position.role.isPhase1Access == 1"
          >
            <v-card>
              <v-card-title
                class="text-2xl font-weight-bold d-flex justify-center"
              >
                Detail
              </v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-person"></v-icon>
                    </template>
                    <v-list-item-title> Nama Pemohon</v-list-item-title>
                    <v-list-item-title>
                      <strong> {{ dataFile.name }} </strong></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
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

                <v-divider></v-divider>
                <div
                  v-for="(attachment, index) in dataFile.attachments"
                  :key="index"
                >
                  <v-list density="compact" v-if="attachment.path != null">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon icon="mdi-file"></v-icon>
                      </template>
                      <v-list-item-title>
                        {{ attachment.name }}</v-list-item-title
                      >
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
                              v-if="userData.id == dataFile.user_id"
                            >
                              <template v-slot:activator="{ props }">
                                <button
                                  v-bind="props"
                                  @click="openModal(2, attachment)"
                                >
                                  <VIcon
                                    size="20"
                                    icon="bx-edit"
                                    color="blue"
                                  />
                                </button>
                              </template>
                            </v-tooltip>

                            <v-tooltip
                              location="top"
                              text="Hapus File"
                              v-if="userData.id == dataFile.user_id"
                            >
                              <template v-slot:activator="{ props }">
                                <button
                                  v-bind="props"
                                  @click="deleteAttachment(attachment.id)"
                                >
                                  <VIcon
                                    size="20"
                                    icon="bx-trash"
                                    color="red"
                                  />
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
              
              <!-- tambah attachment -->
              <v-divider v-if="userData.id == dataFile.user_id"></v-divider>
              <v-card-text v-if="userData.id == dataFile.user_id">
                <span class="text-xl font-weight-bold d-flex justify-end">
                  <v-btn
                    color="primary"
                    size="small"
                    class="my-3 mx-3"
                    @click="openModal(1)"
                  >
                    Tambah Data lain
                  </v-btn>
                </span>
              </v-card-text>

              <!-- tambah note -->
              <v-divider></v-divider>
              <v-card-text>
                <span class="text-xl font-weight-bold d-flex justify-center">
                  Note
                </span>
                <v-card>
                  <v-card-title>
                    <VForm>
                      <v-row align="center" justify="center">
                        <VCol md="10" cols="10">
                          <v-textarea
                            rows="2"
                            bg-color="grey-lighten-2"
                            color="cyan"
                            v-model="dataNote.note"
                          ></v-textarea>
                        </VCol>
                        <VCol md="2" cols="2">
                          <v-btn
                            density="compact"
                            icon="mdi-note-plus"
                            type="submit"
                          ></v-btn>
                        </VCol>
                      </v-row>
                    </VForm>
                  </v-card-title>
                  <v-card-text>
                    
                  </v-card-text>
                </v-card>
              </v-card-text>

              <!-- prev/next btn -->
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="info"
                    text="Next"
                    variant="tonal"
                    @click="nextStep(2)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="1" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item>

          <v-stepper-window-item
            value="2"
            v-if="userData && userData.position.role.isPhase2Access == 1"
          >
            <v-card>
              <v-card-title> PHASE 2 </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                condimentum, urna a volutpat sodales, libero lacus pulvinar ex,
                eget scelerisque tellus sem malesuada justo. Etiam vitae nulla
                erat. Aenean non dui elementum, luctus quam at, consectetur
                lacus. Nullam lorem neque, tristique non augue et, pharetra
                molestie est. Quisque quis justo at diam consectetur pretium.
                Donec rhoncus purus ut lectus condimentum bibendum. Curabitur id
                commodo sapien, id ullamcorper nisl. Etiam et felis sed libero
                convallis lobortis. Nulla et felis augue. Phasellus accumsan non
                nisl sit amet sollicitudin. Suspendisse lectus nisl, aliquam vel
                congue a, rutrum vel ex. Suspendisse quis auctor sapien, ac
                posuere arcu. Sed ultricies, libero sed rutrum luctus, libero
                lectus consectetur quam, sed tempus nulla erat et nisl. Nulla
                porttitor volutpat sapien, quis blandit massa iaculis in.
                Quisque velit justo, rutrum quis risus vel, porttitor dapibus
                nibh. Phasellus et viverra dui. Vivamus interdum consectetur
                pretium. Cras hendrerit suscipit porta.
              </v-card-text>
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-btn
                    color="teal-accent-4"
                    text="Close"
                    variant="text"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal-accent-4"
                    text="Next"
                    variant="text"
                    @click="nextStep(3)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="2" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item>

          <v-stepper-window-item
            value="3"
            v-if="userData && userData.position.role.isPhase3Access == 1"
          >
            <v-card>
              <v-card-title> PHASE 3 </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                condimentum, urna a volutpat sodales, libero lacus pulvinar ex,
                eget scelerisque tellus sem malesuada justo. Etiam vitae nulla
                erat. Aenean non dui elementum, luctus quam at, consectetur
                lacus. Nullam lorem neque, tristique non augue et, pharetra
                molestie est. Quisque quis justo at diam consectetur pretium.
                Donec rhoncus purus ut lectus condimentum bibendum. Curabitur id
                commodo sapien, id ullamcorper nisl. Etiam et felis sed libero
                convallis lobortis. Nulla et felis augue. Phasellus accumsan non
                nisl sit amet sollicitudin. Suspendisse lectus nisl, aliquam vel
                congue a, rutrum vel ex. Suspendisse quis auctor sapien, ac
                posuere arcu. Sed ultricies, libero sed rutrum luctus, libero
                lectus consectetur quam, sed tempus nulla erat et nisl. Nulla
                porttitor volutpat sapien, quis blandit massa iaculis in.
                Quisque velit justo, rutrum quis risus vel, porttitor dapibus
                nibh. Phasellus et viverra dui. Vivamus interdum consectetur
                pretium. Cras hendrerit suscipit porta.
              </v-card-text>
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-btn
                    color="teal-accent-4"
                    text="Close"
                    variant="text"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal-accent-4"
                    text="Next"
                    variant="text"
                    @click="nextStep(2)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="3" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item>

          <v-stepper-window-item
            value="4"
            v-if="userData && userData.position.role.isPhase4Access == 1"
          >
            <v-card>
              <v-card-title> PHASE 4 </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                condimentum, urna a volutpat sodales, libero lacus pulvinar ex,
                eget scelerisque tellus sem malesuada justo. Etiam vitae nulla
                erat. Aenean non dui elementum, luctus quam at, consectetur
                lacus. Nullam lorem neque, tristique non augue et, pharetra
                molestie est. Quisque quis justo at diam consectetur pretium.
                Donec rhoncus purus ut lectus condimentum bibendum. Curabitur id
                commodo sapien, id ullamcorper nisl. Etiam et felis sed libero
                convallis lobortis. Nulla et felis augue. Phasellus accumsan non
                nisl sit amet sollicitudin. Suspendisse lectus nisl, aliquam vel
                congue a, rutrum vel ex. Suspendisse quis auctor sapien, ac
                posuere arcu. Sed ultricies, libero sed rutrum luctus, libero
                lectus consectetur quam, sed tempus nulla erat et nisl. Nulla
                porttitor volutpat sapien, quis blandit massa iaculis in.
                Quisque velit justo, rutrum quis risus vel, porttitor dapibus
                nibh. Phasellus et viverra dui. Vivamus interdum consectetur
                pretium. Cras hendrerit suscipit porta.
              </v-card-text>
              <v-card-actions>
                <v-col class="d-flex justify-space-beetwen">
                  <v-btn
                    color="teal-accent-4"
                    text="Close"
                    variant="text"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal-accent-4"
                    text="Next"
                    variant="text"
                    @click="nextStep(4)"
                  ></v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="4" v-else>
            <div
              style="
                color: red;
                font-size: 20px;
                text-align: center;
                padding: 10px;
              "
            >
              Anda Dilarang melihat Phase ini
            </div>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
    </v-card-text>
  </v-card>

  <v-dialog v-model="insertAttch" width="auto">
    <v-card>
      <template v-slot:title> Tambah Data </template>

      <template v-slot:text>
        <v-form @submit.prevent="insertAttachment">
          <v-row>
            <VCol md="12" cols="12">
              <span style="color: red">*</span
              ><span class="subtitle-1 text-center">Keterangan File: </span>

              <VTextField
                class="my-3"
                v-model="attachFile.name"
                autofocus
                :rules="[rules.required]"
              />
            </VCol>
            <VCol md="12" cols="12">
              <span style="color: red">*</span>
              <span class="subtitle-1 text-center"> Upload File: </span>

              <v-file-input
                class="my-3"
                accept="image/jpeg,image/png"
                placeholder="Pick an image"
                :rules="[rules.required]"
                @change="(event) => handleFileChange(event)"
              ></v-file-input>
            </VCol>
            <VCol cols="12" class="d-flex flex-wrap gap-4">
              <VBtn
                type="submit"
                :disabled="(attachFile.name && attachFile.path) == null"
              >
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
        <v-progress-linear
          v-model="uploadProgress"
          color="amber"
          height="25"
        ></v-progress-linear>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="updateAttch" width="auto">
    <v-card>
      <template v-slot:title> Edit Data </template>

      <template v-slot:text>
        <v-form @submit.prevent="editAttachment">
          <v-row>
            <VCol md="12" cols="12">
              <span style="color: red">*</span>
              <span class="subtitle-1 text-center">Keterangan File: </span>

              <VTextField
                class="my-3"
                v-model="attachFile.name"
                autofocus
                :rules="[rules.required]"
              />
            </VCol>
            <VCol md="12" cols="12">
              <span style="color: red">*</span>
              <span class="subtitle-1 text-center"> Upload File: </span>

              <v-file-input
                class="my-3"
                accept="image/jpeg,image/png"
                placeholder="Pick an image"
                :rules="[rules.required]"
                @change="(event) => handleFileChange(event)"
              ></v-file-input>
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
        <v-progress-linear
          v-model="uploadProgress"
          color="amber"
          height="25"
        ></v-progress-linear>
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import mainURL from "@/axios";

export default {
  data() {
    return {
      overlay: false,
      isMobile: false,
      userData: null,
      fileId: this.$route.params.fileId,
      dataFile: {
        id: null,
        user_id: null,
        phase: 1,
        name: "",
        plafon: "0",
        surveyResult: "-",
        surveyResult: "-",
        otsResult: "-",
        cekLingResult: "-",
        verTelResult: "-",
        creditScoring: "-",
        attachments: [],
      },
      filePath: this.$filePath,

      //=>note
      dataNote: {
        file_id: null,
        note: null,
        isRead: null,
      },

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
      },
    };
  },
  methods: {
    resetNote() {
      this.dataNote = {
        file_id: null,
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
    nextStep(step: any) {
      const confirmNext = window.confirm(
        `Apakah Anda yakin melanjutkan ke step ${step} selanjutnya`
      );
      if (!confirmNext) return;
      console.log(step);
    },
    async getDetailFile(id: any) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/credit/${id}`);

        if (response.status === 200) {
          this.dataFile = response.data.data;
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
      }
    },
    closeModal(type: number) {
      if (type === 1) {
        this.resetAttch();
        this.insertAttch = false;
      } else if (type === 2) {
        this.updateAttch = false;
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
      };
    },
    async insertAttachment() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("file_id", this.attachFile.file_id);
        formData.append("name", this.attachFile.name);
        formData.append("path", this.attachFile.path);
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
