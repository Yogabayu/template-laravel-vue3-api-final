<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Kantor
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
      <v-dialog v-model="insert" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Tambah Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Kode Kantor"
                    label="Kode"
                    v-model="dataForm.code"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
                </VCol>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Kantor"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
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
      <v-dialog v-model="edit" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Update Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Kode Kantor"
                    label="Kode"
                    v-model="dataForm.code"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
                </VCol>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Kantor"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
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
                @click="deleteOffice(item)"
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
        code: "",
        name: "",
      },
      items: [],
      headers: [
        { text: "Nama Kantor", value: "name", sortable: true },
        { text: "Kode Kantor", value: "code", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
    };
  },
  methods: {
    async deleteOffice(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/office/${item.id}`);

        if (response.status === 200) {
          this.getAllOffices();
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
        formData.append("code", this.dataForm.code);
        formData.append("name", this.dataForm.name);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/office/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.closeModal(2);
          this.getAllOffices();
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
        formData.append("code", this.dataForm.code);
        formData.append("_method", "POST");

        const response = await mainURL.post("/office", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAllOffices();
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
        code: "",
        name: "",
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.dataForm.code = item.code;
          this.dataForm.name = item.name;
          this.dataForm.id = item.id;
          this.edit = true;
        }
      }
    },
    async getAllOffices() {
      try {
        const response = await mainURL.get("/office");

        if (response.status === 200) {
          this.items = response.data.data;
        //   this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getAllOffices();
  },
};
</script>
