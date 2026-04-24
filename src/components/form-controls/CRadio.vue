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
      :checked="radioValue === props.modelValue"
      :disabled="disabled"
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
    <template v-if="hasErrorSlot">
      <slot
        name="errors"
        :error-message="error"
      />
    </template>
    <template v-else>
      <div
        v-if="hasError"
        class="error-message"
      >
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  useSlots,
} from 'vue'

import baseProps from './base-control-props'

const props = defineProps({
  ...baseProps,
  value: {
    validator: (value: unknown) => typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
      || value === null,
    required: false,
  },
  data: {
    validator: (value: unknown) => typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
      || value === null,
    required: false,
  },
})

const slots = useSlots()

const emit = defineEmits(['update:modelValue', 'blur'])

const hasError = computed(
  () => !!props.errorMessage,
)

const error = computed(
  () => props.errorMessage,
)

const hasDefaultSlot = computed(() => !!slots.default)

const hasErrorSlot = computed(() => !!slots.error)

const radioValue = computed(() => {
  if (props.value !== undefined) {
    return props.value
  }

  return props.data
})

const inputId = computed(() => props.id || `${props.name}-${String(radioValue.value)}`)

const onChange = (): void => {
  if (props.disabled) {
    return
  }
  emit('update:modelValue', radioValue.value)
}

const onBlur = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('blur', target.value)
}
</script>

<style lang="scss">
@import '../../styles/form-controls/c-radio.scss';
</style>
