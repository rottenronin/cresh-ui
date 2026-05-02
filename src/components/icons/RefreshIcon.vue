<template>
  <CreshBaseIcon
    :name="'refresh-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    :view-box="'0 0 24 20'"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g
        id="Icon/Symbol/Refresh"
        transform="translate(0.000000, -2.000000)"
        :stroke="color"
        :class="{
          'color-stroke': true,
          [color]: true,
        }"
        stroke-width="2"
      >
        <g transform="translate(1.000000, 3.000000)">
          <polyline points="0 1 0 7 6 7" />
          <polyline points="22 17 22 11 16 11" />
          <path :d="path" />
        </g>
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

const path = 'M19.49,6 C18.4591184,3.08681165 16.0057328,0.906218245 12.9917133,0.224258265 C9.97769373,-0.457701715 6.82455916,0.454345733 4.64,2.64 L0,7 M22,11 L17.36,15.36 C15.1754408,17.5456543 12.0223063,18.4577017 9.00828672,17.7757417 C5.99426717,17.0937818 3.54088164,14.9131883 2.51,12'

</script>
