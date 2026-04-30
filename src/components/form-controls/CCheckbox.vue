<template>
  <div
    class="c-form-control c-checkbox"
    :class="{
      disabled,
      invalid: hasError
    }"
  >
    <label
      class="checkbox-content flex"
      :for="checkboxId"
    >
      <input
        :id="checkboxId"
        type="checkbox"
        class="c-form-input c-checkbox-native"
        :name="name"
        :disabled="disabled"
        :checked="!!modelValue"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="hasError || undefined"
        :aria-describedby="hasError ? errorId : undefined"
        :aria-required="required || undefined"
        @change="onCheckHandle"
      >
      <span
        class="c-checkbox-view"
        :class="{
          invalid: hasError
        }"
        aria-hidden="true"
      >
        <CheckIcon
          v-if="modelValue"
          name="check"
          :width="16"
          :height="16"
          :color="disabled ? '#92929D' : 'primary'"
        />
      </span>
      <span
        class="c-checkbox-label"
        :class="{
          'no-uppercase': noUppercase,
        }"
      >
        <template v-if="hasLabel">
          {{ label }}
        </template>
        <template v-else>
          <slot />
        </template>
      </span>
    </label>
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
        class="c-checkbox-error-message"
        role="alert"
      >
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CheckIcon from '../icons/CheckIcon.vue'
import baseProps from './base-control-props'
import { useFormControl } from '../../composables/useFormControl'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  ...baseProps,
  modelValue: {
    type: Boolean,
    required: false,
  },
  noUppercase: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const {
  inputId: checkboxId,
  errorId,
  hasError,
  hasErrorSlot,
} = useFormControl(props, 'checkbox')

const hasLabel = computed(() => !!props.label)

function onCheckHandle (event: Event) {
  if (props.disabled) {
    return
  }
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

</script>

<style lang="scss">
@import '../../styles/form-controls/c-checkbox.scss';
</style>
