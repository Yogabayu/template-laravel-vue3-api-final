<template>
    <v-overlay :absolute="true" v-model="overlay" contained persistent class="align-center justify-center">
        <v-col>
            <v-progress-circular color="primary" size="32" indeterminate>
            </v-progress-circular>
            <br />
            <span class="font-weight-bold text-lg">Loading....</span>
        </v-col>
    </v-overlay>
    <v-card>
        <VCardItem class="align-left">
            <span color="primary" @click="goBack" style="cursor: pointer">
                <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
                Back
            </span>
            <VCardTitle class="text-2xl font-weight-bold">
                Pilih Kredit
            </VCardTitle>
        </VCardItem>

        <v-card-text>
            <v-row>
                <v-col cols="6" md="4" v-for="(item, index) in data" :key="index">
                    <v-card color="primary" variant="outlined" @click="goto(item)">
                        <v-card-title>
                            {{ item.month }} - {{ item.year }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import mainURL from '@/axios';

export default {
    data() {
        return {
            overlay: false,
            data: [],
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async getMontYear() {
            try {
                const response = await mainURL.get("/user/dashboardCredit");

                if (response.status == 200) {
                    this.data = response.data.data;
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },

        goto(monthYear) {
            this.$router.push(`/u-indexfilter/${monthYear.month}-${monthYear.year}`);
        }
    },
    beforeMount() {
        this.getMontYear();
    },
}
</script>
