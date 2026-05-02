§<template>
  <div
    class="c-radio"
    :class="{
      invalid: hasError,
      disabled,
    }"
  >
    <input
      :id="inputId"
      type="radio"
      :name="name"
      :value="radioValue"
      :checked="radioValue === model"
      :disabled="disabled"
      :aria-invalid="hasError || undefined"
      :aria-describedby="hasError ? errorId : undefined"
      :aria-required="required || undefined"
      @change="onChange"
      @blur="onBlur"
    >
    <template v-if="hasDefaultSlot">
      <label
        :for="inputId"
        class="form-field-label"
      >
        <slot />
      </label>
    </template>
    <template v-else>
      <label
        v-if="label"
        :for="inputId"
        class="form-field-label"
      >
        {{ label }}
      </label>
    </template>
    <template v-if="$slots.error">
      <slot
        name="error"
        :error-message="error"
      />
    </template>
    <template v-else-if="$slots.errors">
      <!-- @deprecated: use the `error` (singular) slot instead. -->
      <slot
        name="errors"
        :error-message="error"
      />
    </template>
    <template v-else>
      <div
        v-if="hasError"
        :id="errorId"
        class="error-message"
        role="alert"
      >
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  useSlots,
} from 'vue'

import baseProps from './base-control-props'
import { useFormControl } from '../../composables/useFormControl'

const props = defineProps({
  ...baseProps,
  value: {
    validator: (value: unknown) => typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
      || value === null,
    required: false,
  },
  /**
   * @deprecated Use `value` instead. The `data` prop will be removed in the next
   * major release.
   */
  data: {
    validator: (value: unknown) => typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
      || value === null,
    required: false,
  },
})

if (process.env.NODE_ENV !== 'production') {
  onMounted(() => {
    if (props.data !== undefined && props.value === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        '[cresh-ui] <CRadio> "data" prop is deprecated and will be removed in '
        + 'a future major release. Use "value" instead.',
      )
    }
  })
}

const slots = useSlots()

const model = defineModel<unknown>()

const emit = defineEmits(['blur'])

const { hasError } = useFormControl(props, 'radio', model)

const error = computed(
  () => props.errorMessage,
)

const hasDefaultSlot = computed(() => !!slots.default)

const radioValue = computed(() => {
  if (props.value !== undefined) {
    return props.value
  }

  return props.data
})

const inputId = computed(() => props.id || `${props.name}-${String(radioValue.value)}`)

const errorId = computed(() => `${inputId.value}-error`)

const onChange = (): void => {
  if (props.disabled) {
    return
  }
  model.value = radioValue.value
}

const onBlur = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('blur', target.value)
}
</script>

<style lang="scss">
@import '../../styles/form-controls/c-radio.scss';
</style>
