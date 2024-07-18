<template>
    <v-card>
        <v-card-text class="py-1 header-color">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="mr-auto">
                    <span class="text-subtitle-1 font-weight-bold ml-2">Phase 1 (Pooling) 📄</span>
                </v-col>
                <v-col cols="auto">
                    <v-bottom-sheet max-width="400">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" color="on-primary" variant="text">
                                <v-icon color="white">mdi-help-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text class="text-h6 py-2 px-4">
                                Penjelasan Phase 1: Pooling
                            </v-card-text>
                            <v-card-text class="py-2 px-4">
                                Tahap ini meliputi pengumpulan dan verifikasi berkas kredit nasabah. Proses ini
                                dilaksanakan setelah Account Officer (AO) melakukan survei lapangan. Dokumentasi yang
                                terkumpul akan digunakan
                                untuk
                                analisis SLIK (Sistem Layanan Informasi Keuangan) guna menilai kelayakan kredit.
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-col>
            </v-row>
        </v-card-text>

        <div v-for="(attachment, index) in data" :key="index" class="pa-1">
            <v-row no-gutters align="center" :class="parseInt(attachment.isSecret) ? 'bg-grey-lighten-4' : ''">
                <v-col cols="auto" class="mr-2">
                    <v-icon :color="parseInt(attachment.isApprove) ? 'success' : 'error'" size="small">
                        {{ parseInt(attachment.isApprove) ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                </v-col>

                <v-col>
                    <div class="text-subtitle-2 font-weight-bold">{{ attachment.name }}</div>
                    <div v-if="attachment.note" class="text-caption text-grey-darken-1">{{ attachment.note }}</div>
                </v-col>

                <v-col cols="auto">
                    <div class="d-flex">
                        <template v-if="attachment.path != null && !parseInt(attachment.isSecret)">
                            <v-tooltip location="top" text="Lihat File" v-if="attachment.path != 'null'">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" icon="bx-link-external" size="small" color="primary"
                                        variant="text" class="mr-2"
                                        :href="filePath + '/' + fileId + '/' + attachment.path" target="_blank"
                                        rel="noopener noreferrer">
                                    </v-btn>
                                </template>
                            </v-tooltip>
                        </template>

                        <template v-else>
                            <v-tooltip location="top" text="Lihat File"
                                v-if="userAccessPhase1 && parseInt(userAccessPhase1.isSecret) && attachment.path != 'null'">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" icon="bx-link-external" size="small" color="primary"
                                        variant="text" class="mr-2"
                                        :href="filePath + '/' + dataFile.id + '/' + attachment.path" target="_blank"
                                        rel="noopener noreferrer">
                                    </v-btn>
                                </template>
                            </v-tooltip>
                        </template>

                        <v-tooltip location="top" text="Edit File"
                            v-if="userAccessPhase1 && parseInt(userAccessPhase1.canUpdateData) && phase < 2">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-edit" size="small" color="info" variant="text"
                                    class="mr-2" @click="openModal(2, attachment)">
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip location="top" text="Hapus File"
                            v-if="userAccessPhase1 && parseInt(userAccessPhase1.canDeleteData) && phase < 2">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="bx-trash" size="small" color="error" variant="text"
                                    @click="deleteAttachment(attachment.id)">
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </v-col>
            </v-row>

            <v-divider v-if="index < data.length - 1" class="mt-3"></v-divider>
        </div>

        <!-- <v-list density="compact">
            <template v-for="(attachment, index) in data" :key="index">
                <v-list-item :class="attachment.isSecret ? 'bg-grey-lighten-4' : ''">
                    <template v-slot:prepend>
                        <v-icon :color="parseInt(attachment.isApprove) ? 'success' : 'error'" size="small" class="mr-2">
                            {{ parseInt(attachment.isApprove) ? 'mdi-check-circle' : 'mdi-close-circle' }}
                        </v-icon>
                        <v-icon size="small" :color="attachment.isSecret ? 'warning' : 'primary'">
                            {{ attachment.isSecret ? 'mdi-file-lock-outline' : 'mdi-file-outline' }}
                        </v-icon>
                    </template>

                    <v-list-item-title class="text-subtitle-2 font-weight-medium">
                        {{ attachment.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle v-if="attachment.note" class="text-caption text-grey-darken-1 mt-1">
                        {{ attachment.note }}
                    </v-list-item-subtitle>

                    <template v-slot:append>
                        <v-btn-group>
                            <v-btn v-if="canViewFile(attachment)" icon="mdi-eye" size="small" color="primary"
                                variant="text" @click="viewFile(attachment)">
                            </v-btn>
                            <v-btn v-if="canEditFile(attachment)" icon="mdi-pencil" size="small" color="info"
                                variant="text" @click="openModal(2, attachment)">
                            </v-btn>
                            <v-btn v-if="canDeleteFile(attachment)" icon="mdi-delete" size="small" color="error"
                                variant="text" @click="deleteAttachment(attachment.id)">
                            </v-btn>
                        </v-btn-group>
                    </template>
                </v-list-item>

                <v-divider v-if="index < data.length - 1"></v-divider>
            </template>
        </v-list> -->
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
    methods: {
        canViewFile(attachment) {
            return attachment.path !== 'null' &&
                (!attachment.isSecret || (this.userAccessPhase1 && parseInt(this.userAccessPhase1.isSecret)));
        },
        canEditFile(attachment) {
            return this.userAccessPhase1 && parseInt(this.userAccessPhase1.canUpdateData) && this.phase < 2;
        },
        canDeleteFile(attachment) {
            return this.userAccessPhase1 && parseInt(this.userAccessPhase1.canDeleteData) && this.phase < 2;
        },
        viewFile(attachment) {
            const path = attachment.isSecret ? this.dataFile.id : this.fileId;
            window.open(`${this.filePath}/${path}/${attachment.path}`);
        }
    },

    mounted() {
        this.userAccessPhase1 = this.userAccess['1']
    },
}
</script>

<style scoped>
.header-color {
    background-color: #FFAB00;
}
</style>
