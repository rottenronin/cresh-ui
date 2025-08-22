<template>
<CModal
  class="c-document-viewer"
  persistent
  no-footer
  :model-value="modelValue"
  @cancel="onModalClose"
>
  <div class="headline">
    <template v-if="hasLabelSlot">
      <slot name="label" />
    </template>
    <template v-else>
      <span class="document-label">
        {{ document.label }}
      </span>
    </template>
    <template v-if="hasHeaderActionsSlot">
      <div class="header-actions">
        <slot name="header-actions" />
      </div>
    </template>
  </div>

  <div
    class="content"
  >
    <div
      class="navigation-btns"
      v-if="!hideArrows"
      >
        <div
          class="left-file-nav"
          v-show="!hideLeftArrow"
          @click.prevent.stop="onPrevDocument"
        >
          <CIcon
            name="chevron-left"
            color="white"
          />
        </div>
        <div class="c-spacer" />
        <div
          class="right-file-nav"
          v-show="!hideRightArrow"
          @click.prevent.stop="onNextDocument"
        >
          <CIcon
            name="chevron-right"
            color="white"
          />
        </div>
    </div>
    <template v-if="hasPreviewSlot">
      <slot name="preview" />
    </template>
      <div
        class="preview"
        ref="previewRef"
        v-else
      >
      <div class="object-wrapper">
        <object
          :type="document.extension !== 'pdf'
            ? 'image/png'
            : 'application/pdf'"
          :key="document.link"
          :data="document.link"
          :height="state.ObjectHeight"
          :width="state.objectWidth"
        >
          <div
            class="invalid-message-wrapper"
          >
            {{
              i18n.global.t('translate.common.errors.invalid_file_error')
            }}
          </div>
        </object>
      </div>
    </div>

    <div class="footer">
      <template v-if="hasFooterSlot">
        <slot name="footer" />
      </template>
    </div>
  </div>
</CModal>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  useSlots,
  ref,
  reactive,
  watch,
} from 'vue'

import type { CDocumentItemType } from '../../@types/cresh-ui'

import i18n from '../../plugins/i18n.plugin'
import CModal from './CModal.vue'
import CIcon from '../icons/CIcon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  allowRefresh: {
    type: Boolean,
    required: false,
  },

  document: {
    type: Object as PropType<CDocumentItemType>,
    required: true,
  },

  hideArrows: {
    type: Boolean,
    required: false,
    default: false,
  },

  hideLeftArrow: {
    type: Boolean,
    required: false,
    default: false,
  },

  hideRightArrow: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const state = reactive({
  objectWidth: '100%',
  ObjectHeight: '100%',
  initialized: false,
})

const emits = defineEmits(['update:modelValue', 'prev', 'next'])
const slots = useSlots()
const hasLabelSlot = computed(() => !!slots.label)
const hasHeaderActionsSlot = computed(() => !!slots['header-actions'])
const hasPreviewSlot = computed(() => !!slots.preview)
const hasFooterSlot = computed(() => !!slots.footer)
const previewRef = ref<HTMLDivElement | null>(null)

function onModalClose() {
  emits('update:modelValue', !props.modelValue)
}

function onPrevDocument() {
  emits('prev', props.document)
}

function onNextDocument() {
  emits('next', props.document)
}

watch(() => previewRef.value, val => {
  if (val) {
    state.objectWidth = previewRef.value?.clientWidth.toString() || '100%'
    state.ObjectHeight = previewRef.value?.clientHeight.toString() || '100%'
  }
})

</script>

<style lang="scss">
@import '../../styles/ui/c-document-viewer.scss';
</style>
