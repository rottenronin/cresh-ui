import type { Meta, StoryObj } from '@storybook/vue3'
import { useI18n } from 'vue-i18n'
import CImage from './CImage.vue'

const meta = {
  title: 'UI / Image',
  component: CImage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text for accessibility',
    },
    title: {
      control: { type: 'text' },
      description: 'Tooltip title on hover',
    },
    errorImageSrc: {
      control: { type: 'text' },
      description: 'Fallback image URL for errors',
    },
    errorText: {
      control: { type: 'text' },
      description: 'Error message text',
    },
    showErrorText: {
      control: { type: 'boolean' },
      description: 'Show error message text',
    },
    width: {
      control: { type: 'number' },
      description: 'Image width in pixels',
    },
    height: {
      control: { type: 'number' },
      description: 'Image height in pixels',
    },
    aspectRatio: {
      control: { type: 'select' },
      options: ['1/1', '4/3', '16/9', '3/2', '21/9'],
      description: 'Aspect ratio preset',
    },
    lazy: {
      control: { type: 'boolean' },
      description: 'Enable lazy loading',
    },
    srcset: {
      control: { type: 'text' },
      description: 'Responsive image srcset',
    },
  },
} satisfies Meta<typeof CImage>

export default meta
type Story = StoryObj<typeof meta>

const sampleImage = '/landscape.svg'
const fallbackImage = '/landscape.svg'

export const BasicImage: Story = {
  args: {
    src: sampleImage,
    lazy: true,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3>{{ t('translate.showcase.image.basic.title') }}</h3>
        <c-image v-bind="args" :alt="args.alt ?? t('translate.showcase.image.basic.alt')" :title="args.title ?? t('translate.showcase.image.basic.image_title')" style="width: 100%; height: 300px; border-radius: 8px;" />
        <p style="margin-top: 16px; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.basic.description') }}
        </p>
      </div>
    `,
  }),
}

export const AspectRatios: Story = {
  render: () => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      const aspectRatios = ['1/1', '4/3', '16/9', '3/2', '21/9']
      return { sampleImage, aspectRatios, t }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.image.aspect_ratios.title') }}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
          <div v-for="ratio in aspectRatios" :key="ratio">
            <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">{{ ratio }}</p>
            <c-image
              :src="sampleImage"
              :aspect-ratio="ratio"
              :alt="t('translate.showcase.image.aspect_ratios.alt')"
              style="width: 100%; border-radius: 8px;"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithLazyLoading: Story = {
  args: {
    src: sampleImage,
    lazy: true,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3>{{ t('translate.showcase.image.lazy.title') }}</h3>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.lazy.description') }}
        </p>
        <c-image 
          v-bind="args"
          :alt="args.alt ?? t('translate.showcase.image.lazy.alt')"
          aspect-ratio="16/9"
          style="width: 100%; border-radius: 8px;"
        />
      </div>
    `,
  }),
}

export const ErrorHandling: Story = {
  args: {
    src: 'https://invalid-url-12345.jpg',
    errorImageSrc: fallbackImage,
    showErrorText: true,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3>{{ t('translate.showcase.image.error.title') }}</h3>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.error.description') }}
        </p>
        <c-image 
          v-bind="args"
          :alt="args.alt ?? t('translate.showcase.image.error.alt')"
          :error-text="args.errorText ?? t('translate.showcase.image.error.error_text')"
          aspect-ratio="16/9"
          style="width: 100%; border-radius: 8px;"
        />
      </div>
    `,
  }),
}

export const NoImageSource: Story = {
  args: {
    src: '',
    showErrorText: true,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3>{{ t('translate.showcase.image.no_source.title') }}</h3>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.no_source.description') }}
        </p>
        <c-image 
          v-bind="args"
          :alt="args.alt ?? t('translate.showcase.image.no_source.alt')"
          :error-text="args.errorText ?? t('translate.showcase.image.no_source.error_text')"
          aspect-ratio="1/1"
          style="width: 100%; border-radius: 8px; background: #f5f5f5;"
        />
      </div>
    `,
  }),
}

export const ResponsiveGallery: Story = {
  render: () => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      const images = [
        { id: 1, src: sampleImage, alt: t('translate.showcase.image.gallery.image_1') },
        { id: 2, src: sampleImage, alt: t('translate.showcase.image.gallery.image_2') },
        { id: 3, src: sampleImage, alt: t('translate.showcase.image.gallery.image_3') },
        { id: 4, src: sampleImage, alt: t('translate.showcase.image.gallery.image_4') },
      ]
      return { images, t }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.image.gallery.title') }}</h3>
        <p style="margin: 0 0 24px 0; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.gallery.description') }}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
          <div v-for="image in images" :key="image.id" style="display: flex; flex-direction: column;">
            <c-image
              :src="image.src"
              :alt="image.alt"
              aspect-ratio="16/9"
              lazy
              style="width: 100%; border-radius: 8px; margin-bottom: 8px;"
            />
            <p style="margin: 0; color: #666; font-size: 14px;">{{ image.alt }}</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ProfileCard: Story = {
  args: {
    src: sampleImage,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div style="max-width: 300px; background: white; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="width: 120px; height: 120px; margin: 0 auto 16px; border-radius: 50%; overflow: hidden; border: 3px solid #667eea; background: #f5f5f5;">
          <c-image 
            v-bind="args"
            :alt="args.alt ?? t('translate.showcase.image.profile.alt')"
            :title="args.title ?? t('translate.showcase.image.profile.image_title')"
            aspect-ratio="1/1"
            style="width: 100%; height: 100%;"
          />
        </div>
        <h3 style="margin: 0 0 4px 0; color: #2c3e50;">{{ t('translate.showcase.image.profile.name') }}</h3>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">{{ t('translate.showcase.image.profile.role') }}</p>
        <button style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
          {{ t('translate.showcase.image.profile.cta') }}
        </button>
      </div>
    `,
  }),
}

export const WithCustomSize: Story = {
  args: {
    src: sampleImage,
    width: 400,
    height: 300,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return { args, t }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.image.custom_size.title') }}</h3>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          {{ t('translate.showcase.image.custom_size.description', { width: args.width, height: args.height }) }}
        </p>
        <c-image 
          v-bind="args"
          :alt="args.alt ?? t('translate.showcase.image.custom_size.alt')"
          style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
        />
      </div>
    `,
  }),
}

export const Responsive: Story = {
  render: () => ({
    components: { CImage },
    setup() {
      const { t } = useI18n()
      return {
        sampleImage,
        t,
      }
    },
    template: `
      <div>
        <h3>{{ t('translate.showcase.image.responsive.title') }}</h3>
        <div>
          <h4>{{ t('translate.showcase.image.responsive.thumbnail') }}</h4>
          <c-image
            :src="sampleImage"
            :alt="t('translate.showcase.image.responsive.thumbnail_alt')"
            style="width: 100px; height: 100px; border-radius: 4px;"
          />
        </div>
        <div style="margin-top: 24px;">
          <h4>{{ t('translate.showcase.image.responsive.small') }}</h4>
          <c-image
            :src="sampleImage"
            :alt="t('translate.showcase.image.responsive.small_alt')"
            style="width: 200px; height: 200px; border-radius: 4px;"
          />
        </div>
        <div style="margin-top: 24px;">
          <h4>{{ t('translate.showcase.image.responsive.large') }}</h4>
          <c-image
            :src="sampleImage"
            :alt="t('translate.showcase.image.responsive.large_alt')"
            style="width: 100%; max-width: 400px; height: 300px; border-radius: 4px;"
          />
        </div>
      </div>
    `,
  }),
}
