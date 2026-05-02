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
        :aria-label="closeAriaLabel"
        @click="$emit('close')"
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
import { computed, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '../../plugins/i18n.plugin'

export type CTagType =
  | 'primary' | 'secondary' | 'tertiary'
  | 'success' | 'warning' | 'error' | 'info' | 'default'

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String as PropType<CTagType>,
    default: 'primary',
    validator: (value: string) => [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'error',
      'info',
      'default',
    ].includes(value),
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
  closeAriaLabel: {
    type: String,
    default: undefined,
  },
})

defineEmits<{
  close: []
}>()

const t = (() => {
  try { return useI18n().t } catch { return i18n.global.t }
})()

const closeAriaLabel = computed(
  () => props.closeAriaLabel ?? t('translate.common.aria.close'),
)
</script>

<style lang="scss">
@import '../../styles/ui/c-tag';
</style>
