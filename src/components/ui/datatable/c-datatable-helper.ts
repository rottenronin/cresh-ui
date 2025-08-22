import { ref } from 'vue'

import type {
  DatatableHeaderItem,
  Pagination,
  PaginationLinks,
} from '../../../@types'

const isLoading = ref(false)
const errors = ref<unknown>(null)

export const useFetch = async ({
  sortBy,
  handler,
  pagination,
}: {
  sortBy?: DatatableHeaderItem[]
  // eslint-disable-next-line no-unused-vars
  handler: (prams: Record<string, unknown>) => Promise<{
    data: unknown[]
    pagination: Pagination
    links: PaginationLinks
    metadata?: Record<string, unknown>
  }>
  pagination: Pagination
}) => {
  const sortByValue = sortBy && sortBy.length > 0
    ? (sortBy[0].id ? sortBy[0].id : sortBy[0].key)
    : undefined

  const orderByValue = sortBy && sortBy.length > 0
    ? sortBy[0].sortOrder
    : undefined

  if (!handler) {
    throw new Error('handler implemented')
  }

  isLoading.value = true
  errors.value = null

  try {
    const result = await handler({
      'page[number]': pagination.itemsPerPage === -1
        ? undefined
        : pagination.page,
      'page[size]': pagination.itemsPerPage === -1
        ? undefined
        : pagination.itemsPerPage,
      sort_by: sortByValue,
      order_by: orderByValue,
    })
    isLoading.value = false
    return result
  } catch (e) {
    isLoading.value = false
    errors.value = e
    throw e
  }
}

export const usePaginate = async ({
  url,
  handler,
}: {
  url: string
  // eslint-disable-next-line no-unused-vars
  handler: (url: string) => Promise<{
    data: unknown[]
    pagination: Pagination
    links: PaginationLinks
    metadata?: Record<string, unknown>
  }>
}) => {
  try {
    isLoading.value = true
    errors.value = null

    const result = await handler(url)

    isLoading.value = false

    return result
  } catch (e) {
    isLoading.value = false
    errors.value = e

    throw errors
  }
}

export default {
  useFetch,
  usePaginate,
}
