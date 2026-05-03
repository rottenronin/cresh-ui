<template>
  <div
    class="c-form-control c-input"
    :class="{
      'not-empty': hasValueOrPlaceholder,
      invalid: hasError,
      bordered: bordered,
      'has-prefix': hasPrefixSlot,
      'has-suffix': hasSuffixSlot,
      'has-progress-bar': hasProgressBarSlot,
    }"
  >
    <label
      v-if="label && bordered"
      :for="inputId"
    >
      {{ label }}
    </label>

    <input
      :id="inputId"
      :type="type"
      :class="{
        'not-empty': hasValueOrPlaceholder,
        valid: !hasError,
        invalid: hasError,
      }"
      :name="name"
      :disabled="disabled"
      :value="model"
      :required="required"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :aria-invalid="hasError || undefined"
      :aria-describedby="hasError ? errorId : undefined"
      :aria-required="required || undefined"
      @input="onInput"
      @blur="onBlur"
    >
    <template v-if="hasLabelSlot">
      <span class="c-form-control-label">
        <slot name="label" />
      </span>
    </template>
    <template v-else>
      <label
        v-if="label && !bordered"
        class="c-form-control-label"
        :for="inputId"
      >
        {{ label }}
      </label>
    </template>

    <template v-if="hasPrefixSlot">
      <span class="prefix">
        <slot name="prefix" />
      </span>
    </template>

    <template v-if="hasSuffixSlot">
      <span class="suffix">
        <slot name="suffix" />
      </span>
    </template>

    <template v-if="hasProgressBarSlot">
      <div class="progress-bar-container">
        <slot name="progressbar" />
      </div>
    </template>

    <template v-if="hasErrorSlot">
      <slot
        name="error"
        :error-message="errorMessage"
      />
    </template>

    <template v-else>
      <div
        v-if="hasError"
        :id="errorId"
        class="error-message"
        role="alert"
      >
        {{
          errorMessageDisplayText
        }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue'

import { useFormControl } from '../../composables/useFormControl'

import baseProps from './base-control-props'

const props = defineProps({
  ...baseProps,
})

const model = defineModel<string | number | undefined>()

const emit = defineEmits(['blur'])

const slots = useSlots()

const {
  inputId,
  errorId,
  hasError,
  hasErrorSlot,
  hasValueOrPlaceholder,
} = useFormControl(props, 'input', model)

const hasPrefixSlot = computed(() => !!slots.prefix)

const hasSuffixSlot = computed(() => !!slots.suffix)

const hasProgressBarSlot = computed(() => !!slots.progressbar)

const errorMessageDisplayText = computed(() => {
  if (!hasError.value) return ''

  return props.errorMessage
})

const hasLabelSlot = computed(() => !!slots.label)

async function onBlur (e: Event) {
  if (e && e.target) {
    const target = e.target as HTMLTextAreaElement
    emit('blur', target.value)
  }
}

function onInput (payload: Event): void {
  if (payload && payload.target) {
    const target = payload.target as HTMLTextAreaElement
    model.value = target.value
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/form-controls/c-input.scss';
</style>
