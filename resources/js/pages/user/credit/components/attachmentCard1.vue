<template>
    <v-card color="warning">
        <v-card-title class="py-2">
            <v-row align="center" no-gutters>
                <v-col cols="auto">
                    <span class="text-h6 font-weight-medium">Phase 1 (Pooling) 📄</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-bottom-sheet max-width="400">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" color="on-primary" variant="text">
                                <v-icon color="on-primary">mdi-help-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h6 py-2 px-4">
                                Penjelasan Phase 1: Pooling
                            </v-card-title>
                            <v-card-text class="py-2 px-4">
                                Tahap ini meliputi pengumpulan dan verifikasi berkas kredit nasabah. Proses ini
                                dilaksanakan setelah Account
                                Officer (AO) melakukan survei lapangan. Dokumentasi yang terkumpul akan digunakan untuk
                                analisis SLIK (Sistem
                                Layanan Informasi Keuangan) guna menilai kelayakan kredit.
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-col>
            </v-row>
        </v-card-title>
        <div v-for="(attachment, index) in data" :key="index">
            <v-list density="compact" v-if="attachment.path != null && !parseInt(attachment.isSecret)">
                <v-list-item>
                    <template v-slot:prepend>
                        {{ parseInt(attachment.isApprove) ? '✅' : '❌' }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="attachment.note != null"> {{ attachment.note }} </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File" v-if="attachment.path != 'null'">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="filePath +
                                            '/' +
                                            fileId +
                                            '/' +
                                            attachment.path
                                            " target="_blank" rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Edit File" v-if="
                                    userAccessPhase1 && parseInt(userAccessPhase1.canUpdateData) && phase < 2
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Hapus File" v-if="
                                    userAccessPhase1 && parseInt(userAccessPhase1.canDeleteData) && phase < 2
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                            <VIcon size="20" icon="bx-trash" color="red" />
                                        </button>
                                    </template>
                                </v-tooltip>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list>

            <v-list density="compact" v-else>
                <v-list-item>
                    <template v-slot:prepend>
                        {{ parseInt(attachment.isApprove) ? '✅' : '❌' }}
                        <v-icon icon="mdi-file"></v-icon>
                    </template>
                    <v-list-item-title> {{ attachment.name }} </v-list-item-title>
                    <v-list-item-subtitle v-if="attachment.note != null"> {{ attachment.note }} </v-list-item-subtitle>
                    <template v-slot:append>
                        <div class="operation-wrapper">
                            <div class="d-flex justify-space-between">
                                <v-tooltip location="top" text="Lihat File"
                                    v-if="userAccessPhase1 && parseInt(userAccessPhase1.isSecret) && attachment.path != 'null'">
                                    <template v-slot:activator="{ props }">
                                        <a v-bind="props" :href="filePath +
                                            '/' +
                                            dataFile.id +
                                            '/' +
                                            attachment.path
                                            " target="_blank" rel="noopener noreferrer">
                                            <button>
                                                <VIcon size="20" icon="bx-link-external" color="blue" />
                                            </button>
                                        </a>
                                    </template>
                                </v-tooltip>


                                <v-tooltip location="top" text="Edit File" v-if="
                                    userAccessPhase1 && parseInt(userAccessPhase1.canUpdateData) && phase < 2
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccessPhase1 && parseInt(userAccessPhase1.canDeleteData) && phase < 2">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(attachment.id)">
                                            <VIcon size="20" icon="bx-trash" color="red" />
                                        </button>
                                    </template>
                                </v-tooltip>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </div>
    </v-card>
</template>
<script>
export default {
    name: "AttachmentCard1",
    props: {
        data: {
            type: Object,
            required: true,
        },
        fileId: {
            type: Number,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        userAccess: {
            type: Object,
            required: true,
        },
        deleteAttachment: {
            type: Function,
            required: true,
        },
        openModal: {
            type: Function,
            required: true,
        },
        phase: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            userAccessPhase1: null,
        }
    },

    mounted() {
        this.userAccessPhase1 = this.userAccess['1']
    },
}
</script>
