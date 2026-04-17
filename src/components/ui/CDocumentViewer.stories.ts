import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CDocumentViewer from './CDocumentViewer.vue'

const meta = {
  title: 'UI / Document Viewer',
  component: CDocumentViewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    modelValue: false,
    document: null,
  } as any,
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: 'Show/hide the document viewer modal',
    },
    document: {
      control: { type: 'object' },
      description: 'Document to display (label, link, extension)',
    },
    hideArrows: {
      control: { type: 'boolean' },
      description: 'Hide navigation arrows',
    },
    hideLeftArrow: {
      control: { type: 'boolean' },
      description: 'Hide left arrow',
    },
    hideRightArrow: {
      control: { type: 'boolean' },
      description: 'Hide right arrow',
    },
  },
} satisfies Meta<typeof CDocumentViewer>

export default meta
type Story = StoryObj<typeof meta>

export const BasicPDF: Story = {
  args: {
    modelValue: true,
    hideArrows: false,
    hideLeftArrow: false,
    hideRightArrow: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const defaultDocument = computed(() => ({
        label: t('translate.showcase.document_viewer.pdf.label'),
        link: '/sample.pdf',
        extension: 'pdf',
        id: 'doc-1',
      }))
      const currentDocument = computed(() => args.document ?? defaultDocument.value)
      return { args: { ...args, modelValue: isOpen }, isOpen, currentDocument, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.basic_pdf.open_button') }}
        </button>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="currentDocument"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const ImageDocument: Story = {
  args: {
    modelValue: true,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const defaultDocument = computed(() => ({
        label: t('translate.showcase.document_viewer.image.label'),
        link: '/landscape.svg',
        extension: 'svg',
        id: 'doc-2',
      }))
      const currentDocument = computed(() => args.document ?? defaultDocument.value)
      return { args, isOpen, currentDocument, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.image.open_button') }}
        </button>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="currentDocument"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const WithNavigation: Story = {
  args: {
    modelValue: true,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const currentIndex = ref(0)
      const documents = computed(() => [
        {
          label: t('translate.showcase.document_viewer.pdf.label'),
          link: '/sample.pdf',
          extension: 'pdf',
          id: 'doc-1',
        },
        {
          label: t('translate.showcase.document_viewer.image.label'),
          link: '/landscape.svg',
          extension: 'svg',
          id: 'doc-2',
        },
      ])
      const currentDocument = computed(() => documents.value[currentIndex.value])
      const totalDocs = computed(() => documents.value.length)

      const handlePrev = () => {
        currentIndex.value = Math.max(0, currentIndex.value - 1)
      }

      const handleNext = () => {
        currentIndex.value = Math.min(documents.value.length - 1, currentIndex.value + 1)
      }

      return {
        args,
        isOpen,
        currentDocument,
        currentIndex,
        totalDocs,
        handlePrev,
        handleNext,
        t,
      }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.navigation.open_button') }}
        </button>
        <p style="margin-top: 12px; color: #666;">
          {{ t('translate.showcase.document_viewer.navigation.progress', { current: currentIndex + 1, total: totalDocs }) }}
        </p>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="currentDocument"
          @update:model-value="isOpen = $event"
          @prev="handlePrev"
          @next="handleNext"
          :hide-left-arrow="currentIndex === 0"
          :hide-right-arrow="currentIndex === totalDocs - 1"
        />
      </div>
    `,
  }),
}

export const NoArrows: Story = {
  args: {
    modelValue: true,
    hideArrows: true,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const defaultDocument = computed(() => ({
        label: t('translate.showcase.document_viewer.pdf.label'),
        link: '/sample.pdf',
        extension: 'pdf',
        id: 'doc-1',
      }))
      const resolvedDocument = computed(() => args.document ?? defaultDocument.value)
      return { args, isOpen, resolvedDocument, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.no_arrows.open_button') }}
        </button>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="resolvedDocument"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const WithCustomLabel: Story = {
  args: {
    modelValue: true,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const defaultDocument = computed(() => ({
        label: t('translate.showcase.document_viewer.pdf.label'),
        link: '/sample.pdf',
        extension: 'pdf',
        id: 'doc-1',
      }))
      const resolvedDocument = computed(() => args.document ?? defaultDocument.value)
      return { args, isOpen, resolvedDocument, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.custom_label.open_button') }}
        </button>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="resolvedDocument"
          @update:model-value="isOpen = $event"
        >
          <template #label>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 20px;">📄</span>
              <div>
                <div style="font-weight: 600;">{{ resolvedDocument.label }}</div>
                <div style="font-size: 12px; color: #999;">{{ t('translate.showcase.document_viewer.custom_label.last_updated') }}</div>
              </div>
            </div>
          </template>
        </c-document-viewer>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    modelValue: true,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const { t } = useI18n()
      const isOpen = ref(args.modelValue)
      const defaultDocument = computed(() => ({
        label: t('translate.showcase.document_viewer.pdf.label'),
        link: '/sample.pdf',
        extension: 'pdf',
        id: 'doc-1',
      }))
      const resolvedDocument = computed(() => args.document ?? defaultDocument.value)
      return { args, isOpen, resolvedDocument, t }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ t('translate.showcase.document_viewer.footer.open_button') }}
        </button>
        <c-document-viewer
          v-bind="args"
          :model-value="isOpen"
          :document="resolvedDocument"
          @update:model-value="isOpen = $event"
        >
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.document_viewer.footer.download') }}
              </button>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                {{ t('translate.showcase.document_viewer.footer.approve') }}
              </button>
            </div>
          </template>
        </c-document-viewer>
      </div>
    `,
  }),
}
