import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CSelect from './CSelect.vue'

const meta = {
  title: 'Form Controls/CSelect',
  component: CSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Selected value (v-model binding)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the select',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    name: {
      control: { type: 'text' },
      description: 'Input name attribute',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the select',
    },
  },
} satisfies Meta<typeof CSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return {
      components: { CSelect },
      setup() {
        const selected = ref('')
        return { selected }
      },
      template: `
        <div>
          <c-select
            v-model="selected"
            name="choose-option"
            label="Choose an option"
            placeholder="Select..."
            style="max-width: 300px;"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            Selected: {{ selected }}
          </p>
        </div>
      `,
    }
  },
}

export const WithValue: Story = {
  render: () => {
    return {
      components: { CSelect },
      setup() {
        const selected = ref('option2')
        return { selected }
      },
      template: `
        <div>
          <c-select
            v-model="selected"
            name="choose-option"
            label="Choose an option"
            placeholder="Choose..."
            style="max-width: 300px;"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            Selected: {{ selected }}
          </p>
        </div>
      `,
    }
  },
}

export const WithCountries: Story = {
  render: () => {
    return {
      components: { CSelect },
      setup() {
        const country = ref('')
        return { country }
      },
      template: `
        <div>
          <c-select
            v-model="country"
            name="country"
            label="Select your country"
            placeholder="Choose a country..."
            style="max-width: 300px;"
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
          </c-select>
          <p style="margin-top: 16px; font-size: 12px;">
            Selected: {{ country }}
          </p>
        </div>
      `,
    }
  },
}

export const Disabled: Story = {
  render: () => {
    return {
      components: { CSelect },
      setup() {
        const selected = ref('option1')
        return { selected }
      },
      template: `
        <c-select
          v-model="selected"
          name="disabled"
          label="Disabled select"
          disabled
          style="max-width: 300px;"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </c-select>
      `,
    }
  },
}
