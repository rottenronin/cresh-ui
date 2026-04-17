import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CDateRangeFilters from './CDateRangeFilters.vue'

const meta = {
  title: 'UI / Filters',
  component: CDateRangeFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    dateFilter: {
      control: { type: 'select' },
      options: ['today', 'fweek', 'fmonth', 'fquarter', 'fyear', 'month', 'quarter', 'year'],
      description: 'Default date filter',
    },
    dateRange: {
      control: { type: 'object' },
      description: 'Date range array [startDate, endDate]',
    },
    activator: {
      control: { type: 'select' },
      options: ['date-filter', 'date-range'],
      description: 'Which input initiated the selection',
    },
  },
} satisfies Meta<typeof CDateRangeFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dateFilter: 'today',
    dateRange: [],
    activator: 'date-filter',
  },
  render: (args) => ({
    components: { CDateRangeFilters },
    setup() {
      const { t } = useI18n()
      const dateFilter = ref(args.dateFilter)
      const dateRange = ref(args.dateRange)
      const activator = ref(args.activator)

      return {
        t,
        dateFilter,
        dateRange,
        activator,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.filters.default.title') }}</h3>
        <c-date-range-filters
          :date-filter="dateFilter"
          :date-range="dateRange"
          :activator="activator"
          @update:date-filter="dateFilter = $event"
          @update:date-range="dateRange = $event"
        />
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h4>{{ t('translate.showcase.filters.state.title') }}</h4>
          <p>{{ t('translate.showcase.filters.state.date_filter') }}: {{ dateFilter }}</p>
          <p>{{ t('translate.showcase.filters.state.date_range') }}: {{ dateRange?.length > 0 ? dateRange : t('translate.showcase.filters.state.not_set') }}</p>
          <p>{{ t('translate.showcase.filters.state.activator') }}: {{ activator }}</p>
        </div>
      </div>
    `,
  }),
}

export const WithRightContent: Story = {
  args: {
    dateFilter: 'fweek',
    dateRange: [],
    activator: 'date-filter',
  },
  render: (args) => ({
    components: { CDateRangeFilters },
    setup() {
      const { t } = useI18n()
      const dateFilter = ref(args.dateFilter)
      const dateRange = ref(args.dateRange)
      const activator = ref(args.activator)

      return {
        t,
        dateFilter,
        dateRange,
        activator,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.filters.with_actions.title') }}</h3>
        <c-date-range-filters
          :date-filter="dateFilter"
          :date-range="dateRange"
          :activator="activator"
          @update:date-filter="dateFilter = $event"
          @update:date-range="dateRange = $event"
        >
          <template #rightContent>
            <div style="display: flex; gap: 10px;">
              <button style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.filters.actions.reset') }}
              </button>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.filters.actions.apply') }}
              </button>
            </div>
          </template>
        </c-date-range-filters>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h4>{{ t('translate.showcase.filters.state.title') }}</h4>
          <p>{{ t('translate.showcase.filters.state.date_filter') }}: {{ dateFilter }}</p>
          <p>{{ t('translate.showcase.filters.state.date_range') }}: {{ dateRange?.length > 0 ? dateRange : t('translate.showcase.filters.state.not_set') }}</p>
        </div>
      </div>
    `,
  }),
}

export const MonthToDate: Story = {
  args: {
    dateFilter: 'month',
    dateRange: [],
    activator: 'date-filter',
  },
  render: (args) => ({
    components: { CDateRangeFilters },
    setup() {
      const { t } = useI18n()
      const dateFilter = ref(args.dateFilter)
      const dateRange = ref(args.dateRange)
      const activator = ref(args.activator)

      return {
        t,
        dateFilter,
        dateRange,
        activator,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.filters.month_to_date.title') }}</h3>
        <c-date-range-filters
          :date-filter="dateFilter"
          :date-range="dateRange"
          :activator="activator"
          @update:date-filter="dateFilter = $event"
          @update:date-range="dateRange = $event"
        />
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h4>{{ t('translate.showcase.filters.state.title') }}</h4>
          <p>{{ t('translate.showcase.filters.state.date_filter') }}: {{ dateFilter }}</p>
          <p>{{ t('translate.showcase.filters.state.date_range') }}: {{ dateRange?.length > 0 ? dateRange : t('translate.showcase.filters.state.not_set') }}</p>
        </div>
      </div>
    `,
  }),
}

export const YearToDate: Story = {
  args: {
    dateFilter: 'year',
    dateRange: [],
    activator: 'date-filter',
  },
  render: (args) => ({
    components: { CDateRangeFilters },
    setup() {
      const { t } = useI18n()
      const dateFilter = ref(args.dateFilter)
      const dateRange = ref(args.dateRange)
      const activator = ref(args.activator)

      return {
        t,
        dateFilter,
        dateRange,
        activator,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.filters.year_to_date.title') }}</h3>
        <c-date-range-filters
          :date-filter="dateFilter"
          :date-range="dateRange"
          :activator="activator"
          @update:date-filter="dateFilter = $event"
          @update:date-range="dateRange = $event"
        />
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h4>{{ t('translate.showcase.filters.state.title') }}</h4>
          <p>{{ t('translate.showcase.filters.state.date_filter') }}: {{ dateFilter }}</p>
          <p>{{ t('translate.showcase.filters.state.date_range') }}: {{ dateRange?.length > 0 ? dateRange : t('translate.showcase.filters.state.not_set') }}</p>
        </div>
      </div>
    `,
  }),
}

export const Last90Days: Story = {
  args: {
    dateFilter: 'fquarter',
    dateRange: [],
    activator: 'date-filter',
  },
  render: (args) => ({
    components: { CDateRangeFilters },
    setup() {
      const { t } = useI18n()
      const dateFilter = ref(args.dateFilter)
      const dateRange = ref(args.dateRange)
      const activator = ref(args.activator)

      return {
        t,
        dateFilter,
        dateRange,
        activator,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.filters.last_90_days.title') }}</h3>
        <c-date-range-filters
          :date-filter="dateFilter"
          :date-range="dateRange"
          :activator="activator"
          @update:date-filter="dateFilter = $event"
          @update:date-range="dateRange = $event"
        />
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h4>{{ t('translate.showcase.filters.state.title') }}</h4>
          <p>{{ t('translate.showcase.filters.state.date_filter') }}: {{ dateFilter }}</p>
          <p>{{ t('translate.showcase.filters.state.date_range') }}: {{ dateRange?.length > 0 ? dateRange : t('translate.showcase.filters.state.not_set') }}</p>
        </div>
      </div>
    `,
  }),
}
