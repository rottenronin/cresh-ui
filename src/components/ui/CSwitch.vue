<template>
  <label class="c-switch">
    <input
        v-bind="$attrs"
        class="input"
        type="checkbox"
        :checked="checked"
        @change="onSwitchChange"
    >
    <span class="switch" />
  </label>
</template>

<script setup lang="ts">
defineProps({
  checked: Boolean,
})

const emit = defineEmits(['switchState'])

const onSwitchChange = (change: Event) => {
  const target = change.target as HTMLInputElement
  emit('switchState', target.checked)
}

</script>

<style lang="scss">
@import "../../styles/ui/c-switch.scss";
</style>
