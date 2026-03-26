import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CTabs from './CTabs.vue'
import CTab from './CTab.vue'

const meta = {
  title: 'UI / Tabs',
  component: CTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    readonly: {
      control: { type: 'boolean' },
      description: 'Make tabs read-only',
    },
  },
} satisfies Meta<typeof CTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: { CTabs, CTab },
    setup() {
      const selectedTab = ref('tab1')
      return { selectedTab }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            name="Tab 1"
            identifier="tab1"
            :visible="selectedTab === 'tab1'"
          >
            <div style="padding: 20px;">
              <h3>Tab 1 Content</h3>
              <p>This is the content of the first tab.</p>
            </div>
          </c-tab>
          <c-tab
            name="Tab 2"
            identifier="tab2"
            :visible="selectedTab === 'tab2'"
          >
            <div style="padding: 20px;">
              <h3>Tab 2 Content</h3>
              <p>This is the content of the second tab.</p>
            </div>
          </c-tab>
          <c-tab
            name="Tab 3"
            identifier="tab3"
            :visible="selectedTab === 'tab3'"
          >
            <div style="padding: 20px;">
              <h3>Tab 3 Content</h3>
              <p>This is the content of the third tab.</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { CTabs, CTab },
    setup() {
      const selectedTab = ref('home')
      return { selectedTab }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            name="Home"
            identifier="home"
            icon="home"
            :visible="selectedTab === 'home'"
          >
            <div style="padding: 20px;">
              <h3>Home</h3>
              <p>Welcome to the home tab.</p>
            </div>
          </c-tab>
          <c-tab
            name="Profile"
            identifier="profile"
            icon="user"
            :visible="selectedTab === 'profile'"
          >
            <div style="padding: 20px;">
              <h3>Profile</h3>
              <p>View your profile information.</p>
            </div>
          </c-tab>
          <c-tab
            name="Settings"
            identifier="settings"
            icon="settings"
            :visible="selectedTab === 'settings'"
          >
            <div style="padding: 20px;">
              <h3>Settings</h3>
              <p>Configure your preferences.</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}

export const DisabledTab: Story = {
  render: () => ({
    components: { CTabs, CTab },
    setup() {
      const selectedTab = ref('enabled1')
      return { selectedTab }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            name="Enabled 1"
            identifier="enabled1"
            :visible="selectedTab === 'enabled1'"
          >
            <div style="padding: 20px;">
              <h3>Enabled Tab 1</h3>
              <p>This tab is enabled.</p>
            </div>
          </c-tab>
          <c-tab
            name="Disabled"
            identifier="disabled"
            disabled
          >
            <div style="padding: 20px;">
              <h3>Disabled Tab</h3>
              <p>This tab cannot be clicked.</p>
            </div>
          </c-tab>
          <c-tab
            name="Enabled 2"
            identifier="enabled2"
            :visible="selectedTab === 'enabled2'"
          >
            <div style="padding: 20px;">
              <h3>Enabled Tab 2</h3>
              <p>This tab is also enabled.</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}

export const ManyTabs: Story = {
  render: () => ({
    components: { CTabs, CTab },
    setup() {
      const selectedTab = ref('tab1')
      const tabs = Array.from({ length: 10 }, (_, i) => ({
        id: `tab${i + 1}`,
        name: `Tab ${i + 1}`,
      }))
      return { selectedTab, tabs }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            v-for="tab in tabs"
            :key="tab.id"
            :name="tab.name"
            :identifier="tab.id"
            :visible="selectedTab === tab.id"
          >
            <div style="padding: 20px;">
              <h3>{{ tab.name }} Content</h3>
              <p>This is the content of {{ tab.name }}.</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}

export const ReadOnly: Story = {
  args: {
    readonly: true,
  },
  render: (args) => ({
    components: { CTabs, CTab },
    setup() {
      const selectedTab = ref('tab1')
      return { args, selectedTab }
    },
    template: `
      <div>
        <c-tabs v-bind="args">
          <c-tab
            name="Tab 1"
            identifier="tab1"
            :visible="selectedTab === 'tab1'"
          >
            <div style="padding: 20px;">
              <h3>Tab 1</h3>
              <p>This is a read-only tab view.</p>
            </div>
          </c-tab>
          <c-tab
            name="Tab 2"
            identifier="tab2"
            :visible="selectedTab === 'tab2'"
          >
            <div style="padding: 20px;">
              <h3>Tab 2</h3>
              <p>Tab selection is disabled.</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}
