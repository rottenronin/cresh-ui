<template>
  <button
    ref="btnRef"
    class="btn c-btn"
    :class="{
      outlined,
      text,
      'is-loading': isLoading,
      slim,
      [color]: color,
    }"
    :disabled="isLoading || disabled"
    :style="{
      'background': customColor ? color : '',
      'border-color': customColor ? color : ''
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
        'color': (outlined || text) && customColor ? color : '',
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
      :color="outlined ? color : 'white'"
    />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import LoaderIcon from '../icons/LoaderIcon.vue'

export default defineComponent({
  name: 'CButton',

  components: {
    LoaderIcon,
  },

  props: {
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
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: Boolean,
      required: false,
      default: false,
    },
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
  },

  emits: ['click'],

  setup(props, { emit, slots }) {
    const customColor = computed(() => props.color.includes('#'))

    const onClick = (e: Event) => {
      emit('click', e)
    }

    const hasSuffix = computed(() => !!slots.suffix)

    const hasPrefix = computed(() => !!slots.prefix)

    return {
      customColor,
      onClick,
      hasSuffix,
      hasPrefix,
    }
  },
})

</script>

<style lang="scss">
@import '../../styles/ui/c-button.scss';
</style>
