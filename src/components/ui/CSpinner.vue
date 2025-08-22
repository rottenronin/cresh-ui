<template>
  <div
    class="c-spinner"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  />
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: Number,
    required: false,
    default: 80,
  },
  height: {
    type: Number,
    required: false,
    default: 80,
  },
})
</script>

<style lang="scss">
  @import '../../styles/ui/c-spinner.scss';
</style>
