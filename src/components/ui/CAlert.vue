<template>
  <div
    class="c-alert"
    :class="{
      [`alert-${type}`]: true,
      alt: alt === true,
    }"
  >
    <template v-if="!hideIcon">
      <InfoIcon
        v-if="type === 'info'"
        name="info"
        :color="alt ? 'primary' : 'secondary'"
        :width="22"
        :height="22"
      />
      <CheckCircleIcon
        v-else-if="type === 'success'"
        name="check-circle"
        color="success"
        :width="20"
        :height="20"
      />
      <WarningIcon
        v-else-if="type === 'warning'"
        name="warning"
        color="orange"
        :width="20"
        :height="20"
      />
      <ErrorIcon
        v-else-if="type === 'error'"
        name="error"
        color="error"
        :width="18"
        :height="18"
      />
    </template>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  CheckCircleIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../icons'

defineProps({
  hideIcon: {
    type: Boolean,
    default: false,
    required: false,
  },
  alt: {
    type: Boolean,
    default: false,
    required: false,
  },
  type: {
    type: String,
    validator: (value: string) => [
      'default', 'success', 'info', 'warning', 'error',
    ].includes(value),
    default: 'default',
    required: false,
  },
})
</script>

<style lang="scss">
  @import '../../styles/ui/c-alert.scss';
</style>
