<template>
  <CreshBaseIcon
    :name="'check-circle-icon'"
    :width="width"
    :height="height"
    :outlined="outlined"
    view-box="0 0 24 24"
    :color="color"
    :rotate="rotate"
    :alt="alt"
  >
    <!-- eslint-disable max-len -->
    <!-- eslint-disable vue/max-len -->
    <g
      id="Symbols"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Icon/Symbol/CheckCircle"
        transform="translate(2.000000, 2.000000)"
      >
        <g id="Icon">
          <path
            id="Path"
            d="M17.8955078,5.26245115 C17.4812826,5.46284995 17.3079427,5.9613037 17.5083415,6.37532552 C18.0558268,7.50630698 18.3333333,8.7253825 18.3333333,10 C18.3333333,14.59493 14.59493,18.3333333 10,18.3333333 C5.40507,18.3333333 1.66666667,14.59493 1.66666667,10 C1.66666667,5.40507 5.40507,1.66666667 10,1.66666667 C11.9040934,1.66666667 13.6928304,2.28841146 15.1733398,3.46455891 C15.53243,3.75122073 16.0575358,3.69120281 16.3441976,3.33089193 C16.6308594,2.97078448 16.5708415,2.44628906 16.2103271,2.16003417 C14.4576009,0.767008438 12.2519938,0 10,0 C4.48628745,0 0,4.48628745 0,10 C0,15.5137126 4.48628745,20 10,20 C15.5137126,20 20,15.5137126 20,10 C20,8.47208656 19.6663411,7.00785318 19.0083822,5.6496175 C18.8083903,5.23457844 18.3083089,5.06164552 17.8955078,5.26245115 Z"
            :fill="color"
            fill-rule="nonzero"
            :class="{
              'color-path': true,
              [color]: true,
            }"
          />
          <polyline
            id="Path-2"
            :stroke="color"
            :class="{
              [color]: true,
            }"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            points="6 10.1577229 8.5 12.6577229 14.1577229 7"
          />
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
</script>

<style lang="scss">
  .check-circle-icon {
    polyline {
      &.primary {
        stroke: rgb(var(--color-primary));
      }

      &.secondary {
        stroke: rgb(var(--color-secondary));
      }

      &.tertiary {
        stroke: rgb(var(--color-tertiary));
      }

      &.success {
        stroke: rgb(var(--color-success));
      }

      &.error {
        stroke: rgb(var(--color-error));
      }
    }
  }
</style>
