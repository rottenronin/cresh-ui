<template>
  <span class="tag">
    <span :class="`tag-item tag-${color}`">
      <span
        class="info-icon"
        v-if="additionalInfo"
      >
        i
      </span>
      {{ textContent }}
    </span>

    <span
      v-if="additionalInfo"
      :class="`tag-item tag-${color} details`"
    >
      {{ additionalInfo }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  color: {
    type: String,
    default: '',
  },
  textContent: {
    type: String,
    default: '',
    required: true,
  },
  additionalInfo: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
})

</script>

<style lang="scss">
@import '../../styles/ui/c-tag';
</style>
