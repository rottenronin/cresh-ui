<template>
  <div class="c-empty">
    <template v-if="hasDefaultSlot">
      <slot />
    </template>
    <template v-else>
      <div class="icon-wrapper">
        <template v-if="hasIconSlot">
          <slot name="icon" />
        </template>
        <template v-else>
          <CIcon
            :name="icon"
            :width="45"
            :height="45"
            color="tertiary"
          />
        </template>
      </div>
      <div class="content">
        <template v-if="hasContentSlot">
          <slot name="content" />
        </template>
        <template v-else>
          <p>{{ displayMessage }}</p>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import i18n from '../../plugins/i18n.plugin'
import CIcon from '../icons/CIcon.vue'

const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: 'table',
  },
  message: {
    type: String,
    required: false,
    default: undefined,
  },
})

const slots = useSlots()

// Use composable when available (reactive to locale changes), fall back to plugin instance.
const t = (() => {
  try {
    return useI18n().t
  } catch {
    return i18n.global.t
  }
})()

const displayMessage = computed(
  () => props.message ?? t('translate.common.errors.no_data'),
)

const hasDefaultSlot = computed(() => !!slots.default)

const hasIconSlot = computed(() => !!slots.icon)

const hasContentSlot = computed(() => !!slots.content)
</script>

<style lang="scss" scoped>
  .c-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-wrapper {
      display: flex;
      width: 100px;
      height: 100px;
      background: #00EED010;
      border-radius: 100px;
      justify-content: center;
      align-items: center;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
