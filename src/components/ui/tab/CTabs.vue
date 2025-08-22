<template>
  <div
    class="c-tabs"
    id="tabs-container"
    :class="{
      readonly,
    }"
    ref="tabRef"
  >
    <div
        class="c-tabs-headers"
        id="header"
        ref="headerRef"
    >
      <div
        class="scroll-left scroll-button"
        @click="scroll('left')"
        v-if="state.isScrollable"
      >
        <CIcon
          name="triangle-left"
          :color="'white'"
        />
      </div>
      <div
        :style="{ marginLeft: 0 }"
        class="c-tabs-header-btn tab-button"
        v-if="hasButton"
        @click="handleButtonClick"
      >
        <CIcon
          :name="buttonIconName"
          :width="16"
          :height="16"
          :color="buttonColor"
        />
        <span class="text">
          {{ buttonLabel }}
        </span>
      </div>
      <template
        v-for="(tab, index) in state.tabs"
        :key="`c-tab-${index}`"
        >
        <div
          class="c-tabs-header-btn"
          :class="{
            selected: state.selectedIdentifier === tab.props.identifier,
            disabled: tab.props.disabled,
          }"
          @click="() => onTabSelect(
            tab.props.identifier
          )"
          v-if="!tab.props['hide']"
        >
          <TabHeaderItem
            :tab="tab"
            @ready="() => isTabsReady()"
          />
        </div>
      </template>
      <div
        class="scroll-right scroll-button"
        @click="scroll('right')"
        v-if="state.isScrollable"
      >
        <CIcon
          name="triangle-right"
          :color="'white'"
        />
      </div>
    </div>
    <slot
      :tab="selectedTabItem"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue'

import CIcon from '../../icons/CIcon.vue'

import CTab from './CTab.vue'
import TabHeaderItem from './TabHeaderItem.vue'
import type { CTabItem } from '../../../@types'

const state = reactive<{
  tabs: typeof CTab[]
  selectedIdentifier?: string
  isScrollable: boolean
}>({
  tabs: [],
  isScrollable: false,
})

// The provide-ed argument should be the ref itself (not wrapped in a reactive()):
const selectedTabItem = ref<CTabItem | undefined>(undefined)

const props = defineProps({
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },

  selectedId: {
    type: String,
    required: false,
    default: '',
  },

  hasButton: {
    type: Boolean,
    required: false,
    default: false,
  },

  buttonLabel: {
    type: String,
    required: false,
    default: '',
  },

  buttonIconName: {
    type: String,
    required: false,
    default: 'add',
  },

  buttonColor: {
    type: String,
    required: false,
    default: '#212121',
  },
})

function findStepIndexByIdentifier (val: string) {
  return state.tabs.findIndex(
    (tab: typeof CTab) => tab.props.identifier === val,
  )
}

watch(() => props.selectedId, (val: string, oldVal: string) => {
  if (val && val !== oldVal) {
    const index = findStepIndexByIdentifier(val)
    if (index <= -1) {
      return
    }

    selectedTabItem.value = {
      id: state.tabs[index].props.identifier,
      name: state.tabs[index].props.name,
    }
    state.selectedIdentifier = props.selectedId
  }
})

const slots = useSlots()

const defaultSlot = computed(() => slots.default)

const deepBuildTabs = (elems: unknown) => {
  if (elems && Array.isArray(elems)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elems.forEach((node: any) => {
      // eslint-disable-next-line no-underscore-dangle
      if (node.type === CTab || node.type.__name === 'CTab') {
        state.tabs.push(node)

        if (props.selectedId
          && node.props.identifier === props.selectedId) {
          selectedTabItem.value = {
            id: node.props.identifier,
            name: node.props.name,
          }
          state.selectedIdentifier = node.props.identifier
        }
        // v-for wrap c-tab in temporary v-node as children
      } else if (node.children
        && Array.isArray(node.children)
        && node.children.length > 0
      ) {
        deepBuildTabs(node.children)
      }
    })
  }
}

const emit = defineEmits(['tab-change', 'button-click'])

function onTabSelect (identifier: string): void {
  if (props.readonly) return
  if (selectedTabItem.value
    && selectedTabItem.value.id === identifier) {
    return
  }
  const tab = state.tabs.find(el => el.props.identifier === identifier)
  if (tab?.props.disabled) return

  selectedTabItem.value = {
    id: tab?.props.identifier,
    name: tab?.props.name,
  }

  state.selectedIdentifier = tab?.props.identifier

  emit('tab-change', selectedTabItem)
}

function handleButtonClick() {
  emit('button-click')
}

const headerRef = ref<HTMLDivElement | null>(null)
const tabReadyCount = ref(0)

function scroll(direction: 'left' | 'right') {
  const scrollOffset = 60
  const container = headerRef.value as HTMLDivElement | null
  if (!container) return

  switch (direction) {
    case 'left':
      container.scrollBy(-scrollOffset, 0)
      break
    default:
      container.scrollBy(scrollOffset, 0)
      break
  }
}

function isTabHeaderScrollable() {
  const header = headerRef.value as HTMLElement | null
  if (!header) return
  state.isScrollable = header.scrollWidth > header.offsetWidth
}

function isTabsReady() {
  tabReadyCount.value += 1
  const header = headerRef.value as HTMLElement | null
  if (state.tabs.length === tabReadyCount.value && header) {
    state.isScrollable = header.scrollWidth > header.offsetWidth
  }
}

function selectNextActiveTab() {
  state.tabs = [
    ...state.tabs,
  ]
  for (let i = 0; i < state.tabs.length; i++) {
    if (!state.tabs[i].props.hide) {
      onTabSelect(state.tabs[i].props.identifier)
      break
    }
  }
}

provide('tab-update', (identifier: string) => {
  const tab = state.tabs.find(el => el.props.identifier === identifier)
  if (tab) {
    tab.props.hide = !tab.props.hide
  }
  selectNextActiveTab()
})

onMounted(() => {
  window.addEventListener('resize', () => {
    isTabHeaderScrollable()
  })
  const elems = defaultSlot.value ? defaultSlot.value() : undefined

  deepBuildTabs(elems)

  if (!selectedTabItem.value && state.tabs.length > 0) {
    selectedTabItem.value = {
      id: state.tabs[0].props.identifier,
      name: state.tabs[0].props.name,
    }
    state.selectedIdentifier = state.tabs[0].props.identifier
  }
  selectNextActiveTab()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    isTabHeaderScrollable()
  })
})

provide('selected-tab-item', selectedTabItem)
</script>

<style lang="scss">
  @import '../../../styles/ui/c-tabs.scss';
</style>
