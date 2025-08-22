<template>
  <div
    v-for="(step, i) in items"
    :key="`step-item-i${i}`"
    class="vertical-stepper-alt-item"
  >
    <div class="vertical-stepper-alt-container">
      <div
          class="icon"
          :class="{
              selected: step.state === 'completed' || step.state === 'active'
            }"
      >
        <CIcon
          name="check"
          v-if="step.state === 'completed'"
          color="#00ECCB"
          :width="20"
          :height="20"
        />
      </div>

      <div class="text">
        <span
            class="title"
            :class="{
              active: step.state === 'completed' || step.state === 'active'
            }"
        >
          {{ step.text }}
        </span>
        <span
            class="subtitle"
            :class="{
              active: step.state === 'completed' || step.state === 'active'
            }"
        >
          {{ step.subtitle }}
        </span>
      </div>
    </div>

    <div class="line" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType,
} from 'vue'
import { Step } from '../../@types/cresh-ui'
import CIcon from '../icons/CIcon.vue'

const props = defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
})

const items = computed(() => props.steps)
</script>

<style lang="scss">
  @import '../../styles/ui/c-vertical-stepper-alt.scss';
</style>
