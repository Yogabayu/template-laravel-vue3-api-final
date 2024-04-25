<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Permission
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
        <v-btn
          color="primary"
          size="small"
          class="my-3 mx-3"
          @click="openModal(1)"
        >
          Tambah Data
        </v-btn>

        <div class="d-flex align-center pe-2 w-25">
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
        </div>
      </div>

      <v-dialog v-model="insert" width="auto">
        <v-card>
          <template v-slot:title> Tambah Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Role"
                    label="Role"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-shield"
                  />
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 1?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase1Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 2?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase2Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 3?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase3Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 4?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase4Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses SLIK?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isSlikAccess"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 1?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase1"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 2?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase2"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 3?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase3"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 4?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase4"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Ajukan Banding?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canAppeal"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Approve?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprove"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Insert Data?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canInsertData"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Comment?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canComment"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

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
        </v-card>
      </v-dialog>

      <v-dialog v-model="edit" width="auto">
        <v-card>
          <template v-slot:title> Update Data Role </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Role"
                    label="Role"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-shield"
                  />
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 1?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase1Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 2?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase2Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 3?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase3Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Phase 4?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isPhase4Access"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses SLIK?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.isSlikAccess"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 1?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase1"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 2?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase2"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 3?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase3"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Approve Phase 4?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprovePhase4"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Ajukan Banding?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canAppeal"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Approve?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canApprove"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Insert Data?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canInsertData"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol md="12" cols="12">
                  <v-select
                    label="Akses Comment?"
                    :items="[
                      { value: 1, title: 'Ya' },
                      { value: 0, title: 'Tidak' },
                    ]"
                    v-model="dataForm.canComment"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

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
        </v-card>
      </v-dialog>

      <EasyDataTable
        show-index
        :headers="headers"
        :items="items"
        :search-value="searchValue"
      >
        <template #empty-message>
          <p>Data Kantor Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-isPhase1Access="item">
          <p>{{ item.isPhase1Access == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-isPhase2Access="item">
          <p>{{ item.isPhase2Access == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-isPhase3Access="item">
          <p>{{ item.isPhase3Access == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-isPhase4Access="item">
          <p>{{ item.isPhase4Access == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-isSlikAccess="item">
          <p>{{ item.isSlikAccess == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canApprovePhase1="item">
          <p>{{ item.canApprovePhase1 == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canApprovePhase2="item">
          <p>{{ item.canApprovePhase2 == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canApprovePhase3="item">
          <p>{{ item.canApprovePhase3 == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canApprovePhase4="item">
          <p>{{ item.canApprovePhase4 == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canAppeal="item">
          <p>{{ item.canAppeal == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canApprove="item">
          <p>{{ item.canApprove == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canInsertData="item">
          <p>{{ item.canInsertData == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-canComment="item">
          <p>{{ item.canComment == 1 ? "&#x2713;" : "x" }}</p>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <button>
              <VIcon
                size="20"
                icon="bx-edit"
                color="blue"
                @click="openModal(2, item)"
              />
            </button>
            &nbsp;
            <button>
              <VIcon
                size="20"
                icon="bx-trash"
                color="red"
                @click="deleteRole(item)"
              />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>
<script lang="ts">
import mainURL from "@/axios";
export default {
  data() {
    return {
      rules: {
        required: (value: any) => !!value || "Required",
      },
      dataForm: {
        id: null,
        name: "",
        isPhase1Access: 1,
        isPhase2Access: 0,
        isPhase3Access: 0,
        isPhase4Access: 0,
        isSlikAccess: 0,
        canApprovePhase1: 1,
        canApprovePhase2: 0,
        canApprovePhase3: 0,
        canApprovePhase4: 0,
        canAppeal: 0,
        canApprove: 0,
        canInsertData: 0,
        canComment: 0,
      },
      items: [],
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Akses Phase 1", value: "isPhase1Access", sortable: true },
        { text: "Akses Phase 2", value: "isPhase2Access", sortable: true },
        { text: "Akses Phase 3", value: "isPhase3Access", sortable: true },
        { text: "Akses Phase 4", value: "isPhase4Access", sortable: true },
        { text: "Akses Slik", value: "isSlikAccess", sortable: true },
        { text: "Approve Phase 1", value: "canApprovePhase1", sortable: true },
        { text: "Approve Phase 2", value: "canApprovePhase2", sortable: true },
        { text: "Approve Phase 3", value: "canApprovePhase3", sortable: true },
        { text: "Approve Phase 4", value: "canApprovePhase4", sortable: true },
        { text: "Banding", value: "canAppeal", sortable: true },
        { text: "Approve", value: "canApprove", sortable: true },
        { text: "Tambah Data", value: "canInsertData", sortable: true },
        { text: "Tambah Komentar", value: "canComment", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
    };
  },
  methods: {
    async deleteRole(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/role/${item.id}`);

        if (response.status === 200) {
          this.getAllRole();
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateData() {
      try {
        const formData = new FormData();
        formData.append("name", this.dataForm.name);
        formData.append("isPhase1Access", this.dataForm.isPhase1Access);
        formData.append("isPhase2Access", this.dataForm.isPhase2Access);
        formData.append("isPhase3Access", this.dataForm.isPhase3Access);
        formData.append("isPhase4Access", this.dataForm.isPhase4Access);
        formData.append("isSlikAccess", this.dataForm.isSlikAccess);
        formData.append("canApprovePhase1", this.dataForm.canApprovePhase1);
        formData.append("canApprovePhase2", this.dataForm.canApprovePhase2);
        formData.append("canApprovePhase3", this.dataForm.canApprovePhase3);
        formData.append("canApprovePhase4", this.dataForm.canApprovePhase4);
        formData.append("canAppeal", this.dataForm.canAppeal);
        formData.append("canApprove", this.dataForm.canApprove);
        formData.append("canInsertData", this.dataForm.canInsertData);
        formData.append("canComment", this.dataForm.canComment);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/role/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.closeModal(2);
          this.getAllRole();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async insertData() {
      try {
        for (let key in this.dataForm) {
          if (key !== "id") {
            if (this.dataForm[key] === null) {
              this.closeModal(1);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
        }

        const formData = new FormData();
        formData.append("name", this.dataForm.name);
        formData.append("isPhase1Access", this.dataForm.isPhase1Access);
        formData.append("isPhase2Access", this.dataForm.isPhase2Access);
        formData.append("isPhase3Access", this.dataForm.isPhase3Access);
        formData.append("isPhase4Access", this.dataForm.isPhase4Access);
        formData.append("isSlikAccess", this.dataForm.isSlikAccess);
        formData.append("canApprovePhase1", this.dataForm.canApprovePhase1);
        formData.append("canApprovePhase2", this.dataForm.canApprovePhase2);
        formData.append("canApprovePhase3", this.dataForm.canApprovePhase3);
        formData.append("canApprovePhase4", this.dataForm.canApprovePhase4);
        formData.append("canAppeal", this.dataForm.canAppeal);
        formData.append("canApprove", this.dataForm.canApprove);
        formData.append("canInsertData", this.dataForm.canInsertData);
        formData.append("canComment", this.dataForm.canComment);
        formData.append("_method", "POST");

        const response = await mainURL.post("/role", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAllRole();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
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
      this.dataForm = {
        id: null,
        name: "",
        isPhase1Access: 1,
        isPhase2Access: 0,
        isPhase3Access: 0,
        isPhase4Access: 0,
        isSlikAccess: 0,
        canApprovePhase1: 1,
        canApprovePhase2: 0,
        canApprovePhase3: 0,
        canApprovePhase4: 0,
        canAppeal: 0,
        canApprove: 0,
        canInsertData: 0,
        canComment: 0,
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.dataForm.id = item.id;
          this.dataForm.name = item.name;
          this.dataForm.isPhase1Access = item.isPhase1Access;
          this.dataForm.isPhase2Access = item.isPhase2Access;
          this.dataForm.isPhase3Access = item.isPhase3Access;
          this.dataForm.isPhase4Access = item.isPhase4Access;
          this.dataForm.isSlikAccess = item.isSlikAccess;
          this.dataForm.canApprovePhase1 = item.canApprovePhase1;
          this.dataForm.canApprovePhase2 = item.canApprovePhase2;
          this.dataForm.canApprovePhase3 = item.canApprovePhase3;
          this.dataForm.canApprovePhase4 = item.canApprovePhase4;
          this.dataForm.canAppeal = item.canAppeal;
          this.dataForm.canAppeal = item.canApprove;
          this.dataForm.canInsertData = item.canInsertData;
          this.dataForm.canComment = item.canComment;
          this.edit = true;
        }
      }
    },
    async getAllRole() {
      try {
        const response = await mainURL.get("/role");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getAllRole();
  },
};
</script>
