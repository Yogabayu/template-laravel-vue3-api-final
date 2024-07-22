<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          User Profile
        </VCardTitle>
      </VCardItem>
      <!-- 👉 Form -->

      <div class="profile-container">
        <img class="profile-image" :src="displayPhoto" alt="User Profile Photo" />
      </div>

      <VForm class="mt-6" @submit.prevent="updateUserProfile">
        <VRow>
          <!-- 👉 First Name -->
          <VCol md="6" cols="12">
            <VTextField placeholder="John" label="Nama" v-model="dataForm.name" autofocus />
          </VCol>

          <!-- 👉 Email -->
          <VCol cols="12" md="6">
            <VTextField label="E-mail" placeholder="johndoe@gmail.com" type="email" v-model="dataForm.email" />
          </VCol>

          <!-- 👉 NIK -->
          <VCol cols="12" md="6">
            <VTextField label="NIK" v-model="dataForm.nik" />
          </VCol>

          <!-- 👉 Address -->
          <VCol cols="12" md="6">
            <VTextField v-model="dataForm.password" label="Password" placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible" />
          </VCol>

          <!-- 👉 Form Actions -->
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Update changes</VBtn>

            <VBtn color="secondary" variant="tonal" type="reset"> Reset </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCard>

    <!-- connect telegram -->
    <VCard class="mt-3 auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Connect Telegram
        </VCardTitle>
      </VCardItem>
      <v-alert density="compact" title="Langkah-langkah untuk Menghubungkan Akun Telegram Anda:" type="warning">
        <ol>
          <li>1. Pastikan Anda telah masuk ke akun Telegram Anda.</li>
          <li>2. Isi bagian Username pada pengaturan profil Telegram Anda.</li>
          <li>
            3. Chat Bot Telegram :
            <a href="https://t.me/bprarthaya_bot" target="_blank" rel="noopener noreferrer">@bprarthaya_bot</a>
          </li>
          <li>4. Klik /start</li>
          <li>
            5. Kemudian isi username dibawah sesuai dengan profile anda
            sebelumnya, dan klik connect
          </li>
        </ol>
      </v-alert>

      <VForm class="mt-6" @submit.prevent="connectTelegram">
        <VRow>
          <VCol md="6" cols="12">
            <VTextField placeholder="Username Telegram" label="Username" v-model="dataForm.telegram_username"
              autofocus />
          </VCol>

          <!-- 👉 Form Actions -->
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Connect</VBtn>

            <VBtn color="secondary" variant="tonal" type="reset" @click="connectTelegram(2)"> disconnect </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      dataForm: {
        name: "",
        email: "",
        password: null,
        nik: null,
        telegram_username: "",
        telegram_chat_id: null,
        type: 1,
      },
      displayPhoto:
        "https://bankarthaya.com/wp-content/uploads/2023/07/arthayann.png",
      isPasswordVisible: false,
    };
  },
  methods: {
    async connectTelegram(type) {
      try {
        this.loading.show();

        if (type == 2) {
          this.dataForm.type = 2;
        }

        const formData = new FormData();
        formData.append("username", this.dataForm.telegram_username);
        formData.append("type", this.dataForm.type);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/update-user-telegram", formData);
        if (response.status === 200) {
          this.loading.hide();
          this.getUserProfile();
          this.$showToast("success", "Success", response.data.message);

          window.location.reload();
        } else {
          this.loading.hide();
          this.getUserProfile();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.loading.hide();
        this.$showToast("error", "Sorry", error.response.data.message);
        this.getUserProfile();
      }
    },
    async updateUserProfile() {
      try {
        this.loading.show();
        const formData = new FormData();
        formData.append("name", this.dataForm.name);
        formData.append("email", this.dataForm.email);
        formData.append("nik", this.dataForm.nik);
        if (this.dataForm.password !== null) {
          formData.append("password", this.dataForm.password);
        }
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/update-user-profile", formData);

        if (response.status === 200) {
          this.loading.hide();
          if (this.dataForm.password == null) {
            this.getUserProfile();
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            window.location.reload();
            this.$showToast("success", "Success", response.data.message);
          } else {
            this.loading.hide();
            this.logout();
          }
        } else {
          this.loading.hide();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.loading.hide();
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getUserProfile() {
      try {
        this.loading.show();
        const response = await mainURL.get("/user/user-profile");

        if (response.status === 200) {
          this.loading.hide();
          this.dataForm.name = response.data.data.name;
          this.dataForm.email = response.data.data.email;
          this.dataForm.nik = response.data.data.nik;
          this.dataForm.telegram_username = response.data.data.telegram_username;
        } else {
          this.loading.hide();
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.loading.hide();
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
    async logout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");

      this.$showToast("succces", "Sukses", "Berhasill Logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>
<style>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
