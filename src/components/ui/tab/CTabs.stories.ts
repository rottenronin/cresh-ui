import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
      const { t } = useI18n()
      const selectedTab = ref('tab1')
      return { selectedTab, t }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            :name="t('translate.showcase.tabs.basic.tab1.name')"
            identifier="tab1"
            :visible="selectedTab === 'tab1'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.basic.tab1.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.basic.tab1.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.basic.tab2.name')"
            identifier="tab2"
            :visible="selectedTab === 'tab2'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.basic.tab2.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.basic.tab2.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.basic.tab3.name')"
            identifier="tab3"
            :visible="selectedTab === 'tab3'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.basic.tab3.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.basic.tab3.description') }}</p>
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
      const { t } = useI18n()
      const selectedTab = ref('home')
      return { selectedTab, t }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            :name="t('translate.showcase.tabs.with_icons.home.name')"
            identifier="home"
            icon="home"
            :visible="selectedTab === 'home'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.with_icons.home.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.with_icons.home.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.with_icons.profile.name')"
            identifier="profile"
            icon="user"
            :visible="selectedTab === 'profile'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.with_icons.profile.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.with_icons.profile.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.with_icons.settings.name')"
            identifier="settings"
            icon="settings"
            :visible="selectedTab === 'settings'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.with_icons.settings.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.with_icons.settings.description') }}</p>
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
      const { t } = useI18n()
      const selectedTab = ref('enabled1')
      return { selectedTab, t }
    },
    template: `
      <div>
        <c-tabs>
          <c-tab
            :name="t('translate.showcase.tabs.disabled.enabled1.name')"
            identifier="enabled1"
            :visible="selectedTab === 'enabled1'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.disabled.enabled1.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.disabled.enabled1.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.disabled.disabled.name')"
            identifier="disabled"
            disabled
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.disabled.disabled.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.disabled.disabled.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.disabled.enabled2.name')"
            identifier="enabled2"
            :visible="selectedTab === 'enabled2'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.disabled.enabled2.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.disabled.enabled2.description') }}</p>
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
      const { t } = useI18n()
      const selectedTab = ref('tab1')
      const tabs = computed(() => Array.from({ length: 10 }, (_, i) => ({
        id: `tab${i + 1}`,
        name: t('translate.showcase.tabs.many_tabs.tab_name', { number: i + 1 }),
      })))
      return { selectedTab, tabs, t }
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
              <h3>{{ t('translate.showcase.tabs.many_tabs.content_title', { name: tab.name }) }}</h3>
              <p>{{ t('translate.showcase.tabs.many_tabs.content_description', { name: tab.name }) }}</p>
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
      const { t } = useI18n()
      const selectedTab = ref('tab1')
      return { args, selectedTab, t }
    },
    template: `
      <div>
        <c-tabs v-bind="args">
          <c-tab
            :name="t('translate.showcase.tabs.read_only.tab1.name')"
            identifier="tab1"
            :visible="selectedTab === 'tab1'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.read_only.tab1.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.read_only.tab1.description') }}</p>
            </div>
          </c-tab>
          <c-tab
            :name="t('translate.showcase.tabs.read_only.tab2.name')"
            identifier="tab2"
            :visible="selectedTab === 'tab2'"
          >
            <div style="padding: 20px;">
              <h3>{{ t('translate.showcase.tabs.read_only.tab2.title') }}</h3>
              <p>{{ t('translate.showcase.tabs.read_only.tab2.description') }}</p>
            </div>
          </c-tab>
        </c-tabs>
      </div>
    `,
  }),
}
