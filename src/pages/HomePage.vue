<template>
  <section id="home-page">
    Cresh ui contains a set of high quality components and demos for building rich, interactive user interfaces. 

    <h2 id="environment-support">
      Environment Support
    </h2>

    <div class="dumi-default-table">
      <div class="dumi-default-table-content" data-right-folded="true">
        <table>
          <thead>
            <tr>
              <th>
                <a href="http://godban.github.io/browsers-support-badges/">
                  <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px">
                </a>
              <br>Firefox
              </th>
              <th>
                <a href="http://godban.github.io/browsers-support-badges/">
                  <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px">
                </a>
                <br>
                Chrome
              </th>
              <th>
                <a href="http://godban.github.io/browsers-support-badges/">
                  <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px">
                </a><br>Safari
              </th>
              <th>
                <a href="http://godban.github.io/browsers-support-badges/">
                  <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px">
                </a>
                <br>Opera
              </th>
              <th>
                <a href="http://godban.github.io/browsers-support-badges/">
                  <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px">
                </a>
                <br>Electron
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h3>Installation</h3>

      Using npm or yarn or pnpm
      We recommend using npm or yarn or pnpm to install, it not only makes development easier, but also allow you to take advantage of the rich ecosystem of Javascript packages and tooling.

      <CTabs >
        <CTab
          name="npm"
          identifier="npm"
        >
          <CCard>
            npm install @long2x/cresh-ui --save
          </CCard>
        </CTab>

        <CTab
          name="yarn"
          identifier="yarn"
        >
          <CCard>
            yarn add @long2x/cresh-ui
          </CCard>
        </CTab>

        <CTab
          name="pnpm"
          identifier="pnpm"
        >
          <CCard>
            pnpm install @long2x/cresh-ui --save
          </CCard>
        </CTab>
      </CTabs>
    </div>

    <div>
      <h3>Usage</h3>
      <pre class="prism-code language-jsx">
        <code>
          import CreshUI from '@long2x/cresh-ui'

          app.use(CreshUI)
        </code>
      </pre>

      <p>
        And import stylesheets manually:
      </p>
      <pre class="prism-code language-jsx">
        <code>
          import '@long2x/cresh-ui/style.css'
        </code>
      </pre>
    </div>

    <div>
      <h3>Exposed exports</h3>
      The following export paths exist for the ui framework:

      <CDatatable
        no-footer
        :headers="[
          {
            text: 'Name',
            key: 'name',
            align: 'start',
            sortable: false,
          },
          {
            text: 'Description',
            key: 'description',
            align: 'start',
            sortable: false,
          },
        ]"
        :items="[
          {
            name: 'cresh-ui',
            description: 'Main entry point.'
          },
          {
            name: 'ui',
            description: 'All ui components'
          },
          {
            name: 'icons',
            description: 'all svg icons',
          },
          {
            name: 'form-controls',
            description: 'All form components'
          },
          {
            name: 'directives',
            description: 'All directives'
          },
          {
            name: 'helpers',
            description: 'Functions that may useful'
          },
          {
            name: 'plugins',
            description: 'All plugins'
          },
          {
            name: 'style.css',
            description: 'Default framework style file'
          },
          {
            name: 'default-theme.css',
            description: 'Default theme file'
          },
          {
            name: 'c-notify.scss',
            description: 'c-notify sass file'
          }
        ]"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  CTabs,
  CTab,
  CCard,
  CDatatable,
} from '@/components'
import { uuidv4 } from '@/helpers'

</script>

<style lang="scss">
  #home-page {
    pre {
        background: rgb(var(--color-dark));
        color: rgb(var(--color-warning));
      }
  }
</style>