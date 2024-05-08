<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Konfigurasi Fase Kredit
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
        <!-- <v-btn
          color="primary"
          size="small"
          class="my-3 mx-3"
          @click="openModal(1)"
        >
          Tambah Data
        </v-btn> -->
        <v-spacer></v-spacer>

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
                <VCol cols="12" md="12">
                  <v-autocomplete
                    v-model="dataForm.office_id"
                    :items="offices"
                    hint="Pilih Kantor"
                    label="Kantor"
                    clearable
                    persistent-hint
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
                </VCol>
                <VCol cols="12" md="12">
                  <v-autocomplete
                    v-model="dataForm.position_id"
                    :items="positions"
                    hint="Pilih Jabatan"
                    label="Jabatan"
                    clearable
                    persistent-hint
                    prepend-icon="mdi-divide"
                  ></v-autocomplete>
                </VCol>
                <VCol md="12" cols="12">
                  <v-select
                    label="Pilih Phase"
                    :items="[
                      { value: 1, title: 'Phase 1' },
                      { value: 2, title: 'Phase 2' },
                      { value: 3, title: 'Phase 3' },
                      { value: 4, title: 'Phase 4' },
                    ]"
                    v-model="dataForm.phase"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField
                    label="Minimal Plafon"
                    v-model="dataForm.minPlafon"
                    type="text"
                    @input="formatInput"
                    autofocus
                    prepend-icon="mdi-help-rhombus"
                  />
                </VCol>
                <VCol md="6" cols="12">
                  <VTextField
                    label="Maximal Plafon"
                    v-model="dataForm.maxPlafon"
                    type="text"
                    @input="formatInput"
                    autofocus
                    prepend-icon="mdi-help-rhombus"
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
                icon="bx-file-find"
                color="blue"
                @click="toDetail(item)"
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
        office_id: null,
        position_id: null,
        phase: null,
        minPlafon: null,
        maxPlafon: null,
      },
      items: [],
      offices: [],
      positions: [],
      headers: [
        { text: "Nama Kantor", value: "name", sortable: true },
        {
          text: "Total Pengaturan",
          value: "notification_configurations_count",
          sortable: true,
        },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
    };
  },
  methods: {
    toDetail(item: any) {
      this.$router.push(`/notifconf/${item.id}`);
    },
    formatInput(event: { target: { value: any } }) {
      let value = event.target.value;
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      event.target.value = value;
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
        formData.append("office_id", this.dataForm.office_id);
        formData.append("position_id", this.dataForm.position_id);
        formData.append("phase", this.dataForm.phase);
        formData.append(
          "minPlafon",
          this.dataForm.minPlafon.replace(/\D/g, "")
        );
        formData.append(
          "maxPlafon",
          this.dataForm.maxPlafon.replace(/\D/g, "")
        );
        formData.append("_method", "POST");

        const response = await mainURL.post("/notifconf", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAllNotifConf();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.getAllNotifConf();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.getAllNotifConf();
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
        office_id: null,
        position_id: null,
        phase: null,
        minPlafon: null,
        maxPlafon: null,
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.getOffices();
        this.getPositions();
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.getOffices();
          this.getPositions();
          this.dataForm.id = item.id;
          this.dataForm.offices = item.offices.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.dataForm.positions = item.positions.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.dataForm.phase = item.phase;
          this.dataForm.minPlafon = item.minPlafon;
          this.dataForm.maxPlafon = item.maxPlafon;
          this.edit = true;
        }
      }
    },
    async getAllNotifConf() {
      try {
        const response = await mainURL.get("/notifconf");

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
    async getPositions() {
      try {
        const response = await mainURL.get("/position");
        if (response.status === 200) {
          this.positions = response.data.data.map(
            (item: { id: any; name: any; code: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data positions");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data positions");
      }
    },
  },
  mounted() {
    this.getAllNotifConf();
  },
};
</script>
