<template>
  <span class="tag">
    <span :class="`tag-item tag-${color || type}`">
      <span
        class="info-icon"
        v-if="additionalInfo"
      >
        i
      </span>
      <slot>{{ textContent }}</slot>
      <button
        v-if="closable"
        class="tag-close"
        @click="$emit('close')"
        aria-label="Close tag"
      >
        ×
      </button>
    </span>

    <span
      v-if="additionalInfo"
      :class="`tag-item tag-${color || type} details`"
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
    default: 'primary',
  },
  type: {
    type: String,
    default: 'primary',
  },
  textContent: {
    type: String,
    default: '',
  },
  additionalInfo: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  closable: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  close: []
}>()

</script>

<style lang="scss">
@import '../../styles/ui/c-tag';
</style>
