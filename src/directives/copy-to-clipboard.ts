import i18n from '../plugins/i18n.plugin'

const showTooltip = (el: HTMLElement) => {
  const tooltip = document.createElement('div')
  const dimension = el.getBoundingClientRect()
  tooltip.setAttribute('class', 'c-tooltip')
  tooltip.innerHTML = el.dataset.clicked === 'false'
    ? i18n.global.t(
      'translate.directives.copy_to_clipboard.click_to_copy',
    ) as string
    : i18n.global.t('translate.directives.copy_to_clipboard.copied') as string
  const diff = el.dataset.clicked === 'false'
    ? 80 : 20
  tooltip.style.left = `
    ${dimension.left + dimension.width / 2 - diff}px
  `
  tooltip.style.top = `${dimension.top - 30 + window.scrollY}px`
  document.body.appendChild(tooltip)
}

const removeTooltips = () => {
  document.querySelectorAll('.c-tooltip').forEach(
    e => e.parentNode?.removeChild(e),
  )
}

const toggle = (el: HTMLElement) => {
  el.dataset.clicked = el.dataset.clicked === 'true'
    ? 'false' : 'true'
  removeTooltips()
  showTooltip(el)
}

const copyToClipboardDirective = {
  beforeMount: (el: HTMLElement): void => {
    let timer: number | null = null

    el.dataset.clicked = 'false'

    el.addEventListener('click', () => {
      // hidden type input does not work as expected
      // add first input and after copy, remove it
      const hiddenInput = document.createElement('input') as HTMLInputElement
      hiddenInput.type = 'text'
      hiddenInput.style.top = '-2000px'
      hiddenInput.style.position = 'absolute'
      hiddenInput.classList.add('c-clipboard-input')
      hiddenInput.value = el.textContent ? el.textContent.trim() : ''
      document.body.appendChild(hiddenInput)

      hiddenInput.select()
      document.execCommand('copy')
      document.body.removeChild(hiddenInput)
      toggle(el)
      timer = window.setTimeout(() => {
        removeTooltips()
      }, 1000)
    })
    el.addEventListener('mouseenter', () => {
      showTooltip(el)
      clearTimeout(timer as number)
    })
    el.addEventListener('mouseleave', () => {
      removeTooltips()

      el.dataset.clicked = 'false'
      clearTimeout(timer as number)
    })
  },
  unmounted: (el: HTMLElement): void => {
    el.removeEventListener('click', () => {})

    el.removeEventListener('mouseenter', () => {})

    el.removeEventListener('mouseleave', () => {})
  },
}

export default copyToClipboardDirective
