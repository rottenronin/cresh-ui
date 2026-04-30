<template>
  <label class="c-switch">
    <input
        class="input"
        type="checkbox"
        role="switch"
        :checked="model"
        :disabled="disabled"
        :name="name"
        :aria-label="!label ? ariaLabel : undefined"
        @change="onSwitchChange"
    >
    <span
class="switch"
aria-hidden="true"
/>
    <span
v-if="label"
class="label"
>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

defineProps({
  label: String,
  name: String,
  disabled: Boolean,
  ariaLabel: {
    type: String,
    default: undefined,
  },
})

const onSwitchChange = (change: Event) => {
  const target = change.target as HTMLInputElement
  model.value = target.checked
}

</script>

<style lang="scss">
@import "../../styles/ui/c-switch.scss";
</style>
