<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary w-64 h-32" v-html="logo" />
          </div>
        </template>

        <!-- <VCardTitle class="text-2xl font-weight-bold"> sneat </VCardTitle> -->
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Welcome 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- nik -->
            <VCol cols="12">
              <VTextField v-model="form.nik" autofocus placeholder="008xxxxx" label="NIK" type="number" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <!-- <VCheckbox v-model="form.remember" label="Remember me" /> -->

                <!-- <RouterLink
                  class="text-primary ms-2 mb-1 mt-2"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink> -->

                <a href="#" class="text-primary ms-2 mb-1 mt-2" @click="forgotAlert">
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn block type="submit"> Login </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth.scss";
</style>
<script>
import mainURL from "@/axios";
import logo from "@images/arthaya.svg?raw";

export default {
  data() {
    return {
      userData: null,
      userToken: null,
      form: {
        nik: null,
        password: "",
        remember: false,
      },
      isPasswordVisible: false,
      logo: logo,
    };
  },
  methods: {
    saveUserDataAndToken(data) {
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token.token);
    },

    forgotAlert() {
      alert('Silahkan Hubungi Administrator');
    },

    async login() {
      try {
        const userAgent = navigator.userAgent;
        const response = await mainURL.post("/login", {
          nik: this.form.nik,
          password: this.form.password,
          device: userAgent,
        });

        if (response.status === 200) {
          this.saveUserDataAndToken(response.data);
          if (response.data.user.position.name=="administrator") {
            await this.$router.push("/dashboard");
          } else {
            await this.$router.push("/user-dashboard");     
          }

          this.$showToast("success", "Yeay", "Selamat anda Berhasill login, mengarahkan ke dashboard.....");
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal login. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal login. Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
  },
};
</script>
