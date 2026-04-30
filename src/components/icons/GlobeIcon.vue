<template>
  <CreshBaseIcon
    :name="'globe-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 64 64"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g>
      <g>
        <path
          :d="path1"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
        <path
          :d="path2"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
        <path
          :d="path3"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
        <path
          :d="path4"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
        <path
          :d="path5"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
        <path
          :d="path6"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
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

const path1 = 'M32,57A25,25,0,1,1,57,32,25,25,0,0,1,32,57ZM32,9A23,23,0,1,0,55,32,23,23,0,0,0,32,9Z'

const path2 = 'M32,57c-7.29,0-13-11-13-25S24.71,7,32,7,45,18,45,32,39.29,57,32,57ZM32,9C26,9,21,19.53,21,32s5,23,11,23S43,44.47,43,32,38,9,32,9Z'

const path3 = 'M51,47.66a1,1,0,0,1-.54-.16C46,44.64,39.29,43,32,43s-14,1.64-18.45,4.5a1,1,0,1,1-1.08-1.68C17.22,42.76,24.34,41,32,41s14.78,1.76,19.53,4.82A1,1,0,0,1,51,47.66Z'

const path4 = 'M32,23c-7.66,0-14.78-1.76-19.53-4.82a1,1,0,1,1,1.08-1.68C18,19.36,24.71,21,32,21s14-1.64,18.45-4.5a1,1,0,1,1,1.08,1.68C46.78,21.24,39.66,23,32,23Z'

const path5 = 'M56,33H8a1,1,0,0,1,0-2H56a1,1,0,0,1,0,2Z'

const path6 = 'M32,57a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0V56A1,1,0,0,1,32,57Z'
</script>
