import LoadingOverlay from '@/components/LoadingOverlay.vue'

export default {
  install: (app) => {
    const loadingOverlay = {
      show: null,
      hide: null
    }

    app.component('LoadingOverlay', LoadingOverlay)

    app.config.globalProperties.$loading = loadingOverlay

    app.provide('loading', loadingOverlay)
  }
}
