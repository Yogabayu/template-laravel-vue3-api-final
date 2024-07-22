<script setup>
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { hexToRgb } from '@layouts/utils';
import { onMounted, provide, ref } from 'vue';
import { useTheme } from 'vuetify';

const { global } = useTheme()

const loadingOverlay = ref(null)

onMounted(() => {
  provide('loading', {
    show: () => loadingOverlay.value?.show(),
    hide: () => loadingOverlay.value?.hide()
  })
})
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <LoadingOverlay ref="loadingOverlay" />
  </VApp>
</template>
