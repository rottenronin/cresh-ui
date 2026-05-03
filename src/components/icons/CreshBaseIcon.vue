<template>
  <span
    :class="`c-icon ${name || ''} ${rotate ? 'rotate' : ''}`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="viewBox"
      :aria-labelledby="name"
      role="presentation"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        v-if="outlined"
        :transform="
          `scale(0.5),translate(
          ${translateScaledX}, ${translateScaledY})`"
      >
        <slot />
      </g>
      <slot v-else />
      <g
        v-if="outlined"
        id="Icon/Symbol/Icon-outlined"
        :stroke="color"
        stroke-width="2"
        :width="width * 2"
        :height="height * 2 "
        fill="none"
        fill-rule="evenodd"
        class="outlined"
        transform="translate(1.000000, 1.000000)"
      >
        <path :d="outlinedPath" />
      </g>
    </svg>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import baseIconProps from './base-icon-props'

const props = defineProps({
  ...baseIconProps,
})
 
const outlinedPath = 'M11,22 C13.0213883,22 14.9154304,21.4547664 16.5430821,20.5033436 C19.8072166,18.5953359 22,15.053744 22,11 C22,9.1227205 21.5297368,7.35527686 20.7005863,5.80904488 C18.8464927,2.35145949 15.1978528,0 11,0 C9.0256681,0 7.1728223,0.520143798 5.57102069,1.43087329 C2.24398708,3.32251056 0,6.89919965 0,11 C0,13.6277304 0.921392565,16.040258 2.45872321,17.9321284 C4.47559548,20.4141324 7.55259813,22 11,22 Z'

const scaledWidth = computed(() => Math.ceil(Number(props.width) * 0.5))

const scaledHeight = computed(() => Math.ceil(Number(props.height) * 0.5))

const translateScaledX = computed(() => Math.ceil((Number(props.width) - scaledWidth.value) / 2) + 3)

const translateScaledY = computed(() => Math.ceil((Number(props.height) - scaledHeight.value) / 2) + 2)
</script>

<style lang="scss">
.c-icon {
  .color-path {
    &.primary {
      fill: rgb(var(--color-primary));
    }

    &.secondary {
      fill: rgb(var(--color-secondary));
    }

    &.tertiary {
      fill: rgb(var(--color-tertiary));
    }

    &.error {
      fill: rgb(var(--color-error));
    }

    &.success {
      fill: rgb(var(--color-success));
    }

    &.text {
      fill: rgb(var(--color-text));
    }
  }

  .color-stroke {
    &.primary {
      stroke: rgb(var(--color-primary));
    }

    &.secondary {
      stroke: rgb(var(--color-secondary));
    }

    &.tertiary {
      stroke: rgb(var(--color-tertiary));
    }

    &.error {
      stroke: rgb(var(--color-error));
    }

    &.success {
      stroke: rgb(var(--color-success));
    }

    &.text {
      stroke: rgb(var(--color-text));
    }
  }
}
</style>
