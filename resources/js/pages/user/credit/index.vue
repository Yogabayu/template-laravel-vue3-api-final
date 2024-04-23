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
      List Credit
    </VCardTitle>
    <v-tabs v-model="tab" class="v-tabs-pill" bg-color="secondary">
      <v-tab value="0">Semua</v-tab>
      <v-tab value="1">Phase 1</v-tab>
      <v-tab value="2">Phase 2</v-tab>
      <v-tab value="3">Phase 3</v-tab>
      <v-tab value="4">Phase 4</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <template v-for="phase in phases">
          <v-window-item :value="phase.value">
            <v-row class="d-flex justify-end pa-3">
              <v-btn
                color="primary"
                size="small"
                class="my-3 mx-3"
                v-if="userData && userData.position.role.canInsertData"
                @click="openModal(1)"
              >
                Tambah Data
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="Search"
                single-line
                flat
                hide-details
                variant="solo-filled"
                v-model="searchValue"
              ></v-text-field>
            </v-row>
            <EasyDataTable
              show-index
              :headers="headers"
              :items="items"
              :search-value="searchValue"
            >
              <template #empty-message><p>Data Kosong</p></template>
              <template #loading><p>loading data .....</p></template>
              <template #item-plafon="item"
                >Rp. {{ formatInput(item.plafon) }},-</template
              >
              <template #item-phase="item">Phase {{ item.phase }}</template>
              <template #item-operation="item">
                <div class="operation-wrapper">
                  <button>
                    <VIcon size="20" icon="bx-file-find" color="blue" />
                  </button>
                  &nbsp;
                  <button v-if="userData && item.user_id == userData.id">
                    <VIcon size="20" icon="bx-trash" color="red" />
                  </button>
                </div>
              </template>
            </EasyDataTable>
          </v-window-item>
        </template>
      </v-window>
    </v-card-text>

    <v-dialog v-model="insert" width="auto">
      <v-card>
        <template v-slot:title> Tambah Data </template>

        <template v-slot:text>
          <VForm @submit.prevent="insertData">
            <VRow>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Nama Pemohon: </span>

                <VTextField
                  class="my-3"
                  v-model="dataForm.name"
                  autofocus
                  :rules="[rules.required]"
                />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Jumlah Plafon: </span>

                <VTextField
                  class="my-3"
                  v-model="dataForm.plafon"
                  type="text"
                  @input="formatInputPlafon"
                  autofocus
                />
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">KTP Pemohon : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file1')"
                ></v-file-input>
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Kartu Keluarga : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file4')"
                ></v-file-input>
              </VCol>
              <VCol md="12" cols="12">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Foto Kunjungan : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file10')"
                ></v-file-input>
              </VCol>

              <v-divider :thickness="5"></v-divider>
              <!-- sudah menikah -->
              <VCol cols="12" md="12">
                <v-checkbox
                  v-model="dataForm.hasFile2"
                  label="Apakah pemohon sudah menikah?"
                  @change="resetFile('file2'), resetFile('file5')"
                ></v-checkbox>
              </VCol>

              <v-divider :thickness="5"></v-divider>
              <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center"
                  >KTP Pasangan Pemohon :
                </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file2')"
                ></v-file-input>
              </VCol>
              <VCol md="12" cols="12" v-if="dataForm.hasFile2">
                <span style="color: red">*</span
                ><span class="subtitle-1 text-center">Buku Nikah : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file5')"
                ></v-file-input>
              </VCol>

              <!-- ktp atas nama jaminan -->
              <VCol cols="12" md="12">
                <v-checkbox
                  v-model="dataForm.hasFile3"
                  label="Apakah agunan bukan atas nama pemohon?"
                  @change="resetFile('file3')"
                ></v-checkbox>
              </VCol>
              <VCol md="12" cols="12" v-if="dataForm.hasFile3">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"
                  >KTP atas nama Jaminan :
                </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file3')"
                ></v-file-input>
              </VCol>

              <v-divider :thickness="5"></v-divider>
              <VCol
                ><span style="color: red">*</span
                ><span class="subtitle-1 text-center"
                  >Lampirkan Salah Satu Jenis Jaminan :
                </span></VCol
              >
              <!-- shm -->
              <VCol cols="12" md="12">
                <v-checkbox
                  v-model="dataForm.hasFile7"
                  label="Jenis Jaminan SHM ?"
                  @change="resetFile('file7')"
                ></v-checkbox>
              </VCol>
              <VCol md="12" cols="12" v-if="dataForm.hasFile7">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center">Jaminan SHM : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file7')"
                ></v-file-input>
              </VCol>

              <!-- bpkb -->
              <VCol cols="12" md="12">
                <v-checkbox
                  v-model="dataForm.hasFile8"
                  label="Jenis Jaminan BPKB ?"
                  @change="resetFile('file8')"
                ></v-checkbox>
              </VCol>
              <VCol md="12" cols="12" v-if="dataForm.hasFile8">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center">Jaminan SHM : </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file8')"
                ></v-file-input>
              </VCol>

              <!-- mesin produksi -->
              <VCol cols="12" md="12">
                <v-checkbox
                  v-model="dataForm.hasFile9"
                  label="Jenis Jaminan Mesin Produksi ?"
                  @change="resetFile('file9')"
                ></v-checkbox>
              </VCol>
              <VCol md="12" cols="12" v-if="dataForm.hasFile9">
                <span style="color: red">*</span>
                <span class="subtitle-1 text-center"
                  >Foto Tentang Mesin :
                </span>

                <v-file-input
                  class="my-3"
                  accept="image/jpeg,image/png"
                  placeholder="Pick an image"
                  :rules="[rules.required]"
                  @change="(event) => handleFileChange(event, 'file9')"
                ></v-file-input>
              </VCol>

              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn
                  type="submit"
                  :disabled="
                    (dataForm.hasFile2 &&
                      (dataForm.file2 == null || dataForm.file5 == null)) ||
                    (dataForm.hasFile3 && dataForm.file3 == null) ||
                    (dataForm.hasFile7 && dataForm.file7 == null) ||
                    (dataForm.hasFile8 && dataForm.file8 == null) ||
                    (dataForm.hasFile9 && dataForm.file9 == null) ||
                    (dataForm.file7 == null &&
                      dataForm.file8 == null &&
                      dataForm.file9 == null)
                  "
                >
                  Simpan
                </VBtn>

                <button
                  type="button"
                  class="btn btn-blue"
                  @click="closeModal(1)"
                >
                  Batal
                </button>
              </VCol>
            </VRow>
          </VForm>
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
  </v-card>
</template>

<script lang="ts">
import mainURL from "@/axios";
export default {
  data() {
    return {
      overlay: false,
      insert: false,
      searchValue: "",
      userData: null,
      userToken: null,
      uploadProgress: null,
      tab: 0,
      rules: {
        required: (value) => !!value || "Required",
      },
      items: [],
      originalItems: [],
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Plafon", value: "plafon", sortable: true },
        { text: "Status", value: "phase", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      phases: [
        { value: 0 },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
      ],
      dataForm: {
        id: null,
        name: "",
        plafon: null,
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
      },
    };
  },
  watch: {
    tab(newVal) {
      if (newVal == 1) {
        this.filterDataStatus(1);
      } else if (newVal == 2) {
        this.filterDataStatus(2);
      } else if (newVal == 3) {
        this.filterDataStatus(3);
      } else if (newVal == 4) {
        this.filterDataStatus(4);
      } else {
        this.items = [...this.originalItems];
      }
    },
  },
  methods: {
    cekLog(id: any) {
      console.log(id);
    },
    resetFile(fileKey: string | number) {
      if (!this.dataForm[fileKey] != null) {
        this.dataForm[fileKey] = null;
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
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm[fileKey] = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPG, JPEG, dan PNG yang diizinkan."
        );
        event.target.value = null;
      }
    },
    async openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
      } else if (type === 2) {
        console.log("masuk");
      }
    },
    closeModal(type: number) {
      if (type === 1) {
        this.resetForm();
        this.insert = false;
      } else if (type === 2) {
        this.resetForm();
        this.edit = false;
      }
    },
    resetForm() {
      this.dataForm = {
        id: null,
        name: "",
        plafon: null,
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
      };
    },
    formatInput(value: string) {
      // Lakukan pemformatan nilai plafon di sini
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
    filterDataStatus(phase: any) {
      this.items = this.originalItems.filter(
        (item: { phase: any }) => item.phase == phase
      );
    },
    getUserData() {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        this.userData = JSON.parse(savedUserData);
      }
    },
    async getAllFiles() {
      try {
        const response = await mainURL.get("/user/credit");

        if (response.status === 200) {
          this.items = response.data.data;
          this.originalItems = [...this.items];
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    formatInputPlafon(event: { target: { value: any } }) {
      let value = event.target.value;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      event.target.value = value;
    },

    async insertData() {
      try {
        // URUNG : tinnggal input
        console.log(this.dataForm);
        const formData = new FormData();
        formData.append("name", this.dataForm.name);
        formData.append("plafon", this.dataForm.plafon);

        // Append files to formData
        for (let i = 1; i <= 10; i++) {
          // Skip file6 as it's not in the validation rules
          if (i === 6) continue;

          let fileKey = "file" + i;
          let hasFileKey = "hasFile" + i;

          // Check if the file has a corresponding hasFile property
          if (this.dataForm.hasOwnProperty(hasFileKey)) {
            // If it does, check if hasFile is true and the file exists
            if (this.dataForm[hasFileKey] && this.dataForm[fileKey]) {
              formData.append(fileKey, this.dataForm[fileKey]);
            }
          } else {
            // If it doesn't, just check if the file exists
            if (this.dataForm[fileKey]) {
              formData.append(fileKey, this.dataForm[fileKey]);
            }
          }
        }

        // Ensure at least one of file7, file8, and file9 exists
        if (
          !this.dataForm.file7 &&
          !this.dataForm.file8 &&
          !this.dataForm.file9
        ) {
          console.error("At least one of file7, file8, and file9 must exist");
          return;
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        // const formData = new FormData();
        // for (let key in this.dataForm) {
        //   if (key !== "id") {
        //     formData.append(key, this.dataForm[key]);
        //   }
        // }

        // formData.append("_method", "POST");

        // console.log(...formData);
        // const config = {
        //   onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        //     try {
        //       this.uploadProgress = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total
        //       );
        //     } catch (error) {
        //       console.error("Error calculating progress:", error);
        //     }
        //   },
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // };

        // const response = await mainURL.post("/file", formData, config);

        // if (response.status === 200) {
        //   this.closeModal(1);
        //   this.getAllFiles();
        //   this.uploadProgress = null;
        //   this.$showToast("success", "Success", response.data.message);
        // } else {
        //   this.uploadProgress = null;
        //   this.$showToast("error", "Sorry", response.data.message);
        // }
      } catch (error) {
        this.uploadProgress = null;
        this.closeModal(1);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getAllFiles();
    this.getUserData();
  },
};
</script>
