<template>
    <v-card>
        <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
            Kredit {{ getCreditStatusText }} Bulan ini
        </VCardTitle>
        <v-card-text>
            <v-row class="d-flex justify-end pa-3 mb-1">
                <v-btn color="primary" size="small" class="my-3 mx-3"
                    v-if="userAccess && parseInt(userAccess.canInsertData)" @click="insert = true">
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
                        <span v-if="parseInt(item.type) === 3"> Pensiunan</span>
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

                                <v-tooltip location="top" text="Download Semua File Kredit"
                                    v-if="role && role.canDownload == 1">
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
            </div>
        </v-card-text>
    </v-card>

    <InsertModal v-model="insert" :order-list="orderList" :status-credit-list="statusCreditList"
        :close-modal="closeModal" :get-all-files="getAllFiles" />
</template>
<script lang="ts">
import mainURL from "@/axios";
import InsertModal from "./../components/insertKredit.vue";
export default {
    inject: ['loading'],
    components: {
        InsertModal
    },
    watch: {
    '$route'() {
        this.type = parseInt(localStorage.getItem('creditType')) || 0;
    }
},
    computed: {
        searchableItems() {
            return this.items.map(item => ({
                ...item,
                office_names: item.user.position.offices.map(office => office.name).join(', ')
            }));
        },
        getCreditStatusText() {
            switch (this.type) {
                case 1:
                    return 'approve';
                case 2:
                    return 'pending';
                case 3:
                    return 'reject';
                case 4:
                    return 'cancel';
                default:
                    return '';
            }
        }
    },
    data() {
        return {
            insert: false,
            items: [],
            userAccess: null,
            type: parseInt(localStorage.getItem('creditType')) || 0,
            originalItems: [],
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
            searchValue: "",
            role: {
                canDownload: 0,
            },
        }
    },
    methods: {
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
        formatInput(value: string) {
            // Lakukan pemformatan nilai plafon di sini
            value = value.replace(/\D/g, ""); // Remove non-digit characters
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
            return value;
        },
        formatDate(dateString: any) {
            const date = new Date(dateString);
            return date.toLocaleString("id-ID");
        },
        hasSlikAttachment(attachments) {
            return attachments.some(attachment =>
                attachment.name.includes('SLIK') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
            );
        },
        hasAnalisaAoAttachment(attachments) {
            return attachments.some(attachment =>
                attachment.name.includes('Analisa Kredit AO') && parseInt(attachment.phase) == 2 && (attachment.path != 'null' || attachment.link != null)
            );
        },
        toDetail(item: any) {
            this.$router.push(`/u-credit/${item.id}`);
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
        async getAllFiles() {
            try {
                this.loading.show();
                this.type =  this.type = parseInt(localStorage.getItem('creditType')) || 0;
                const response = await mainURL.get(`/user/getCredit/${this.type}`);

                if (response.status === 200) {
                    this.loading.hide();
                    this.items = response.data.data.files;
                    this.userAccess = response.data.data.userAccess;
                    this.role = response.data.data.role;
                    this.originalItems = [...this.items];
                } else {
                    this.loading.hide();
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.loading.hide();
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
    },
    mounted() {
        this.getAllFiles();
    },
    created() {
        this.type = parseInt(localStorage.getItem('creditType')) || 0;
    }
}
</script>
