<template>
  <v-overlay :absolute="true" v-model="overlay" contained persistent class="align-center justify-center">
    <v-col>
      <v-progress-circular color="primary" size="32" indeterminate>
      </v-progress-circular>
      <br />
      <span class="font-weight-bold text-lg">Loading....</span>
    </v-col>
  </v-overlay>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          Konfigurasi Fase Kredit
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
        <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(1)">
          Tambah Data
        </v-btn>
      </div>

      <!-- phase1 -->
      <v-card class="my-2">
        <VCardItem class="align-left">
          <VCardTitle class="text-2xl font-weight-bold"> Phase 1 </VCardTitle>
        </VCardItem>
        <EasyDataTable show-index :headers="phase1Headers" :items="phase1Items">
          <template #empty-message>
            <p>Data Kosong</p>
          </template>
          <template #loading>
            <p>loading data .....</p>
          </template>
          <template #item-minPlafon="item">
            <p>{{ formatInput(item.minPlafon) }}</p>
          </template>
          <template #item-maxPlafon="item">
            <p>{{ formatInput(item.maxPlafon) }}</p>
          </template>
          <!-- <template #item-canAppeal="item">
            <p>{{ item.canAppeal == 1 ? "&#x2713;" : "x" }}</p>
          </template> -->
          <template #item-canApprove="item">
            <p>{{ item.canApprove == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-notification="item">
            <p>{{ item.notification == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-canInsertData="item">
            <p>{{ item.canInsertData == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-operation="item">
            <div class="operation-wrapper">
              <button>
                <VIcon size="20" icon="bx-edit" color="blue" @click="openModal(2, item)" />
              </button>
              &nbsp;
              <button>
                <VIcon size="20" icon="bx-trash" color="red" @click="deleteNotifConf(item)" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </v-card>

      <!-- phase2 -->
      <v-card class="my-2">
        <VCardItem class="align-left">
          <VCardTitle class="text-2xl font-weight-bold"> Phase 2 </VCardTitle>
        </VCardItem>
        <EasyDataTable show-index :headers="phase2Headers" :items="phase2Items">
          <template #empty-message>
            <p>Data Kosong</p>
          </template>
          <template #loading>
            <p>loading data .....</p>
          </template>
          <template #item-minPlafon="item">
            <p>{{ formatInput(item.minPlafon) }}</p>
          </template>
          <template #item-maxPlafon="item">
            <p>{{ formatInput(item.maxPlafon) }}</p>
          </template>
          <!-- <template #item-canAppeal="item">
            <p>{{ item.canAppeal == 1 ? "&#x2713;" : "x" }}</p>
          </template> -->
          <template #item-canApprove="item">
            <p>{{ item.canApprove == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-notification="item">
            <p>{{ item.notification == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-isSecret="item">
            <p>{{ item.isSecret == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-canInsertData="item">
            <p>{{ item.canInsertData == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-operation="item">
            <div class="operation-wrapper">
              <button>
                <VIcon size="20" icon="bx-edit" color="blue" @click="openModal(2, item)" />
              </button>
              &nbsp;
              <button>
                <VIcon size="20" icon="bx-trash" color="red" @click="deleteNotifConf(item)" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </v-card>

      <!-- phase3 -->
      <v-card class="my-2">
        <VCardItem class="align-left">
          <VCardTitle class="text-2xl font-weight-bold"> Phase 3 </VCardTitle>
        </VCardItem>
        <EasyDataTable show-index :headers="phase3Headers" :items="phase3Items">
          <template #empty-message>
            <p>Data Kosong</p>
          </template>
          <template #loading>
            <p>loading data .....</p>
          </template>
          <template #item-minPlafon="item">
            <p>{{ formatInput(item.minPlafon) }}</p>
          </template>
          <template #item-maxPlafon="item">
            <p>{{ formatInput(item.maxPlafon) }}</p>
          </template>
          <!-- <template #item-canAppeal="item">
            <p>{{ item.canAppeal == 1 ? "&#x2713;" : "x" }}</p>
          </template> -->
          <template #item-canApprove="item">
            <p>{{ item.canApprove == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-isSecret="item">
            <p>{{ item.isSecret == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-notification="item">
            <p>{{ item.notification == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-canInsertData="item">
            <p>{{ item.canInsertData == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-operation="item">
            <div class="operation-wrapper">
              <button>
                <VIcon size="20" icon="bx-edit" color="blue" @click="openModal(2, item)" />
              </button>
              &nbsp;
              <button>
                <VIcon size="20" icon="bx-trash" color="red" @click="deleteNotifConf(item)" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </v-card>

      <!-- phase4 -->
      <v-card class="my-2">
        <VCardItem class="align-left">
          <VCardTitle class="text-2xl font-weight-bold"> Phase 4 </VCardTitle>
        </VCardItem>
        <EasyDataTable show-index :headers="phase4Headers" :items="phase4Items">
          <template #empty-message>
            <p>Data Kosong</p>
          </template>
          <template #loading>
            <p>loading data .....</p>
          </template>
          <template #item-minPlafon="item">
            <p>{{ formatInput(item.minPlafon) }}</p>
          </template>
          <template #item-maxPlafon="item">
            <p>{{ formatInput(item.maxPlafon) }}</p>
          </template>
          <!-- <template #item-canAppeal="item">
            <p>{{ item.canAppeal == 1 ? "&#x2713;" : "x" }}</p>
          </template> -->
          <template #item-canApprove="item">
            <p>{{ item.canApprove == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-notification="item">
            <p>{{ item.notification == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-isSecret="item">
            <p>{{ item.isSecret == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-canInsertData="item">
            <p>{{ item.canInsertData == 1 ? "&#x2713;" : "x" }}</p>
          </template>
          <template #item-operation="item">
            <div class="operation-wrapper">
              <button>
                <VIcon size="20" icon="bx-edit" color="blue" @click="openModal(2, item)" />
              </button>
              &nbsp;
              <button>
                <VIcon size="20" icon="bx-trash" color="red" @click="deleteNotifConf(item)" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </v-card>

      <v-dialog v-model="insert" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Tambah Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <VCol cols="12" md="12">
                  <v-autocomplete v-model="dataFormIn.office_id" :items="offices" hint="Pilih Kantor" label="Kantor"
                    clearable persistent-hint disabled prepend-icon="mdi-divide"></v-autocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete v-model="dataFormIn.position_id" :items="positions" hint="Pilih Jabatan"
                    label="Jabatan" clearable autofocus persistent-hint prepend-icon="mdi-divide"></v-autocomplete>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Pilih Phase" :items="[
                    { value: 1, title: 'Phase 1' },
                    { value: 2, title: 'Phase 2' },
                    { value: 3, title: 'Phase 3' },
                    { value: 4, title: 'Phase 4' },
                  ]" v-model="dataFormIn.phase" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField label="Minimal Plafon" v-model="dataFormIn.minPlafon" type="text" @input="formatInputIn"
                     prepend-icon="mdi-help-rhombus" />
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField label="Maximal Plafon" v-model="dataFormIn.maxPlafon" type="text" @input="formatInputIn"
                    autofocus prepend-icon="mdi-help-rhombus" />
                </VCol>
                <!-- <VCol md="12" cols="12">
                  <v-select label="Banding?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canAppeal" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol> -->
                <VCol md="12" cols="12">
                  <v-select label="Approve?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canApprove" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Notifikasi?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.notification" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Tambah Data?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canInsertData" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <!-- //khusus slik -->
                <VCol md="12" cols="12" v-if="dataFormIn.phase >= 2">
                  <v-select label="Akses SLIK?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button type="button" class="btn btn-blue" @click="closeModal(1)">
                    Batal
                  </button>
                </VCol>
              </VRow>
            </VForm>
          </template>
        </v-card>
      </v-dialog>
      <v-dialog v-model="edit" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Update Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol cols="12" md="12">
                  <v-autocomplete v-model="dataFormIn.office_id" :items="offices" hint="Pilih Kantor" label="Kantor"
                    clearable persistent-hint disabled prepend-icon="mdi-divide"></v-autocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete v-model="dataFormIn.position_id" :items="positions" hint="Pilih Jabatan"
                    label="Jabatan" clearable persistent-hint prepend-icon="mdi-divide"></v-autocomplete>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Pilih Phase" :items="[
                    { value: 1, title: 'Phase 1' },
                    { value: 2, title: 'Phase 2' },
                    { value: 3, title: 'Phase 3' },
                    { value: 4, title: 'Phase 4' },
                  ]" v-model="dataFormIn.phase" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField label="Minimal Plafon" v-model="dataFormIn.minPlafon" type="text" @input="formatInputIn"
                    autofocus prepend-icon="mdi-help-rhombus" />
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField label="Maximal Plafon" v-model="dataFormIn.maxPlafon" type="text" @input="formatInputIn"
                    autofocus prepend-icon="mdi-help-rhombus" />
                </VCol>
                <!-- <VCol md="12" cols="12">
                  <v-select label="Banding?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canAppeal" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol> -->
                <VCol md="12" cols="12">
                  <v-select label="Approve?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canApprove" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Notifikasi?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.notification" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select label="Tambah Data?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.canInsertData" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <!-- //khusus slik -->
                <VCol md="12" cols="12" v-if="dataFormIn.phase >= 2">
                  <v-select label="Akses SLIK?" :items="[
                    { value: 1, title: 'Ya' },
                    { value: 0, title: 'Tidak' },
                  ]" v-model="dataFormIn.isSecret" prepend-icon="mdi-help-rhombus"></v-select>
                </VCol>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button type="button" class="btn btn-blue" @click="closeModal(2)">
                    Batal
                  </button>
                </VCol>
              </VRow>
            </VForm>
          </template>
        </v-card>
      </v-dialog>
    </VCard>
  </div>
</template>
<script lang="ts">
import mainURL from "@/axios";
export default {
  data() {
    return {
      overlay: false,
      rules: {
        required: (value: any) => !!value || "Required",
      },
      dataFormIn: {
        id: null,
        office_id: null,
        position_id: null,
        phase: null,
        minPlafon: null,
        maxPlafon: null,
        //canAppeal: 0,
        canApprove: 0,
        notification: 0,
        canInsertData: 0,
        isSecret: 0,
      },
      officeId: this.$route.params.officeId,
      insert: false,
      edit: false,
      dataForm: {
        officeId: null,
        phase: null,
      },

      offices: [],
      positions: [],
      //phase1
      phase1Items: [],
      phase1Headers: [
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Phase", value: "phase", sortable: true },
        { text: "Min. Plafon", value: "minPlafon", sortable: true },
        { text: "Max. Plafon", value: "maxPlafon", sortable: true },
        //{ text: "Banding?", value: "canAppeal", sortable: true },
        { text: "Approve?", value: "canApprove", sortable: true },
        { text: "Notifikasi?", value: "notification", sortable: true },
        { text: "Tambah Data?", value: "canInsertData", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      //phase2
      phase2Items: [],
      phase2Headers: [
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Phase", value: "phase", sortable: true },
        { text: "Min. Plafon", value: "minPlafon", sortable: true },
        { text: "Max. Plafon", value: "maxPlafon", sortable: true },
        //{ text: "Banding?", value: "canAppeal", sortable: true },
        { text: "Approve?", value: "canApprove", sortable: true },
        { text: "Notifikasi?", value: "notification", sortable: true },
        { text: "Akses SLIK?", value: "isSecret", sortable: true },
        { text: "Tambah Data?", value: "canInsertData", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      //phase3
      phase3Items: [],
      phase3Headers: [
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Phase", value: "phase", sortable: true },
        { text: "Min. Plafon", value: "minPlafon", sortable: true },
        { text: "Max. Plafon", value: "maxPlafon", sortable: true },
        //{ text: "Banding?", value: "canAppeal", sortable: true },
        { text: "Approve?", value: "canApprove", sortable: true },
        { text: "Notifikasi", value: "notification", sortable: true },
        { text: "Akses SLIK?", value: "isSecret", sortable: true },
        { text: "Tambah Data?", value: "canInsertData", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      //phase4
      phase4Items: [],
      phase4Headers: [
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Phase", value: "phase", sortable: true },
        { text: "Min. Plafon", value: "minPlafon", sortable: true },
        { text: "Max. Plafon", value: "maxPlafon", sortable: true },
        //{ text: "Banding?", value: "canAppeal", sortable: true },
        { text: "Approve?", value: "canApprove", sortable: true },
        { text: "Notifikasi", value: "notification", sortable: true },
        { text: "Akses SLIK?", value: "isSecret", sortable: true },
        { text: "Tambah Data?", value: "canInsertData", sortable: true },
        { text: "Operation", value: "operation" },
      ],
    };
  },
  methods: {
    formatInputIn(event: { target: { value: any } }) {
      let value = event.target.value;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      event.target.value = value;
    },
    async deleteNotifConf(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/notifconf/${item.id}`);

        if (response.status === 200) {
          this.getAll();
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.getAll();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.getAll();
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async insertData() {
      try {
        for (let key in this.dataForm) {
          if (key !== "id") {
            if (this.dataFormIn[key] === null) {
              this.closeModal(1);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
        }

        const formData = new FormData();
        formData.append("office_id", this.dataFormIn.office_id);
        formData.append("position_id", this.dataFormIn.position_id);
        formData.append("phase", this.dataFormIn.phase);
        // formData.append("canAppeal", this.dataFormIn.canAppeal);
        formData.append("canApprove", this.dataFormIn.canApprove);
        formData.append("notification", this.dataFormIn.notification);
        formData.append("canInsertData", this.dataFormIn.canInsertData);
        if (this.dataFormIn.phase >= 2) {
          formData.append("isSecret", this.dataFormIn.isSecret);
        } else {
          formData.append("isSecret", '0');
        }
        formData.append(
          "minPlafon",
          this.dataFormIn.minPlafon.replace(/\D/g, "")
        );
        formData.append(
          "maxPlafon",
          this.dataFormIn.maxPlafon.replace(/\D/g, "")
        );
        formData.append("_method", "POST");
        
        const response = await mainURL.post("/notifconf", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAll();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.closeModal(1);
          this.getAll();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(1);
        this.getAll();
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateData() {
      try {
        const formData = new FormData();
        formData.append("office_id", this.dataFormIn.office_id);
        formData.append("position_id", this.dataFormIn.position_id);
        formData.append("phase", this.dataFormIn.phase);
        // formData.append("canAppeal", this.dataFormIn.canAppeal);
        formData.append("canApprove", this.dataFormIn.canApprove);
        formData.append("notification", this.dataFormIn.notification);
        formData.append("canInsertData", this.dataFormIn.canInsertData);
        if (this.dataFormIn.phase >= 2) {
          formData.append("isSecret", this.dataFormIn.isSecret);
        } else {
          formData.append("isSecret", '0');
        }
        formData.append(
          "minPlafon",
          this.dataFormIn.minPlafon.replace(/\D/g, "")
        );
        formData.append(
          "maxPlafon",
          this.dataFormIn.maxPlafon.replace(/\D/g, "")
        );
        formData.append("_method", "PUT");
        const response = await mainURL.post(
          `/notifconf/${this.dataFormIn.id}`,
          formData
        );
        if (response.status === 200) {
          this.closeModal(2);
          this.getAll();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.closeModal(2);
          this.getAll();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(2);
        this.getAll();
        this.$showToast("error", "Sorry", error.response.data.message);
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
      this.dataFormIn = {
        id: null,
        office_id: null,
        position_id: null,
        phase: null,
        minPlafon: null,
        maxPlafon: null,
        // canAppeal: null,
        canApprove: null,
        notification: null,
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.getOffices();
        this.getPositions();
        this.dataFormIn.office_id = this.officeId;
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.getOffices();
          this.getPositions();
          this.dataFormIn.id = item.id;
          this.dataFormIn.office_id = item.office_id;
          this.dataFormIn.position_id = item.position_id;
          this.dataFormIn.phase = item.phase;
          this.dataFormIn.minPlafon = item.minPlafon;
          this.dataFormIn.maxPlafon = item.maxPlafon;
          // this.dataFormIn.canAppeal = item.canAppeal;
          this.dataFormIn.canApprove = parseInt(item.canApprove);
          this.dataFormIn.notification = parseInt(item.notification);
          this.dataFormIn.isSecret = parseInt(item.isSecret);
          this.dataFormIn.canInsertData = parseInt(item.canInsertData);
          this.edit = true;
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    formatInput(item: any) {
      let value = item;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
    async getNotifConf(officeId: any, phase: any) {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("officeId", officeId);
        formData.append("phase", phase);
        formData.append("_method", "POST");
        const response = await mainURL.post("/detailnotifconf", formData);
        if (response.status === 200) {
          if (phase === 1) {
            this.phase1Items = response.data.data;
            this.overlay = false;
          } else if (phase == 2) {
            this.phase2Items = response.data.data;
          } else if (phase == 3) {
            this.phase3Items = response.data.data;
          } else if (phase == 4) {
            this.phase4Items = response.data.data;
          }
        } else {
          this.$showToast("error", "Sorry", "error get data positions");
          this.overlay = false;
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data positions");
        this.overlay = false;
      }
    },
    async getOffices() {
      try {
        const response = await mainURL.get("/office");
        if (response.status === 200) {
          this.offices = response.data.data.map(
            (item: { id: any; name: any; code: any }) => ({
              value: item.id,
              title: item.code + " - " + item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data office");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data office");
      }
    },
    async getPositions() {
      try {
        const response = await mainURL.get("/position");
        if (response.status === 200) {
          this.positions = response.data.data.map((item) => ({
            value: item.id,
            title: `${item.name} - ${item.offices
              .map((office) => office.name)
              .join(", ")}`,
          }));
        } else {
          this.$showToast("error", "Sorry", "error get data positions");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data positions");
      }
    },
    async getAll() {
      this.getNotifConf(this.officeId, 1);
      this.getNotifConf(this.officeId, 2);
      this.getNotifConf(this.officeId, 3);
      this.getNotifConf(this.officeId, 4);
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>
