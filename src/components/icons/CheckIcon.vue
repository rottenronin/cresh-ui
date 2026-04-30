<template>
  <CreshBaseIcon
    :name="'check-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 32 32"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g>
      <path
        :d="path"
        :fill="color"
        :class="{
          'color-path': true,
          [color]: true,
        }"
      />
    </g>
  </CreshBaseIcon>
</template>

<script lang="ts" setup>
import CreshBaseIcon from './CreshBaseIcon.vue'
import baseIconProps from './base-icon-props'

defineProps({
  ...baseIconProps,
})

const path = 'M11.5,25.5a2,2,0,0,1-1.41-.59l-5.5-5.5a2,2,0,0,1,2.83-2.83l4.09,4.09L24.59,7.59a2,2,0,0,1,2.83,2.83l-14.5,14.5A2,2,0,0,1,11.5,25.5Z'
</script>
