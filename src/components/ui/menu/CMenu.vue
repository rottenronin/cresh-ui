<template>
  <div class="c-menu">
    <div class="c-menu-header">
      <template
        v-if="hasHeaderSlot"
      >
        <slot name="header" />
      </template>
      <template v-else>
        <div class="c-menu-header-title">
          {{ title }}
        </div>
      </template>
    </div>
    <div
      v-if="hasDefaultSlot"
      class="c-menu-content"
    >
      <slot
        :selected-item="selectedItem"
        :selected-item-id="selectedItemId"
      />
    </div>
    <div class="c-menu-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  useSlots,
  computed,
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'
import { pubSubHelper } from '../../../helpers'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  selectedItem: {
    type: Object,
    required: false,
    default: () => undefined,
  },
})

const slots = useSlots()
const emit = defineEmits(['select'])

const hasDefaultSlot = computed(() => !!slots.default)

const hasHeaderSlot = computed(() => !!slots.header)

const localSelectedItem = ref()

pubSubHelper.subscribe('SELECT_MENU_ITEM', ({
  key: 'SELECT_MENU_ITEM',
  callback: (item: {
    id: string
    index: number
  }) => {
    localSelectedItem.value = item
    emit('select', item)
  },
}))

const selectedItemId = computed(() => {
  if (localSelectedItem.value) {
    return localSelectedItem.value.id
  }
  return undefined
})

onBeforeMount(() => {
  if (props.selectedItem) {
    localSelectedItem.value = props.selectedItem
  }
})

onBeforeUnmount(() => {
  pubSubHelper.unsubscribe('SELECT_MENU_ITEM', 'SELECT_MENU_ITEM')
})
</script>

<style lang="scss">
@import '../../../styles/ui/c-menu.scss';
</style>
