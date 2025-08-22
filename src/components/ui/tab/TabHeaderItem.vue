<template>
  <CIcon
      v-if="tab.props.icon"
      :name="tab.props.icon"
      :width="16"
      :height="16"
      :color="tab.props.disabled ? '#ababab' : 'secondary'"
  />
  <span class="text">
    {{ tab.props.name }}
  </span>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'
import CTab from './CTab.vue'
import CIcon from '../../icons/CIcon.vue'

defineProps<{
  tab: typeof CTab
}>()

const emit = defineEmits(['ready'])

onMounted(() => {
  emit('ready')
})

</script>
