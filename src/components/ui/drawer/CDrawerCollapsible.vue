<template>
  <div class="c-drawer-collapsible">
    <div
      class="c-drawer-collapsible-header"
      @click.prevent.stop="() => onToggle(!show)"
    >
      <div class="title">
        <slot name="title" />
      </div>
      <div
        class="toggle"
      >
        <template v-if="show">
          <ChevronUpIcon />
        </template>
        <template v-else>
          <ChevronDownIcon />
        </template>
      </div>
    </div>
    <div
      class="c-drawer-collapsible-content"
      :class="{
        'show': show,
        'hide': !show,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  ref,
  watch,
} from 'vue'

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/components/icons'

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: true,
  },
})

const show = ref<boolean>(false)

const onToggle = (value = !show.value) => {
  show.value = value
}

onBeforeMount(() => {
  show.value = !props.collapsed
})

watch(() => props.collapsed, (val: boolean) => {
  show.value = !val
})
</script>

<style lang="scss" scoped>
.c-drawer-collapsible {
  .c-drawer-collapsible-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    text-transform: capitalize;
    color: #92929D;
    font-size: 0.875rem;
    cursor: pointer;

    .title {
      flex: 1;
    }
    user-select: none; /* standard syntax */
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
  }
  .c-drawer-collapsible-content {
    padding-left: 15px;
    background: #f2f5f7;
    &.hide {
      display: none;
    }
    &.show {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
