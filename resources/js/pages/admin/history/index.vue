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
                <VCardTitle class="text-2xl font-weight-bold"> Pilih User </VCardTitle>
            </VCardItem>
            <div class="d-flex justify-end mb-6">
                <div class="d-flex align-center pe-2 w-25">
                    <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat
                        hide-details variant="solo-filled" v-model="searchValue"></v-text-field>
                </div>
            </div>
            <EasyDataTable show-index :headers="headers" :items="items" :search-value="searchValue">
                <template #empty-message>
                    <p>Data Kantor Kosong</p>
                </template>
                <template #loading>
                    <p>loading data .....</p>
                </template>
                <template #item-isActive="item">
                    <v-chip v-if="parseInt(item.isActive) == 1" color="success">Active</v-chip>
                    <v-chip v-else color="error">Non-Active</v-chip>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <div class="d-flex justify-space-between">
                            <v-tooltip location="top" text="Detail Riwayat User">
                                <template v-slot:activator="{ props }">
                                    <button v-bind="props" @click="openModal(1, item)">
                                        <VIcon size="20" icon="bx-bx-detail" color="info" />
                                    </button>
                                </template>
                            </v-tooltip>
                        </div>
                    </div>
                </template>
            </EasyDataTable>
        </VCard>
    </div>

    <!-- <v-dialog v-model="isDetail" width="auto" fullscreen transition="dialog-top-transition">
        <v-card>
            <template v-slot:title> Detail Riwayat User </template>
            <template v-slot:text>
                <div class="d-flex justify-end mb-6">
                    <div class="d-flex align-center pe-2 w-25">
                        <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat
                            hide-details variant="solo-filled" v-model="itemSearchDetails"></v-text-field>
                    </div>
                </div>
                <EasyDataTable show-index :headers="headerDetails" :items="itemDetails"
                    :search-value="itemSearchDetails">
                    <template #empty-message>
                        <p>Data Kantor Kosong</p>
                    </template>
                    <template #loading>
                        <p>loading data .....</p>
                    </template>
                    <template #item-created_at="item">
                        {{ formatDate(item.created_at) }}
                    </template>

                </EasyDataTable>
            </template>
        </v-card>
    </v-dialog> -->

    <v-dialog v-model="isDetail" transition="dialog-bottom-transition" fullscreen>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn prepend-icon="mdi-cog" size="small" text="Settings" v-bind="activatorProps"></v-btn>
        </template>

        <v-card>
            <v-toolbar>
                <v-btn icon="mdi-close" @click="isDetail = false, itemSearchDetails = '', itemDetails = []"></v-btn>

                <v-toolbar-title>Riwayat User</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-toolbar>

            <div class="d-flex justify-end mb-6">
                <div class="d-flex align-center pe-2 w-25">
                    <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat
                        hide-details variant="solo-filled" v-model="itemSearchDetails"></v-text-field>
                </div>
            </div>
            <EasyDataTable show-index :headers="headerDetails" :items="itemDetails" :search-value="itemSearchDetails">
                <template #empty-message>
                    <p>Data Kantor Kosong</p>
                </template>
                <template #loading>
                    <p>loading data .....</p>
                </template>
                <template #item-created_at="item">
                    {{ formatDate(item.created_at) }}
                </template>

            </EasyDataTable>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import mainURL from "@/axios";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            overlay: false,
            items: [],
            headers: [
                { text: "Nama", value: "name", sortable: true },
                { text: "NIK", value: "nik", sortable: true },
                { text: "E-mail", value: "email", sortable: true },
                { text: "Status", value: "isActive", sortable: true },
                { text: "Operation", value: "operation" },
            ],
            searchValue: "",

            //dialog
            isDetail: false,
            itemDetails: [],
            itemSearchDetails: "",
            headerDetails: [
                { text: "activity", value: "activity", sortable: true },
                { text: "tanggal", value: "created_at", sortable: true },
            ],
        };
    },
    methods: {
        formatDate(dateString: any) {
            const date = new Date(dateString);
            return date.toLocaleString("id-ID");
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
        openModal(type: number, item = null) {
            if (type === 1) {
                this.getDetailHistories(item.id);
            }
        },

        async getDetailHistories(id: any) {
            try {
                const response = await mainURL.get(`/history/${id}`);

                if (response.status === 200) {
                    this.itemDetails = response.data.data;
                    this.isDetail = true;
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                console.log(error);

            }
        }
    },
    mounted() {
        this.getAllUsers();
    },
});
</script>
