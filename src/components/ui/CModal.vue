<template>
  <Teleport
    :to="teleportTarget"
    :disabled="!teleport"
  >
    <div
      v-if="model"
      class="c-modal-wrapper"
    >
      <div
        class="mask"
        @click.prevent.stop="onClickOutside"
      />
      <div
        ref="modalRef"
        class="c-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="dialogLabelledBy"
        :aria-label="dialogAriaLabel"
        tabindex="-1"
        :style="{
          width: modalWidth,
          height: modalHeight,
        }"
        :name="name"
        @keydown="onKeydown"
      >
        <template v-if="hasHeaderSlot">
          <div :id="titleId">
            <slot name="header" />
          </div>
        </template>
        <template v-else>
          <div class="c-modal-header">
            <h3
              :id="titleId"
              class="title"
            >
              {{ title }}
            </h3>
            <button
              v-if="closable"
              ref="closeButtonRef"
              type="button"
              class="close-btn"
              :aria-label="cancelLabel"
              @click.prevent.stop="onClose"
              @mouseover="closeBtnColor = '#400EC9'"
              @mouseleave="closeBtnColor = 'grey'"
            >
              <CrossIcon
                :color="closeBtnColor"
                :width="30"
                :height="30"
              />
            </button>
          </div>
        </template>
        <div class="content">
          <slot />
        </div>
        <template v-if="!noFooter">
          <template v-if="hasFooterSlot">
            <slot name="footer" />
          </template>
          <template v-else>
            <div class="c-modal-footer">
              <CButton
                class="cancel-btn"
                color="default"
                @click="onClose"
              >
                {{ cancelLabel }}
              </CButton>
              <CButton
                color="primary"
                class="ok-btn"
                @click="onOk"
              >
                {{ okLabel }}
              </CButton>
            </div>
          </template>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useSlots,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import i18n from '../../plugins/i18n.plugin'
import { uuidv4 } from '../../helpers'
import CrossIcon from '../icons/CrossIcon.vue'

import CButton from './CButton.vue'

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: () => uuidv4(),
  },
  persistent: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  closable: {
    type: Boolean,
    required: false,
     
    default: true,
  },
  width: {
    type: [Number, String],
    required: false,
    default: 500,
  },
  height: {
    type: [Number, String],
    required: false,
    default: 'auto',
  },
  okText: {
    type: String,
    required: false,
    default: undefined,
  },
  cancelText: {
    type: String,
    required: false,
    default: undefined,
  },
  noFooter: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * Render the modal in a Teleport to escape parent overflow / z-index contexts.
   * Defaults to true. Set to false when testing or when the modal should remain
   * inside its parent for layout reasons.
   */
  teleport: {
    type: Boolean,
    required: false,
     
    default: true,
  },
  /**
   * Teleport target selector. Defaults to `body`.
   */
  teleportTarget: {
    type: String,
    required: false,
    default: 'body',
  },
})

const emit = defineEmits(['cancel', 'ok'])

const model = defineModel<boolean>({ default: false })

const isActive = ref(false)
const closeBtnColor = ref('grey')
const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)

const slots = useSlots()

// Use composable when available (reactive to locale changes), fall back to plugin instance.
const t = (() => {
  try {
    return useI18n().t
  } catch {
    return i18n.global.t
  }
})()

const okLabel = computed(() => props.okText ?? t('translate.modal.ok'))
const cancelLabel = computed(() => props.cancelText ?? t('translate.modal.cancel'))

const hasHeaderSlot = computed(() => !!slots.header)

const hasFooterSlot = computed(() => !!slots.footer)

const titleId = computed(() => `${props.name}-title`)

const dialogLabelledBy = computed(() => {
  if (hasHeaderSlot.value || props.title) {
    return titleId.value
  }

  return undefined
})

const dialogAriaLabel = computed(() => {
  if (dialogLabelledBy.value) {
    return undefined
  }

  return props.name
})

const modalWidth = computed(() => {
  if (props.width) {
    if (Number.isInteger(props.width)) {
      return `${props.width}px`
    }
    return String(props.width)
  }
  return 'auto'
})

const modalHeight = computed(() => {
  if (props.height) {
    if (Number.isInteger(props.height)) {
      return `${props.height}px`
    }
    return String(props.height)
  }
  return 'auto'
})

function getFocusableElements () {
  if (!modalRef.value) {
    return []
  }

  const selectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]

  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(selectors.join(',')),
  ).filter(element => {
    if (element.getAttribute('aria-hidden') === 'true') {
      return false
    }

    return element.offsetParent !== null || element === document.activeElement
  })
}

async function focusInitialElement () {
  await nextTick()

  const focusTarget = closeButtonRef.value ?? getFocusableElements()[0] ?? modalRef.value
  focusTarget?.focus()
}

function restoreFocus () {
  previousActiveElement.value?.focus()
  previousActiveElement.value = null
}

function onClose () {
  model.value = false
  emit('cancel')
  closeBtnColor.value = 'grey'
}

function onOk () {
  emit('ok')
}

function onClickOutside () {
  if (!isActive.value || props.persistent) {
    return
  }

  model.value = false
}

function trapFocus (event: KeyboardEvent) {
  const focusableElements = getFocusableElements()

  if (!focusableElements.length) {
    event.preventDefault()
    modalRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement as HTMLElement | null

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
    return
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

function onKeydown (event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closable && !props.persistent) {
    event.preventDefault()
    onClose()
    return
  }

  if (event.key === 'Tab') {
    trapFocus(event)
  }
}

function onDocumentEscape (event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (!props.closable || props.persistent) return
  // If focus is already inside the modal, onKeydown handles it.
  if (modalRef.value?.contains(document.activeElement)) return
  event.preventDefault()
  onClose()
}

watch(() => model.value, (val: boolean) => {
  if (val) {
    previousActiveElement.value = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', onDocumentEscape)
  } else {
    document.removeEventListener('keydown', onDocumentEscape)
  }

  window.setTimeout(() => {
    isActive.value = val
  }, 100)

  if (val) {
    void focusInitialElement()
    return
  }

  restoreFocus()
}, { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentEscape)
  restoreFocus()
})
</script>

<style lang="scss">
@import '../../styles/ui/c-modal.scss';
</style>
