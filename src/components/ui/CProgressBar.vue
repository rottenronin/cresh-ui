<template>
  <div
    class="c-progress-bar"
    :class="`c-progress-bar ${indeterminate ? 'indeterminate' : ''}`"
  >
    <div
      class="c-progress-bar-background"
      :style="{
        'background-color': applyColor,
      }"
    />
    <div
      class="progression"
      :style="{
        width: `${value}%`,
        'background-color': applyColor,
      }"
    />
    <template v-if="indeterminate">
      <div
        class="subline inc"
        :style="{
          'background-color': applyColor,
        }"
      />

      <div
        class="subline dec"
        :style="{
          'background-color': applyColor,
        }"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: false,
    default: 0,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  indeterminate: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isPredefinedColor = computed(() => [
  'primary',
  'secondary',
  'tertiary',
  'warning',
  'info',
  'success',
  'error',
].includes(props.color))

const applyColor = computed(() => {
  if (isPredefinedColor.value) {
    return `rgb(var(--color-${props.color}))`
  }
  return props.color
})
</script>

<style lang="scss">
  .c-progress-bar {
    position: relative;
    width: 100%;
    height: 10px;
    overflow: hidden;
    border-radius: 9px;

    .c-progress-bar-background {
      display: block;
      width: 100%;
      height: 10px;
      border-radius: 9px;
      opacity: 0.2;
    }

    .progression {
      border-radius: 9px;
      height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      transition: width 0.3s ease;
    }

    &.indeterminate {
      overflow: hidden;
      border-radius: 9px;
      .subline{
        position:absolute;
        height:10px;
        top: 0;
        left: 0;
        border-radius: 9px;
      }

      .inc{
        animation: increase 2s infinite;
      }

      .dec{
        animation: decrease 2s 0.5s infinite;
      }

      @keyframes increase {
        from { left: -5%; width: 5%; }
        to { left: 130%; width: 100%;}
      }
      @keyframes decrease {
        from { left: -80%; width: 80%; }
        to { left: 110%; width: 10%;}
      }
    }
  }
</style>
