<template>
  <div
    class="c-form-control c-input c-datetime-input"
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
    <input
      :id="id"
      v-model="dateString"
      :type="type"
      class="c-form-control-input"
      :class="{
        'not-empty': (dateString && dateString.length > 0)
          || (placeholder && placeholder.length > 0),
        valid: !hasError,
        invalid: hasError,
      }"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      @keyup="onKeyPress"
      @blur="onBlur"
    >
    <label
      v-if="label && !bordered"
      :for="id"
      class="c-form-control-label"
    >
      {{ label }}
    </label>
    <template v-if="hasErrorSlot">
      <slot
        name="errors"
        :error-message="errorMessage"
      />
    </template>
    <template v-else>
      <div
        v-if="hasError"
        class="error-message"
      >
        {{ errorMessageDisplayText }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  computed,
  useSlots,
  watch,
  ref,
  onMounted,
  onBeforeMount,
} from 'vue'

import baseProps from './base-control-props'

const props = defineProps({
  ...baseProps,
  errorMessage: {
    type: String,
    required: false,
    default: undefined,
  },
  // eslint-disable-next-line vue/require-default-prop
  modelValue: {
    type: String,
    required: false,
  },
})

const slots = useSlots()

const emit = defineEmits(['update:modelValue', 'blur'])

const dateString = ref<string>('')

onMounted(() => {
  if (props.modelValue) {
    dateString.value = props.modelValue
  }
})

watch(() => dateString.value, (val: string) => {
  dateString.value = val
  emit('update:modelValue', val)
})

function onKeyPress (e: KeyboardEvent): void {
  if ((e.key < '0' || e.key > '9') && e.key !== '/') {
    e.preventDefault()
    return
  }

  const elem = e.target as HTMLInputElement
  const len = elem.value.length

  // If they don't add the slash, do it for them...
  if (len === 2) {
    dateString.value += '/'
  }

  // If they don't add the slash, do it for them...
  if (len === 5) {
    dateString.value += '/'
  }
  const index = dateString.value.indexOf('//')
  if (index > -1) {
    dateString.value = dateString.value.replaceAll('//', '/')
  }
}

onBeforeMount(() => {
  if (props.modelValue) {
    dateString.value = props.modelValue
  }
})

const hasError = computed(() => !!props.errorMessage)

const errorMessageDisplayText = computed(() => {
  if (!hasError.value) return ''

  return props.errorMessage
})

const hasErrorSlot = computed(() => !!slots.error)

async function onBlur (e: Event) {
  const elem = e.target as HTMLInputElement
  const { value } = elem
  emit('blur', value)
}

// watch props model value change, and update field's value
watch(() => props.modelValue, (val: unknown) => {
  dateString.value = val as string
})

</script>

<style lang="scss" scoped>
@import '../../styles/form-controls/c-input.scss';
</style>
