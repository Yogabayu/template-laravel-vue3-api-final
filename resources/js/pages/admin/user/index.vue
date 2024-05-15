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
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold"> Daftar User </VCardTitle>
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
                    placeholder="NIK user"
                    label="NIK"
                    v-model="dataForm.nik"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-account-key"
                  />
                </VCol>

                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama User"
                    label="User"
                    v-model="dataForm.name"
                    :rules="[rules.required]"
                    prepend-icon="mdi-user"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <VTextField
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    prepend-icon="mdi-mail"
                    v-model="dataForm.email"
                    :rules="emailRules"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <VTextField
                    v-model="dataForm.password"
                    :rules="[rules.required]"
                    prepend-icon="mdi-lock"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'bx-hide' : 'bx-show'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <v-autocomplete
                    label="Jabatan - Cakupan Kantor"
                    :items="positions"
                    v-model="dataForm.position_id"
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

      <v-dialog v-model="edit" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Update Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="NIK user"
                    label="NIK"
                    v-model="dataForm.nik"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-account-key"
                  />
                </VCol>

                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama User"
                    label="User"
                    v-model="dataForm.name"
                    :rules="[rules.required]"
                    prepend-icon="mdi-user"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <VTextField
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    prepend-icon="mdi-mail"
                    v-model="dataForm.email"
                    :rules="emailRules"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <VTextField
                    v-model="dataForm.password"
                    prepend-icon="mdi-lock"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'bx-hide' : 'bx-show'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <v-autocomplete
                    label="Jabatan - Cakupan Kantor"
                    :items="positions"
                    v-model="dataForm.position_id"
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

      <v-dialog v-model="isTelegram" width="auto" persistent 
          transition="dialog-top-transition">
        <v-card>
          <template v-slot:title> Connect ke Telegram </template>
          <template v-slot:text>
            <VRow class="mb-3">
              <VCol md="12" cols="12">
                <v-alert
                  density="compact"
                  title="Langkah-langkah untuk Menghubungkan Akun Telegram Anda:"
                  type="warning"
                >
                  <ol>
                    <li>1. Pastikan Anda telah masuk ke akun Telegram Anda.</li>
                    <li>
                      2. Isi bagian Username pada pengaturan profil Telegram
                      Anda.
                    </li>
                    <li>
                      3. Chat Bot Telegram :
                      <a
                        href="https://t.me/bprarthaya_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        >@bprarthaya_bot</a
                      >
                    </li>
                    <li>4. Klik /start</li>
                    <li>
                      5. Kemudian isi username dibawah sesuai dengan profile
                      anda sebelumnya, dan klik connect
                    </li>
                  </ol>
                </v-alert>
              </VCol>
            </VRow>

            <v-divider
              :thickness="2"
              class="border-opacity-100"
              color="info"
            ></v-divider>
            <VForm class="mt-3 mb-3" @submit.prevent="connectTelegram">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Username Telegram"
                    label="Username"
                    v-model="dataTelegram.username"
                    :rules="[rules.required]"
                    prepend-icon="mdi-user"
                  />
                </VCol>

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Connect</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal(3)"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    class="btn btn-blue"
                    color="error"
                    @click="connectTelegram(2)"
                  >
                    disconnect
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
        <template #item-office="item">
          <v-chip-group selected-class="text-primary" column>
            <template v-if="item.position.offices.length <= 5">
              <div v-for="(x, index) in item.position.offices" :key="index">
                <VChip style="color: rgb(6, 84, 107)">
                  {{ x.name }}
                </VChip>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(x, index) in item.position.offices.slice(0, 5)"
                :key="index"
              >
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

              <v-dialog v-model="isShowDetailOffice" width="auto" persistent 
          transition="dialog-top-transition">
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
        <template #item-isActive="item">
          <v-chip
            v-if="item.isActive"
            color="success"
            @click="changeStatus(item)"
            >Active</v-chip
          >
          <v-chip v-else color="error" @click="changeStatus(item)"
            >Non-Active</v-chip
          >
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <div class="d-flex justify-space-between">
              <v-tooltip location="top" text="Edit User">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="openModal(2, item)">
                    <VIcon size="20" icon="bx-edit" color="info" />
                  </button>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="Hapus User">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="deleteUser(item)">
                    <VIcon size="20" icon="bx-trash" color="error" />
                  </button>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="Connect ke Telegram">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="openModal(3, item)">
                    <VIcon
                      v-if="item.telegram_chat_id"
                      size="20"
                      icon="bx-bxl-telegram"
                      color="info"
                    />
                    <VIcon
                      v-else
                      size="20"
                      icon="bx-bxl-telegram"
                      color="error"
                    />
                  </button>
                </template>
              </v-tooltip>
            </div>
          </div>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>
<script lang="ts">
import mainURL from "@/axios";
import { defineComponent } from "vue";

export default defineComponent({
  watch: {
    "dataForm.email": function (mail) {
      // e_Mail is the exact name used in v-model
      if (mail !== "") {
        this.emailRules = [
          (v: string) =>
            v.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || "Invalid Email address",
        ];
      } else if (mail === "") {
        this.emailRules = [];
      }
    },
  },
  data() {
    return {
      overlay: false,
      rules: {
        required: (value: any) => !!value || "Required",
      },
      emailRules: [],
      detailOffice: null,
      positions: [],
      dataForm: {
        id: null,
        nik: "",
        name: "",
        email: "",
        password: null,
        position_id: null,
      },
      items: [],
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "NIK", value: "nik", sortable: true },
        { text: "E-mail", value: "email", sortable: true },
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Cakupan Kantor", value: "office", sortable: true },
        { text: "Status", value: "isActive", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
      isShowDetailOffice: false,
      isPasswordVisible: false,

      //telegram
      isTelegram: false,
      dataTelegram: {
        id: null,
        type: 1,
        username: "",
      },
    };
  },
  methods: {
    async connectTelegram(type: any) {
      try {
        this.overlay = true;

        if (type == 2) {
          for (let key in this.dataTelegram) {
            if (this.dataTelegram[key] === null) {
              this.closeModal(3);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
          this.dataTelegram.type = 2;
          const formData = new FormData();
          formData.append("id", this.dataTelegram.id);
          formData.append("username", this.dataTelegram.username);
          formData.append("type", this.dataTelegram.type);
          formData.append("_method", "POST");

          const response = await mainURL.post("/userGetChatId", formData);
          if (response.status === 200) {
            this.overlay = false;
            this.closeModal(3);
            this.getAllUsers();
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.closeModal(3);
            this.$showToast("error", "Sorry", response.data.message);
          }
        } else {
          for (let key in this.dataTelegram) {
            if (this.dataTelegram[key] === null) {
              this.closeModal(3);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }

          const formData = new FormData();
          formData.append("id", this.dataTelegram.id);
          formData.append("username", this.dataTelegram.username);
          formData.append("type", this.dataTelegram.type);
          formData.append("_method", "POST");

          const response = await mainURL.post("/userGetChatId", formData);
          if (response.status === 200) {
            this.overlay = false;
            this.closeModal(3);
            this.getAllUsers();
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.closeModal(3);
            this.$showToast("error", "Sorry", response.data.message);
          }
        }
      } catch (error) {
        this.overlay = false;
        this.closeModal(3);
        this.$showToast("error", "Sorry", error.response.data.message);
        this.getAllUsers();
      }
    },
    async changeStatus(item: any) {
      try {
        const response = await mainURL.get(`/changeStatusUser/${item.id}`);

        if (response.status === 200) {
          this.getAllUsers();
          this.$showToast("success", "Berhasill", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    showAllOffice(item: any) {
      this.detailOffice = item;
      this.isShowDetailOffice = true;
    },
    async deleteUser(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/${item.id}`);

        if (response.status === 200) {
          this.getAllUsers();
          this.$showToast("success", "Berhasill", response.data.message);
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
        for (let key in this.dataForm) {
          if (this.dataForm[key] !== null) {
            formData.append(key, this.dataForm[key]);
          }
        }
        formData.append("_method", "PUT");
        const response = await mainURL.post(
          `/user/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.closeModal(2);
          this.getAllUsers();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.closeModal(2);
          this.getAllUsers();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(2);
        this.getAllUsers();
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
        formData.append("nik", this.dataForm.nik);
        formData.append("name", this.dataForm.name);
        formData.append("email", this.dataForm.email);
        formData.append("password", this.dataForm.password);
        formData.append("position_id", this.dataForm.position_id);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user", formData);
        if (response.status === 200) {
          this.closeModal(1);
          this.getAllUsers();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.closeModal(1);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(1);
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
      } else if (type === 3) {
        this.dataTelegram = {
          id: null,
          username: "",
        };
        this.isTelegram = false;
      }
    },
    resetForm() {
      this.dataForm = {
        id: null,
        nik: "",
        name: "",
        email: "",
        password: null,
        position_id: null,
      };
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.getPositions();
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          this.getPositions();
          this.dataForm.id = item.id;
          this.dataForm.nik = item.nik;
          this.dataForm.name = item.name;
          this.dataForm.email = item.email;
          this.dataForm.position_id = item.position_id;
          this.edit = true;
        }
      } else if (type === 3) {
        if (item) {
          this.dataTelegram.id = item.id;
          this.dataTelegram.username = item.telegram_username;
          this.isTelegram = true;
        }
      }
    },
    async getAllUsers() {
      try {
        const response = await mainURL.get("/user");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getPositions() {
    try {
        const response = await mainURL.get("/position");
        if (response.status === 200) {            
            this.positions = response.data.data.map((item) => ({
                value: item.id,
                title: `${item.name} - ${item.offices.map(office => office.name).join(', ')}`,
            }));
        } else {
            this.$showToast("error", "Sorry", "error get data office");
        }
    } catch (error) {
        this.$showToast("error", "Sorry", "error get data office");
    }
},
  },
  mounted() {
    this.getAllUsers();
  },
});
</script>
