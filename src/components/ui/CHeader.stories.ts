import type { Meta, StoryObj } from '@storybook/vue3'
import CHeader from './CHeader.vue'

const meta = {
  title: 'UI / Header',
  component: CHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <template #title>
            <h1 style="margin: 0;">Dashboard</h1>
          </template>
        </c-header>
        <div style="padding: 20px;">
          <p>Page content goes here</p>
        </div>
      </div>
    `,
  }),
}

export const WithDefaultSlot: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0;">Home</h1>
            <div style="color: #666;">Welcome back!</div>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>Page content</p>
        </div>
      </div>
    `,
  }),
}

export const WithNavigation: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 20px;">
            <h1 style="margin: 0; flex: 1;">My Application</h1>
            <nav style="display: flex; gap: 20px;">
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Home</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">About</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Services</a>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Contact</a>
            </nav>
            <button style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Sign In
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>Page content here</p>
        </div>
      </div>
    `,
  }),
}

export const WithBadges: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0;">Admin Panel</h1>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="position: relative;">
                <span style="cursor: pointer; font-size: 20px;">📧</span>
                <span style="position: absolute; top: -5px; right: -8px; background: #ff6b6b; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">3</span>
              </div>
              <div style="position: relative;">
                <span style="cursor: pointer; font-size: 20px;">🔔</span>
                <span style="position: absolute; top: -5px; right: -8px; background: #ff6b6b; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">5</span>
              </div>
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #667eea; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer;">JD</div>
            </div>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>Welcome to admin panel</p>
        </div>
      </div>
    `,
  }),
}

export const SearchBar: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 20px;">
            <h1 style="margin: 0;">Products</h1>
            <input
              type="search"
              placeholder="Search products..."
              style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; width: 300px;"
            />
            <button style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Filter
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>Product list content</p>
        </div>
      </div>
    `,
  }),
}

export const DemoWithTab: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header>
          <template #title>
            <div>
              <h2 style="margin: 0 0 12px 0;">Projects</h2>
              <div style="display: flex; gap: 16px; border-bottom: 2px solid #f0f0f0;">
                <button style="padding: 8px 12px; border: none; background: none; color: #667eea; font-weight: 600; cursor: pointer; border-bottom: 3px solid #667eea; margin-bottom: -2px;">
                  All
                </button>
                <button style="padding: 8px 12px; border: none; background: none; color: #999; cursor: pointer;">
                  Active
                </button>
                <button style="padding: 8px 12px; border: none; background: none; color: #999; cursor: pointer;">
                  Archived
                </button>
              </div>
            </div>
          </template>
        </c-header>
        <div style="padding: 20px;">
          <p>Project list content</p>
        </div>
      </div>
    `,
  }),
}

export const Colored: Story = {
  render: () => ({
    components: { CHeader },
    template: `
      <div>
        <c-header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-bottom: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 style="margin: 0; color: white;">Premium Header</h1>
            <button style="padding: 8px 16px; background: white; color: #667eea; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              Upgrade
            </button>
          </div>
        </c-header>
        <div style="padding: 20px;">
          <p>Styled header content</p>
        </div>
      </div>
    `,
  }),
}
