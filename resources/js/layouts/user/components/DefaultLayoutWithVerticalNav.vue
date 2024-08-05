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

const handleNavClick = (type) => {
  localStorage.setItem('creditType', type);

};
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
        icon: 'bx-home-alt',
        to: '/user-dashboard',
      }" />
      <VerticalNavSectionTitle :item="{
        heading: 'Pengajuan Kredit Bulan Ini',
      }" />
      <VerticalNavLink :item="{
        title: 'Approve',
        icon: 'bx-check-circle',
        to: '/u-approve'
      }" :onCustomClick="() => handleNavClick(1)" />
      <VerticalNavLink :item="{
        title: 'Pending',
        icon: 'bx-time',
        to: '/u-pending'
      }" :onCustomClick="() => handleNavClick(2)" />
      <VerticalNavLink :item="{
        title: 'Reject',
        icon: 'bx-x-circle',
        to: '/u-reject'
      }" :onCustomClick="() => handleNavClick(3)" />
      <VerticalNavLink :item="{
        title: 'Cancel',
        icon: 'bx-block',
        to: '/u-cancel'
      }" :onCustomClick="() => handleNavClick(4)" />
      <VerticalNavLink :item="{
        title: 'Data Kredit Bulan ini',
        icon: 'bx-folder',
        to: '/u-credit'
      }" />

      <VerticalNavSectionTitle :item="{
        heading: 'Pengajuan Kredit Bulan Lalu',
      }" />

      <VerticalNavLink :item="{
        title: 'Data Kredit per Bulan',
        icon: 'bx-calendar',
        to: '/u-perkantor'
      }" />

      <VerticalNavSectionTitle :item="{
        heading: 'Frequently Asked Questions',
      }" />
      <VerticalNavLink :item="{
        title: 'FAQ',
        icon: 'bx-help-circle',
        to: '/u-qna'
      }" />

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
