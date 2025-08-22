<template>
  <div class="chart-container">
    <canvas
        class="c-canvas"
        ref="canvasRef"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ChartOptions,
  ChartType,
  registerables,
  Chart,
  ChartDataset,
} from 'chart.js'
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  shallowRef,
  toRaw,
  watch,
} from 'vue'
import {
  debounce,
  chartHelper,
} from '../../helpers'

type Gradients = {
  y1: number
  offset1: number
  offset2: number
  offset3: number
  color1: string
  color2: string
  color3: string
}

const props = defineProps<{
  type: ChartType
  labels: string[]
  datasets: ChartDataset[]
  options: ChartOptions
  gradients: Gradients[]
}>()

const state = reactive<{
  ctx?: CanvasRenderingContext2D
}>({
  ctx: undefined,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartRef = shallowRef<Chart | null>(null)

const onWindowResize = debounce(() => {
  if (chartRef.value) {
    chartRef.value.resize()
  }
}, 200)

function initContext2d (canvas: HTMLCanvasElement): void {
  state.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
}

function getGradient() {
  const ctx = state.ctx as CanvasRenderingContext2D
  const gradients = []
  const grads = props.gradients
  for (let i = 0; i < grads.length; i++) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      grads[i].y1,
    )
    gradient?.addColorStop(grads[i].offset1, grads[i].color1)
    gradient?.addColorStop(grads[i].offset2, grads[i].color2)
    gradient?.addColorStop(grads[i].offset3, grads[i].color3)
    gradients.push(gradient)
  }
  return gradients
}

function initChart (): void {
  if (!state.ctx || !props.labels || !props.datasets) {
    throw new Error('context 2d, labels or datasets is empty')
  }

  chartRef.value = new Chart(state.ctx, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: props.datasets.map(
        (d: ChartDataset) => ({ ...d, backgroundColor: getGradient() }),
      ),
    },
    options: props.options.plugins?.tooltip?.external ? props.options : {
      ...props.options,
      plugins: {
        ...props.options.plugins,
        tooltip: {
          ...props.options.plugins?.tooltip,
          enabled: false,
          external: chartHelper.customTooltips,
        },
      },
    },
  })
}

onBeforeMount(() => {
  Chart.register(...registerables)
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  const chart = toRaw(chartRef.value)
  if (chart) {
    chart.destroy()
    chartRef.value = null
  }
  window.removeEventListener('resize', onWindowResize)
})

onMounted(() => {
  initContext2d(canvasRef.value as HTMLCanvasElement)
  initChart()
})

function updateChart () {
  props.labels.forEach(() => {
    chartRef.value?.data.labels?.pop()
  })

  props.labels.forEach((label: string) => {
    chartRef.value?.data.labels?.push(label)
  })

  chartRef.value?.data.datasets.forEach((_, i) => {
    chartRef.value?.data.datasets.splice(
      i,
      1,
      {
        ...props.datasets[i],
        backgroundColor: getGradient(),
      },
    )
  })
  chartRef.value?.update()
}

watch(() => [props.labels, props.datasets], () => {
  updateChart()
})

</script>

<style lang="scss">
.chart-container {
  position: relative;
  margin: auto;
  width: 70vw;
}
#chartjs-tooltip {
  opacity: 1;
  position: absolute;
  background: white;
  box-shadow: 2px 2px 6px #e0e0e0;
  color: #9D9DA7;
  border-radius: 20px;
  min-height: 50px;
  pointer-events: none;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 5%);
  min-width: 120px;
  padding: 15px;
  &::before {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #FFF;
    position: absolute;
    display:block;
    content: '';
    top: -5px;
    left: calc(46%);
  }
  .tooltip-title {
    font-size: 18px;
    color: rgb(rgb(var(--color-tertiary)));
    font-weight: bold;
    font-family: var(--font-text-regular);
  }
  table {
    padding: 10px;
    position: relative;
    font-family: var(--font-text-regular);
  }
}
</style>
