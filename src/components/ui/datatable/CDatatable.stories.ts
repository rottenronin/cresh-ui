import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CDatatable from './CDatatable.vue'
import type { DatatableHeaderItem } from '../../../@types'

const meta = {
  title: 'UI / Datatable',
  component: CDatatable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CDatatable>

export default meta
type Story = StoryObj<typeof meta>

function createUserHeaders(t: (key: string, params?: Record<string, unknown>) => string): DatatableHeaderItem[] {
  return [
    {
      key: 'id',
      text: t('translate.showcase.datatable.headers.id'),
      align: 'start',
      sortable: true,
    },
    {
      key: 'name',
      text: t('translate.showcase.datatable.headers.name'),
      align: 'start',
      sortable: true,
    },
    {
      key: 'email',
      text: t('translate.showcase.datatable.headers.email'),
      align: 'start',
      sortable: true,
    },
    {
      key: 'role',
      text: t('translate.showcase.datatable.headers.role'),
      align: 'start',
      sortable: true,
    },
    {
      key: 'status',
      text: t('translate.showcase.datatable.headers.status'),
      align: 'start',
      sortable: false,
    },
  ]
}

function createSampleUsers(t: (key: string, params?: Record<string, unknown>) => string) {
  return [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: t('translate.showcase.datatable.roles.admin'), status: t('translate.showcase.datatable.status.active') },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.active') },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: t('translate.showcase.datatable.roles.editor'), status: t('translate.showcase.datatable.status.inactive') },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.active') },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: t('translate.showcase.datatable.roles.admin'), status: t('translate.showcase.datatable.status.active') },
    { id: 6, name: 'Frank Castle', email: 'frank@example.com', role: t('translate.showcase.datatable.roles.viewer'), status: t('translate.showcase.datatable.status.active') },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: t('translate.showcase.datatable.roles.editor'), status: t('translate.showcase.datatable.status.active') },
    { id: 8, name: 'Henry Davis', email: 'henry@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.inactive') },
    { id: 9, name: 'Iris Martinez', email: 'iris@example.com', role: t('translate.showcase.datatable.roles.admin'), status: t('translate.showcase.datatable.status.active') },
    { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.active') },
    { id: 11, name: 'Karen White', email: 'karen@example.com', role: t('translate.showcase.datatable.roles.editor'), status: t('translate.showcase.datatable.status.active') },
    { id: 12, name: 'Leo Garcia', email: 'leo@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.active') },
    { id: 13, name: 'Mina Khatun', email: 'mina@example.com', role: t('translate.showcase.datatable.roles.viewer'), status: t('translate.showcase.datatable.status.active') },
    { id: 14, name: 'Noah Johnson', email: 'noah@example.com', role: t('translate.showcase.datatable.roles.user'), status: t('translate.showcase.datatable.status.inactive') },
    { id: 15, name: 'Olivia Robinson', email: 'olivia@example.com', role: t('translate.showcase.datatable.roles.admin'), status: t('translate.showcase.datatable.status.active') },
  ]
}

export const Default: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = computed(() => createSampleUsers(t))
      const headers = computed(() => createUserHeaders(t))
      const currentPage = ref(1)
      const itemsPerPage = ref(5)

      return {
        headers,
        items,
        currentPage,
        itemsPerPage,
        pages: [5, 10, 15],
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          :itemsPerPage="itemsPerPage"
          :page="currentPage"
          :pages="pages"
          row-clickable
          @row-click="(item) => console.log('Row clicked:', item)"
          @update:items-per-page="(val) => itemsPerPage = val"
          @update:page-index="(val) => currentPage = val"
        />
      </div>
    `,
  }),
}

export const WithoutFooter: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = computed(() => createSampleUsers(t))
      const headers = computed(() => createUserHeaders(t))

      return {
        headers,
        items,
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          no-footer
        />
      </div>
    `,
  }),
}

export const WithTotal: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = computed(() => createSampleUsers(t))
      const headers = computed(() => createUserHeaders(t))
      const currentPage = ref(1)
      const itemsPerPage = ref(5)

      return {
        headers,
        items,
        currentPage,
        itemsPerPage,
        pages: [5, 10, 15],
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          :itemsPerPage="itemsPerPage"
          :page="currentPage"
          :pages="pages"
          :allow-total="true"
          :total-items-count="items.length"
          row-clickable
          @update:items-per-page="(val) => itemsPerPage = val"
          @update:page-index="(val) => currentPage = val"
        />
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = ref([])
      const headers = computed(() => createUserHeaders(t))
      const isLoading = ref(true)

      return {
        headers,
        items,
        isLoading,
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          :is-loading="isLoading"
        />
      </div>
    `,
  }),
}

export const Limited: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = computed(() => createSampleUsers(t).slice(0, 5))
      const headers = computed(() => createUserHeaders(t))

      return {
        headers,
        items,
        pages: [5, 10],
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          :pages="pages"
          items-per-page="5"
        />
      </div>
    `,
  }),
}

export const Empty: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = ref([])
      const headers = computed(() => createUserHeaders(t))

      return {
        headers,
        items,
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          no-footer
        />
      </div>
    `,
  }),
}

export const Sortable: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const { t } = useI18n()
      const items = computed(() => createSampleUsers(t))
      const headers = computed(() => createUserHeaders(t))
      const currentPage = ref(1)
      const itemsPerPage = ref(10)
      const sortBy = ref<DatatableHeaderItem[]>([
        {
          key: 'name',
          text: t('translate.showcase.datatable.headers.name'),
          align: 'start',
          sortable: true,
          sortOrder: 'asc',
        },
      ])

      return {
        headers,
        items,
        currentPage,
        itemsPerPage,
        pages: [10, 20, 50],
        sortBy,
        t,
      }
    },
    template: `
      <div>
        <c-datatable
          :headers="headers"
          :items="items"
          :itemsPerPage="itemsPerPage"
          :page="currentPage"
          :pages="pages"
          row-clickable
          @update:items-per-page="(val) => itemsPerPage = val"
          @update:page-index="(val) => currentPage = val"
          @update:sort-by="(val) => sortBy = val"
        />
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          {{ t('translate.showcase.datatable.sortable_hint') }}
        </p>
      </div>
    `,
  }),
}
