import type { App } from 'vue'
import { BreakPoints } from '../@types'
import { pubSubHelper } from '../helpers'

export default {
  install(
    app: App,
    breakPoints: BreakPoints,
  ): void {
    function getCurrentBreakpoint () {
      const width = window.innerWidth

      if (width <= breakPoints.XS) {
        return breakPoints.XS
      }
      if (width > breakPoints.XS && width <= breakPoints.SM) {
        return breakPoints.SM
      }
      if (width > breakPoints.SM && width <= breakPoints.MD) {
        return breakPoints.MD
      }
      return breakPoints.LG
    }

    function breakPointChange() {
      const currentBreakpoint = getCurrentBreakpoint()
      pubSubHelper.publish('breakpoint-change', currentBreakpoint)
    }

    const breakPoint = getCurrentBreakpoint()

    // subscribe to event resize and publish new breakpoint value if window size changes
    // eslint-disable-next-line prefer-arrow-callback
    window.addEventListener('resize', breakPointChange)

    app.provide('breakpoint', breakPoint)
    // provide callback to clear window.addEventListener
    app.provide('clear', () => {
      window.removeEventListener('resize', breakPointChange)
    })
  },
}
