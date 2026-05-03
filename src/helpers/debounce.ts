/* eslint-disable @typescript-eslint/no-explicit-any */
 
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number,
) => {
  let timeout = 0
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      result = callback(...args)
    }, waitFor)
    return result
  }
}

export default debounce
