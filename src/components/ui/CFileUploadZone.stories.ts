import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CFileUploadZone from './CFileUploadZone.vue'

const meta = {
  title: 'UI/CFileUploadZone',
  component: CFileUploadZone,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in KB (default: 2048)',
    },
    validFileExtensions: {
      control: { type: 'object' },
      description: 'Array of valid MIME types',
    },
    showFilename: {
      control: { type: 'boolean' },
      description: 'Show uploaded filename',
    },
  },
} satisfies Meta<typeof CFileUploadZone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxSize: 2048,
    validFileExtensions: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    showFilename: false,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFile = ref<File | undefined>()
      const handleUpload = (file: File) => {
        uploadedFile.value = file
        console.log('File uploaded:', file.name)
      }
      return { args, uploadedFile, handleUpload, t }
    },
    template: `
      <div style="max-width: 500px;">
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 200px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center;"
        />
        <div v-if="uploadedFile" style="margin-top: 16px; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724;">
          <strong>✓ {{ t('translate.showcase.file_upload_zone.default.uploaded') }}</strong> {{ uploadedFile.name }}
          <div style="font-size: 12px; margin-top: 4px;">{{ t('translate.showcase.file_upload_zone.default.size') }} {{ (uploadedFile.size / 1024).toFixed(2) }} KB</div>
        </div>
      </div>
    `,
  }),
}

export const ShowFilename: Story = {
  args: {
    maxSize: 5120,
    validFileExtensions: ['application/pdf', 'image/jpeg', 'image/png'],
    showFilename: true,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFile = ref<File | undefined>()
      const handleUpload = (file: File) => {
        uploadedFile.value = file
      }
      return { args, uploadedFile, handleUpload, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.file_upload_zone.show_filename.title') }}</h3>
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 200px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center;"
        />
      </div>
    `,
  }),
}

export const ImageOnly: Story = {
  args: {
    maxSize: 1024,
    validFileExtensions: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    showFilename: true,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFile = ref<File | undefined>()
      const handleUpload = (file: File) => {
        uploadedFile.value = file
      }
      return { args, uploadedFile, handleUpload, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.file_upload_zone.image_only.title') }}</h3>
        <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">
          {{ t('translate.showcase.file_upload_zone.image_only.supported_formats') }}
        </p>
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 200px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center;"
        />
        <div v-if="uploadedFile" style="margin-top: 16px; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724;">
          <strong>✓ {{ t('translate.showcase.file_upload_zone.image_only.uploaded') }}</strong> {{ uploadedFile.name }}
        </div>
      </div>
    `,
  }),
}

export const DocumentUpload: Story = {
  args: {
    maxSize: 5120,
    validFileExtensions: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    showFilename: true,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFile = ref<File | undefined>()
      const handleUpload = (file: File) => {
        uploadedFile.value = file
      }
      return { args, uploadedFile, handleUpload, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.file_upload_zone.document_upload.title') }}</h3>
        <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">
          {{ t('translate.showcase.file_upload_zone.document_upload.supported_formats') }}
        </p>
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 220px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9f9f9;"
        />
        <div v-if="uploadedFile" style="margin-top: 16px;">
          <div style="padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724; margin-bottom: 8px;">
            <strong>✓ {{ t('translate.showcase.file_upload_zone.document_upload.uploaded') }}</strong> {{ uploadedFile.name }}
          </div>
          <button @click="uploadedFile = undefined" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
            {{ t('translate.showcase.file_upload_zone.document_upload.upload_another') }}
          </button>
        </div>
      </div>
    `,
  }),
}

export const LargeFileSizeLimit: Story = {
  args: {
    maxSize: 10240,
    validFileExtensions: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/zip'],
    showFilename: true,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFile = ref<File | undefined>()
      const handleUpload = (file: File) => {
        uploadedFile.value = file
      }
      return { args, uploadedFile, handleUpload, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.file_upload_zone.large_limit.title') }}</h3>
        <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">
          {{ t('translate.showcase.file_upload_zone.large_limit.description') }}
        </p>
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 220px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); cursor: pointer; transition: all 0.3s;"
        />
      </div>
    `,
  }),
}

export const MultipleUpload: Story = {
  args: {
    maxSize: 2048,
    validFileExtensions: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    showFilename: true,
  },
  render: args => ({
    components: { CFileUploadZone },
    setup() {
      const { t } = useI18n()
      const uploadedFiles = ref<File[]>([])
      const handleUpload = (file: File) => {
        uploadedFiles.value.push(file)
      }
      const removeFile = (index: number) => {
        uploadedFiles.value.splice(index, 1)
      }
      return { args, uploadedFiles, handleUpload, removeFile, t }
    },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-top: 0;">{{ t('translate.showcase.file_upload_zone.multiple.title') }}</h3>
        <c-file-upload-zone
          v-bind="args"
          @uploaded="handleUpload"
          style="min-height: 200px; border: 2px dashed #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"
        />
        <div v-if="uploadedFiles.length > 0">
          <h4>{{ t('translate.showcase.file_upload_zone.multiple.uploaded_files', { count: uploadedFiles.length }) }}</h4>
          <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
            <div
              v-for="(file, index) in uploadedFiles"
              :key="index"
              style="padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;"
            >
              <div>
                <div style="font-weight: 500;">{{ file.name }}</div>
                <div style="font-size: 12px; color: #999;">{{ (file.size / 1024).toFixed(2) }} KB</div>
              </div>
              <button
                @click="removeFile(index)"
                style="padding: 4px 8px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
              >
                {{ t('translate.showcase.file_upload_zone.multiple.remove') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
