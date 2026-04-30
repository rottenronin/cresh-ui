<template>
  <div
    class="c-dropdown"
    :class="{
      active: model,
      selected: !!selectedItem,
    }"
  >
    <div
      ref="triggerRef"
      class="dropdown-trigger"
      role="button"
      tabindex="0"
      :aria-haspopup="items && items.length > 0 ? 'listbox' : 'menu'"
      :aria-expanded="!!model"
      :aria-controls="listId"
      :aria-activedescendant="
        model && items && items.length > 0
          ? `${listId}-option-${highlightedIndex}`
          : undefined
      "
      @click.prevent.stop="onTriggerClick"
      @keydown="onTriggerKeydown"
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
          v-if="hasUnactiveIconSlot && !model"
        >
          <slot
            name="unactive-icon"
          />
        </template>
        <template v-else-if="!hasUnactiveIconSlot">
          <ChevronDownIcon
            v-show="!model"
            class="unactive-icon"
            color="primary"
            name="chevron-down"
          />
        </template>

        <template
          v-if="hasActiveIconSlot && model"
        >
          <slot
            name="active-icon"
          />
        </template>
        <template v-else-if="!hasActiveIconSlot">
          <ChevronUpIcon
            v-show="model"
            class="active-icon"
            color="primary"
            name="chevron-up"
          />
        </template>
      </template>
    </div>
    <template v-if="items && items.length > 0">
      <div
        v-show="model"
        ref="dropdownRef"
        class="dropdown-list"
      >
        <ul
          :id="listId"
          role="listbox"
          tabindex="-1"
        >
          <li
            v-for="(item, index) of items"
            :id="`${listId}-option-${index}`"
            :key="`item-i${index}`"
            role="option"
            :aria-selected="selectedItemIndex === index"
            class="list-item"
            :class="{
              selected: selectedItemIndex === index,
              highlighted: highlightedIndex === index,
            }"
            @click.prevent.stop="() => onItemClick(item, index)"
            @mousemove="highlightedIndex = index"
          >
            {{ item.key }}
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <template v-if="hasContentSlot">
        <div
          v-show="model"
          ref="dropdownRef"
          :id="listId"
          class="dropdown-list"
          role="menu"
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
  getCurrentInstance,
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

const highlightedIndex = ref(0)

const mouseHoverTimer = ref(0)

const mouseOutTimer = ref(0)

const slots = useSlots()

const instance = getCurrentInstance()

const listId = computed(() => `c-dropdown-${instance?.uid ?? 'list'}`)

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

const emit = defineEmits(['select'])

const model = defineModel<boolean>({ default: false })

const onMouseOver = (): void => {
  if (mouseHoverTimer.value) {
    clearTimeout(mouseHoverTimer.value)
  }
  mouseHoverTimer.value = window.setTimeout(() => {
    if (!model.value) {
      model.value = true
    }
  }, 100)
}

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
    model.value = false
    return
  }
  const y = event.clientY
  if (y < triggerRect.top || y >= listRect.bottom) {
    model.value = false
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
  if (mouseHoverTimer.value) {
    clearTimeout(mouseHoverTimer.value)
    mouseHoverTimer.value = 0
  }
  if (mouseOutTimer.value) {
    clearTimeout(mouseOutTimer.value)
    mouseOutTimer.value = 0
  }
  document.removeEventListener('mousedown', onMouseDown)
  if (props.hovered) {
    document.removeEventListener('mousemove', onMouseMove)
    if (triggerRef.value) {
      const triggerElement = triggerRef.value as HTMLElement
      triggerElement.removeEventListener('mouseenter', onMouseOver)
    }
  }
})

onMounted(() => {
  if (props.hovered && triggerRef.value) {
    const triggerElement = triggerRef.value as HTMLElement

    triggerElement.addEventListener('mouseenter', onMouseOver)
  }
})

watch(() => model.value, (val: boolean, oldVal: boolean) => {
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
  model.value = !model.value
}

const onItemClick = (item: {
  key: string
  value: unknown
}, index: number): void => {
  emit('select', item)
  model.value = false
  selectedItemIndex.value = index
}

function onTriggerKeydown (event: KeyboardEvent): void {
  const hasItems = !!props.items && props.items.length > 0

  if (!model.value) {
    if (
      event.key === 'Enter'
      || event.key === ' '
      || event.key === 'ArrowDown'
      || event.key === 'ArrowUp'
    ) {
      event.preventDefault()
      model.value = true
      if (hasItems) {
        highlightedIndex.value = selectedItemIndex.value
      }
    }
    return
  }

  if (event.key === 'Escape' || event.key === 'Tab') {
    if (event.key === 'Escape') event.preventDefault()
    model.value = false
    return
  }

  if (!hasItems) return

  const lastIndex = props.items.length - 1

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = highlightedIndex.value >= lastIndex
        ? 0
        : highlightedIndex.value + 1
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = highlightedIndex.value <= 0
        ? lastIndex
        : highlightedIndex.value - 1
      break
    case 'Home':
      event.preventDefault()
      highlightedIndex.value = 0
      break
    case 'End':
      event.preventDefault()
      highlightedIndex.value = lastIndex
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      onItemClick(props.items[highlightedIndex.value], highlightedIndex.value)
      break
    default:
  }
}

const hasDefaultSlot = computed(() => !!slots.default)

const hasUnactiveIconSlot = computed(() => !!slots['unactive-icon'])

const hasActiveIconSlot = computed(() => !!slots['active-icon'])

const hasContentSlot = computed(() => !!slots.content)
</script>

<style lang="scss">
  @import '../../styles/ui/c-dropdown.scss';
</style>
