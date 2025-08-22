§<template>
  <div
    class="c-radio"
    :class="{
      invalid: hasError,
      disabled,
    }"
  >
    <input
      type="radio"
      :name="name"
      :model-value="data"
      :checked="data === props.modelValue"
      :disabled="disabled"
      @update:model-value="onClick"
    >
    <template v-if="hasDefaultSlot">
      <label
        class="form-field-label"
        @click.prevent.stop="onClick"
      >
        <slot />
      </label>
    </template>
    <template v-else>
      <label
        v-if="label"
        :for="id"
        class="form-field-label"
        @click.prevent.stop="onClick"
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
  data: {
    validator: (value: unknown) => typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
      || value === null,
    required: true,
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

const onClick = (): void => {
  if (props.disabled) {
    return
  }
  emit('update:modelValue', props.data)
}
</script>

<style lang="scss">
@import '../../styles/form-controls/c-radio.scss';
</style>
