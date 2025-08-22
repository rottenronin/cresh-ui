<template>
  <div
    class="c-form-control c-credit-card-input"
    :class="{
      invalid: hasError,
      bordered: bordered,
      'not-empty': hasValueOrPlaceholder,
    }"
  >
    <label
      v-if="label && bordered"
      :for="id"
      class="c-form-label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      class="c-form-input"
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
    <label
      v-if="label && !bordered"
      :for="id"
      class="c-form-label"
    >
      {{ label }}
    </label>
    <template v-if="hasErrorSlot">
      <slot
        name="error"
      />
    </template>
    <template v-else>
      <div
        v-if="hasError"
        class="error-message"
      >
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

import baseProps from './base-control-props'

const emit = defineEmits(['update:modelValue', 'blur'])
const props = defineProps({
  ...baseProps,
})
const slots = useSlots()

const hasErrorSlot = computed(() => !!slots.error)

const hasError = computed(() => !!props.errorMessage)

const hasPlaceholder = computed(() => !!props.placeholder)

const hasValue = computed(() => !!props.modelValue)

const hasValueOrPlaceholder = computed(
  () => !!(hasValue.value || hasPlaceholder.value),
)

function onInput (e: Event): void {
  if (e && e.target) {
    const target = e.target as HTMLTextAreaElement

    const elementValue = target.value
      .replace(/[^0-9]/gi, '')
      .replace(/(.{4})/g, '$1 ').trim()
    emit('update:modelValue', elementValue)
  }
}

const onBlur = async () => {
  emit('blur')
}

</script>

<style lang="scss">
@import '../../styles/form-controls/c-input.scss';
</style>
