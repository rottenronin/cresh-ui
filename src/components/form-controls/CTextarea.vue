<template>
  <div
    class="c-form-control c-textarea"
    :class="{
      invalid: hasError,
      bordered: bordered,
    }"
  >
    <label
      v-if="label && bordered"
      :for="id"
      class="c-form-control-label"
    >
      {{ label }}
    </label>
    <textarea
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
      :value="modelValue"
      :required="required"
      :autocomplete="autocomplete"
      :cols="cols"
      :rows="rows"
      :maxlength="maxLength"
      :minlength="minLength"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
    />
    <label
      v-if="label && !bordered"
      :for="id"
      class="c-form-control-label"
    >
      {{ label }}
    </label>
    <template v-if="hasDefaultSlot">
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
  // eslint-disable-next-line vue/require-default-prop
  modelValue: {
    type: String,
    required: false,
  },
  cols: {
    type: Number,
    required: false,
    default: 10,
  },
  rows: {
    type: Number,
    required: false,
    default: 5,
  },
  // eslint-disable-next-line vue/require-default-prop
  maxLength: {
    type: Number,
    required: false,
  },
  minLength: {
    type: Number,
    required: false,
    default: 0,
  },
  // eslint-disable-next-line vue/require-default-prop
  maxHeight: {
    type: Number,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: undefined,
  },
})

const slots = useSlots()
const emit = defineEmits(['update:modelValue', 'blur'])

const onBlur = async () => {
  emit('blur')
}

function onInput (e: Event): void {
  if (e && e.target) {
    const target = e.target as HTMLTextAreaElement
    emit('update:modelValue', target.value)
  }
}

const hasError = computed(
  () => !!props.errorMessage,
)

const error = computed(
  () => props.errorMessage,
)

const hasPlaceholder = computed(() => !!props.placeholder)
const hasDefaultSlot = computed(() => !!slots.default)
const hasValue = computed(() => !!props.modelValue)

const hasValueOrPlaceholder = computed(
  () => !!(hasValue.value || hasPlaceholder.value),
)

</script>

<style lang="scss">
@import '../../styles/form-controls/c-input.scss';
</style>
