<template>
  <div
    class="error-message"
  >
    <CAlert
      type="error"
      :hide-icon="hideIcon"
    >
      <template v-if="hasDefaultSlot">
        <slot />
      </template>
      <template v-else>
        <template v-if="hasError">
          <div
            v-if="isErrorArray"
            class="error-array"
          >
            <p
              v-for="(message, i) of errorArray"
              :key="`message-i${i}`"
              class="no-padding no-margin message"
            >
              {{ message }}
            </p>
          </div>
          <p
            v-else
            class="no-padding no-margin message"
          >
            {{ errorMessage }}
          </p>
        </template>
        <template v-else>
          <p
            class="no-padding no-margin message"
          >
            {{ i18n.global.t('translate.common.errors.default_error') }}
          </p>
        </template>
      </template>
    </CAlert>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  useSlots,
} from 'vue'

import i18n from '../../plugins/i18n.plugin'
import CAlert from './CAlert.vue'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: {
    required: false,
    validator: val => {
      if (typeof val === 'object') {
        return true
      }
      if (Array.isArray(val)) {
        return true
      }

      const errorObject = val as {
        message: string
      }

      if (errorObject && errorObject.message) {
        return true
      }
      return false
    },
  },
  hideIcon: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const slots = useSlots()

const hasDefaultSlot = computed(() => !!slots.default)

const isErrorArray = computed(() => Array.isArray(props.error))

const errorArray = computed(() => {
  if (isErrorArray.value) {
    return props.error
  }
  return []
})

const errorMessage = computed(() => {
  if (isErrorArray.value) {
    return ''
  }
  const { message } = props.error as {
    message: string
  }
  return message
})

const hasError = computed(() => {
  if (!props.error) {
    return false
  }
  if (Array.isArray(props.error)) {
    if (props.error.length === 0) {
      return false
    }
  }
  if (Object.keys(props.error as {
    message: string
  }).length === 0) {
    return false
  }
  return true
})

</script>
