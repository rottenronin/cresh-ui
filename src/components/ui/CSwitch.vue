<template>
  <label class="c-switch">
    <input
        class="input"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :name="name"
        @change="onSwitchChange"
    >
    <span class="switch" />
    <span v-if="label" class="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  label: String,
  name: String,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const onSwitchChange = (change: Event) => {
  const target = change.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

</script>

<style lang="scss">
@import "../../styles/ui/c-switch.scss";
</style>
