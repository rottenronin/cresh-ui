<template>
  <div class="c-card">
    <div
      v-if="hasHeaderSlot"
      class="c-card-header"
    >
      <slot name="header" />
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div
      v-if="hasFooterSlot"
      class="c-card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue'

const slots = useSlots()

const hasFooterSlot = computed(() => !!slots.footer)

const hasHeaderSlot = computed(() => !!slots.header)
</script>

<style lang="scss">
  @import '../../styles/ui/c-card.scss';
</style>
