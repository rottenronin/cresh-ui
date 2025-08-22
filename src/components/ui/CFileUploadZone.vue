<template>
  <div
    ref="cFileUploadZoneRef"
    class="c-file-upload-zone"
    :class="{
      dragging: state.draggingover,
    }"
    :draggabl="true"
    @click.stop="onInputFileTrigger"
    @drop.prevent.stop="onFileDrop"
    @dragover.prevent.stop="onDragover"
    @dragleave.prevent.stop="onDragleave"
  >
    <div
        class="progression-bar-wrapper"
        v-if="state.isLoading"
      >
      <CSpinner />
    </div>

    <div
      v-else
      class="content"
    >
      <div class="icon-container">
        <CIcon
          :width="50"
          :height="50"
          color="#92929D"
          name="upload"
        />
      </div>
      <div
        class="filename c-mt-15"
        v-if="showFilename"
      >
        {{ state.currentFile?.name }}
      </div>

      <CErrorMessage
        v-if="state.error"
        :error="state.error"
      />
    </div>

    <input
      name="fileUploadZoneInput"
      type="file"
      :accept="fileExtentions"
      @change="onInputFileChange"
    >
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  PropType,
  computed,
} from 'vue'

import i18nPlugin from '../../plugins/i18n.plugin'

import CIcon from '../icons/CIcon.vue'
import CSpinner from './CSpinner.vue'
import CErrorMessage from './CErrorMessage.vue'
import { fileHelper } from '../../helpers'

const cFileUploadZoneRef = ref<HTMLDivElement | null>(null)

const props = defineProps({
  maxSize: {
    type: Number, // kb unit
    required: false,
    default: 2 * 1024, // 2048kb = 2mb
  },
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
  showFilename: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const state = reactive<{
  draggingover: boolean
  isLoading: boolean
  error?: unknown & {
    message: string
  }
  currentFile?: File
}>({
  draggingover: false,
  isLoading: false,
})

const emits = defineEmits<{(e: 'uploaded', file: File): void
}>()

const fileExtentions = computed(() => (
  props.validFileExtensions.join(',')
))

function onInputFileTrigger() {
  if (cFileUploadZoneRef.value) {
    cFileUploadZoneRef.value.getElementsByTagName('input')[0].click()
  }
}

function checkIfFilesAreTooBig(file: File): boolean {
  return file.size > props.maxSize * 1024
}

function checkIfFilesAreCorrectType(file: File): boolean {
  return props.validFileExtensions.includes(file.type)
}

function validFileType() {
  const extensions = props.validFileExtensions.map(
    type => type.split('/')[1],
  )
  return extensions.join(', ')
}

async function validate (file: File) {
  if (!checkIfFilesAreCorrectType(file)) {
    throw Error(i18nPlugin.global.t(
      'translate.common.errors.file_type_error',
      {
        types: validFileType(),
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

async function uploadFile(file: File) {
  try {
    state.isLoading = true
    state.error = undefined
    state.currentFile = undefined

    // check file size and file extensions

    const targetFile = fileHelper.convertJpegToJpg(file)

    await validate(targetFile)

    state.isLoading = false
    state.currentFile = targetFile
    emits('uploaded', targetFile)
  } catch (e) {
    state.error = {
      message: (e as Error).message,
    }
    state.isLoading = false
  }
}

async function onInputFileChange(e: Event) {
  const eventTarget = e.target as EventTarget & HTMLInputElement
  if (eventTarget.files && eventTarget.files.length > 0) {
    await uploadFile(eventTarget.files[0])
  }
}

async function onFileDrop (e: DragEvent) {
  state.draggingover = false
  const droppedFiles = e.dataTransfer?.files

  if (!droppedFiles || droppedFiles.length === 0) return
  await uploadFile(droppedFiles[0])
}

function onDragover () {
  state.draggingover = true
}

function onDragleave () {
  state.draggingover = false
}
</script>

<style lang="scss" scoped>
@import '../../styles/ui/c-file-upload-zone.scss';
</style>
