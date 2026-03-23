import type { Preview } from '@storybook/vue3'

// Import global styles
import '../src/styles/colors.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
  decorators: [
    () => ({
      template: `
        <div 
          style="
            padding: 20px;
            background: var(--color-app-background, #F2F5F7);
            color: var(--color-text, #3D647C);
          "
        >
          <story />
        </div>
      `,
    }),
  ],
}

export default preview
