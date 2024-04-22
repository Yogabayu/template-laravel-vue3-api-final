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
    // getUserDataAndToken() {
    //   const savedUserData = localStorage.getItem("userData");
    //   const savedUserToken = localStorage.getItem("userToken");

    //   if (savedUserData && savedUserToken) {
    //     this.userData = JSON.parse(savedUserData);
    //     this.userToken = savedUserToken;
    //   }
    // },
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
    // async getTotalFileRead() {
    //   try {
    //     const response = await mainURL.get("/user/total-read");

    //     if (response.status === 200) {
    //       this.tRead = response.data.data;
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
    // async getTotalFileFav() {
    //   try {
    //     const response = await mainURL.get("/user/total-fav");

    //     if (response.status === 200) {
    //       this.tFav = response.data.data;
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
    // async getDashboard() {
    //   try {
    //     const response = await mainURL.get("/user/index");

    //     if (response.status === 200) {
    //       this.fileRandom = response.data.data;
    //     } else {
    //       const errorMessage =
    //         response && response.data && response.data.message
    //           ? response.data.message
    //           : "Gagal. Silakan coba lagi.";
    //       this.$showToast("error", "Sorry", errorMessage);
    //     }

    //     const response2 = await mainURL.get("/user/fileFav");

    //     if (response2.status === 200) {
    //       this.fileFav = response2.data.data;
    //     } else {
    //       const errorMessage =
    //         response2 && response2.data && response2.data.message
    //           ? response2.data.message
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
    // async getNewestFile() {
    //   try {
    //     const response = await mainURL.get("/user/newestfile");

    //     if (response.status === 200) {
    //       this.newestFile = response.data.data;
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
    // }
  },
  mounted() {
    // this.getTotalFileAvailable();
    // this.getTotalFileRead();
    // this.getTotalFileFav();
    // this.getDashboard();
    // this.getNewestFile();
  },
};
</script>

<style scoped>
.card-style {
  box-shadow: 9px 9px 9px rgba(20, 20, 20, 0.6);
}
</style>
