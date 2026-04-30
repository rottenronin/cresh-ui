<template>
  <CreshBaseIcon
    :name="'loader-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    :view-box="viewBox"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g
      id="Icon/Symbol/Loader"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <svg
        t="1598348796991"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1133"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="width"
        :height="height"
      >
        <path
          :fill="color"
          :d="path"
          :class="{
            'color-path': true,
            [color]: true,
          }"
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

const path = 'M783.530667 240.469333L723.2 300.8A298.666667 298.666667 0 1 0 810.666667 512h85.333333a384 384 0 1 1-112.469333-271.530667z'
</script>
