import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, reactive } from 'vue'
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

// Sample data for users
const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Castle', email: 'frank@example.com', role: 'Viewer', status: 'Active' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Henry Davis', email: 'henry@example.com', role: 'User', status: 'Inactive' },
  { id: 9, name: 'Iris Martinez', email: 'iris@example.com', role: 'Admin', status: 'Active' },
  { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'User', status: 'Active' },
  { id: 11, name: 'Karen White', email: 'karen@example.com', role: 'Editor', status: 'Active' },
  { id: 12, name: 'Leo Garcia', email: 'leo@example.com', role: 'User', status: 'Active' },
  { id: 13, name: 'Mina Khatun', email: 'mina@example.com', role: 'Viewer', status: 'Active' },
  { id: 14, name: 'Noah Johnson', email: 'noah@example.com', role: 'User', status: 'Inactive' },
  { id: 15, name: 'Olivia Robinson', email: 'olivia@example.com', role: 'Admin', status: 'Active' },
]

const userHeaders: DatatableHeaderItem[] = [
  {
    key: 'id',
    text: 'ID',
    align: 'start',
    sortable: true,
  },
  {
    key: 'name',
    text: 'Name',
    align: 'start',
    sortable: true,
  },
  {
    key: 'email',
    text: 'Email',
    align: 'start',
    sortable: true,
  },
  {
    key: 'role',
    text: 'Role',
    align: 'start',
    sortable: true,
  },
  {
    key: 'status',
    text: 'Status',
    align: 'start',
    sortable: false,
  },
]

export const Default: Story = {
  render: () => ({
    components: { CDatatable },
    setup() {
      const items = ref(sampleUsers)
      const currentPage = ref(1)
      const itemsPerPage = ref(5)

      return {
        headers: userHeaders,
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
      const items = ref(sampleUsers)

      return {
        headers: userHeaders,
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
      const items = ref(sampleUsers)
      const currentPage = ref(1)
      const itemsPerPage = ref(5)

      return {
        headers: userHeaders,
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
      const items = ref([])
      const isLoading = ref(true)

      return {
        headers: userHeaders,
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
      const items = ref(sampleUsers.slice(0, 5))

      return {
        headers: userHeaders,
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
      const items = ref([])

      return {
        headers: userHeaders,
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
      const items = ref(sampleUsers)
      const currentPage = ref(1)
      const itemsPerPage = ref(10)
      const sortBy = ref<DatatableHeaderItem[]>([
        {
          key: 'name',
          text: 'Name',
          align: 'start',
          sortable: true,
          sortOrder: 'asc',
        },
      ])

      return {
        headers: userHeaders,
        items,
        currentPage,
        itemsPerPage,
        pages: [10, 20, 50],
        sortBy,
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
          Click on column headers to sort
        </p>
      </div>
    `,
  }),
}
