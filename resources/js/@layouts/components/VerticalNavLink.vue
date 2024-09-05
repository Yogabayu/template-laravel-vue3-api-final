<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  onCustomClick: {
    type: Function,
    default: null,
  },
});
const router = useRouter();

const handleClick = (event) => {
  if (props.onCustomClick) {
    props.onCustomClick(event);
  }
  if (props.item.to) {
    router.push(props.item.to);
  }
};
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: false }"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      :to="item.to"
      :href="item.href"
      @click="handleClick"
    >
      <VIcon
        :icon="item.icon"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ item.title }}
      </span>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
