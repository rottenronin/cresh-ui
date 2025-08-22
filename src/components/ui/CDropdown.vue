<template>
  <div
    class="c-dropdown"
    :class="{
      active: modelValue,
      selected: !!selectedItem,
    }"
  >
    <div
      ref="triggerRef"
      class="dropdown-trigger"
      @click.prevent.stop="onTriggerClick"
    >
      <div
        v-if="hasDefaultSlot"
        class="content"
      >
        <slot
          :selected-item="selectedItem"
        />
      </div>
      <template v-if="showIcon">
        <template
          v-if="hasUnactiveIconSlot && !modelValue"
        >
          <slot
            name="unactive-icon"
          />
        </template>
        <template v-else-if="!hasUnactiveIconSlot">
          <ChevronDownIcon
            v-show="!modelValue"
            class="unactive-icon"
            color="primary"
            name="chevron-down"
          />
        </template>

        <template
          v-if="hasActiveIconSlot && modelValue"
        >
          <slot
            name="active-icon"
          />
        </template>
        <template v-else-if="!hasActiveIconSlot">
          <ChevronUpIcon
            v-show="modelValue"
            class="active-icon"
            color="primary"
            name="chevron-up"
          />
        </template>
      </template>
    </div>
    <template v-if="items && items.length > 0">
      <div
        v-show="modelValue"
        ref="dropdownRef"
        class="dropdown-list"
      >
        <ul>
          <li
            v-for="(item, index) of items"
            :key="`item-i${index}`"
            class="list-item"
            :class="{
              selected: selectedItemIndex === index
            }"
            @click.prevent.stop="() => onItemClick(item, index)"
          >
            {{ item.key }}
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <template v-if="hasContentSlot">
        <div
          v-show="modelValue"
          ref="dropdownRef"
          class="dropdown-list"
        >
          <slot name="content" />
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  useSlots,
  PropType,
} from 'vue'

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '../icons'

const props = defineProps({
  items: {
    type: Array as PropType<Array<{ key: string; value: unknown }>>,
    required: false,
    default: () => [],
  },
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  hovered: {
    type: Boolean,
    required: false,
    default: false,
  },
  showIcon: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: () => true,
  },
  preSelectedItem: {
    type: Object,
    required: false,
    default: null,
  },
})

const selectedItemIndex = ref(0)

const mouseHoverTimer = ref(0)

const mouseOutTimer = ref(0)

const slots = useSlots()

const selectedItem = computed(() => {
  if (props.items) {
    return props.items[selectedItemIndex.value]
  }
  return null
})

const triggerRef = ref(null)
const dropdownRef = ref(null)

onBeforeMount(() => {
  if (props.preSelectedItem && props.items) {
    const index = props.items.findIndex(
      (i: {
        key: string
      }) => i.key === props.preSelectedItem.key,
    )
    if (index > -1) {
      selectedItemIndex.value = index
    }
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const onMouseOver = (): void => {
  if (mouseHoverTimer.value) {
    clearTimeout(mouseHoverTimer.value)
  }
  mouseHoverTimer.value = window.setTimeout(() => {
    if (!props.modelValue) {
      emit('update:modelValue', true)
    }
  }, 100)
}

// eslint-disable-next-line class-methods-use-this
const onMouseDown = (event: MouseEvent): void => {
  if (!triggerRef.value || !dropdownRef.value) {
    return
  }
  const triggerElement = triggerRef.value as HTMLElement
  const dropdownListElement = dropdownRef.value as HTMLElement
  const listRect = dropdownListElement.getBoundingClientRect()
  const triggerRect = triggerElement.getBoundingClientRect()
  const x = event.clientX
  if (x < listRect.left || x >= listRect.right) {
    emit('update:modelValue', false)
    return
  }
  const y = event.clientY
  if (y < triggerRect.top || y >= listRect.bottom) {
    emit('update:modelValue', false)
  }
}

const onMouseMove = (e: MouseEvent): void => {
  if (mouseOutTimer.value) {
    clearTimeout(mouseOutTimer.value)
  }
  mouseOutTimer.value = window.setTimeout(() => {
    onMouseDown(e)
  }, 100)
}

const resolvePlacement = (): void => {
  if (!triggerRef.value || !dropdownRef.value) {
    return
  }
  const triggerElement = triggerRef.value as HTMLElement
  const dropdownListElement = dropdownRef.value as HTMLElement
  if (!dropdownListElement || !triggerElement) return
  const listRect = dropdownListElement.getBoundingClientRect()
  const triggerRect = triggerElement.getBoundingClientRect()
  dropdownListElement.style.left = 'unset'
  dropdownListElement.style.top = '100%'
  // if we have no enough space at right
  // and we have enough space at left to move
  if (listRect.width + triggerRect.x > window.innerWidth) {
    const neededSpace = listRect.width + triggerRect.x - window.innerWidth
    if (listRect.x > neededSpace + 10) { // add 10px of margin
      dropdownListElement.style.right = '0'
    }
  }
  // if we have no enough space at bottom
  // and we have enough space at top to move
  if (listRect.height + triggerRect.y > window.innerHeight) {
    const neededSpace = listRect.height + triggerRect.height
    if (listRect.y > neededSpace) {
      dropdownListElement.style.top = `-${neededSpace}px`
    }
  }
}

onBeforeUnmount(() => {
  if (props.hovered && triggerRef.value) {
    const triggerElement = triggerRef.value as HTMLElement
    triggerElement.removeEventListener('mouseenter', onMouseOver)
  }
})

onMounted(() => {
  if (props.hovered && triggerRef.value) {
    const triggerElement = triggerRef.value as HTMLElement

    triggerElement.addEventListener('mouseenter', onMouseOver)
  }
})

watch(() => props.modelValue, (val: boolean, oldVal: boolean) => {
  if (val === oldVal) {
    return
  }
  if (val) {
    document.addEventListener('mousedown', onMouseDown)
    if (props.hovered) {
      document.addEventListener('mousemove', onMouseMove)
    }
    setTimeout(() => {
      resolvePlacement()
    }, 200)
  } else {
    document.removeEventListener('mousedown', onMouseDown)
    if (props.hovered) {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }
})

const onTriggerClick = (): void => {
  if (props.hovered) {
    return
  }
  emit('update:modelValue', !props.modelValue)
}

const onItemClick = (item: {
  key: string
  value: unknown
}, index: number): void => {
  emit('select', item)
  emit('update:modelValue', false)
  selectedItemIndex.value = index
}

const hasDefaultSlot = computed(() => !!slots.default)

const hasUnactiveIconSlot = computed(() => !!slots['unactive-icon'])

const hasActiveIconSlot = computed(() => !!slots['active-icon'])

const hasContentSlot = computed(() => !!slots.content)
</script>

<style lang="scss">
  @import '../../styles/ui/c-dropdown.scss';
</style>
