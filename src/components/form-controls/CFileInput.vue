<template>
  <div class="c-file-input">
    <div
      class="file-trigger"
    >
      <CInput
        :name="`${name}Input`"
        :model-value="state.filename"
        :placeholder="placeholder"
        :label="label"
        :bordered="bordered"
        @click.prevent.stop="onFileInputTrigger"
        :class="state.error ? 'invalid' : ''"
      >
        <template #prefix>
          <CIcon name="attachment" />
        </template>
        <template
          #progressbar
        >
          <CProgressBar
            v-if="state.isUploading && !hideProgression"
            :value="state.progressValue"
            color="primary"
          />
        </template>
        <template
          #error
        >
          <CErrorMessage
            v-if="state.error"
            :error="state.error"
          />
        </template>
      </CInput>
    </div>
    <input
      name="fileUploadInput"
      type="file"
      :accept="fileExtentions"
      @change="onInputFileChange"
      ref="inputRef"
      style="display:none;"
    >
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  PropType,
  computed,
  onMounted,
} from 'vue'
import CInput from './CInput.vue'
import CIcon from '../icons/CIcon.vue'

import baseProps from './base-control-props'
import {
  CErrorMessage,
  CProgressBar,
} from '../ui'
import i18nPlugin from '../../plugins/i18n.plugin'
import { fileHelper } from '../../helpers'

const inputRef = ref<HTMLInputElement | null>(null)

const props = defineProps({
  ...baseProps,
  validFileExtensions: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
    ],
  },
  hideProgression: {
    type: Boolean,
    default: false,
    required: false,
  },
  maxSize: {
    type: Number, // kb unit
    required: false,
    default: 2 * 1024, // 2048kb = 2mb
  },
  animationHook: {
    type: Function,
    default: null,
    required: false,
  },
  modelValue: {
    type: Object as PropType<File>,
    required: false,
    default: () => undefined,
  },
  filename: {
    type: String,
    required: false,
    default: '',
  },
})

const state = reactive<{
  filename: string
  file?: File
  isUploading: boolean
  progressValue: number
  animationId?: number
  progressSpeed: number
  error?: unknown & {
    message: string
  }
}>({
  filename: '',
  isUploading: false,
  progressValue: 0,
  progressSpeed: 0.5,
})

const emits = defineEmits<{(e: 'update:model-value', file: File): void
}>()

const fileExtentions = computed(() => (
  props.validFileExtensions.join(',')
))

function onFileInputTrigger (): void {
  if (!inputRef.value) return

  inputRef.value.click()
}

function checkIfFilesAreTooBig(file: File): boolean {
  return file.size > props.maxSize * 1024
}

function checkIfFilesAreCorrectType(file: File): boolean {
  return props.validFileExtensions.includes(file.type)
}

async function validate (file: File) {
  if (!checkIfFilesAreCorrectType(file)) {
    throw Error(i18nPlugin.global.t(
      'translate.common.errors.file_size_error',
      {
        name: file.name,
        size: props.maxSize,
      },
    ))
  }
  if (checkIfFilesAreTooBig(file)) {
    throw Error(i18nPlugin.global.t(
      'translate.common.errors.file_size_error_alt',
      {
        size: props.maxSize,
      },
    ))
  }
}

function animateProgressionBar (): void {
  if (state.error) {
    state.isUploading = false
    return
  }
  if (state.progressValue >= 99) {
    state.progressValue = 100
    window.clearInterval(state.animationId)
    window.setTimeout(() => {
      state.isUploading = false
      state.progressSpeed = 0.5
    }, 22)
  } else {
    state.progressValue += state.progressSpeed
    state.progressSpeed += 1
  }
  if (props.animationHook) {
    const newProhressionValue = props.animationHook(state.progressValue)
    state.progressValue = newProhressionValue
  }
}

function initAnimation (): void {
  state.isUploading = true
  state.progressValue = 0
  state.error = undefined
  state.animationId = window.setInterval(
    animateProgressionBar,
    22,
  )
}

async function uploadFile(file: File) {
  try {
    state.isUploading = true
    initAnimation()
    state.error = undefined
    state.file = undefined

    // check file size and file extensions

    const targetFile = fileHelper.convertJpegToJpg(file)

    await validate(targetFile)

    state.file = targetFile
    state.filename = targetFile.name
    emits('update:model-value', targetFile)
  } catch (e) {
    state.error = {
      message: (e as Error).message,
    }
    state.isUploading = false
  }
}

async function onInputFileChange(e: Event) {
  const eventTarget = e.target as EventTarget & HTMLInputElement
  if (eventTarget.files && eventTarget.files.length > 0) {
    await uploadFile(eventTarget.files[0])
  }
}

onMounted(() => {
  if (props.modelValue) {
    state.file = props.modelValue
    state.filename = props.modelValue?.name
  }

  if (props.filename) {
    state.filename = props.filename
  }
})

</script>
