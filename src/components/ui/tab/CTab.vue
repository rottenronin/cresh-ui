<template>
  <div
    class="c-tab"
    :class="{
      disabled
    }"
  >
    <slot
      v-if="hasIconSlot"
      name="icon"
    />

    <slot v-if="showContent" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  ref,
  useSlots,
  watch,
} from 'vue'
import type { CTabItem } from '../../../@types'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
  hide: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const showContent = ref(props.visible)
const selectedTabItem = ref(inject<CTabItem | undefined>('selected-tab-item'))

const slots = useSlots()

const hasIconSlot = computed(() => !!slots.icon)

const injectTab = inject<(identifier: string) => void | undefined>('tab-update')

watch(() => props.visible, (val: boolean) => {
  showContent.value = val
})

watch(() => selectedTabItem.value, (val: CTabItem | undefined) => {
  showContent.value = val?.id === props.identifier
})

watch(() => props.hide, (val, oldVal) => {
  if (val !== oldVal) {
    injectTab?.(props.identifier)
  }
})
</script>
