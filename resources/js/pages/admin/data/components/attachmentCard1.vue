<template>
    <v-card color="warning">
        <v-card-title>
            <v-row class="d-flex justify-space-between">
                <v-col cols="12" sm="6" md="8">
                    <span>Phase 1 (Pooling) 📄</span>
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
                                    userAccess && parseInt(userAccess.canUpdateData) && phase < 5
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Hapus File" v-if="
                                    userAccess && parseInt(userAccess.canDeleteData) && phase < 5
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
                                    v-if="userAccess && parseInt(userAccess.isSecret) && attachment.path != 'null'">
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
                                    userAccess && parseInt(userAccess.canUpdateData) && phase < 5
                                ">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="openModal(2, attachment)">
                                            <VIcon size="20" icon="bx-edit" color="blue" />
                                        </button>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Hapus File"
                                    v-if="userAccess && parseInt(userAccess.canDeleteData) && phase < 5">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props" @click="deleteAttachment(attachment.id) ">
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
        phase : {
            type: Number,
            required: true,
        },
    },
}
</script>
