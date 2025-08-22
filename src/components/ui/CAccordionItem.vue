<template>
  <div class="accordion-item">
    <div
        class="header"
        @click="openDrawer"
    >
      <div class="wrapper-header">
        <div class="title">
          <slot name="title" />
        </div>
        <ChevronDownIcon
            color="primary"
            :class="{ 'icon-rotation' : visible }"
        />
      </div>
    </div>

    <transition
        name="accordion"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end"
    >
      <div
          class="content"
          v-show="visible"
      >
        <div class="wrapper-content">
          <div class="line" />
            <slot name="content" />
          </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
} from 'vue'
import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
import type { AccordionType } from '../../@types/cresh-ui'

const accordion = reactive(inject('accordion') as AccordionType)
const selectedName = ref(inject('selected-name') as string | undefined)
const current = inject('current') as (name: string) => string
const index = ref<number>(0)
const visible = computed(() => index.value === accordion.active)

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  accordion.count += 1
  index.value = accordion.count

  if (selectedName.value === props.name) {
    accordion.active = index.value
  }
})

function openDrawer() {
  if (visible.value) {
    accordion.active = undefined
    current('')
  } else {
    accordion.active = index.value
    current(props.name)
  }
}

function start(el: Element) {
  const elTemp = el as unknown as HTMLElement
  elTemp.style.height = `${el.scrollHeight}px`
}

function end(el: Element) {
  const elTemp = el as unknown as HTMLElement
  elTemp.style.height = ''
}

</script>

<style lang="scss">
@import '../../styles/ui/c-accordion.scss';
</style>
