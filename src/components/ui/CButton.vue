<template>
  <button
    ref="btnRef"
    class="btn c-btn"
    :class="[
      `size-${resolvedSize}`,
      `variant-${resolvedVariant}`,
      {
        outlined: resolvedVariant === 'outlined',
        text: resolvedVariant === 'text',
        'is-loading': isLoading,
        slim,
        [color]: !customColor,
      },
    ]"
    :disabled="isLoading || disabled"
    :style="{
      'background': customColor && resolvedVariant === 'solid' ? color : '',
      'border-color': customColor ? color : '',
    }"
    @click="onClick"
  >
    <span
      v-if="hasPrefix && !isLoading"
      class="prefix"
    >
      <slot name="prefix" />
    </span>
    <span
      class="btn-text flex"
      :style="{
        'color': resolvedVariant !== 'solid' && customColor ? color : '',
      }"
    >
      <slot v-if="!isLoading" />
    </span>
    <span
      v-if="hasSuffix && !isLoading"
      class="suffix flex"
    >
      <slot name="suffix" />
    </span>
    <LoaderIcon
      v-if="isLoading"
      name="loader"
      rotate
      :color="resolvedVariant === 'solid' ? 'white' : color"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

import LoaderIcon from '../icons/LoaderIcon.vue'

export type CButtonVariant = 'solid' | 'outlined' | 'text'
export type CButtonSize = 'sm' | 'md' | 'lg'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  /**
   * Visual variant. Prefer this over the legacy `outlined` / `text` props.
   */
  variant: {
    type: String as PropType<CButtonVariant | undefined>,
    required: false,
    default: undefined,
    validator: (value: string) => ['solid', 'outlined', 'text'].includes(value),
  },
  /**
   * Button size. Defaults to `md`. `slim` is kept for backward compatibility.
   */
  size: {
    type: String as PropType<CButtonSize | undefined>,
    required: false,
    default: undefined,
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  /**
   * @deprecated use `variant="outlined"` instead.
   */
  outlined: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * @deprecated use `variant="text"` instead.
   */
  text: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * @deprecated use `size="sm"` instead.
   */
  slim: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['click'])

const slots = defineSlots<{
  default?:() => unknown
  prefix?: () => unknown
  suffix?: () => unknown
}>()

const resolvedVariant = computed((): CButtonVariant => {
  if (props.variant) return props.variant
  if (props.outlined) return 'outlined'
  if (props.text) return 'text'
  return 'solid'
})

const resolvedSize = computed((): CButtonSize => {
  if (props.size) return props.size
  if (props.slim) return 'sm'
  return 'md'
})

// Treat any non-named CSS color value (hex, rgb, hsl, var(--…)) as a custom color.
const NAMED_COLOR_RE = /^[a-z][a-z0-9-]*$/i
const customColor = computed(() => !NAMED_COLOR_RE.test(props.color))

const onClick = (e: Event) => {
  emit('click', e)
}

const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)
</script>

<style lang="scss">
@import '../../styles/ui/c-button.scss';
</style>
