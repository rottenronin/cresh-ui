import { createApp } from 'vue'
import App from './App.vue'
// import i18n from './plugins/i18n.plugin'
import CCodeSnippet from './components/ui/CCodeSnippet.vue'
import copyToClipboardDirective from './directives/copy-to-clipboard'
import i18nPlugin from './plugins/i18n.plugin'
import notifyPlugin from './plugins/notify.plugin'
import tooltipDirective from '@/directives/tooltip'
import routerPlugin from './plugins/router.plugin'

const app = createApp(App)

app.provide('$breakPoints', {
    XS: 600
})

app.directive('copy-to-clipboard', copyToClipboardDirective)
app.directive('tooltip', tooltipDirective)

app.component('CCodeSnippet', CCodeSnippet)

app.use(routerPlugin)

app.use(i18nPlugin)
app.use(notifyPlugin)

app.mount('#app')
