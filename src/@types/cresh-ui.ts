export type AccordionType = {
  count: number
  active: number | undefined
}

export type CTabItem = {
  id: string
  name: string
  creshUi?: number
}

export type CSelectOption = {
  key?: string
  value: string
  name: string
  isDefault?: boolean
}

export type CDocumentItemType = {
  link: string
  label: string
  id: string
  extension?: string
  metadata?: {[key: string]: unknown}
}

export type CDropdownKeyValue<T> = {
  key: string
  value: T
}

/**
 * Allowed log level.
 *
 * @typedef LogLevel
 */
export type LogLevel =
| 'debug'
| 'info'
| 'warn'
| 'error'

/**
* Logger object.
*
* @typedef Logger
*/
export type Logger = Record<LogLevel, CallableFunction>

export type DateRangeFilterType = 'today'
| 'fweek'
| 'fmonth'
| 'fquarter'
| 'fyear'
| 'month'
| 'quarter'
| 'year'
| 'all'

export type DateRangeFilterActivator = 'date-filter' | 'date-range'

export type DateRangeFilterSelectResult = {
  dateFilter: DateRangeFilterType
  dateRange: Date[]
  activator: DateRangeFilterActivator
}

export interface ChartDateGroup {
  day?: string
  year?: string
  dates: Date[]
}

export type StepState = 'unComplete' | 'active' | 'completed'

export type Step = {
  text: string
  subtitle?: string
  selected?: boolean
  state?: StepState
  id: string
}

export type BreakPoints = {
  XS: number // small to large handset < 600px
  SM: number // small to medium tablet
  MD: number // large tablet to laptop 960px > < 1264px*
  LG: number // desktop 1264px* > < 1904px*
}
