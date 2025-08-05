<template>
  <component
    :is="iconComponent"
    v-bind="{
      name,
      width,
      height,
      color,
      viewBox,
      outlined,
      rotate,
      alt,
    }"
  />
</template>

<script lang="ts" setup>
import {
  type Component,
  defineAsyncComponent,
  onBeforeMount,
  shallowRef,
} from 'vue'
import baseIconProps from './base-icon-props'

const props = defineProps({
  ...baseIconProps,
})
const iconComponent = shallowRef<Component | undefined>(undefined)

const iconsAndFilePaths = {
  add: () => import('./AddIcon.vue'),
  address: () => import('./AddressIcon.vue'),
  'arrow-down': () => import('./ArrowDownIcon.vue'),
  'arrow-right': () => import('./ArrowRightIcon.vue'),
  'arrow-left': () => import('./ArrowLeftIcon.vue'),
  'arrow-up': () => import('./ArrowUpIcon.vue'),
  attachment: () => import('./AttachmentIcon.vue'),
  'burger-menu': () => import('./BurgerMenuIcon.vue'),
  calendar: () => import('./CalendarIcon.vue'),
  camera: () => import('./CameraIcon.vue'),
  'chart-line': () => import('./ChartLineIcon.vue'),
  checkbook: () => import('./CheckBookIcon.vue'),
  checkbox: () => import('./CheckboxIcon.vue'),
  'checkbox-checked': () => import('./CheckboxCheckedIcon.vue'),
  check: () => import('./CheckIcon.vue'),
  'check-circle': () => import('./CheckCircleIcon.vue'),
  'chevron-left': () => import('./ChevronLeftIcon.vue'),
  'chevron-right': () => import('./ChevronRightIcon.vue'),
  'chevron-up': () => import('./ChevronUpIcon.vue'),
  'chevron-down': () => import('./ChevronDownIcon.vue'),
  code: () => import('./CodeIcon.vue'),
  contract: () => import('./ContractIcon.vue'),
  'credit-card': () => import('./CreditCardIcon.vue'),
  cross: () => import('./CrossIcon.vue'),
  'cross-circle': () => import('./CrossCircleIcon.vue'),
  download: () => import('./DownloadIcon.vue'),
  document: () => import('./DocumentIcon.vue'),
  'document-checked': () => import('./DocumentCheckedIcon.vue'),
  'document-sign': () => import('./DocumentSignIcon.vue'),
  'double-chevron-down': () => import('./DoubleChevronDownIcon.vue'),
  'double-chevron-left': () => import('./DoubleChevronLeftIcon.vue'),
  'double-chevron-right': () => import('./DoubleChevronRightIcon.vue'),
  'double-chevron-up': () => import('./DoubleChevronUpIcon.vue'),
  'double-quote': () => import('./DoubleQuoteIcon.vue'),
  edit: () => import('./EditIcon.vue'),
  faq: () => import('./FAQIcon.vue'),
  'faq-alt': () => import('./FAQAltIcon.vue'),
  'trash-bin': () => import('./TrashBinIcon.vue'),
  upload: () => import('./UploadIcon.vue'),
  email: () => import('./EmailIcon.vue'),
  error: () => import('./ErrorIcon.vue'),
  exit: () => import('./ExitIcon.vue'),
  export: () => import('./ExportIcon.vue'),
  eye: () => import('./EyeIcon.vue'),
  gear: () => import('./GearIcon.vue'),
  globe: () => import('./GlobeIcon.vue'),
  hat: () => import('./HatIcon.vue'),
  info: () => import('./InfoIcon.vue'),
  landscape: () => import('./LandscapeIcon.vue'),
  list: () => import('./ListIcon.vue'),
  loader: () => import('./LoaderIcon.vue'),
  location: () => import('./LocationIcon.vue'),
  locker: () => import('./LockerIcon.vue'),
  money: () => import('./MoneyIcon.vue'),
  'money-hand': () => import('./MoneyHandIcon.vue'),
  off: () => import('./OffIcon.vue'),
  phone: () => import('./PhoneIcon.vue'),
  plus: () => import('./PlusIcon.vue'),
  'power-off': () => import('./PowerOffIcon.vue'),
  'profile-circle': () => import('./ProfileCircleIcon.vue'),
  profile: () => import('./ProfileIcon.vue'),
  'profile-add': () => import('./ProfileAddIcon.vue'),
  refresh: () => import('./RefreshIcon.vue'),
  rocket: () => import('./RocketIcon.vue'),
  search: () => import('./SearchIcon.vue'),
  'shop-circle': () => import('./ShopCircleIcon.vue'),
  shop: () => import('./ShopIcon.vue'),
  'shopping-bag': () => import('./ShoppingBagIcon.vue'),
  sort: () => import('./SortIcon.vue'),
  star: () => import('./StarIcon.vue'),
  'star-full': () => import('./StarFullIcon.vue'),
  stats: () => import('./StatsIcon.vue'),
  test: () => import('./TestIcon.vue'),
  time: () => import('./TimeIcon.vue'),
  timeline: () => import('./TimelineIcon.vue'),
  transaction: () => import('./TransactionIcon.vue'),
  triangle: () => import('./TriangleIcon.vue'),
  'triangle-down': () => import('./TriangleDownIcon.vue'),
  'triangle-left': () => import('./TriangleLeftIcon.vue'),
  'triangle-right': () => import('./TriangleRightIcon.vue'),
  'triangle-up': () => import('./TriangleUpIcon.vue'),
  users: () => import('./UsersIcon.vue'),
  waiting: () => import('./WaitingIcon.vue'),
  'wait-up': () => import('./WaitUpIcon.vue'),
  write: () => import('./WriteIcon.vue'),
  warning: () => import('./WarningIcon.vue'),
  table: () => import('./TableIcon.vue'),
  ressource: () => import('./RessourceIcon.vue'),
  'dev-portal': () => import('./DevPortalIcon.vue'),
  'money-hand-fill': () => import('./MoneyHandFillIcon.vue'),
}

onBeforeMount(() => {
  if (!props.name) {
    throw new Error(`icon ${props.name} not exists`)
  }
  const item = Object.entries(iconsAndFilePaths).find(
    ([key]) => key === props.name,
  )
  if (!item) {
    throw new Error(`icon ${props.name} not exists`)
  }
  iconComponent.value = defineAsyncComponent(
    item[1] as () => Promise<Component>,
  )
})
</script>
