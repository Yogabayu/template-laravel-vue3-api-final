<template>
  <v-card>
    <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
      List Kredit Bulan ini
      <v-spacer></v-spacer>
    </VCardTitle>
    <v-tabs v-model="tab" class="v-tabs-pill" bg-color="secondary">
      <v-tab value="0">Semua</v-tab>
      <v-tab value="1">Approved</v-tab>
      <v-tab value="2">Pending</v-tab>
      <v-tab value="3">Rejected</v-tab>
      <v-tab value="7">Cancel</v-tab>
      |
      <v-tab value="4">Pooling</v-tab>
      <v-tab value="5">SLIK</v-tab>
      <v-tab value="6">Komite</v-tab>
      <v-tab value="8">OPS</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <template v-for="phase in phases">
          <v-window-item :value="phase.value">
            <v-row class="d-flex justify-end pa-3 mb-1">
              <v-btn color="primary" size="small" class="my-3 mx-3"
                v-if="userAccess && parseInt(userAccess.canInsertData)" @click="openModal(1)">
                <v-icon icon="mdi-plus"></v-icon>Tambah Data
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat
                hide-details variant="solo-filled" v-model="searchValue"></v-text-field>
            </v-row>

            <div class="table-container" @touchstart.stop @touchmove.stop>
              <EasyDataTable show-index :headers="headers" :items="searchableItems" :search-value="searchValue"
                :search-field="searchField" border-cell buttons-pagination :rows-per-page=500>
                <template #empty-message>
                  <p>Data Kosong</p>
                </template>
                <template #loading>
                  <p>loading data .....</p>
                </template>
                <template #item-plafon="item">Rp. {{ formatInput(item.plafon) }},-</template>
                <template #item-isApproved="item">
                  <span v-if="parseInt(item.isApproved) == 1"> Approved</span>
                  <span v-if="parseInt(item.isApproved) == 2"> Pending</span>
                  <span v-if="parseInt(item.isApproved) == 3"> Rejected</span>
                  <span v-if="parseInt(item.isApproved) == 4"> Cancel by Debitur</span>
                </template>
                <template #item-type="item">
                  <span v-if="parseInt(item.type) === 1"> Reguler</span>
                  <span v-if="parseInt(item.type) === 2"> Restruktur</span>
                </template>
                <template #item-aoro="item">
                  <span>{{ item.user.name }}</span>
                </template>
                <template #item-created_at="item">
                  <span>{{ formatDate(item.created_at) }} WIB</span>
                </template>
                <template #item-slik="item">
                  <v-tooltip location="top" text="Kondisi SLIK Sudah Terupload"
                    v-if="hasSlikAttachment(item.attachments)">
                    <template v-slot:activator="{ props }">
                      <span v-bind="props">
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </span>
                    </template>
                  </v-tooltip>
                  <v-tooltip location="top" text="Kondisi SLIK Belum Terupload" v-else>
                    <template v-slot:activator="{ props }">
                      <span v-bind="props">
                        <v-icon color="error">mdi-close-circle</v-icon>
                      </span>
                    </template>
                  </v-tooltip>
                </template>
                <template #item-analisaAO="item">
                  <v-tooltip location="top" text="Analisa AO Sudah Terupload"
                    v-if="hasAnalisaAoAttachment(item.attachments)">
                    <template v-slot:activator="{ props }">
                      <span v-bind="props">
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </span>
                    </template>
                  </v-tooltip>
                  <v-tooltip location="top" text="Analisa AO Belum Terupload" v-else>
                    <template v-slot:activator="{ props }">
                      <span v-bind="props">
                        <v-icon color="error">mdi-close-circle</v-icon>
                      </span>
                    </template>
                  </v-tooltip>
                </template>
                <template #item-operation="item">
                  <div class="operation-wrapper">
                    <div class="d-flex justify-space-between">
                      <v-tooltip location="top" text="Detail Kredit">
                        <template v-slot:activator="{ props }">
                          <button v-bind="props" @click="toDetail(item)">
                            <VIcon size="20" icon="bx-link-external" color="blue" />
                          </button>
                        </template>
                      </v-tooltip>

                      <!-- <v-tooltip location="top" text="Hapus Kredit" v-if="userData && item.user_id == userData.id">
                        <template v-slot:activator="{ props }">
                          <button v-bind="props" @click="deleteFile(item)">
                            <VIcon size="20" icon="bx-trash" color="red" />
                          </button>
                        </template>
                      </v-tooltip> -->

                      <v-tooltip location="top" text="Download Semua File Kredit" v-if="role && role.canDownload == 1">
                        <template v-slot:activator="{ props }">
                          <button v-bind="props" @click="downloadFile(item.id)">
                            <VIcon size="20" icon="bx-download" color="red" />
                          </button>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </template>
              </EasyDataTable>

              <p>
                Total Plafon Bulan ini : Rp. {{ formatInput(totalPlafon) }},-
              </p>
            </div>

          </v-window-item>
        </template>
      </v-window>
    </v-card-text>

    <InsertModal v-model="insert" :order-list="orderList"
    :status-credit-list="statusCreditList" :close-modal="closeModal" :get-all-files="getAllFiles"/>
    
  </v-card>
</template>

<script lang="ts">
import mainURL from "@/axios";
import InsertModal from "./components/insertKredit.vue";
export default {
  inject: ['loading'],
  components: {
    InsertModal
  },
  computed: {
    searchableItems() {
      return this.items.map(item => ({
        ...item,
        office_names: item.user.position.offices.map(office => office.name).join(', ')
      }));
    }
  },
  data() {
    return {
      selectedOption: 'bukuNikah',
      selectedPhoto: '',
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

      //role
      role: {
        canDownload: 0,
      },

      items: [],
      originalItems: [],
      userAccess: null,
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Plafon", value: "plafon", sortable: true },
        { text: "Tipe", value: "type", sortable: true },
        { text: "Status", value: "isApproved", sortable: true },
        { text: "AO/RO", value: "aoro", sortable: true },
        { text: "Kantor", value: "office_names", sortable: true },
        { text: "Tanggal", value: "created_at", sortable: true },
        { text: "SLIK", value: "slik", sortable: false },
        { text: "Analisa AO/RO", value: "analisaAO", sortable: false },
        { text: "Aksi", value: "operation", width: 100 },
      ],
      phases: [
        { value: 0 },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
      ],
      searchField: [
        "name",
        "plafon",
        "phase",
        "type_bussiness",
        "desc_bussiness",
        "reasonRejected",
        "nik_pemohon",
        "nik_pasangan",
        "nik_jaminan",
        "address",
        "no_hp",
        "order_source",
        "status_kredit",
        "user.name",
        "user.position.name",
        "office_names",
      ],
      orderList: [
        { value: 'AO SENDIRI', title: 'AO SENDIRI' },
        { value: 'C. SERVIS / KANTOR', title: 'C. SERVIS / KANTOR' },
        { value: 'NASABAH', title: 'NASABAH' },
        { value: 'CROSS SALING DIVISI', title: 'CROSS SALING DIVISI' },
        { value: 'AGEN MGM / LAINNYA', title: 'AGEN MGM / LAINNYA' },
        { value: 'WEBSITE / WA / SOSMED', title: 'WEBSITE / WA/ SOSMED' },
        { value: 'TEAM BUSSINES', title: 'TEAM BUSSINES' },
        { value: 'PROGRAM KKB NEW', title: 'PROGRAM KKB NEW' },
        { value: 'PROGRAM KKB SECOND', title: 'PROGRAM KKB SECOND' },
        { value: 'CENTRO', title: 'CENTRO' },
      ],
      statusCreditList: [
        { value: 'FRESH', title: 'FRESH' },
        { value: 'REPEAT ORDER', title: 'REPEAT ORDER' },
        { value: 'TOPUP', title: 'TOPUP' },
      ],

      isStatusPhase: false,
      statusPhase: 0,

      //footer
      totalPlafon: '0',
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
        this.filterDataStatus(4); //pooling
      } else if (newVal == 5) {
        this.filterDataStatus(5); // slik
      } else if (newVal == 6) {
        this.filterDataStatus(6); // komite
      } else if (newVal == 7) {
        this.filterDataStatus(7); // cancel
      } else if (newVal == 8) {
        this.filterDataStatus(8); // ops
      } else {
        this.items = [...this.originalItems];
      }
    },
  },
  methods: {
    filterDataStatus(phase: any) {
      const filters = {
        1: (item: any) => item.isApproved == 1,
        2: (item: any) => item.isApproved == 2,
        3: (item: any) => item.isApproved == 3,
        4: (item: any) => parseInt(item.phase) == 1,
        8: (item: any) => parseInt(item.phase) == 5,
        5: (item: any) => item.attachments.some(attachment =>
          attachment.name.includes('SLIK') &&
          parseInt(attachment.phase) == 2 &&
          (attachment.path != 'null' || attachment.link != null)
        ),
        6: (item: any) => {
          return parseInt(item.phase) == 4;
        },
        7: (item: any) => item.isApproved == 4,
      };

      this.items = phase in filters
        ? this.originalItems.filter(filters[phase as keyof typeof filters])
        : [...this.originalItems];
    },
    hasSlikAttachment(attachments) {
      return attachments.some(attachment =>
        attachment.name.includes('SLIK') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
      );
    },
    hasAnalisaAoAttachment(attachments) {
      return attachments.some(attachment =>
        attachment.name.includes('Analisa Awal Kredit AO') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
      );
    },
    customSearch(items, search, searchField) {
      if (!search) return items;

      return items.filter(item => {
        return searchField.some(field => {
          if (field === 'user.position.offices.name') {
            return item.user.position.offices.some(office =>
              office.name.toLowerCase().includes(search.toLowerCase())
            );
          }
          // untuk field lainnya, gunakan pencarian default
          return String(this.getNestedValue(item, field))
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      });
    },

    getNestedValue(obj, path) {
      return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
    },
    async toPage() {
      this.loading.show();
      await this.$nextTick();
      this.$router.push(`/u-indexfilter`);
    },
    formatDate(dateString: any) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    async downloadFile(id) {
      try {
        this.loading.show();
        const response = await mainURL.get(`/download-all/${id}`, {
          responseType: 'blob' // tambahkan ini untuk mengunduh file sebagai Blob
        });

        if (response.status === 200) {
          this.loading.hide();
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${id}.zip`); // Nama file ZIP yang akan diunduh
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          this.$showToast("success", "Berhasil", "File berhasil diunduh");
        } else {
          this.loading.hide();
          this.$showToast("error", "Error", "Gagal mengunduh file");
        }
      } catch (error) {
        this.loading.hide();
        this.$showToast("error", "Error", "Terjadi kesalahan saat mengunduh file");
      }
    },
    formatInput(value: string) {
      // Lakukan pemformatan nilai plafon di sini
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
      return value;
    },
    toDetail(item: any) {
      this.$router.push(`/u-credit/${item.id}`);
    },
    async deleteFile(item: { id: any }) {
      try {
        this.loading.show();
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user/credit/${item.id}`);

        if (response.status === 200) {
          this.loading.hide();
          this.getAllFiles();
          this.$showToast("success", "Berhasill", response.data.message);
        } else {
          this.loading.hide();
          this.getAllFiles();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.loading.hide();
        this.getAllFiles();
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    resetFile(fileKey: string | number) {
      if (!this.dataForm[fileKey] != null) {
        this.dataForm[fileKey] = null;
      }
    },
   
    async openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
      } else if (type === 2) {
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
        order_source: null,
        status_kredit: null,
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
          this.items = response.data.data.files;
          this.userAccess = response.data.data.userAccess;
          this.role = response.data.data.role;
          this.originalItems = [...this.items];
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
   
  },
  async mounted() {
    try {
      this.loading.show();
      await Promise.all([
        this.getAllFiles(),
        this.getUserData()
      ]);
    } catch (error) {
      console.error('Error in mounted:', error);
    } finally {
      this.loading.hide();
    }
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
</style>
