<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Jabatan
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

      <v-dialog
        v-model="insert"
        width="auto"
        persistent
        transition="dialog-top-transition"
      >
        <v-card>
          <template v-slot:title> Tambah Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Jabatan"
                    label="Jabatan"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete
                    v-model="dataForm.offices"
                    :items="offices"
                    hint="Pilih Cakupan Kantor"
                    label="Cakupan Kantor"
                    multiple
                    chips
                    clearable
                    persistent-hint
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete
                    label="Pilih Role"
                    :items="roles"
                    v-model="dataForm.role_id"
                    :rules="[rules.required]"
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
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

      <v-dialog
        v-model="edit"
        width="auto"
        persistent
        transition="dialog-top-transition"
      >
        <v-card>
          <template v-slot:title> Update Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Jabatan"
                    label="Jabatan"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-devide"
                  />
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete
                    v-model="dataForm.offices"
                    :items="offices"
                    hint="Pilih Cakupan Kantor"
                    label="Cakupan Kantor"
                    multiple
                    chips
                    clearable
                    persistent-hint
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete
                    label="Pilih Role"
                    :items="roles"
                    v-model="dataForm.role_id"
                    :rules="[rules.required]"
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
                </VCol>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal(2)"
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
        <template #item-offices="item">
          <v-chip-group selected-class="text-primary" column>
            <template v-if="item.offices.length <= 5">
              <div v-for="(x, index) in item.offices" :key="index">
                <VChip style="color: rgb(6, 84, 107)">
                  {{ x.name }}
                </VChip>
              </div>
            </template>
            <template v-else>
              <div v-for="(x, index) in item.offices.slice(0, 5)" :key="index">
                <VChip style="color: rgb(6, 84, 107)">
                  {{ x.name }}
                </VChip>
              </div>
              <VChip
                style="color: rgb(6, 84, 107)"
                @click="showAllOffice(item)"
              >
                +{{ item.positions.length - 5 }} lainnya
              </VChip>

              <v-dialog
                v-model="isShowDetailOffice"
                width="auto"
                persistent
                transition="dialog-top-transition"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Daftar Kantor</span>
                  </v-card-title>
                  <v-card-text>
                    <v-chip-group selected-class="text-primary" column>
                      <div
                        v-for="(x, index) in detailOffice.positions"
                        :key="index"
                      >
                        <VChip style="color: rgb(6, 84, 107)">
                          {{ x.name }}
                        </VChip>
                      </div>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
          </v-chip-group>
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
                @click="deletePosition(item)"
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
        offices: [],
        role_id: null,
      },
      items: [],
      offices: [],
      roles: [],
      headers: [
        { text: "Nama Posisi", value: "name", sortable: true },
        { text: "Cakupan Kantor", value: "offices", sortable: true },
        { text: "Permission", value: "role.name", sortable: true },
        { text: "Jumlah User", value: "users_count", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
      detailOffice: null,
      isShowDetailOffice: false,
    };
  },
  methods: {
    showAllOffice(item: any) {
      this.detailOffice = item;
      this.isShowDetailOffice = true;
    },
    async deletePosition(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/position/${item.id}`);

        if (response.status === 200) {
          this.getAllPositions();
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
        // this.dataForm.offices.forEach((office: string | Blob) => {
        //   if (office['value']) {
        //     formData.append("offices[]", office['value']);
        //   } else {
        //     formData.append("offices[]", office);
        //   }
        // });
        this.dataForm.offices.forEach((office: any) => {
          if (office.hasOwnProperty("value")) {
            formData.append("offices[]", office["value"]);
          } else {
            formData.append("offices[]", office);
          }
        });
        formData.append("role_id", this.dataForm.role_id);
        formData.append("_method", "PUT");
        
        const response = await mainURL.post(
          `/position/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.closeModal(2);
          this.getAllPositions();
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
        this.dataForm.offices.forEach((office: string | Blob) => {
          formData.append("offices[]", office);
        });
        formData.append("role_id", this.dataForm.role_id);
        formData.append("_method", "POST");

        const response = await mainURL.post("/position", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAllPositions();
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
        offices: [],
        role_id: null,
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.getOffices();
        this.getRoles();
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.getOffices();
          this.getRoles();
          this.dataForm.id = item.id;
          this.dataForm.name = item.name;
          this.dataForm.offices = item.offices.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.dataForm.role_id = item.role_id;
          this.edit = true;
        }
      }
    },
    async getAllPositions() {
      try {
        const response = await mainURL.get("/position");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
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
    async getRoles() {
      try {
        const response = await mainURL.get("/role");
        if (response.status === 200) {
          this.roles = response.data.data.map(
            (item: { id: any; name: any; code: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data role");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data role");
      }
    },
  },
  mounted() {
    this.getAllPositions();
  },
};
</script>
