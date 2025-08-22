import { ChartDateGroup } from '../@types/cresh-ui'
import currencyConverter from './currency-converter'
import { customTooltips } from './chart-tooltip.helper'

const groupDatesByDays = (xLabels: Array<{
  display: string
  date: Date
}>) => {
  const groupByDays: ChartDateGroup[] = []
  for (let i = 0; i < xLabels.length; i += 1) {
    const currentDay = xLabels[i].date.getDate()
    const existedIndex = groupByDays.findIndex(
      tmp => tmp.day === currentDay.toString(),
    )
    if (existedIndex > -1) {
      groupByDays[existedIndex].dates.push(xLabels[i].date)
    } else {
      groupByDays.push({
        day: currentDay.toString(),
        dates: [xLabels[i].date],
      })
    }
  }

  if (groupByDays.length > 1) {
    for (let i = 0; i < groupByDays.length; i += 1) {
      const firstDate = groupByDays[i].dates[0]
      const index = xLabels.findIndex(
        temp => temp.date.getTime() === firstDate.getTime(),
      )
      if (index > -1) {
        const locale = 'fr-FR'
        const day = firstDate.toLocaleString(locale, {
          day: '2-digit',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        } as Intl.DateTimeFormatOptions)// DD
        const month = firstDate.toLocaleString(locale, {
          month: 'short',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        } as Intl.DateTimeFormatOptions) // MMM
        // eslint-disable-next-line no-param-reassign
        xLabels[index].display = `${Number(day)} ${month}`
      }
    }
  }
}

const groupDatesByYears = (xLabels: Array<{
  display: string
  date: Date
}>) => {
  const groupByYears: ChartDateGroup[] = []
  for (let i = 0; i < xLabels.length; i += 1) {
    const currentYear = xLabels[i].date.getFullYear()
    const existedIndex = groupByYears.findIndex(
      tmp => tmp.year === currentYear.toString(),
    )
    if (existedIndex > -1) {
      groupByYears[existedIndex].dates.push(xLabels[i].date)
    } else {
      groupByYears.push({
        year: currentYear.toString(),
        dates: [xLabels[i].date],
      })
    }
  }
  if (groupByYears.length > 1) {
    for (let i = 0; i < groupByYears.length; i += 1) {
      const firstDate = groupByYears[i].dates[0]
      const index = xLabels.findIndex(
        temp => temp.date.getTime() === firstDate.getTime(),
      )
      if (index > -1) {
        // add full year suffix
        const dateYear = firstDate.getFullYear()
        // eslint-disable-next-line no-param-reassign
        xLabels[index].display = `${xLabels[index].display} ${dateYear}`
      }
    }
  }
}

const formatChartLabels = (xLabels: string[], interval: string) => {
  if (!xLabels) return
  const temps = xLabels.map(label => {
    const date = new Date(label)
    const locale = 'fr-FR'
    const hour = date.getHours()
    const day = date.toLocaleString(locale, {
      day: '2-digit',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    } as Intl.DateTimeFormatOptions)// DD
    const month = date.toLocaleString(locale, {
      month: 'short',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    } as Intl.DateTimeFormatOptions) // MMM
    if (interval === 'day') {
      return {
        display: `${Number(day)} ${month}`,
        date,
      }
    }
    if (interval === 'month') {
      return {
        display: month,
        date,
      }
    }
    if (interval === 'hour') {
      return {
        display: `${hour}h`,
        date,
      }
    }
    return {
      display: `${Number(day)} ${month}`,
      date,
    }
  })
  if (interval === 'hour') {
    groupDatesByDays(temps)
  }
  groupDatesByYears(temps)
  // eslint-disable-next-line consistent-return
  return temps.map(temp => temp.display)
}

const defaultPlugins = {
  legend: {
    display: false,
    position: 'bottom',
    align: 'end',
    labels: {
      fontFamily: 'lato-regular',
      fontSize: 16,
      boxWidth: 12,
    },
  },
  tooltip: {
    callbacks: {
      title: (tooltipItem: any) => {
        if (tooltipItem && tooltipItem[0]) {
          return currencyConverter.format(tooltipItem[0].raw)
        }
        return ''
      },
      label: (tooltipItem: any) => {
        if (tooltipItem) {
          return tooltipItem.label
        }
        return ''
      },
      afterLabel: () => '',
      labelTextColor: () => '#92929D',
    },
  },
}

const defaultScales = {
  x: {
    display: true,
    ticks: {
      autoSkip: true,
      maxTicksLimit: 12,
      fontFamily: 'lato-regular',
      fontSize: 9,
    },
    grid: {
      color: 'rgba(0, 0, 0, 0)',
      display: false,
      drawBorder: false,
    },
  },
  y: {
    display: true,
    beginAtZero: true,
    ticks: {
      callback: (value: number) => currencyConverter.format(value),
      fontFamily: 'lato-regular',
      beginAtZero: true,
    },
    grid: {
      drawBorder: false,
      color: '#E8ECEF',
    },
  },
}

const defaultChartOptions = {
  responsive: true,
  plugins: defaultPlugins,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  interaction: {
    intersect: false,
  },
  scales: defaultScales,
}

function getAverageQuantity (datasets: Array<{
  data: number[]
}>) {
  if (datasets && datasets.length > 0) {
    const { data } = datasets[0]
    if (data) {
      const total = data.reduce((prev, currentVal) => prev + currentVal, 0)
      const average = Math.ceil(total / data.length)
      let maxValue = data[0]
      for (let i = 1; i < data.length; i += 1) {
        if (data[i] > maxValue) {
          maxValue = data[i]
        }
      }
      if (maxValue % average === 0) {
        return average + 1
      }
      return average
    }
  }
  return 0
}

export default {
  formatChartLabels,
  getAverageQuantity,
  customTooltips,
  defaultChartOptions,
  defaultPlugins,
  defaultScales,
}
