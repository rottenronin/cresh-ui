<template>
  <CreshBaseIcon
    :name="'email-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 40 40"
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
      </g>
      <g>
        <path
          :d="path2"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
      </g>
      <g>
        <path
          :d="path3"
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
        />
      </g>
      <g>
        <path
          :d="path4"
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

const path1 = 'M34.7,36.5H5.4c-2.9,0-5.3-2.4-5.3-5.3V9.8c0-2.9,2.4-5.3,5.3-5.3h29.3c2.9,0,5.3,2.4,5.3,5.3v21.3   C40,34.1,37.6,36.5,34.7,36.5z M5.4,6.5C3.5,6.5,2,8,2,9.8v21.3c0,1.8,1.5,3.3,3.3,3.3h29.3c1.8,0,3.3-1.5,3.3-3.3V9.8   c0-1.8-1.5-3.3-3.3-3.3H5.4z'

const path2 = 'M20,23.9c-1.7,0-3.3-0.8-4.5-2.1L6,10.4C5.6,10,5.7,9.4,6.1,9c0.4-0.4,1.1-0.3,1.4,0.1l9.6,11.5   c0.7,0.9,1.8,1.4,2.9,1.4c1.1,0,2.2-0.5,2.9-1.4l9.5-11.4c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4l-9.5,11.4   C23.4,23.2,21.8,23.9,20,23.9z'

const path3 = 'M35.5,31.8c-0.3,0-0.6-0.1-0.8-0.4l-6.9-8.2c-0.4-0.4-0.3-1.1,0.1-1.4c0.4-0.4,1.1-0.3,1.4,0.1l6.9,8.2   c0.4,0.4,0.3,1.1-0.1,1.4C36,31.7,35.7,31.8,35.5,31.8z'

const path4 = 'M4.5,31.7c-0.2,0-0.5-0.1-0.6-0.2c-0.4-0.4-0.5-1-0.1-1.4l6.8-8.1c0.4-0.4,1-0.5,1.4-0.1   c0.4,0.4,0.5,1,0.1,1.4l-6.8,8.1C5.1,31.6,4.8,31.7,4.5,31.7z'
</script>
