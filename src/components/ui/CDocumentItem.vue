<template>
  <div
    class="c-document-item"
    :class="{
      unavailable: !link,
      approved,
      'not-approved': approved === false,
    }"
  >
    <div
      class="document-label-container"
    >
      <template
      v-if="hasLabelSlot"
      >
        <slot name="label" />
      </template>
      <template v-else>
        <CIcon
          :name="props.icon"
          color="secondary"
          class="c-mr-10"
        />
        <span class="document-label">
          {{
            label
          }}
        </span>
      </template>
    </div>

    <div
      class="actions"
    >
      <template v-if="hasActionSlot">
        <slot name="actions" />
      </template>

      <template v-else>
        <span
          v-for="action in actions"
          :key="action"
          :class="{
            'action-item': true,
            [action]: true,
            'c-mr-8': true,
          }"
          role="button"
          @click.prevent.stop="() => onActionClicked(action)"
        >
          <CIcon
            v-if="action === 'read'"
            name="eye"
            :width="14"
            :height="14"
            color="#3D647C"
            v-tooltip="i18nPlugin.global.t('translate.document.read')"
          />
          <CIcon
            v-else-if="action === 'validate'"
            name="document-checked"
            :width="14"
            :height="14"
            color="#3D647C"
            v-tooltip="i18nPlugin.global.t('translate.document.validate')"
          />
          <CIcon
            v-else
            :name="action"
            :width="14"
            :height="14"
            color="#3D647C"
            v-tooltip="actionTooltipTranslation(action)"
          />
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  useSlots,
  computed,
} from 'vue'
import {
  CDocumentItemType,
} from '../../@types/cresh-ui'
import CIcon from '../icons/CIcon.vue'
import { uuidv4 } from '../../helpers'
import i18nPlugin from '../../plugins/i18n.plugin'

type CDocumentItemAction =
  'upload'
| 'validate'
| 'download'
| 'read'

const props = defineProps({
  actions: {
    type: Array as PropType<CDocumentItemAction[]>,
    required: false,
    default: () => [],
  },
  id: {
    type: String,
    required: false,
    default: uuidv4(),
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  approved: {
    type: Boolean,
    required: false,
    // eslint-disable-next-line vue/no-boolean-default
    default: () => undefined,
    validator: value => typeof value === 'undefined'
      || typeof value === 'boolean',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  icon: {
    type: String,
    required: false,
    default: 'document-sign',
  },
})

const slots = useSlots()

const hasLabelSlot = computed(() => !!slots.label)
const hasActionSlot = computed(() => !!slots.actions)

const emit = defineEmits<{(e: CDocumentItemAction,
  item: CDocumentItemType,
): void
}>()

function onActionClicked(action: CDocumentItemAction) {
  emit(action, {
    link: props.link,
    label: props.label,
    id: props.id,
  })
}

function actionTooltipTranslation(action: 'upload' | 'download') {
  return i18nPlugin.global.te(`translate.document.${action}`)
    ? i18nPlugin.global.t(`translate.document.${action}`)
    : ''
}
</script>

<style lang="scss">
@import '../../styles/ui/c-document-item.scss';
</style>
