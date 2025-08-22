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
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :class="{
        'not-empty': hasValueOrPlaceholder,
        valid: !hasError,
        invalid: hasError,
      }"
      :name="name"
      :disabled="disabled"
      :value="props.modelValue"
      :required="required"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
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
        :for="name"
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
        class="error-message"
      >
        {{
          errorMessageDisplayText
        }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  computed,
  useSlots,
  watch,
} from 'vue'

import baseProps from './base-control-props'

const props = defineProps({
  ...baseProps,
})

const emit = defineEmits(['update:modelValue', 'blur'])

const slots = useSlots()

const hasPrefixSlot = computed(() => !!slots.prefix)

const hasSuffixSlot = computed(() => !!slots.suffix)

const hasProgressBarSlot = computed(() => !!slots.progressbar)

const hasError = computed(
  () => !!props.errorMessage,
)

const errorMessageDisplayText = computed(() => {
  if (!hasError.value) return ''

  return props.errorMessage
})

const hasPlaceholder = computed(() => !!props.placeholder)

const hasLabelSlot = computed(() => !!slots.label)

const hasErrorSlot = computed(() => !!slots.error)

const hasValue = computed(() => !!props.modelValue)

const hasValueOrPlaceholder = computed(
  () => !!(hasValue.value || hasPlaceholder.value),
)

async function onBlur (e: Event) {
  if (e && e.target) {
    const target = e.target as HTMLTextAreaElement
    emit('blur', target.value)
  }
}

function onInput (payload: Event): void {
  if (payload && payload.target) {
    const target = payload.target as HTMLTextAreaElement
    emit('update:modelValue', target.value)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/form-controls/c-input.scss';
</style>
