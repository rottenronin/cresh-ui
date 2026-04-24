<template>
  <div
    v-if="modelValue"
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
            :aria-label="cancelText"
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
              {{ cancelText }}
            </CButton>
            <CButton
              color="primary"
              class="ok-btn"
              @click="onOk"
            >
              {{ okText }}
            </CButton>
          </div>
        </template>
      </template>
    </div>
  </div>
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
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
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
    // eslint-disable-next-line vue/no-boolean-default
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
    default: i18n.global.t('translate.modal.ok'),
  },
  cancelText: {
    type: String,
    required: false,
    default: i18n.global.t('translate.modal.cancel'),
  },
  noFooter: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['cancel', 'ok', 'update:modelValue'])

const isActive = ref(false)
const closeBtnColor = ref('grey')
const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)

const slots = useSlots()

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
  ).filter((element) => {
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
  emit('update:modelValue', false)
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

  emit('update:modelValue', false)
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

watch(() => props.modelValue, (val: boolean) => {
  if (val) {
    previousActiveElement.value = document.activeElement as HTMLElement | null
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
  restoreFocus()
})
</script>

<style lang="scss">
@import '../../styles/ui/c-modal.scss';
</style>
