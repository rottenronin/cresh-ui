<template>
  <div class="c-date-range-filters">
    <CCard
      v-if="state.initialized"
      class="c-date-range-filters"
    >
      <div class="left-content">
        <CDropdown
          v-model="state.dateFiltersDropdownVisible"
          :items="dateFilters"
          v-slot="{ selectedItem }"
          @select="onDateFilterSelect"
          class="date-filter"
          :class="{
            active: state.activator === 'date-filter'
          }"
          :pre-selected-item="state.dateFilter
            ? getDateFilterKeyValue(state.dateFilter)
            : undefined
          "
        >
          <div v-if="selectedItem">
            {{ selectedItem.key }}
          </div>
        </CDropdown>
        <Datepicker
          :model-value="state.dateRange"
          @update:model-value="onDateRangeUpdate"
          hide-input-icon
          range
          multi-calendars
          hide-offset-dates
          :multi-static="false"
          :enable-time-picker="false"
          locale="fr"
          :format="formatDatePicker || ''"
          @open="onDatePickerOpen"
          @cleared="onDateFilterSelect({
            value: 'today',
            key: 'today',
          })"
          :max-date="new Date()"
          auto-apply
          :class="{
            'date-range-filter': true,
            'active': state.activator === 'date-range'
          }"
        >
          <template #clear-icon="{ clear }">
            <CIcon
              class="input-slot-image"
              name="cross-circle"
              color="#FC5A5A"
              @click="clear"
            />
          </template>
        </Datepicker>
      </div>
      <div
        v-if="hasRightContent"
        class="right-content"
      >
        <slot name="rightContent" />
      </div>
    </CCard>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  reactive,
  useSlots,
  computed,
  PropType,
} from 'vue'
import Datepicker from '@vuepic/vue-datepicker'

import type {
  CDropdownKeyValue,
  DateRangeFilterType,
  DateRangeFilterActivator,
} from '../../../@types'
import CCard from '../CCard.vue'
import CDropdown from '../CDropdown.vue'
import CIcon from '../../icons/CIcon.vue'

import { dateHelper } from '../../../helpers'
import i18n from '../../../plugins/i18n.plugin'

const state = reactive<{
  activator: DateRangeFilterActivator
  dateFiltersDropdownVisible: boolean
  dateRangePickerVisible: boolean
  dateRange: Array<Date> | Array<string>
  dateFilter: DateRangeFilterType
  initialized: boolean
}>({
  activator: 'date-filter',
  dateFiltersDropdownVisible: false,
  dateRangePickerVisible: false,
  dateRange: [],
  dateFilter: 'today',
  initialized: false,
})

// eslint-disable-next-line vue/valid-define-props
const props = defineProps({
  dateFilter: {
    type: String as PropType<DateRangeFilterType>,
    required: false,
    default: 'today',
  },
  dateRange: {
    type: Array as PropType<Array<Date> | Array<string>>,
    required: false,
    default: () => [],
  },
  activator: {
    type: String as PropType<DateRangeFilterActivator>,
    required: false,
    default: 'date-filter',
  },
})

const dateFilters = [{
  key: i18n.global.t('translate.filters.dates.today'),
  value: 'today',
}, {
  key: i18n.global.t('translate.filters.dates.last_7_days'),
  value: 'fweek',
}, {
  key: i18n.global.t('translate.filters.dates.last_4_weeks'),
  value: 'fmonth',
}, {
  key: i18n.global.t('translate.filters.dates.last_3_months'),
  value: 'fquarter',
}, {
  key: i18n.global.t('translate.filters.dates.last_12_months'),
  value: 'fyear',
}, {
  key: i18n.global.t('translate.filters.dates.month_to_date'),
  value: 'month',
}, {
  key: i18n.global.t('translate.filters.dates.quarter_to_date'),
  value: 'quarter',
}, {
  key: i18n.global.t('translate.filters.dates.year_to_date'),
  value: 'year',
}, {
  key: i18n.global.t('translate.filters.dates.all_time'),
  value: 'all',
}]

const emit = defineEmits(['filters-select'])
const slots = useSlots()

const hasRightContent = computed(() => !!slots.rightContent)

function dateFilterSelect (dateFilter: DateRangeFilterType) {
  const dateNow = new Date()
  const theDate = new Date()

  state.dateFilter = dateFilter
  state.activator = 'date-filter'

  function formatDateRange (from: Date, to: Date) {
    state.dateRange = [
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`,
    ]
  }

  // eslint-disable-next-line default-case
  switch (dateFilter) {
    case 'today':
      formatDateRange(dateNow, dateNow)
      break
    case 'fweek':
      theDate.setDate(dateNow.getDate() - 7)
      formatDateRange(theDate, dateNow)
      break
    case 'fmonth':
      theDate.setDate(dateNow.getDate() - 28)
      formatDateRange(theDate, dateNow)
      break
    case 'fquarter':
      theDate.setMonth(dateNow.getMonth() - 3)
      formatDateRange(theDate, dateNow)
      break
    case 'fyear':
      theDate.setMonth(dateNow.getMonth() - 12)
      formatDateRange(theDate, dateNow)
      break
    case 'month': {
      const firstDateOfMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        1,
      )
      formatDateRange(firstDateOfMonth, dateNow)
      break
    }
    case 'quarter': {
      // 1st quarter: january, february and march
      const q1 = [0, 1, 2]
      const q2 = [3, 4, 5]
      const q3 = [6, 7, 8]
      const q4 = [9, 10, 11]
      const localCurrentMonth = dateNow.getMonth()
      let [initialMonth] = q1
      if (q2.includes(localCurrentMonth)) {
        [initialMonth] = q2
      } else if (q3.includes(localCurrentMonth)) {
        [initialMonth] = q3
      } else if (q4.includes(localCurrentMonth)) {
        [initialMonth] = q4
      }
      const firstDayOfQuarter = new Date(
        dateNow.getFullYear(),
        initialMonth,
        1,
      )
      formatDateRange(firstDayOfQuarter, dateNow)
      break
    }
    case 'year': {
      const firstDateOfTheYear = new Date(
        dateNow.getFullYear(),
        0,
        1,
      )
      formatDateRange(firstDateOfTheYear, dateNow)
      break
    }
    case 'all':
      break
  }
}

function onDatePickerOpen() {
  state.activator = 'date-range'
}

function onDateRangeClear() {
  state.dateRange = []
}

function formatDatePicker([from, to]: Array<Date>) {
  if (!from || !to) {
    return ''
  }
  // eslint-disable-next-line consistent-return
  return `${dateHelper.toLocaleDateString(from)} - ${dateHelper.toLocaleDateString(to)}`
}

function getDateFilterKeyValue (value: string) {
  const index = dateFilters.findIndex(i => i.value === value)
  if (index > -1) {
    return dateFilters[index]
  }
  return undefined
}

function onDateFilterSelect (
  { value: dateFilter }: CDropdownKeyValue<DateRangeFilterType>,
) {
  dateFilterSelect(dateFilter)
  state.dateFilter = dateFilter
  onDateRangeClear()
  emit('filters-select', {
    dateFilter,
    dateRange: undefined,
    activator: state.activator,
  })
}

function onDateRangeUpdate(dates: Date[] | null) {
  state.activator = dates === null ? 'date-filter' : 'date-range'
  if (!dates || !Array.isArray(dates) || dates.length !== 2) {
    return
  }
  const start = dateHelper.beginningOfTheDay(dates[0])
  const end = dateHelper.endOfTheDay(dates[1])
  state.dateRange = [
    start,
    end,
  ]
  emit('filters-select', {
    dateFilter: undefined,
    dateRange: state.dateRange,
    activator: state.activator,
  })
}

onMounted(() => {
  state.activator = props.activator
  state.dateFilter = props.dateFilter
  state.dateRange = props.dateRange

  state.initialized = true
})
</script>

<style lang="scss">
@import '../../../styles/ui/c-date-range-filters.scss';
</style>
