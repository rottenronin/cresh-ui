<template>
  <div
    class="slider"
    :class="{ 'is-disabled': isDisabled }"
  >
    <div
      v-if="isLabelMinVisible || isLabelMaxVisible"
      class="labels"
    >
      <div
        v-if="isLabelMinVisible"
        class="min"
      >
        <slot name="min" />
      </div>
      <div
        v-else
        class="min"
      >
        {{ min }}
      </div>

      <div
        v-if="isLabelMaxVisible"
        class="max"
      >
        <slot name="max" />
      </div>
      <div
        v-else
        class="max"
      >
        {{ max }}
      </div>
    </div>

    <div
      class="slider-bar-container"
    >
      <datalist
        v-if="markers"
        id="markers"
      >
        <template
          v-for="marker in markers"
          :key="marker"
        >
          <option
            :value="marker"
          />
        </template>
      </datalist>
      <input
        v-model="changeEvent"
        class="slider-bar"
        type="range"
        :min="min"
        :max="max"
        :disabled="isDisabled"
        list="markers"
        @input="onChangeHandle"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, useSlots, watch } from 'vue'

const slots = useSlots()

const isLabelMinVisible = computed(() => !!slots.min)
const isLabelMaxVisible = computed(() => !!slots.max)

const props = defineProps({
  min: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  markers: {
    type: Array as PropType<Array<number | string>>,
    required: false,
    default: null,
  },
})

const model = defineModel<number>({ default: 0 })

const changeEvent = ref<number>(model.value)

watch(() => model.value, (newValue: number) => {
  changeEvent.value = newValue
})

function onChangeHandle() {
  model.value = Number(changeEvent.value)
}

</script>

<style lang="scss">
.slider {

  .labels {
    display: flex;
    justify-content: space-between;
    color: rgb(var(--color-grey));
    font-size: 12px;
    margin-bottom: 15px;

    .max {
      text-align: end;
      width: 100%;
    }

    .min {
      text-align: start;
      width: 100%;
    }
  }

  .slider-bar-container {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    datalist {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    option {
      padding: 0;
      width: 16px;
      min-height: 16px;
      border-radius: 12px;
      background-color: rgb(var(--color-secondary));
    }

    .slider-bar {
      position: absolute;
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: rgb(var(--color-secondary));
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
      border-radius: 30px;
      margin: 0;

      &:disabled {
        background: rgb(var(--color-grey));

        &::-moz-range-thumb {
          background: rgb(var(--color-light-grey));
        }

        &::-webkit-slider-thumb {
          background: rgb(var(--color-light-grey));
        }
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 30px;
        border: none;
        background: rgb(var(--color-tertiary));
        cursor: pointer;
        transform: scale(1.875);
        margin: -11px 0;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        margin: -11px 0;
        transform: scale(1.875);
        border-radius: 30px;
        border: none;
        background: rgb(var(--color-tertiary));
        cursor: pointer;
      }
    }
  }
}

.is-disabled {
  &.input[type="range"]:disabled {
    background: rgb(var(--color-grey));
  }
}

</style>
