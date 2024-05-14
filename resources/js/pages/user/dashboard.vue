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
            link: '/u-search',
          }" />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical v-bind="{
            title: 'Kredit Pending',
            image: docs,
            stats: `${tPending}`,
            link: '/u-search',
          }" />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical v-bind="{
            title: 'Kredit Ditolak',
            image: docs,
            stats: `${tRejected}`,
            link: '/u-search',
          }" />
        </VCol>
      </v-row>
    </v-container>
  </VRow>
</template>

<script>
import mainURL from "@/axios";
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";

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

      userData: {},
    };
  },
  methods: {
    // formatDate(dateString) {
    //   const date = new Date(dateString);
    //   return date.toLocaleString("id-ID");
    // },
    // toDetailFile(item) {
    //   this.$router.push(`/u-filedetail/${item}`);
    // },
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
          const isApprovedCounts = {
            isApproved1: 0,
            isApproved2: 0,
            isApproved3: 0
          };

          files.forEach(file => {
            switch (file.isApproved) {
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
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal . Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
  },
  mounted() {
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
