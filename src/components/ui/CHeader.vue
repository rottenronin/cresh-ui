<template>
  <header class="c-header flex align-items-center">
    <div class="headline flex-1">
      <template v-if="hasTitle">
        <slot name="title" />
      </template>
      <template v-if="hasDefaultSlot">
        <slot />
      </template>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {
  useSlots,
  computed,
} from 'vue'

const slots = useSlots()

const hasTitle = computed(
  () => !!slots.title,
)

const hasDefaultSlot = computed(
  () => !!slots.default,
)
</script>

<style lang="scss">
header.c-header {
  margin-top: 0;
  height: 100px;
  min-height: 100px;
  background-color: rgb(var(--color-white));
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(var(--color-header));
  padding: 0 2.5rem;

  .headline {
    color: rgb(var(--color-primary));
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include phone {
    & {
      height: 60px;

      .headline {
        h1 {
          font-size: larger;
        }
      }
      
      padding: 0 1.5rem;
    }
  }
}
</style>
