<template>
  <div
    class="c-vertical-stepper"
    :class="{
      selectable,
    }"
  >
    <template
      v-for="(step, i) in steps"
      :key="`step-item-i${i}`"
    >
      <div
        class="step-item"
        :class="{
          selected: i === selectedIndex
        }"
        @click.prevent.stop="() => onClick(step, i)"
      >
        <div class="step-dot-wrapper">
          <div class="step-line up" />
          <div class="step-dot" />
          <div class="step-line down" />
        </div>
        <div class="step-text">
          {{ step.text }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Step } from '../../@types/cresh-ui'

const props = defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  selectable: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: true,
  },
  selectedIndex: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emit = defineEmits(['select'])

function onClick (_step: Step, i: number): void {
  if (!props.selectable) {
    return
  }
  if (props.selectedIndex === i) {
    return
  }
  emit('select', i)
}
</script>

<style lang="scss">
  @import '../../styles/ui/c-vertical-stepper.scss';
</style>
