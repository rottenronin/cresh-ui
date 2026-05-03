<template>
  <tbody>
    <template v-if="hasEmptyBlocSlot">
      <slot name="empty-bloc" />
    </template>
    <template v-else>
      <tr class="empty-datatable">
        <td>
          <span class="icon-wrapper">
            <TableIcon
              name="table"
              :width="32"
              :height="32"
              color="tertiary"
            />
          </span>
          <span
            v-if="!hasError"
            class="empty-text"
          >
            {{ i18n.global.t('translate.datatable.no_data') }}
          </span>
          <span
            v-else
            class="empty-text error"
          >
            {{ i18n.global.t('translate.datatable.error_message') }}
          </span>
          <span
            v-if="showRetry"
            class="retry-btn-wrapper c-mt-15"
          >
            <CButton
              color="primary"
              @click.prevent.stop="onRetry"
            >
              <span>
                {{ i18n.global.t('translate.datatable.retry') }}
              </span>
              <RefreshIcon
                name="refresh"
                color="white"
                :width="20"
                class="c-ml-5"
              />
            </CButton>
          </span>
        </td>
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue'

import {
  TableIcon,
  RefreshIcon,
} from '../../icons'
import CButton from '../CButton.vue'
import i18n from '../../../plugins/i18n.plugin'

defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
  showRetry: {
    type: Boolean,
    required: false,
     
    default: true,
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const slots = useSlots()
const hasEmptyBlocSlot = computed(() => !!slots['empty-bloc'])

const emit = defineEmits(['retry'])

function onRetry () {
  emit('retry')
}
</script>
