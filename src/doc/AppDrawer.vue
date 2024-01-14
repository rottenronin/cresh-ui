<template>
  <CDrawer
    :model-value="true"
    height="100vh"
    :mobile-breakpoint="600"
  >
    <h2
      class="text-align-center c-cursor"
      @click="goto('/')"
    >
      Cresh UI
    </h2>

    <CDrawerItem
      :selected="currentRoute === 'icons'"
      @click="goto('icons')"
    >
      <div class="text">
        Icons
      </div>
    </CDrawerItem>

    <CDrawerCollapsible
      :collapsed="[
        'inputs',
        'selects',
        'checkboxes',
        'datetimeinputs',
        'fileinputs',
        'phonenumberinput'
      ].includes(currentRoute?.toString() || '') === false"
    >
      <template #title>
        Form controls
      </template>

      <CDrawerItem
        :selected="currentRoute === 'inputs'"
        @click="() => goto('inputs')"
      >
        <div class="text">
          c-input
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'checkboxes'"
        @click="() => goto('checkboxes')"
      >
        <div class="text">
          c-checkbox
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'selects'"
        @click="() => goto('selects')"
      >
        <div class="text">
          c-select
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'datetimeinputs'"
        @click="() => goto('datetimeinputs')"
      >
        <div class="text">
          c-datetime-input
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'fileinputs'"
        @click="() => goto('fileinputs')"
      >
        <div class="text">
          c-file-input
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'phonenumberinput'"
        @click="() => goto('phonenumberinput')"
      >
        <div class="text">
          c-phone-input
        </div>
      </CDrawerItem>
    </CDrawerCollapsible>

    <CDrawerItem
      :selected="currentRoute === 'notify'"
      @click="() => goto('notify')"
    >
      <div class="text">
        notif
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'accordion'"
        @click="() => goto('accordion')"
    >
      <div class="text">
        Accordion
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'switch-button'"
        @click="() => goto('switch-button')"
    >
      <div class="text">
        Switch button
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'tooltip'"
        @click="() => goto('tooltip')"
    >
      <div class="text">
        Tooltip
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'tabs'"
        @click="() => goto('tabs')"
    >
      <div class="text">
        c-tabs
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'charts'"
        @click="() => goto('charts')"
    >
      <div class="text">
        charts
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'slider'"
        @click="() => goto('slider')"
    >
      <div class="text">
        c-slider
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'steps'"
        @click="() => goto('steps')"
    >
      <div class="text">
        c-step
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'menu'"
        @click="() => goto('menu')"
    >
      <div class="text">
        c-menu
      </div>
    </CDrawerItem>

    <CDrawerItem
      :selected="currentRoute === 'modal'"
      @click="() => goto('modal')"
    >
      <div class="text">
        c-modal
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'dropdown'"
        @click="() => goto('dropdown')"
    >
      <div class="text">
        c-dropdown
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'datatable'"
        @click="() => goto('datatable')"
    >
      <div class="text">
        c-datatable
      </div>
    </CDrawerItem>

    <CDrawerItem
        :selected="currentRoute === 'button'"
        @click="() => goto('button')"
    >
      <div class="text">
        c-button
      </div>
    </CDrawerItem>
    <CDrawerCollapsible
      :collapsed="[
        'document-item',
        'file-upload-zone',
      ].includes(currentRoute?.toString() || '') === false"
    >
      <template #title>
        Files components
      </template>
      <CDrawerItem
        :selected="currentRoute === 'document-item'"
        @click="() => goto('document-item')"
      >
        <div class="text">
          c-document-item
        </div>
      </CDrawerItem>
      <CDrawerItem
        :selected="currentRoute === 'file-upload-zone'"
        @click="() => goto('file-upload-zone')"
      >
        <div class="text">
          c-file-upload-zone
        </div>
      </CDrawerItem>

      <CDrawerItem
        :selected="currentRoute === 'document-viewer'"
        @click="() => goto('document-viewer')"
      >
        <div class="text">
          c-document-viewer
        </div>
      </CDrawerItem>
    </CDrawerCollapsible>

    <CDrawerItem
      :selected="currentRoute === 'tag-page'"
      @click="() => goto('tag-page')"
    >
      <div class="text">
        c-tag
      </div>
    </CDrawerItem>

    <CDrawerItem
      :selected="currentRoute === 'alert-page'"
      @click="() => goto('alert-page')"
    >
      <div class="text">
        c-alert
      </div>
    </CDrawerItem>

    <CDrawerItem
      :selected="currentRoute === 'yup-helper'"
      @click="() => goto('yup-helper')"
    >
      <div class="text">
        yup-helper
      </div>
    </CDrawerItem>

    <CDrawerCollapsible
      :collapsed="[
        'date-range-filters'
      ].includes(currentRoute?.toString() || '') === false"
    >
      <template #title>
        Filters
      </template>

      <CDrawerItem
        :selected="currentRoute === 'date-range-filters'"
        @click="() => goto('date-range-filters')"
      >
        <div class="text">
          date-range-filters
        </div>
      </CDrawerItem>
    </CDrawerCollapsible>
  </CDrawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CDrawer from '../components/ui/drawer/CDrawer.vue'
import CDrawerItem from '../components/ui/drawer/CDrawerItem.vue'
import CDrawerCollapsible from '../components/ui/drawer/CDrawerCollapsible.vue'

const visible = ref<boolean>(true)

const route = useRoute()
const router = useRouter()

const currentRoute = computed(
  () => route.name,
)

function goto (routeName: string) {
  router.push({
    name: routeName,
  })
}

</script>
