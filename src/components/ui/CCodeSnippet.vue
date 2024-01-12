<template>
  <div class="code-snippet">
    <div class="content">
      <slot v-if="!toggled" />
      <pre v-else>
        <code v-text="snippet" />
      </pre>
    </div>
    <div class="description">
      <slot name="title" />
      <hr v-if="hasDescriptionSlot">
      <template v-if="hasDescriptionSlot">
        <slot
          name="description"
        />
      </template>
    </div>
    <div class="footer">
      <hr>
      <div class="actions">
        <span
          class="snippet-toggler cursor-pointer"
          @click.stop.prevent="onContentToggle"
        >
          <CodeIcon />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import CodeIcon from '../icons/CodeIcon.vue'

defineProps({
  snippet: {
    type: String,
    required: true,
  },
})

const slots = useSlots()

const toggled = ref<boolean>(false)

const hasDescriptionSlot = computed(() => !!slots.description)

function onContentToggle () {
  toggled.value = !toggled.value
}
</script>

<style lang="scss" scoped>
  .code-snippet {
    display: flex;
    flex-direction: column;
    display: inline-block;
    min-width: 600px;
    margin: 0 0 16px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    transition: all .2s;
    background: white;
    padding: 15px;
    max-height: 500px;

    .description,
    .content {
      margin: 15px 0;

      pre {
        background: rgb(var(--color-dark));
        color: rgb(var(--color-warning));
      }
    }

    .footer .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
