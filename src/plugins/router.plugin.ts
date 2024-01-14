import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import {
  formControlsRoutes,
} from '@/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '/',
      path: '/',
      component: () => import(
        '../pages/HomePage.vue'
      ),
    },
    {
      name: 'icons',
      path: '/icons',
      component: () => import(
        '../pages/IconsPage.vue'
      ),
    },
    {
      ...formControlsRoutes,
    },
    {
      name: 'date-range-filters',
      path: '/date-range-filters',
      component: () => import(
        '../pages/DateRangeFiltersPage.vue',
      ),
    },
    {
      name: 'notify',
      path: '/notify',
      component: () => import(
        '../pages/NotifyPage.vue'
      ),
    },
    {
      name: 'switch-button',
      path: '/switch-button',
      component: () => import(
        '../pages/SwitchButtonPage.vue'
      ),
    },
    {
      name: 'accordion',
      path: '/accordion',
      component: () => import(
        '../pages/AccordionPage.vue'
      ),
    },
    {
      name: 'tooltip',
      path: '/tooltip',
      component: () => import(
        '../pages/TooltipPage.vue'
      ),
    },
    {
      name: 'tabs',
      path: '/tabs',
      component: () => import(
        '../pages/TabsPage.vue'
      ),
    },
    {
      name: 'slider',
      path: '/slider',
      component: () => import(
        '../pages/SliderPage.vue'
      ),
    },
    {
      name: 'steps',
      path: '/steps',
      component: () => import(
        '../pages/StepsPage.vue'
      ),
    },
    {
      name: 'menu',
      path: '/menu',
      component: () => import(
        '../pages/MenuPage.vue'
      ),
    },
    {
      name: 'modal',
      path: '/modal',
      component: () => import(
        '../pages/ModalPage.vue'
      ),
    },
    {
      name: 'charts',
      path: '/charts',
      component: () => import(
        '../pages/ChartPage.vue'
      ),
    },
    {
      name: 'dropdown',
      path: '/dropdown',
      component: () => import(
        '../pages/DropdownPage.vue'
      ),
    },
    {
      name: 'datatable',
      path: '/datatable',
      component: () => import(
        '../pages/DatatablePage.vue'
      ),
    },
    {
      name: 'button',
      path: '/button',
      component: () => import(
        '../pages/ButtonPage.vue'
      ),
    },
    {
      name: 'files',
      path: '/files',
      redirect: '/files/document-item',
      children: [
        {
          name: 'document-item',
          path: '/files/document-item',
          component: () => import(
            '../pages/DocumentItemPage.vue'
          ),
        },
        {
          name: 'file-upload-zone',
          path: '/files/file-upload-zone',
          component: () => import(
            '../pages/FileUploadZonePage.vue'
          ),
        },
        {
          name: 'document-viewer',
          path: '/files/document-viewer',
          component: () => import(
            '../pages/DocumentViewerPage.vue'
          ),
        },
      ],
    },
    {
      name: 'tag-page',
      path: '/tag-page',
      component: () => import(
        '../pages/TagPage.vue'
      ),
    },
    {
      name: 'alert-page',
      path: '/c-alert',
      component: () => import(
        '../pages/AlertPage.vue'
      ),
    },
    {
      name: 'yup-helper',
      path: '/yup-helper',
      component: () => import(
        '../pages/YupValidationPage.vue'
      ),
    },
  ],
})

export default router
