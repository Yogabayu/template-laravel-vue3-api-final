<template>
  <VRow>
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>
  </VRow>
</template>

<script>
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
      tFile: null,
      tRead: null,
      tFav: null,
      fileRandom: null,
      fileFav: null,
      newestFile: {},
      
      userData:{},
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
    // async getTotalFileAvailable() {
    //   try {
    //     const response = await mainURL.get("/user/total-file");

    //     if (response.status === 200) {
    //       this.tFile = response.data.data;
    //     } else {
    //       const errorMessage =
    //         response && response.data && response.data.message
    //           ? response.data.message
    //           : "Gagal. Silakan coba lagi.";
    //       this.$showToast("error", "Sorry", errorMessage);
    //     }
    //   } catch (error) {
    //     const errorMessage =
    //       error.response && error.response.data && error.response.data.message
    //         ? error.response.data.message
    //         : "Gagal login. Silakan coba lagi.";
    //     this.$showToast("error", "Sorry", errorMessage);
    //   }
    // },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
.card-style {
  box-shadow: 9px 9px 9px rgba(20, 20, 20, 0.6);
}
</style>
