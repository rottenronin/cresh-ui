<template>
  <CInput
    :id="phoneInputId"
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
        v-if="hasError"
        class="error error-message"
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

import i18nPlugin from '../../plugins/i18n.plugin'
import { useFormControl } from '../../composables'

import baseProps from './base-control-props'
import CInput from './CInput.vue'

const props = defineProps({
  ...baseProps,
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

const model = defineModel<string | undefined>()

const { inputId: phoneInputId } = useFormControl(props, 'phone-input', model)

const state = reactive({
  phoneValue: '',
  error: null as string | null,
})

const emit = defineEmits(['blur'])

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

function onPhoneValueChange(value: string | number | undefined) {
  const str = value == null ? '' : String(value)
  handleValueChange(str, !props.disableAsyncValidation)
  nextTick(() => {
    state.phoneValue = new AsYouType(props.countryCode).input(str) || ''

    model.value = state.phoneValue
  })
}

onMounted(() => {
  if (model.value) {
    handleValueChange(model.value)
  }
})

watch(() => model.value, val => {
  if (state.phoneValue !== val) {
    handleValueChange(val || '')
  }
})

</script>

<style lang="scss">
@import '../../styles/form-controls/c-input.scss';
</style>
