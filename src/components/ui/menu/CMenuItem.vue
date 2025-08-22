<template>
  <div
    class="c-menu-item"
    :class="{
      selected,
      selectable: isItemSelectable,
      expanded: collapsible && !collapsed,
    }"
  >
    <template v-if="hasDefaultSlot">
      <div
        class="custom-content"
      >
        <slot
          :selected="selected"
          :index="index"
          :text="text"
        />
      </div>
    </template>
    <template v-else>
      <div
        class="default-content"
        @click.prevent.stop="onClick"
      >
        <div
          v-if="icon"
          class="icon-wrapper"
        >
          <CIcon
            :name="icon"
          />
        </div>
        <div
          v-else-if="index"
          class="item-index"
        >
          {{ index }}
        </div>
        <div
          v-if="text"
          class="item-text"
        >
          {{ text }}
        </div>
        <div
          v-if="collapsible"
          class="item-collapsible-icon-wrapper"
        >
          <span
            v-if="collapsed"
            class="collapsed-icon-wrapper"
          >
            <ChevronRightIcon
              color="#ffffff"
            />
          </span>
          <span
            v-else
            class="expanded-icon-wrapper"
          >
            <ChevronDownIcon
              color="#ffffff"
            />
          </span>
        </div>
      </div>
    </template>

    <template v-if="hasCollapsibleContent">
      <div
        class="collapsible-content"
        :class="{
          collapsed,
          expanded: !collapsed,
        }"
      >
        <slot name="collapsible-content" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  ref,
  useSlots,
} from 'vue'
import CIcon from '../../icons/CIcon.vue'
import ChevronRightIcon from '../../icons/ChevronRightIcon.vue'
import ChevronDownIcon from '../../icons/ChevronDownIcon.vue'
import {
  uuidv4,
  pubSubHelper,
} from '../../../helpers'

const props = defineProps({
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: String,
    required: false,
    default: () => uuidv4(),
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  collapsible: {
    type: Boolean,
    required: false,
    default: false,
  },
  collapsed: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: true,
  },
  selectable: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: true,
  },
})

const isItemSelectable = computed(() => props.collapsible || props.selectable)

const index = ref<number>()

const emit = defineEmits(['expand', 'collapse', 'select'])

const slots = useSlots()

const hasDefaultSlot = computed(() => !!slots.default)

const hasCollapsibleContent = computed(() => !!slots['collapsible-content'])

function onClick () {
  if (!isItemSelectable.value) {
    return
  }
  if (props.collapsible) {
    emit(props.collapsed ? 'expand' : 'collapse', { index: index.value, id: props.id })
  } else {
    pubSubHelper.publish('SELECT_MENU_ITEM', {
      index: index.value,
      id: props.id,
    })
  }
}

onBeforeUnmount(() => {
  pubSubHelper.unsubscribe('SELECT_MENU_ITEM', 'SELECT_MENU_ITEM')
})

</script>
