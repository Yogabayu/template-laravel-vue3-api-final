<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import upgradeBannerDark from "@images/pro/upgrade-banner-dark.png";
import upgradeBannerLight from "@images/pro/upgrade-banner-light.png";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import { useTheme } from "vuetify";

// Components
import Footer from "@/layouts/admin/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/admin/components/NavbarThemeSwitcher.vue";
import UserProfile from "@/layouts/admin/components/UserProfile.vue";

const vuetifyTheme = useTheme();

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? upgradeBannerLight
    : upgradeBannerDark;
});
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <VSpacer />

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />

      <!-- 👉 konfigurasi -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Konfigurasi Dasar',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Kantor',
          icon: 'bx-building',
          to: '/office',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Permission',
          icon: 'bx-shield',
          to: '/permission',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Jabatan',
          icon: 'bx-area',
          to: '/position',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'User',
          icon: 'bx-user',
          to: '/users',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Konfigurasi Fase Kredit',
          icon: 'bx-bell',
          to: '/notifconf',
        }"
      />

      <VerticalNavSectionTitle
        :item="{
          heading: 'Data Kredit',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Data Master',
          icon: 'bx-file-blank',
          to: '/data-master',
        }"
      />

      <!-- <VerticalNavLink
        :item="{
          title: 'User',
          icon: 'bx-user',
          to: '',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Jabatan',
          icon: 'bx-area',
          to: '',
        }"
      /> -->
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
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
