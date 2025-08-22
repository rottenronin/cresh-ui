<template>
  <div class="c-steps">
    <div class="c-steps-headers">
      <template
        v-for="(step, i) in state.steps"
        :key="`c-step-${i}`"
      >
        <div
          class="c-step-header-item"
          :class="{
            selectable: enableNavigation && selectedIndex >= i
          }"
          @click="() => onStepSelect(i)"
        >
          <div class="c-step-header-top">
            <div
              class="c-step-index"
              :class="{
                stepped: i <= selectedIndex,
                unstepped: i > selectedIndex,
              }"
            >
              <template v-if="step.props.icon">
                <CIcon
                  :name="step.props.icon"
                  :width="24"
                  :height="24"
                />
              </template>
              <div
                v-else
                class="step-index-value"
              >
                {{ i + 1 }}
              </div>
            </div>
            <div
              v-if="i !== state.steps.length - 1"
              class="step-progress-bar"
            >
              <template v-if="i < selectedIndex">
                <div
                  class="progress-bar"
                  :style="{
                    width: '100%'
                  }"
                />
              </template>
              <template v-else-if="i === selectedIndex">
                <div
                  class="progress-bar unaccomplished"
                  :style="{
                    width: step.progressionPercentage
                      ? `${step.progressionPercentage}%`
                      : '50%'
                  }"
                />
              </template>
            </div>
          </div>
          <div
            class="c-step-header-bottom"
            :class="{
              stepped: i <= selectedIndex,
              unstepped: i > selectedIndex,
            }"
          >
            {{ step.props.name }}
          </div>
        </div>
      </template>
    </div>
    <slot
      :step="state.selectedStep"
      :selected-index="selectedIndex"
      :selected-id="selectedId"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  computed,
  useSlots,
  watch,
  onMounted,
} from 'vue'

import {
  uuidv4,
} from '../../../helpers'

import CStep from './CStep.vue'
import CIcon from '../../icons/CIcon.vue'

type SelectedStep = {
  id: string
  index: number
  name: string
}

const state = reactive<{
  steps: typeof CStep[]
  selectedStep: SelectedStep | null
}>({
  steps: [] as typeof CStep[],
  selectedStep: null,
})

const props = defineProps({
  stepId: {
    type: String,
    required: false,
    default: () => uuidv4(),
  },
  enableNavigation: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const slots = useSlots()

const defaultSlot = computed(() => slots.default)

onMounted(() => {
  const elems = defaultSlot.value ? defaultSlot.value() : undefined
  if (elems && Array.isArray(elems)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elems.forEach((node: any, i: number) => {
      // eslint-disable-next-line no-underscore-dangle
      if (node.type === CStep || node.type.__name === 'CStep') {
        state.steps.push(node)

        const nodeProps = node.props ? node.props : {}

        if (props.stepId
          && nodeProps.identifier === props.stepId) {
          state.selectedStep = {
            id: nodeProps.identifier,
            name: nodeProps.name,
            index: i,
          }
        }
      }
    })
  }

  if (!state.selectedStep) {
    state.selectedStep = {
      id: state.steps[0].props.identifier,
      name: state.steps[0].props.name,
      index: 0,
    }
  }
})

function findStepIndexByIdentifier (val: string) {
  return state.steps.findIndex(
    (step: typeof CStep) => step.props.identifier === val,
  )
}

const selectedIndex = computed(
  () => (state.selectedStep ? state.selectedStep.index : 0),
)

const selectedId = computed(
  () => (state.selectedStep ? state.selectedStep.id : null),
)

watch(() => props.stepId, (val: string, oldVal: string) => {
  if (val && val !== oldVal) {
    const index = findStepIndexByIdentifier(val)
    if (index <= -1) {
      return
    }

    state.selectedStep = {
      id: state.steps[index].props.identifier,
      name: state.steps[index].props.name,
      index,
    }
  }
})

const emit = defineEmits(['step-change'])

function onStepSelect (i: number): void {
  emit('step-change', i)
}

</script>

<style lang="scss">
  @import '../../../styles/ui/c-steps.scss';
</style>
