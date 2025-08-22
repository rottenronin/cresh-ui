<template>
  <div
    class="c-form-control c-checkbox"
    :class="{
      disabled,
      invalid: hasError
    }"
  >
  <div class="checkbox-content flex">
    <div
      class="c-checkbox-view"
      :class="{
        invalid: hasError
      }"
      @click.prevent.stop="onCheckHandle"
    >
      <CheckIcon
        v-if="modelValue"
        name="check"
        :width="16"
        :height="16"
        :color="disabled ? '#92929D' : 'primary'"
      />
    </div>
    <div
      class="c-checkbox-label"
      :class="{
        'no-uppercase': noUppercase,
      }"
      @click.prevent.stop="onCheckHandle"
    >
      <template v-if="hasLabel">
        {{ label }}
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
  <input
    :id="id"
    type="checkbox"
    class="c-form-input"
    :name="name"
    :disabled="disabled"
    :value="modelValue"
    :required="required"
    :autocomplete="autocomplete"
    style="display: none;"
  >
  <template v-if="hasErrorSlot">
    <slot
      name="error"
      :error-message="errorMessage"
    />
  </template>
  <template v-else>
    <div
      v-if="hasError"
      class="c-checkbox-error-message"
    >
      {{ errorMessage }}
    </div>
  </template>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

import CheckIcon from '../icons/CheckIcon.vue'
import baseProps from './base-control-props'

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

const slots = useSlots()

const hasError = computed(() => !!props.errorMessage)

const hasErrorSlot = computed(() => !!slots.error)

const hasLabel = computed(() => !!props.label)

async function onCheckHandle () {
  if (props.disabled) {
    return
  }
  const value = !(Boolean(props.modelValue) === true)
  emit('update:modelValue', value)
}

</script>

<style lang="scss">
@import '../../styles/form-controls/c-checkbox.scss';
</style>
