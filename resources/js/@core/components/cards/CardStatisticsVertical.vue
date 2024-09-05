<script setup>

import { useRouter } from 'vue-router';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
  change: {
    type: Number,
    required: false,
  },
  type :{
    type: Number,
    required: false,
  }
})

const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change) === 1)
const router = useRouter();
const handleButtonClick = (link) => {
  
  localStorage.setItem('creditType', props.type);
  if (router) {
    router.push(link);
  }
};
</script>

<template>
  <VCard @click="handleButtonClick(props.link)">
    <VCardText class="d-flex align-center pb-4">
      <img
        width="42"
        :src="props.image"
        alt="image"
      >

      <VSpacer />

      <MoreBtn
        size="x-small"
        class="me-n3 mt-n4"
        @click="handleButtonClick(props.link)"
      />
    </VCardText>

    <VCardText>
      <p class="mb-1" style="font-size: 0.9rem;">
        {{ props.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        {{ props.stats }}
      </h5>
      <span
        :class="isPositive ? 'text-success' : 'text-error'"
        class="d-flex align-center gap-1 text-sm"
      >
      </span>
    </VCardText>
  </VCard>
</template>
