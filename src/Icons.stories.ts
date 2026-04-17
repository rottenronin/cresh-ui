import type { Meta, StoryObj } from '@storybook/vue3'
import type { Component } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type IconModule = {
  default: Component
}

const iconModules = import.meta.glob('./components/icons/*.vue', {
  eager: true,
}) as Record<string, IconModule>

const icons = Object.entries(iconModules)
  .filter(([path]) => {
    return !path.endsWith('/CIcon.vue') && !path.endsWith('/CreshBaseIcon.vue')
  })
  .map(([path, module]) => {
    const fileName = path.split('/').pop()?.replace('.vue', '') ?? path
    const snippet = `import { ${fileName} } from '@long2x/cresh-ui/icons'

<template>
  <${fileName} />
</template>`

    return {
      id: fileName,
      name: fileName,
      component: module.default,
      snippet,
    }
  })
  .sort((left, right) => left.name.localeCompare(right.name))

const meta = {
  title: 'Icons',
  parameters: {
    layout: 'fullscreen',
    order: 1,
  },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
  render: () => ({
    setup() {
      const { t } = useI18n()
      const copiedIconId = ref<string | null>(null)
      const copiedIconName = ref<string | null>(null)
      let copiedTimer: number | undefined

      const copySnippet = async (
        iconId: string,
        iconName: string,
        snippet: string,
      ) => {
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(snippet)
          } else {
            const hiddenTextarea = document.createElement('textarea')
            hiddenTextarea.value = snippet
            hiddenTextarea.style.position = 'fixed'
            hiddenTextarea.style.opacity = '0'
            document.body.appendChild(hiddenTextarea)
            hiddenTextarea.focus()
            hiddenTextarea.select()
            document.execCommand('copy')
            document.body.removeChild(hiddenTextarea)
          }

          copiedIconId.value = iconId
          copiedIconName.value = iconName
          window.clearTimeout(copiedTimer)
          copiedTimer = window.setTimeout(() => {
            copiedIconId.value = null
            copiedIconName.value = null
          }, 1600)
        } catch (error) {
          console.error('Unable to copy icon snippet', error)
        }
      }

      return {
        t,
        icons,
        copiedIconId,
        copiedIconName,
        copySnippet,
      }
    },
    template: `
      <div style="
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(52, 156, 231, 0.16), transparent 28%),
          radial-gradient(circle at top right, rgba(64, 14, 201, 0.10), transparent 22%),
          linear-gradient(180deg, #f6f8fc 0%, #eef2f8 100%);
        color: #17324d;
        padding: 48px 24px 64px;
      ">
        <div style="max-width: 1320px; margin: 0 auto;">
          <transition name="icon-copy-toast">
            <div
              v-if="copiedIconName"
              style="
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 20;
                padding: 12px 16px;
                border-radius: 14px;
                background: rgba(23, 50, 77, 0.96);
                color: white;
                box-shadow: 0 18px 48px rgba(23, 50, 77, 0.24);
                font-size: 13px;
                font-weight: 700;
              "
            >
              {{ t('translate.showcase.icons.copied_notice', { name: copiedIconName }) }}
            </div>
          </transition>

          <div style="margin-bottom: 32px;">
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 14px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.72);
              border: 1px solid rgba(23, 50, 77, 0.08);
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: #349ce7;
            ">
              {{ t('translate.showcase.icons.eyebrow') }}
            </div>
            <h1 style="
              margin: 18px 0 10px;
              font-size: clamp(32px, 5vw, 52px);
              line-height: 1.05;
              letter-spacing: -0.04em;
            ">
              {{ t('translate.showcase.icons.title') }}
            </h1>
            <p style="
              max-width: 760px;
              margin: 0;
              font-size: 16px;
              line-height: 1.7;
              color: rgba(23, 50, 77, 0.78);
            ">
              {{ t('translate.showcase.icons.subtitle') }}
            </p>
          </div>

          <div style="
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            padding: 12px 16px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.78);
            border: 1px solid rgba(23, 50, 77, 0.08);
            box-shadow: 0 16px 40px rgba(61, 100, 124, 0.08);
            font-size: 14px;
          ">
            <span style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 999px;
              background: #400ec9;
              color: #fff;
              font-weight: 700;
            ">
              {{ icons.length }}
            </span>
            <span style="font-weight: 600; color: #17324d;">
              {{ t('translate.showcase.icons.total', { count: icons.length }) }}
            </span>
          </div>

          <div style="
            margin-bottom: 28px;
            padding: 22px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(23, 50, 77, 0.08);
            box-shadow: 0 18px 48px rgba(61, 100, 124, 0.08);
          ">
            <div style="
              font-size: 18px;
              font-weight: 700;
              color: #17324d;
              margin-bottom: 8px;
            ">
              {{ t('translate.showcase.icons.usage_section.title') }}
            </div>
            <p style="
              margin: 0 0 16px;
              font-size: 14px;
              line-height: 1.7;
              color: rgba(23, 50, 77, 0.78);
              max-width: 860px;
            ">
              {{ t('translate.showcase.icons.usage_section.description') }}
            </p>
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
              gap: 16px;
              margin-bottom: 16px;
            ">
              <div style="
                padding: 16px;
                border-radius: 18px;
                background: rgba(246, 248, 252, 0.9);
                border: 1px solid rgba(23, 50, 77, 0.06);
              ">
                <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #349ce7; margin-bottom: 8px;">
                  {{ t('translate.showcase.icons.usage_section.step_one_label') }}
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #17324d;">
                  {{ t('translate.showcase.icons.usage_section.step_one_text') }}
                </div>
              </div>
              <div style="
                padding: 16px;
                border-radius: 18px;
                background: rgba(246, 248, 252, 0.9);
                border: 1px solid rgba(23, 50, 77, 0.06);
              ">
                <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #349ce7; margin-bottom: 8px;">
                  {{ t('translate.showcase.icons.usage_section.step_two_label') }}
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #17324d;">
                  {{ t('translate.showcase.icons.usage_section.step_two_text') }}
                </div>
              </div>
              <div style="
                padding: 16px;
                border-radius: 18px;
                background: rgba(246, 248, 252, 0.9);
                border: 1px solid rgba(23, 50, 77, 0.06);
              ">
                <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #349ce7; margin-bottom: 8px;">
                  {{ t('translate.showcase.icons.usage_section.step_three_label') }}
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #17324d;">
                  {{ t('translate.showcase.icons.usage_section.step_three_text') }}
                </div>
              </div>
            </div>
            <pre style="
              margin: 0;
              padding: 18px;
              border-radius: 18px;
              background: #0f1a2a;
              color: #dbe8ff;
              font-size: 13px;
              line-height: 1.7;
              overflow-x: auto;
              white-space: pre-wrap;
              word-break: break-word;
            "><code>import { AddIcon } from '@long2x/cresh-ui/icons'

&lt;template&gt;
  &lt;AddIcon /&gt;
&lt;/template&gt;</code></pre>
          </div>

          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 18px;
          ">
            <div
              v-for="icon in icons"
              :key="icon.id"
              style="
                background: rgba(255, 255, 255, 0.82);
                border: 1px solid rgba(23, 50, 77, 0.08);
                border-radius: 20px;
                padding: 18px;
                box-shadow: 0 18px 48px rgba(61, 100, 124, 0.08);
                backdrop-filter: blur(8px);
                min-height: 190px;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                justify-content: flex-start;
                gap: 14px;
              "
            >
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div style="
                    font-size: 14px;
                    line-height: 1.4;
                    color: #17324d;
                    font-weight: 700;
                    word-break: break-word;
                  ">
                    {{ icon.name }}
                  </div>
                  <div style="
                    margin-top: 4px;
                    font-size: 11px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(23, 50, 77, 0.5);
                  ">
                    {{ t('translate.showcase.icons.usage_label') }}
                  </div>
                </div>
              </div>

              <div style="
                min-height: 92px;
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(64, 14, 201, 0.08), rgba(52, 156, 231, 0.12));
                color: #400ec9;
                cursor: pointer;
                transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
                box-shadow: inset 0 0 0 1px rgba(64, 14, 201, 0.06);
              ">
                <button
                  type="button"
                  @click="copySnippet(icon.id, icon.name, icon.snippet)"
                  :aria-label="t('translate.showcase.icons.copy_icon_aria', { name: icon.name })"
                  style="
                    all: unset;
                    width: 100%;
                    min-height: 92px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                  "
                >
                  <component :is="icon.component" />
                </button>
              </div>

              <div style="
                font-size: 11px;
                line-height: 1.5;
                color: rgba(23, 50, 77, 0.64);
              ">
                {{ copiedIconId === icon.id ? t('translate.showcase.icons.copied_inline') : t('translate.showcase.icons.click_icon_to_copy') }}
              </div>
            </div>
          </div>
        </div>
        <style>
          .icon-copy-toast-enter-active,
          .icon-copy-toast-leave-active {
            transition: opacity 0.18s ease, transform 0.18s ease;
          }

          .icon-copy-toast-enter-from,
          .icon-copy-toast-leave-to {
            opacity: 0;
            transform: translateY(-8px);
          }
        </style>
      </div>
    `,
  }),
}