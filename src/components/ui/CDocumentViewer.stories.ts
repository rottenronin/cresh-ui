import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CDocumentViewer from './CDocumentViewer.vue'

const meta = {
  title: 'UI / Document Viewer',
  component: CDocumentViewer,
  parameters: {
    layout: 'padded',
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

const sampleDocument = {
  label: 'Sample PDF Document',
  link: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf.pdf',
  extension: 'pdf',
  id: 'doc-1',
}

const sampleImageDocument = {
  label: 'Sample Image',
  link: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
  extension: 'jpg',
  id: 'doc-2',
}

export const BasicPDF: Story = {
  args: {
    modelValue: true,
    document: sampleDocument,
    hideArrows: false,
    hideLeftArrow: false,
    hideRightArrow: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      const currentDocument = ref(args.document)
      return { args: { ...args, modelValue: isOpen }, isOpen, currentDocument }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Document
        </button>
        <c-document-viewer
          :model-value="isOpen"
          :document="currentDocument"
          :v-bind="args"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const ImageDocument: Story = {
  args: {
    modelValue: true,
    document: sampleImageDocument,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      const currentDocument = ref(args.document)
      return { args, isOpen, currentDocument }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Image
        </button>
        <c-document-viewer
          :model-value="isOpen"
          :document="currentDocument"
          v-bind="args"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const WithNavigation: Story = {
  args: {
    modelValue: true,
    document: sampleDocument,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      const documents = ref([sampleDocument, sampleImageDocument])
      const currentIndex = ref(0)

      const currentDocument = ref(documents.value[currentIndex.value])

      const handlePrev = () => {
        currentIndex.value = Math.max(0, currentIndex.value - 1)
        currentDocument.value = documents.value[currentIndex.value]
      }

      const handleNext = () => {
        currentIndex.value = Math.min(documents.value.length - 1, currentIndex.value + 1)
        currentDocument.value = documents.value[currentIndex.value]
      }

      return {
        args,
        isOpen,
        currentDocument,
        currentIndex,
        totalDocs: documents.value.length,
        handlePrev,
        handleNext,
      }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Documents
        </button>
        <p style="margin-top: 12px; color: #666;">
          Document {{ currentIndex + 1 }} of {{ totalDocs }}
        </p>
        <c-document-viewer
          :model-value="isOpen"
          :document="currentDocument"
          v-bind="args"
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
    document: sampleDocument,
    hideArrows: true,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Document (No Navigation)
        </button>
        <c-document-viewer
          :model-value="isOpen"
          :document="{ ...args.document }"
          v-bind="args"
          @update:model-value="isOpen = $event"
        />
      </div>
    `,
  }),
}

export const WithCustomLabel: Story = {
  args: {
    modelValue: true,
    document: sampleDocument,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Document
        </button>
        <c-document-viewer
          :model-value="isOpen"
          :document="args.document"
          v-bind="args"
          @update:model-value="isOpen = $event"
        >
          <template #label>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 20px;">📄</span>
              <div>
                <div style="font-weight: 600;">{{ args.document.label }}</div>
                <div style="font-size: 12px; color: #999;">Last updated: Today</div>
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
    document: sampleDocument,
    hideArrows: false,
  },
  render: (args: any) => ({
    components: { CDocumentViewer },
    setup() {
      const isOpen = ref(args.modelValue)
      return { args, isOpen }
    },
    template: `
      <div>
        <button @click="isOpen = true" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Document
        </button>
        <c-document-viewer
          :model-value="isOpen"
          :document="args.document"
          v-bind="args"
          @update:model-value="isOpen = $event"
        >
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button style="padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Download
              </button>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Approve
              </button>
            </div>
          </template>
        </c-document-viewer>
      </div>
    `,
  }),
}
