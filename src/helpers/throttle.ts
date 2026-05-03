 
/* eslint-disable @typescript-eslint/no-explicit-any */

export const throttle = (func: any, limit: number): any => {
  let inThrottle: boolean

   
  return function (this: any): any {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (!inThrottle) {
      inThrottle = true
      func.apply(context, args)
       
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default throttle
