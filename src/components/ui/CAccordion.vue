<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  provide,
  reactive,
} from 'vue'

import type { AccordionType } from '../../@types/cresh-ui'

const props = defineProps({
  selectedName: String,
})

const Accordion = reactive<AccordionType>({
  count: 0,
  active: undefined,
})

const emit = defineEmits(['accordion-change'])

function current(currentName: string) {
  emit('accordion-change', currentName)
}

provide('accordion', Accordion)
provide('selected-name', props.selectedName)
provide('current', current)

</script>

<style lang="scss">
@import '../../styles/ui/c-accordion.scss';
</style>
