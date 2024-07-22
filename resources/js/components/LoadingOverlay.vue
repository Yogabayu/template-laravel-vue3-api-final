<template>
    <v-overlay :modelValue="isLoading" class="d-flex align-center justify-center" scrim="black" persistent>
        <v-col class="text-center">
            <v-progress-circular color="primary" size="32" indeterminate class="mb-4"></v-progress-circular>
            <br>
            <span class="font-weight-bold text-lg custom-text-color">Loading....</span>
        </v-col>
    </v-overlay>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'LoadingOverlay',
    setup() {
        const isLoading = ref(false)

        const show = () => {
            isLoading.value = true
        }

        const hide = () => {
            isLoading.value = false
        }

        return {
            isLoading,
            show,
            hide
        }
    }
}
</script>

<style scoped>
.custom-text-color {
    color: #ffffff;
}

.v-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.v-col {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.v-progress-circular {
    margin-bottom: 16px;
}
</style>
