<script setup>

import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
import { useTheme } from 'vuetify';

// Components
import NavbarThemeSwitcher from '@/layouts/user/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/user/components/UserProfile.vue';

const vuetifyTheme = useTheme()
const isPhone = ref(false) // Initialize a ref for phone detection
if (typeof window !== 'undefined') {
  isPhone.value = window.innerWidth <= 600 // Adjust the width threshold according to your preference
}

const userData = JSON.parse(localStorage.getItem("userData"));
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <VSpacer />

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink :item="{
        title: 'Dashboard',
        icon: 'bx-home',
        to: '/user-dashboard',
      }" />
      <VerticalNavSectionTitle v-if="userData.position.approval_level_id != 1" :item="{
        heading: 'Pengajuan Kredit',
      }" />
      <VerticalNavLink :item="{
        title: 'Data Kredit bulan ini',
        icon: 'bx-file',
        to: '/u-credit'
      }" />
      <VerticalNavLink :item="{
        title: 'Data Kredit per Bulan',
        icon: 'bx-file',
        to: '/u-perkantor'
      }" />

      <VerticalNavSectionTitle :item="{
        heading: 'Frequently Asked Questions',
      }" />
      <VerticalNavLink :item="{
        title: 'FAQ',
        icon: 'bx-file',
        to: '/u-qna'
      }" />

      <!--       
      <VerticalNavSectionTitle v-if="userData.position.approval_level_id!=1"
        :item="{
          heading: 'Pengajuan Draft',
        }"
      />
      <VerticalNavLink v-if="userData.position.approval_level_id!=1" :item="{
        title: 'Draft',
        icon: 'bx-file',
        to:'/u-draft'
      }" /> -->


    </template>


    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <!-- <template #footer>
      <v-bottom-navigation :elevation="0" mode="shift" v-if="isPhone">
        <v-btn value="home" :to="'/user-dashboard'">
          <v-icon>mdi-home</v-icon>

          <span>Home</span>
        </v-btn>
        <v-btn value="kredit" :to="'/u-credit'">
          <v-icon>mdi-file</v-icon>

          <span>Kredit</span>
        </v-btn>
      </v-bottom-navigation>
    </template> -->
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
