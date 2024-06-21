<template>
  <VRow>
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>
    <v-container>
      <v-row>
        <VCol cols="4" md="6">
          <CardStatisticsVertical v-bind="{
            title: 'Kredit Disetujui',
            image: docs,
            stats: `${tApproved}`,
            link: '/u-credit',
          }" />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical v-bind="{
            title: 'Kredit Pending',
            image: docs,
            stats: `${tPending}`,
            link: '/u-credit',
          }" />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical v-bind="{
            title: 'Kredit Ditolak',
            image: docs,
            stats: `${tRejected}`,
            link: '/u-credit',
          }" />
        </VCol>
      </v-row>
    </v-container>

    <VCol cols="12" md="12" v-if="results.length > 0">
      <v-card class="mx-5 my-5">
        <v-card-title> Statistik Kredit </v-card-title>
        <v-card-text>
          <v-row v-if="isShowing">
            <VCol cols="12" md="6" v-if="results.length > 0">
              <Line :options="options" :data="data" />
            </VCol>
            <VCol cols="12" md="6">
              <Line :options="options" :data="dataAverageTimes" />
            </VCol>
          </v-row>
          <v-row v-else>
            <VCol cols="12" md="12" v-if="results.length > 0">
              <Line :options="options" :data="data" />
            </VCol>
          </v-row>
        </v-card-text>
      </v-card>
    </VCol>

  </VRow>
</template>

<script>
import mainURL from "@/axios";
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Images
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import docs from "@images/cards/docs.png";
import fileFavorite from "@images/cards/favorite-file.png";
import fileSave from "@images/cards/file-save.png";
import openFile from "@images/cards/open-file.png";
import paypal from "@images/cards/paypal-error.png";
import user from "@images/cards/user.png";
import wallet from "@images/cards/wallet-info.png";

export default {
  components: {
    AnalyticsCongratulations,
    Line
  },
  data() {
    return {
      userData: null,
      userToken: null,
      chart: chart,
      card: card,
      paypal: paypal,
      wallet: wallet,
      docs: docs,
      user: user,
      openFile: openFile,
      fileSave: fileSave,
      fileFavorite: fileFavorite,
      tApproved: 0,
      tPending: 0,
      tRejected: 0,
      newestFile: {},
      results: [],
      data: null,
      options: null,

      dataAverageTimes: null,
      isShowing: false,

      userData: {},
    };
  },
  methods: {
    getUserData() {
      const savedUserData = localStorage.getItem("userData");

      if (savedUserData) {
        this.userData = JSON.parse(savedUserData);
      }
    },
    async getRekapCredit() {
      try {
        const response = await mainURL.get("/user/dashboard");

        if (response.status === 200) {
          const files = response.data.data.files;
          this.results = response.data.data.results;
          const isApprovedCounts = {
            isApproved1: 0,
            isApproved2: 0,
            isApproved3: 0
          };

          files.forEach(file => {
            let approvalStatus = Number(file.isApproved);
            switch (approvalStatus) {
              case 1:
                isApprovedCounts.isApproved1++;
                break;
              case 2:
                isApprovedCounts.isApproved2++;
                break;
              case 3:
                isApprovedCounts.isApproved3++;
                break;
            }
          });

          this.tApproved = isApprovedCounts.isApproved1;
          this.tPending = isApprovedCounts.isApproved2;
          this.tRejected = isApprovedCounts.isApproved3;

          // this.renderLineChart();

          this.data = {
            labels: this.results.map(result => `${result.month}/${result.year}`),
            datasets: [
              {
                label: 'Disetujui',
                borderColor: '#36a2eb',
                backgroundColor: 'transparent',
                data: this.results.map(result => result.approved),
                fill: false,
              },
              {
                label: 'Pending',
                borderColor: '#ffcd56',
                backgroundColor: 'transparent',
                data: this.results.map(result => result.pending),
                fill: false,
              },
              {
                label: 'Ditolak',
                borderColor: '#ff6384',
                backgroundColor: 'transparent',
                data: this.results.map(result => result.rejected),
                fill: false,
              },
            ],
          };

          this.options = {
            responsive: true,
            maintainAspectRatio: false,
          };

          if (response.data.data.labelsAverageTimes.length > 0) {
            this.isShowing = true;
            this.dataAverageTimes = {
              labels: response.data.data.labelsAverageTimes,
              datasets: [
                {
                  label: 'Rata Waktu per fase (menit)',
                  borderColor: '#36a2eb',
                  backgroundColor: 'transparent',
                  data: response.data.data.dataAverageTimes.map(value => parseFloat(value)),
                  fill: false,
                }
              ]
            };
          }


        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal . Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },

  },
  beforeMount() {
    this.getUserData();
    this.getRekapCredit();
  },
};
</script>

<style scoped>
.card-style {
  box-shadow: 9px 9px 9px rgba(20, 20, 20, 0.6);
}
</style>
