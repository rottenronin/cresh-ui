export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convert (date: any): Date | undefined {
    if (!date) return undefined
    if (date instanceof Date) {
      return date as Date
    }
    return new Date(date)
  },
}
