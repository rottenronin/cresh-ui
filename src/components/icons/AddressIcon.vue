<template>
  <CreshBaseIcon
    :name="'address-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 48 48"
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
    </g>
  </CreshBaseIcon>
</template>

<script lang="ts" setup>
import CreshBaseIcon from './CreshBaseIcon.vue'
import baseIconProps from './base-icon-props'

defineProps({
  ...baseIconProps,
})

const path1 = 'M42,48H28V35h-8v13H6V27c0-0.552,0.447-1,1-1s1,0.448,1,1v19h10V33h12v13h10V28c0-0.552,0.447-1,1-1s1,0.448,1,1V48z'

const path2 = 'M47,27c-0.249,0-0.497-0.092-0.691-0.277L24,5.384L1.691,26.723c-0.399,0.381-1.032,0.368-1.414-0.031     c-0.382-0.399-0.367-1.032,0.031-1.414L24,2.616l23.691,22.661c0.398,0.382,0.413,1.015,0.031,1.414     C47.526,26.896,47.264,27,47,27z'

const path3 = 'M39,15c-0.553,0-1-0.448-1-1V8h-6c-0.553,0-1-0.448-1-1s0.447-1,1-1h8v8C40,14.552,39.553,15,39,15z'

</script>
