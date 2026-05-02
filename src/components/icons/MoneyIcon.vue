<template>
  <CreshBaseIcon
    :name="'money-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    :view-box="viewBox"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g
      id="Icon/Symbol/Money"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <svg
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="color"
          :class="{
            'color-path': true,
            [color]: true,
          }"
          :d="path"
        />
      </svg>
    </g>
  </CreshBaseIcon>
</template>

<script lang="ts" setup>
import CreshBaseIcon from './CreshBaseIcon.vue'
import baseIconProps from './base-icon-props'

defineProps({
  ...baseIconProps,
})

const path = 'M74.4935,76.1594a29.5647,29.5647,0,0,1-9.9956,1.8632,29.8671,29.8671,0,0,1-23.85-11.9995h14.85a6,6,0,0,0,0-11.9994H35.1056a29.9841,29.9841,0,0,1,0-11.9995H55.4983a6,6,0,0,0,0-12h-14.85a29.867,29.867,0,0,1,23.85-11.9994,29.5623,29.5623,0,0,1,9.9956,1.8632,6.0041,6.0041,0,1,0,4.0076-11.32C56.0087.6178,35.07,11.8322,26.5528,30.0247H19.5a6,6,0,1,0,0,12h3.4656a42.59,42.59,0,0,0-.4658,6,41.4738,41.4738,0,0,0,.6064,6H19.5a6,6,0,1,0,0,11.9994h7.2125a41.9409,41.9409,0,0,0,37.7855,23.999,41.5093,41.5093,0,0,0,14.0032-2.5429,6.0041,6.0041,0,1,0-4.0076-11.32Z'
</script>
