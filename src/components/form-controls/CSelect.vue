<template>
  <div
    class="c-form-control c-select"
    :class="{
      invalid: hasError,
      bordered: bordered,
    }"
  >
    <label
      v-if="!hideLabel && bordered"
      :for="selectId"
      class="c-form-control-label"
    >
      {{ label }}
    </label>
    <div
      class="c-select-wrapper"
      :class="[
        `select-field ${name ? name : ''}`,
        hasValueOrPlaceholder ? 'not-empty' : '',
        hasError ? 'invalid' : 'valid',
        isOpen ? 'is-open' : '',
      ]"
    >
      <select
        :id="selectId"
        :class="[
          `select-field ${name ? name : ''}`,
          hasValueOrPlaceholder ? 'not-empty' : '',
          hasError ? 'invalid' : 'valid',
        ]"
        :name="name"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :value="modelValue"
        @mousedown="openDropdown"
        @touchstart="openDropdown"
        @focus="openDropdown"
        @keydown.down="openDropdown"
        @keydown.up="openDropdown"
        @keydown.enter="openDropdown"
        @keydown.space="openDropdown"
        @keydown.esc="closeDropdown"
        @change="onInput"
        @blur="onBlur"
      >
        <template v-if="hasDefaultSlot">
          <slot />
        </template>
        <template v-else>
          <option
            v-if="placeholder"
            value=""
            disabled
            selected
            hidden
          >
            {{ placeholder }}
          </option>

          <option
            v-else
            disabled
            value
            selected
            style="display:none;"
          />
          <option
            v-for="(option, index) in options"
            :key="`option-index-${index}`"
            :value="option.value"
            :selected="(modelValue && modelValue === option.value)
              || (!modelValue && option.isDefault)"
          >
            {{ option.name }}
          </option>
        </template>
      </select>
      <transition name="select-arrow" mode="out-in">
        <ChevronUpIcon
          v-if="isOpen"
          key="chevron-up"
          name="chevron-up"
          color="primary"
          class="arrow-icon"
        />
        <ChevronDownIcon
          v-else
          key="chevron-down"
          name="chevron-down"
          color="primary"
          class="arrow-icon"
        />
      </transition>
    </div>
    <label
      v-if="hideLabel === false && !bordered"
      :for="selectId"
      class="c-form-control-label"
    >
      {{ label }}
    </label>
    <template v-if="hasErrorSlot">
      <slot
        name="error"
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
  getCurrentInstance,
  PropType,
  ref,
  useSlots,
} from 'vue'

import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
import ChevronUpIcon from '../icons/ChevronUpIcon.vue'

import baseProps from './base-control-props'
import type { CSelectOption } from '../../@types'

const props = defineProps({
  ...baseProps,
  options: {
    type: Array as PropType<Array<CSelectOption>>,
    required: false,
    default: () => ([]),
  },
  hideLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const slots = useSlots()
const isOpen = ref(false)
const instance = getCurrentInstance()

const emit = defineEmits(['update:modelValue', 'blur'])

function openDropdown (): void {
  isOpen.value = true
}

function closeDropdown (): void {
  isOpen.value = false
}

const onBlur = async () => {
  closeDropdown()
  emit('blur')
}

function onInput (e: Event): void {
  if (e && e.target) {
    const target = e.target as HTMLSelectElement
    closeDropdown()
    emit('update:modelValue', target.value)
  }
}

const hasError = computed(
  () => !!props.errorMessage || false,
)

const error = computed(
  () => props.errorMessage,
)

const hasPlaceholder = computed(() => !!props.placeholder)
const hasDefaultSlot = computed(() => !!slots.default)
const hasErrorSlot = computed(() => !!slots.error)
const hasValue = computed(() => !!props.modelValue)

const hasValueOrPlaceholder = computed(
  () => !!(hasValue.value || hasPlaceholder.value),
)

const selectId = computed(
  () => props.id || `${props.name}-${instance?.uid ?? 'select'}`,
)
</script>

<style lang="scss">
@import '../../styles/form-controls/c-select.scss';
</style>
