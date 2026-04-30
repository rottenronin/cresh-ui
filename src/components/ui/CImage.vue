<template>
  <div
    class="c-image"
    :class="{
      'c-image--loading': isLoading,
      'c-image--error': showDefaultErrorImage,
      [`c-image--aspect-${aspectRatio}`]: aspectRatio,
    }"
    :style="{
      width: width ? `${width}px` : 'auto',
      height: height ? `${height}px` : 'auto',
    }"
  >
    <!-- Actual image -->
    <img
      v-if="!showDefaultErrorImage"
      :src="computedSrc"
      :alt="alt"
      :title="title"
      :loading="lazy ? 'lazy' : 'eager'"
      :srcset="srcset"
      @error="onErrorHandle"
      @load="onImageLoad"
      class="c-image__img"
    >

    <!-- Loading skeleton -->
    <div
v-if="isLoading && lazy"
class="c-image__skeleton"
/>

    <!-- Fallback error icon -->
    <div
      v-else-if="showDefaultErrorImage"
      class="c-image__error"
    >
      <c-icon
        class="c-image__error-icon"
        color="tertiary"
        name="landscape"
      />
      <span
v-if="showErrorText"
class="c-image__error-text"
>{{ errorText }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import CIcon from '../icons/CIcon.vue'

const props = defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },
  alt: {
    type: String,
    required: false,
    default: 'Image',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  errorImageSrc: {
    type: String,
    required: false,
    default: undefined,
  },
  errorText: {
    type: String,
    required: false,
    default: 'Image not found',
  },
  showErrorText: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: [Number, String],
    required: false,
    default: undefined,
  },
  height: {
    type: [Number, String],
    required: false,
    default: undefined,
  },
  aspectRatio: {
    type: String,
    required: false,
    default: undefined,
    validator: (v: string) => ['1/1', '4/3', '16/9', '3/2', '21/9'].includes(v),
  },
  lazy: {
    type: Boolean,
    required: false,
    default: true,
  },
  srcset: {
    type: String,
    required: false,
    default: '',
  },
})

const showDefaultErrorImage = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

onMounted(() => {
  if (!props.src) {
    showDefaultErrorImage.value = true
  } else if (props.lazy) {
    isLoading.value = true
  }
})

const computedSrc = computed(() => {
  if (showDefaultErrorImage.value) {
    return ''
  }
  if (hasError.value && props.errorImageSrc) {
    return props.errorImageSrc
  }
  return props.src
})

function onErrorHandle(): void {
  hasError.value = true
  showDefaultErrorImage.value = !props.errorImageSrc
  isLoading.value = false
}

function onImageLoad(): void {
  isLoading.value = false
}
</script>

<style scoped lang="scss">
.c-image {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-app-background, #F2F5F7);
  border-radius: 4px;

  &--aspect-1\/1 {
    aspect-ratio: 1 / 1;
  }

  &--aspect-4\/3 {
    aspect-ratio: 4 / 3;
  }

  &--aspect-16\/9 {
    aspect-ratio: 16 / 9;
  }

  &--aspect-3\/2 {
    aspect-ratio: 3 / 2;
  }

  &--aspect-21\/9 {
    aspect-ratio: 21 / 9;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__skeleton {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-app-background, #F2F5F7) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      var(--color-app-background, #F2F5F7) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  &--loading {
    min-width: 100px;
    min-height: 100px;
  }

  &__error {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px;
    text-align: center;
  }

  &__error-icon {
    width: 48px;
    height: 48px;
    opacity: 0.5;
  }

  &__error-text {
    font-size: 12px;
    color: var(--color-text, #3D647C);
    opacity: 0.6;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
