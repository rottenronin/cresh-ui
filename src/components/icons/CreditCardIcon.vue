<template>
  <CreshBaseIcon
    :name="'credit-card-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 24 24"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g>
        <rect
          id="Rectangle"
          x="0"
          y="0"
          width="24"
          height="24"
        />
        <path
          class="icon-path"
          :d="path"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
          fill-rule="nonzero"
        />
      </g>
    </g>
  </CreshBaseIcon>
</template>

<script lang="ts" setup>
import CreshBaseIcon from './CreshBaseIcon.vue'
import baseIconProps from './base-icon-props'

defineProps({
  ...baseIconProps,
})

const path = 'M0,19.6666667 C0,20.7708333 0.895833333,21.6666667 2,21.6666667 L22,21.6666667 C23.1041667,21.6666667 24,20.7708333 24,19.6666667 L24,12.3333333 L0,12.3333333 L0,19.6666667 Z M8,16.8333333 C8,16.5583333 8.225,16.3333333 8.5,16.3333333 L14.1666667,16.3333333 C14.4416667,16.3333333 14.6666667,16.5583333 14.6666667,16.8333333 L14.6666667,18.5 C14.6666667,18.775 14.4416667,19 14.1666667,19 L8.5,19 C8.225,19 8,18.775 8,18.5 L8,16.8333333 Z M2.66666667,16.8333333 C2.66666667,16.5583333 2.89166667,16.3333333 3.16666667,16.3333333 L6.16666667,16.3333333 C6.44166667,16.3333333 6.66666667,16.5583333 6.66666667,16.8333333 L6.66666667,18.5 C6.66666667,18.775 6.44166667,19 6.16666667,19 L3.16666667,19 C2.89166667,19 2.66666667,18.775 2.66666667,18.5 L2.66666667,16.8333333 Z M24,5 L24,7 L0,7 L0,5 C0,3.89583333 0.895833333,3 2,3 L22,3 C23.1041667,3 24,3.89583333 24,5 Z'
</script>
