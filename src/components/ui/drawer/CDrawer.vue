<template>
  <div
    :class="`c-drawer ${placement} ${modelValue ? 'visible' : 'hide'}`"
    :style="{
      minWidth: modelValue ? drawerWidth : '0px',
      minHeight: drawerHeight,
    }"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { debounce } from '@/helpers'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    // eslint-disable-next-line vue/no-boolean-default
    default: true,
  },
  width: {
    type: [Number, String],
    required: false,
    default: 250,
  },
  height: {
    type: [Number, String],
    required: false,
    default: 'auto',
  },
  mobileBreakingpoint: {
    type: Number,
    required: false,
    default: -1,
  },
  placement: {
    validator: (value: string) => {
      const index = ['left', 'right', 'top', 'bottom'].findIndex(
        (item: string) => item === value,
      )
      return index > -1
    },
    required: false,
    default: 'left',
  },
})

const emit = defineEmits(['update:modelValue'])

const drawerWidth = computed(() => {
  if (Number.isSafeInteger(props.width)) {
    return `${props.width}px`
  }
  return String(props.width)
})

const drawerHeight = computed(() => {
  if (Number.isSafeInteger(props.height)) {
    return `${props.height}px`
  }
  return String(props.height)
})

const onWindowResize = debounce((e: UIEvent) => {
  if ((e.target as Window).innerWidth <= props.mobileBreakingpoint) {
    emit('update:modelValue', false)
  } else {
    emit('update:modelValue', true)
  }
}, 200)

onBeforeMount(() => {
  if (props.mobileBreakingpoint > -1) {
    window.addEventListener('resize', onWindowResize)
    if (window.innerWidth <= props.mobileBreakingpoint) {
      emit('update:modelValue', false)
    } else {
      emit('update:modelValue', true)
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

</script>

<style lang="scss">
  @import '@/styles/ui/c-drawer.scss';
</style>
