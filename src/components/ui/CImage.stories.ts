import type { Meta, StoryObj } from '@storybook/vue3'
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
    errorImageSrc: {
      control: { type: 'text' },
      description: 'Fallback image URL for errors',
    },
  },
} satisfies Meta<typeof CImage>

export default meta
type Story = StoryObj<typeof meta>

const sampleImage = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
const fallbackImage = 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop'

export const ValidImage: Story = {
  args: {
    src: sampleImage,
    errorImageSrc: undefined,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px;">
        <c-image v-bind="args" style="width: 100%; height: 300px;" />
      </div>
    `,
  }),
}

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    errorImageSrc: fallbackImage,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px;">
        <p style="margin-top: 0; color: #666; font-size: 14px;">
          Primary image URL is invalid, fallback image will be shown:
        </p>
        <c-image v-bind="args" style="width: 100%; height: 300px;" />
      </div>
    `,
  }),
}

export const NoSource: Story = {
  args: {
    src: '',
    errorImageSrc: undefined,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px;">
        <p style="margin-top: 0; color: #666; font-size: 14px;">
          No image source provided. Shows default icon:
        </p>
        <c-image v-bind="args" style="width: 100%; height: 300px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;" />
      </div>
    `,
  }),
}

export const ImageGallery: Story = {
  render: () => ({
    components: { CImage },
    setup() {
      const images = [
        {
          id: 1,
          src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
          fallback: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop',
        },
        {
          id: 2,
          src: 'https://images.unsplash.com/photo-1517456213624-3a0f41cd94d3?w=300&h=300&fit=crop',
          fallback: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop',
        },
        {
          id: 3,
          src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
          fallback: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop',
        },
      ]
      return { images }
    },
    template: `
      <div>
        <h3>Image Gallery with Fallback</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div v-for="image in images" :key="image.id">
            <c-image
              :src="image.src"
              :error-image-src="image.fallback"
              style="width: 100%; height: 200px; border-radius: 8px; object-fit: cover;"
            />
            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Image {{ image.id }}</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ProfilePicture: Story = {
  args: {
    src: sampleImage,
    errorImageSrc: undefined,
  },
  render: (args) => ({
    components: { CImage },
    setup() {
      return { args }
    },
    template: `
      <div style="text-align: center;">
        <div style="width: 150px; height: 150px; margin: 0 auto 16px; border-radius: 50%; overflow: hidden; border: 3px solid #667eea; background: #f5f5f5;">
          <c-image v-bind="args" style="width: 100%; height: 100%;" />
        </div>
        <h3 style="margin: 0 0 4px 0;">John Doe</h3>
        <p style="margin: 0; color: #666; font-size: 14px;">Software Engineer</p>
      </div>
    `,
  }),
}

export const Responsive: Story = {
  render: () => ({
    components: { CImage },
    setup() {
      return {
        sampleImage,
      }
    },
    template: `
      <div>
        <h3>Responsive Images</h3>
        <div>
          <h4>Thumbnail</h4>
          <c-image
            :src="sampleImage"
            style="width: 100px; height: 100px; border-radius: 4px;"
          />
        </div>
        <div style="margin-top: 24px;">
          <h4>Small</h4>
          <c-image
            :src="sampleImage"
            style="width: 200px; height: 200px; border-radius: 4px;"
          />
        </div>
        <div style="margin-top: 24px;">
          <h4>Large</h4>
          <c-image
            :src="sampleImage"
            style="width: 100%; max-width: 400px; height: 300px; border-radius: 4px;"
          />
        </div>
      </div>
    `,
  }),
}
