import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CDocumentItem from './CDocumentItem.vue'

const meta = {
  title: 'UI/CDocumentItem',
  component: CDocumentItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Document label',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name',
    },
    link: {
      control: { type: 'text' },
      description: 'Document link/URL',
    },
    approved: {
      control: { type: 'select' },
      options: [undefined, true, false],
      description: 'Approval status (undefined, true, or false)',
    },
    actions: {
      control: { type: 'object' },
      description: 'Available actions: upload, validate, download, read',
    },
  },
} satisfies Meta<typeof CDocumentItem>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    icon: 'document-sign',
    link: '#',
    approved: undefined,
    actions: ['read', 'download'],
  },
  render: args => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const selectedAction = ref<string | undefined>()
      return { args, selectedAction, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-document-item
          v-bind="args"
          :label="args.label ?? t('translate.showcase.document_item.basic.label')"
          @read="selectedAction = 'read'"
          @download="selectedAction = 'download'"
          @upload="selectedAction = 'upload'"
          @validate="selectedAction = 'validate'"
        />
        <div v-if="selectedAction" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <p style="margin: 0;"><strong>{{ t('translate.showcase.document_item.action_triggered') }}</strong> {{ t('translate.showcase.document_item.actions.' + selectedAction) }}</p>
        </div>
      </div>
    `,
  }),
}

export const Approved: Story = {
  args: {
    icon: 'document-check',
    link: '#',
    approved: true,
    actions: ['read', 'download'],
  },
  render: args => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const selectedAction = ref<string | undefined>()
      return { args, selectedAction, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-document-item
          v-bind="args"
          :label="args.label ?? t('translate.showcase.document_item.approved.label')"
          @read="selectedAction = 'read'"
          @download="selectedAction = 'download'"
        />
        <div style="margin-top: 12px; padding: 8px 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724; font-size: 14px;">
          ✓ {{ t('translate.showcase.document_item.approved.status') }}
        </div>
      </div>
    `,
  }),
}

export const NotApproved: Story = {
  args: {
    icon: 'document-text',
    link: '#',
    approved: false,
    actions: ['read', 'validate', 'download'],
  },
  render: args => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const selectedAction = ref<string | undefined>()
      return { args, selectedAction, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-document-item
          v-bind="args"
          :label="args.label ?? t('translate.showcase.document_item.not_approved.label')"
          @read="selectedAction = 'read'"
          @validate="selectedAction = 'validate'"
          @download="selectedAction = 'download'"
        />
        <div style="margin-top: 12px; padding: 8px 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24; font-size: 14px;">
          ✗ {{ t('translate.showcase.document_item.not_approved.status') }}
        </div>
      </div>
    `,
  }),
}

export const Unavailable: Story = {
  args: {
    icon: 'document-ban',
    link: undefined,
    approved: undefined,
    actions: ['upload'],
  },
  render: args => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const selectedAction = ref<string | undefined>()
      return { args, selectedAction, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-document-item
          v-bind="args"
          :label="args.label ?? t('translate.showcase.document_item.unavailable.label')"
          @upload="selectedAction = 'upload'"
        />
        <div style="margin-top: 12px; padding: 8px 12px; background: #e2e3e5; border: 1px solid #d6d8db; border-radius: 4px; color: #383d41; font-size: 14px;">
          {{ t('translate.showcase.document_item.unavailable.status') }}
        </div>
      </div>
    `,
  }),
}

export const AllActions: Story = {
  args: {
    icon: 'document-sign',
    link: '#',
    approved: true,
    actions: ['read', 'validate', 'download', 'upload'],
  },
  render: args => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const selectedAction = ref<string | undefined>()
      return { args, selectedAction, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-document-item
          v-bind="args"
          :label="args.label ?? t('translate.showcase.document_item.all_actions.label')"
          @read="selectedAction = 'read'"
          @validate="selectedAction = 'validate'"
          @download="selectedAction = 'download'"
          @upload="selectedAction = 'upload'"
        />
        <div v-if="selectedAction" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <p style="margin: 0;"><strong>{{ t('translate.showcase.document_item.action') }}</strong> {{ t('translate.showcase.document_item.actions.' + selectedAction) }}</p>
        </div>
      </div>
    `,
  }),
}

export const DocumentList: Story = {
  render: () => ({
    components: { CDocumentItem },
    setup() {
      const { t } = useI18n()
      const documents = [
        { label: t('translate.showcase.document_item.list.passport'), icon: 'document-sign', approved: true, link: '#' },
        { label: t('translate.showcase.document_item.list.driving_license'), icon: 'document-sign', approved: false, link: '#' },
        { label: t('translate.showcase.document_item.list.bank_statement'), icon: 'document-text', approved: undefined, link: undefined },
        { label: t('translate.showcase.document_item.list.insurance_certificate'), icon: 'document-check', approved: true, link: '#' },
      ]
      const selectedAction = ref<string | undefined>()
      return { documents, selectedAction, t }
    },
    template: `
      <div style="max-width: 600px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.document_item.list.title') }}</h3>
        <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
          <c-document-item
            v-for="(doc, i) in documents"
            :key="i"
            :label="doc.label"
            :icon="doc.icon"
            :approved="doc.approved"
            :link="doc.link"
            :actions="doc.link ? ['read', 'download'] : ['upload']"
            style="padding: 16px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;"
          />
        </div>
      </div>
    `,
  }),
}
