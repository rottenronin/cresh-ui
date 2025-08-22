<template>
  <thead class="c-datatable-header">
    <tr>
      <th
        v-for="header of headers"
        :key="header.key"
        :class="
          `header-item align-${header.align}
          ${header.sortable ? 'sortable' : ''}`"
        @click.prevent.stop="() => onHeaderItemClick(header)"
      >
        <span>
          {{
            header.text
          }}
        </span>
        <template v-if="header.sortable">
          <span
            v-if="isSortByDefined(header)"
            :class="`sort-by-${header.key} c-ml-5`"
          >
            <ArrowUpIcon
              v-if="isAscendingSortBy(header)"
              color="primary"
              :width="14"
              :height="14"
            />
            <ArrowDownIcon
              v-if="isDescendingSortBy(header)"
              color="primary"
              :width="14"
              :height="14"
            />
          </span>
        </template>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

import type {
  DatatableHeaderItem,
} from '../../../@types'
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue'
import ArrowUpIcon from '../../icons/ArrowUpIcon.vue'

const props = defineProps({
  headers: {
    type: Array as PropType<Array<DatatableHeaderItem>>,
    required: true,
    default: () => [],
  },
  sortBy: {
    type: Array as PropType<Array<DatatableHeaderItem>>,
    required: true,
    default: () => [],
  },
})

const isSortByDefined = (
  header: DatatableHeaderItem,
) => props.sortBy.findIndex(
  (item: DatatableHeaderItem) => item.key === header.key,
) > -1

const isAscendingSortBy = (
  header: DatatableHeaderItem,
) => {
  const item = props.sortBy.find(
    (
      currentItem: DatatableHeaderItem,
    ) => currentItem.key === header.key,
  )
  return (item as DatatableHeaderItem).sortOrder === 'asc'
}

const isDescendingSortBy = (
  header: DatatableHeaderItem,
) => {
  const item = props.sortBy.find(
    (
      currentItem: DatatableHeaderItem,
    ) => currentItem.key === header.key,
  )
  return (item as DatatableHeaderItem).sortOrder === 'desc'
}

const emit = defineEmits(['update:sort-by'])

function onHeaderItemClick (
  header: DatatableHeaderItem,
) {
  if (header.sortable) {
    const sortOrder = header.sortOrder === 'asc' ? 'desc'
      : (header.sortOrder === 'desc' ? null : 'asc')

    emit('update:sort-by', header, sortOrder)
  }
}
</script>
