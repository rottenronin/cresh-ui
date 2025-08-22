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
      class="c-modal"
      :style="{
        width: modalWidth,
        height: modalHeight,
      }"
      :name="name"
    >
      <template
        v-if="hasHeaderSlot"
      >
        <slot name="header" />
      </template>
      <template v-else>
        <div class="c-modal-header">
          <h3
            class="title"
          >
            {{ title }}
          </h3>
          <div
            v-if="closable"
            class="close-btn"
            @click.prevent.stop="onClose"
            @mouseover="closeBtnColor = '#400EC9'"
            @mouseleave="closeBtnColor = 'grey'"
          >
            <CrossIcon
              :color="closeBtnColor"
              :width="30"
              :height="30"
            />
          </div>
        </div>
      </template>
      <div class="content">
        <slot />
      </div>
      <template v-if="!noFooter">
        <template
          v-if="hasFooterSlot"
        >
          <slot name="footer" />
        </template>
        <template
          v-else
        >
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
  ref,
  computed,
  watch,
  useSlots,
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

const visible = ref(false)
const isActive = ref(false)
const closeBtnColor = ref('grey')

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)

const hasFooterSlot = computed(() => !!slots.footer)

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

const emit = defineEmits(['cancel', 'ok', 'update:modelValue'])

function onClose () {
  emit('cancel')
  closeBtnColor.value = 'grey'
}

function onOk () {
  emit('ok')
}

watch(() => props.modelValue, (val: boolean) => {
  visible.value = val
  // prevent user to click outside only when he can see modal
  window.setTimeout(() => {
    isActive.value = val
  }, 100)
}, { immediate: true })

function onClickOutside () {
  if (!isActive.value || props.persistent) {
    return
  }
  emit('update:modelValue', false)
}
</script>

<style lang="scss">
@import '../../styles/ui/c-modal.scss';
</style>
