<template>
  <div class="c-datatable-footer">
    <div class="page-select">
      <label>
        {{
          i18n.global.t(
            'translate.datatable.footer.rows_per_page',
          )
        }}
      </label>
      <CSelect
        class="c-datatable-footer-page-select"
        hide-label
        :name="`datatablePageSelect`"
        :model-value="paginationItemsPerPage"
        :label="''"
        :options="options"
        @update:model-value="onSelectChange"
      />

      <div class="page-index">
        <span class="current-page-first-index">
          {{ currentPageIndex }}
        </span>
        <span>/</span>
        <span class="current-page-last-index">
          {{
            totalPages
          }}
        </span>
      </div>

      <div class="page-prev-next-triggers">
        <div class="page-prev-trigger">
          <CButton
            text
            :disabled="currentPageIndex <= 1"
            @click.prevent.stop="onPrevPageTriggerClick"
          >
            <ChevronLeftIcon
              name="chevron-left"
            />
          </CButton>
        </div>

        <div class="page-next-trigger">
          <CButton
            text
            :disabled="currentPageIndex >= totalPages"
            @click.prevent.stop="onNextPageTriggerClick"
          >
            <ChevronRightIcon
              name="chevron-right"
            />
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
} from 'vue'
import type {
  Pagination,
} from '../../../@types'

import i18n from '../../../plugins/i18n.plugin'

import CSelect from '../../form-controls/CSelect.vue'
import CButton from '../CButton.vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../icons'

const props = withDefaults(
  defineProps<{
    pagination: Pagination
    itemsPerPage?: number
    allowTotal?: boolean
    pages: number[]
  }>(),
  {
    itemsPerPage: 10,
    allowTotal: false,
  },
)

const paginationItemsPerPage = computed(
  () => props.pagination.itemsPerPage || props.itemsPerPage,
)

const options = computed(() => {
  const defaultOptions = props.pages.map((v: number) => ({
    key: v.toString(),
    value: v.toString(),
    isDefault: v === props.itemsPerPage,
    name: v.toString(),
  }))

  if (props.itemsPerPage !== -1) {
    const existed = defaultOptions.findIndex(
      (item: {
        key: string
        value: string
        isDefault: boolean
        name: string
      }) => item.value === String(props.itemsPerPage),
    ) > -1
    if (!existed) {
      defaultOptions.push({
        key: String(props.itemsPerPage),
        value: String(props.itemsPerPage),
        isDefault: true,
        name: props.itemsPerPage.toString(),
      })
    }
  }
  if (props.allowTotal) {
    defaultOptions.push({
      key: 'all',
      value: '-1',
      isDefault: false,
      name: i18n.global.t('translate.common.all'),
    })
  }
  return defaultOptions
})

const emit = defineEmits(
  [
    'update:items-per-page',
    'click:prev-page',
    'click:next-page',
  ],
)

function onSelectChange (value: number): void {
  emit('update:items-per-page', Number(value))
}

const currentPageIndex = computed(() => {
  if (props.pagination) {
    return Number(props.pagination.page)
  }
  return -1
})

const totalPages = computed(() => {
  if (!props.pagination.itemsPerPage
    || props.pagination.itemsPerPage === -1) {
    return 1
  }
  const size = Number(props.pagination.itemsPerPage)
  const total = Number(props.pagination.totalCount)
  return Math.ceil(total / size)
})

function onPrevPageTriggerClick (): void {
  if (currentPageIndex.value <= 1) {
    return
  }
  const prevPageIndex = Number(props.pagination.page) - 1
  emit('click:prev-page', prevPageIndex)
}

function onNextPageTriggerClick (): void {
  if (currentPageIndex.value >= totalPages.value) {
    return
  }
  const nextPageIndex = Number(props.pagination.page) + 1
  emit('click:next-page', nextPageIndex)
}
</script>
