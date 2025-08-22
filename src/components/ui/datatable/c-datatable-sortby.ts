import type {
  DatatableHeaderItem,
  DatatableSortOrder,
} from '../../../@types'

type params = {
  items: Record<string, unknown>[]
  sortBy: DatatableHeaderItem[]
  headers: DatatableHeaderItem[]
}

// eslint-disable-next-line class-methods-use-this
function sortNumbers (
  a: number,
  b: number,
  order?: DatatableSortOrder,
): number {
  if (order === 'asc') {
    return a - b
  }
  return b - a
}

// eslint-disable-next-line class-methods-use-this
function sortDates (
  a: Date,
  b: Date,
  order?: DatatableSortOrder,
): number {
  if (order === 'asc') {
    return a.getDate() - b.getDate()
  }
  return b.getDate() - a.getDate()
}

// eslint-disable-next-line class-methods-use-this
function sortStrings (
  a: string,
  b: string,
  order?: DatatableSortOrder,
): number {
  if (order === 'asc') {
    return a.toLowerCase()
      .localeCompare(b.toLowerCase())
  }
  return b.toLowerCase()
    .localeCompare(a.toLowerCase())
}

export default function sortItems ({
  items,
  sortBy,
  headers,
}: params) {
  if (!sortBy || sortBy.length === 0) {
    return items
  }

  const [firstSortBy] = sortBy

  const sortedItems = [
    ...items,
  ].sort((a, b) => {
    const i = headers.findIndex(
      h => h.key === firstSortBy.key,
    )

    const { customSort } = headers[i]

    if (customSort) {
      const nestedSortedItems = customSort(
        a,
        b,
        firstSortBy.sortOrder,
      )
      return nestedSortedItems
    }

    const propA = a[firstSortBy.key]
    const propB = b[firstSortBy.key]

    if (typeof propA === 'number' && typeof propB === 'number') {
      return sortNumbers(propA, propB, firstSortBy.sortOrder)
    }

    if (propA instanceof Date && propB instanceof Date) {
      return sortDates(propA, propB, firstSortBy.sortOrder)
    }
    if (typeof propA === 'string' && typeof propB === 'string') {
      return sortStrings(propA, propB, firstSortBy.sortOrder)
    }
    return sortStrings(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (propA as any).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (propB as any).toString(),
      firstSortBy.sortOrder,
    )
  })

  return sortedItems
}
