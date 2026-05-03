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
        :value="model"
        :aria-invalid="hasError || undefined"
        :aria-describedby="hasError ? errorId : undefined"
        :aria-required="required || undefined"
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
            :selected="(model && model === option.value)
              || (!model && option.isDefault)"
          >
            {{ option.name }}
          </option>
        </template>
      </select>
      <transition
        name="select-arrow"
        mode="out-in"
      >
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
        :id="errorId"
        class="error-message"
        role="alert"
      >
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  ref,
  useSlots,
} from 'vue'

import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
import ChevronUpIcon from '../icons/ChevronUpIcon.vue'
import { useFormControl } from '../../composables/useFormControl'
import type { CSelectOption } from '../../@types'

import baseProps from './base-control-props'

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

const model = defineModel<string | number | boolean | undefined>()

const slots = useSlots()
const isOpen = ref(false)

const {
  inputId: selectId,
  errorId,
  hasError,
  hasErrorSlot,
  hasValueOrPlaceholder,
} = useFormControl(props, 'select', model)

const emit = defineEmits(['blur'])

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
    model.value = target.value
  }
}

const error = computed(
  () => props.errorMessage,
)

const hasDefaultSlot = computed(() => !!slots.default)
</script>

<style lang="scss">
@import '../../styles/form-controls/c-select.scss';
</style>
