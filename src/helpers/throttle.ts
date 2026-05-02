/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const throttle = (func: any, limit: number): any => {
  let inThrottle: boolean

  // eslint-disable-next-line func-names
  return function (this: any): any {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (!inThrottle) {
      inThrottle = true
      func.apply(context, args)
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default throttle
