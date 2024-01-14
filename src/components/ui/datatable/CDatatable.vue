<template>
  <div class="c-datatable">
    <div class="table-wrapper">
      <table>
        <slot
          v-if="hasHeaderSlot"
          name="header"
        />
        <CDatatableHeader
          v-else
          :headers="headers"
          :sort-by="state.sortBy"
          @update:sort-by="onHeaderItemClick"
        />

        <CDatatableLoadingBar
          :is-loading="state.showLoading"
        />

        <tbody
          v-if="state.items && state.items.length > 0"
        >
          <template v-if="hasDefaultSlot">
            <!-- <slot :items="state.items" /> -->
            <tr
              v-for="(item, i) of currentItems"
              :key="`item-i${i}`"
              class="datatable-item"
              :class="{ 'cursor-pointer': rowClickable }"
              @click.prevent.stop="() => onRowClick(item)"
            >
              <slot
                :item="item"
                :index="i"
              />
            </tr>
          </template>
          <template v-else>
            <CDatatableRowItem
              v-for="(item, i) of currentItems"
              :key="`item-i${i}`"
              :item="item"
              :index="i"
              :clickable="rowClickable"
              :headers="headers"
              @row:click="() => onRowClick(item)"
            />
          </template>
        </tbody>

        <CDatatableSkeletonRow
          v-else-if="state.showLoading && !noSkeleton"
        />

        <CDatatableEmptyData
          v-if="!state.showLoading
            && (!state.items || state.items.length === 0)"
          :visible="!state.showLoading
            && (!state.items || state.items.length === 0)"
          @retry="onRetry"
        />
      </table>
    </div>
    <template v-if="!noFooter">
      <template v-if="hasFooterSlot">
        <slot name="footer" />
      </template>

      <template v-else>
        <CDatatableFooter
          :pages="pages"
          :items-per-page="itemsPerPage"
          :pagination="state.pagination"
          :allow-total="allowTotal"

          @click:next-page="onNextPageTriggerClick"
          @click:prev-page="onPrevPageTriggerClick"
          @update:items-per-page="onSelectChange"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  reactive,
  useSlots,
  watch,
} from 'vue'

import type {
  DatatableHeaderItem,
  Pagination,
} from '@/@types/c-datatable'

import CDatatableHeader from './CDatatableHeader.vue'
import CDatatableLoadingBar from './CDatatableLoadingBar.vue'

import cDatatableSortBy from './c-datatable-sortby'
import CDatatableEmptyData from './CDatatableEmptyData.vue'
import CDatatableFooter from './CDatatableFooter.vue'
import CDatatableRowItem from './CDatatableRowItem.vue'
import CDatatableSkeletonRow from './CDatatableSkeletonRow.vue'

export default defineComponent({
  name: 'CDatatable',
  components: {
    CDatatableLoadingBar,
    CDatatableHeader,
    CDatatableRowItem,
    CDatatableSkeletonRow,
    CDatatableEmptyData,
    CDatatableFooter,
  },
  props: {
    headers: {
      type: Array as PropType<Array<DatatableHeaderItem>>,
      required: true,
    },
    rowClickable: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    // if data fetched from server side
    isServerSync: {
      type: Boolean,
      required: false,
      default: false,
    },
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    pages: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => [5, 10, 15],
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
    totalItemsCount: {
      type: Number,
      required: false,
      default: 10,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    // not implement multisort yet
    multisort: {
      type: Boolean,
      required: false,
      default: false,
    },
    noSkeleton: {
      type: Boolean,
      required: false,
      default: false,
    },
    allowTotal: {
      type: Boolean,
      required: false,
      default: false,
    },
    noFooter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: [
    'update:items-per-page',
    'update:sort-by',
    'update:page-index',
    'row-click',
    'update:retry',
  ],
  setup (props, { emit }) {
    const slots = useSlots()

    const hasHeaderSlot = computed(() => !!slots.header)
    const hasDefaultSlot = computed(() => !!slots.default)
    const hasFooterSlot = computed(() => !!slots.footer)

    const state = reactive<{
      items: Record<string, unknown>[]
      pagination: Pagination
      sortBy: DatatableHeaderItem[]
      showLoading: boolean
      initialized: boolean
    }>({
      items: [] as Record<string, unknown>[],
      pagination: {
        page: 1,
        pagesCount: 1,
        itemsPerPage: 10,
        totalCount: 0,
      },
      sortBy: [] as DatatableHeaderItem[],
      showLoading: true,
      initialized: false,
    })

    onBeforeMount(() => {
      state.sortBy = (
        props.headers as Array<DatatableHeaderItem>
      ).filter(
        item => item.sortOrder === 'asc' || item.sortOrder === 'desc',
      )

      if (props.isServerSync) {
        state.pagination = {
          page: props.page,
          pagesCount: Math.ceil(props.totalItemsCount / props.itemsPerPage),
          itemsPerPage: props.itemsPerPage,
          totalCount: props.totalItemsCount,
          links: undefined,
        }
      } else {
        state.pagination = {
          ...state.pagination,
          page: props.page,
          itemsPerPage: props.itemsPerPage,
        }
      }
      state.initialized = true
    })

    const currentItems = computed(() => {
      if (props.isServerSync
        || state.pagination.itemsPerPage === -1) {
        return state.items
      }
      const size = Number(state.pagination.itemsPerPage)
      const offset = size * (Number(state.pagination.page) - 1)
      return state.items.slice(offset, offset + size)
    })

    const currentPageIndex = computed(() => {
      if (state.pagination) {
        return Number(state.pagination.page)
      }
      return -1
    })

    const paginationOffset = computed(() => {
      const size = Number(state.pagination.itemsPerPage)
      const offset = size * (Number(state.pagination.page) - 1)
      return offset
    })

    const totalPages = computed(() => {
      if (!state.pagination.itemsPerPage
        || state.pagination.itemsPerPage === -1) {
        return 1
      }
      const size = Number(state.pagination.itemsPerPage)
      const total = Number(state.pagination.totalCount)
      return Math.ceil(total / size)
    })

    function setPagination (): void {
      if (props.isServerSync) {
        state.pagination = {
          page: props.page,
          pagesCount: Math.ceil(
            props.totalItemsCount / props.itemsPerPage,
          ),
          itemsPerPage: props.itemsPerPage,
          totalCount: props.totalItemsCount,
          links: undefined,
        }
        return
      }
      if (!state.pagination) {
        state.pagination = {
          page: 1,
          pagesCount: Math.ceil(state.items.length / props.itemsPerPage),
          itemsPerPage: props.itemsPerPage,
          totalCount: state.items.length,
          links: undefined,
        }
      } else {
        state.pagination = {
          ...state.pagination,
          pagesCount: Math.ceil(
            state.items.length / Number(state.pagination.itemsPerPage),
          ),
          totalCount: state.items.length,
        }
      }
    }

    function init() {
      if (!props.isServerSync) {
        state.items = cDatatableSortBy({
          items: props.items as Record<string, unknown>[],
          sortBy: state.sortBy,
          headers: props.headers as DatatableHeaderItem[],
        })
        setPagination()
      } else {
        state.items = props.items as Record<string, unknown>[]
        setPagination()
      }
    }

    watch(() => props.items, () => {
      if (!state.initialized) return
      init()
    }, {
      immediate: false,
      deep: true,
    })

    watch(() => state.initialized, (isInitialized: boolean) => {
      if (!isInitialized) return
      init()
    })

    if (props.isServerSync) {
      watch(() => props.page, () => {
        state.pagination = {
          ...state.pagination,
          page: props.page,
        }
      })

      watch(() => props.itemsPerPage, () => {
        state.pagination = {
          ...state.pagination,
          itemsPerPage: props.itemsPerPage,
        }
      })

      watch(() => props.totalItemsCount, () => {
        state.pagination = {
          ...state.pagination,
          totalCount: props.totalItemsCount,
        }
      })
    }

    watch(() => props.isLoading, (val: boolean) => {
      // let time to initialize arrays, to prevent empty display
      setTimeout(() => {
        state.showLoading = val
      }, 100)
    }, {
      immediate: true,
    })

    function onSelectChange (value: number): void {
      // if data is not fetched from server, let the caller update data
      if (!props.isServerSync) {
        state.pagination.itemsPerPage = Number(value)
        state.pagination.page = 1
      }
      emit('update:items-per-page', Number(value))
    }

    function onNextPageTriggerClick (): void {
      if (
        currentPageIndex.value >= totalPages.value
          || props.isLoading
      ) {
        return
      }
      const nextPageIndex = Number(state.pagination.page) + 1
      emit('update:page-index', nextPageIndex)
      if (!props.isServerSync) {
        state.pagination = {
          ...state.pagination,
          page: nextPageIndex,
        }
      }
    }

    function onPrevPageTriggerClick (): void {
      if (currentPageIndex.value <= 1 || props.isLoading) {
        return
      }
      const prevPageIndex = Number(state.pagination.page) - 1
      emit('update:page-index', prevPageIndex)
      if (!props.isServerSync) {
        state.pagination = {
          ...state.pagination,
          page: prevPageIndex,
        }
      }
    }

    function onSortByChange (): void {
      if (!props.isServerSync) {
        state.items = cDatatableSortBy({
          items: props.items as Record<string, unknown>[],
          sortBy: state.sortBy,
          headers: props.headers as DatatableHeaderItem[],
        })
        state.pagination.page = 1
      }
    }

    function onRowClick (row: unknown) {
      if (!props.rowClickable) {
        return
      }
      emit('row-click', row)
    }

    function onHeaderItemClick (
      headerItem: DatatableHeaderItem,
    ): void {
      if (!headerItem.sortable) {
        return
      }
      const index = state.sortBy.findIndex(
        (item: DatatableHeaderItem) => item.key === headerItem.key,
      )
      if (index === -1) {
        state.sortBy = [{
          ...headerItem,
          sortOrder: 'asc',
        }]

        emit('update:sort-by', state.sortBy)
        onSortByChange()
        return
      }

      if (state.sortBy[index].sortOrder === 'asc') {
        state.sortBy.splice(index, 1, {
          ...headerItem,
          sortOrder: 'desc',
        })
      } else {
        state.sortBy.splice(index, 1)
      }
      emit('update:sort-by', state.sortBy)
      onSortByChange()
    }

    function onRetry() {
      emit('update:retry')
    }

    return {
      state,
      hasHeaderSlot,
      hasDefaultSlot,
      hasFooterSlot,
      paginationOffset,
      totalPages,
      currentItems,
      onSelectChange,
      onNextPageTriggerClick,
      onPrevPageTriggerClick,
      onSortByChange,
      onHeaderItemClick,
      onRowClick,
      onRetry,
    }
  },
})

</script>

<style lang="scss">
@import '@/styles/ui/c-datatable.scss';
</style>
