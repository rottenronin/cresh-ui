<template>
  <tr
    :class="`datatable-item ${clickable ? 'cursor-pointer' : ''}`"
    @click.prevent.stop="onRowClick"
  >
    <td
      v-for="(header, i) of headers"
      :key="`item-i${i}-prop-${header.key}`"
      :class="`item item-${header.key}`"
    >
      <template v-if="hasHeaderItemSlot(header.key)">
        <slot
          :name="`item-${header.key}`"
          :item="item"
          :index="index"
          :row-index="i"
          :column-key="header.key"
        />
      </template>
      <template v-else>
        {{ item[header.key] }}
      </template>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { useSlots, PropType } from 'vue'
import type {
  DatatableHeaderItem,
} from '../../../@types'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  clickable: {
    type: Boolean,
    required: false,
    default: false,
  },
  headers: {
    type: Array as PropType<Array<DatatableHeaderItem>>,
    required: true,
  },
})

const emit = defineEmits(['row:click'])
const slots = useSlots()

function onRowClick () {
  emit('row:click', {
    item: props.item,
    index: props.index,
  })
}

function hasHeaderItemSlot (key: string) {
  return !!slots[`item-${key}`]
}
</script>
