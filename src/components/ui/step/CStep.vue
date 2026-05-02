<template>
  <div class="c-step">
    <slot v-if="visible" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: null,
  },
  progressionPercentage: {
    type: Number,
    required: false,
    default: 50,
  },
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const visible = ref(props.visible)

function toggleVisible (value = !visible.value): void {
  visible.value = value
}

watch(() => props.visible, (val: boolean) => {
  visible.value = val
})
</script>
