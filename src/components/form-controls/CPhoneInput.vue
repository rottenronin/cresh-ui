<template>
  <CInput
    class="c-phone-input"
    :name="`${name}PhoneInput`"
    :model-value="state.phoneValue"
    :placeholder="placeholder"
    :label="label"
    :bordered="bordered"
    :class="hasError ? 'invalid' : ''"
    @blur="onBlur"
    @update:model-value="onPhoneValueChange"
  >
    <template
      #error
    >
      <div
        class="error error-message"
        v-if="hasError"
      >
        {{ props.errorMessage || state.error }}
      </div>
    </template>
  </CInput>
</template>

<script lang="ts" setup>
import {
  computed,
  reactive,
  PropType,
  nextTick,
  onMounted,
  watch,
} from 'vue'

import {
  AsYouType,
  CountryCode,
  parsePhoneNumber,
  NumberType,
} from 'libphonenumber-js'

import baseProps from './base-control-props'
import CInput from './CInput.vue'
import i18nPlugin from '../../plugins/i18n.plugin'

const props = defineProps({
  ...baseProps,
  // eslint-disable-next-line vue/require-default-prop
  modelValue: {
    type: String,
    required: false,
  },
  // phone number country
  countryCode: {
    type: String as PropType<CountryCode>,
    default: 'FR',
    required: false,
  },
  type: {
    type: String as PropType<NumberType | 'any'>,
    default: 'any',
    required: false,
  },
  // validate phone number at value change
  disableAsyncValidation: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableBlurValidation: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const state = reactive({
  phoneValue: '',
  error: null as string | null,
})

const emit = defineEmits(['update:modelValue', 'blur'])

function handleValueChange(value: string, shouldParse = false) {
  const errorMessage = i18nPlugin.global.t('translate.validation_messages.phone_number_rule') as string
  try {
    state.phoneValue = value
    state.error = null

    if (shouldParse) {
      const result = parsePhoneNumber(state.phoneValue, props.countryCode)
      if (!result.isValid()) {
        state.error = errorMessage
      }
    }
  } catch (e) {
    state.error = errorMessage
  }
}

const onBlur = async (value: string) => {
  handleValueChange(value, !props.disableBlurValidation)
  nextTick(() => {
    state.phoneValue = new AsYouType(props.countryCode).input(value) || ''
    emit('blur', value)
  })
}

const hasError = computed(
  () => !!props.errorMessage || !!state.error,
)

function onPhoneValueChange(value: string) {
  handleValueChange(value, !props.disableAsyncValidation)
  nextTick(() => {
    state.phoneValue = new AsYouType(props.countryCode).input(value) || ''

    emit('update:modelValue', state.phoneValue)
  })
}

onMounted(() => {
  if (props.modelValue) {
    handleValueChange(props.modelValue)
  }
})

watch(() => props.modelValue, val => {
  if (state.phoneValue !== val) {
    handleValueChange(val || '')
  }
})

</script>

<style lang="scss">
@import '../../styles/form-controls/c-input.scss';
</style>
