# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0](https://github.com/creshpay/cresh-ui/compare/v5.18.0...v6.0.0) (2026-04-30)

### ⚠ BREAKING CHANGES

- **peerDependencies bumped to majors:**
  - `vue-router` `^4.2.2` → `^5.0.6`
  - `vue-i18n` `^9.14.5` → `^11.4.0`
  - `vue` peer floor raised to `^3.5.33` (still 3.x)
- **`@vuepic/vue-datepicker` 8 → 12** — the package no longer ships a default
  export. Internal usage was migrated to
  `import { VueDatePicker as Datepicker } from '@vuepic/vue-datepicker'`.
  The `locale` prop now expects a `date-fns` `Locale` object instead of a string.
- **Node.js `>=22`** is now required (`engines.node`).
- **ESLint flat config** (`eslint.config.js`) replaces `.eslintrc.js`. Consumers
  extending the legacy file path will need to migrate.

### Features

#### A11y & UX
- Added unified `error` slot on every form-control (`CInput`, `CSelect`,
  `CTextarea`, `CRadio`, `CDatetimeInput`, `CCheckbox`). Legacy `errors` slot
  still works but logs a deprecation warning in development.
- `CCheckbox` rebuilt with a visually-hidden native `<input>` inside its label
  (proper screen-reader support + visible focus ring).
- ARIA wiring on every form-control: `aria-invalid`, `aria-describedby`,
  `aria-required`, error region with stable `id`.
- `CDropdown` now exposes a full ARIA listbox/option pattern with keyboard
  navigation (↑ ↓ Home End Enter Space Esc Tab) and `aria-activedescendant`.
- `CSwitch` exposes `role="switch"` and an `aria-label` prop.
- `CModal` listens for `Escape` at the document level when open and now uses
  `<Teleport>` (configurable via the new `teleport` and `teleportTarget` props).
- All hardcoded English `aria-label`s (`CTag`, `CDocumentViewer`,
  `CFileUploadZone`) are translated through `vue-i18n`. Added
  `common.aria.{close, previous, next, upload_zone}` to all 6 locales (en, fr,
  de, es, it, cn).
- `CFileUploadZone` file `<input>` is now `tabindex="-1" aria-hidden="true"`;
  the visible button is the real keyboard trigger.

#### API
- New composable `useFormControl(props, fallbackName)` centralising
  `inputId` / `errorId` / `hasError` / `hasErrorSlot` / `hasValueOrPlaceholder`.
- `CButton` rewritten with `<script setup>` and a new API:
  - `variant: 'solid' | 'outlined' | 'text'`
  - `size: 'sm' | 'md' | 'lg'`
  - The legacy `outlined`, `text` and `slim` props are still accepted but bridged
    via internal `resolvedVariant` / `resolvedSize` computeds.
- Added validators on `CTag.type` and `CButton.variant` / `CButton.size`.
- New CSS variables (`--c-form-control-padding-top`,
  `--c-form-control-error-reserve`, `--c-select-min-width`,
  `--c-select-arrow-space`, `--c-select-width`) and a `.c-form-control--dense`
  utility for tighter form layouts.

### Bug Fixes

- `CTabs` resize listener leak — the `add`/`remove` event listener pair used
  two different anonymous arrow functions, so cleanup was a no-op. Replaced
  with a named `onWindowResize` handler.
- `CDropdown` cleared its scheduled timers and document listeners on
  `onBeforeUnmount`.
- `CModal`/`CEmpty` `okLabel`/`cancelLabel` defaults were evaluated at module
  load time, freezing the i18n locale. Switched to `useI18n()` inside computeds
  with a plugin fallback for non-setup contexts.
- `CDatetimeInput` and `CTextarea` had broken `inputId` references — now
  produced by `useFormControl`.
- `CPhoneInput` `phoneInputId` was undefined — now provided by
  `useFormControl(props, 'phone-input')`.

### Dependency Upgrades

#### Tier 1 — patches / minor
- `vue` 3.5.30 → 3.5.33
- `@vue/server-renderer` 3.5.30 → 3.5.33
- `@vue/test-utils` 2.4.6 → 2.4.10
- `sass` 1.98 → 1.99
- `libphonenumber-js` 1.12.40 → 1.12.42
- `@cypress/vue` 6.0.2 → 6.0.3

#### Tier 2 — tooling majors
- `typescript` 5.9 → 6.0
- `vue-tsc` 1.8 → 3.2 (fixes Node 22+ incompat)
- `jsdom` 23 → 29 (+ `@types/jsdom` 21 → 28)
- `@types/node` 20 → 25
- `@faker-js/faker` 8 → 10
- `@vue/tsconfig` 0.4 → 0.9 (extension renamed to `tsconfig.dom.json`)

#### Tier 3 — ESLint
- `eslint` 8.57 → 10.2 (flat config via `@eslint/eslintrc` `FlatCompat`)
- `@typescript-eslint/{parser,eslint-plugin}` 7 → 8
- `eslint-plugin-vue` 9 → 10
- `eslint-plugin-import` 2.27 → 2.32
- New: `eslint-import-resolver-typescript`, `@eslint/compat`,
  `@eslint/eslintrc`, `@eslint/js`, `globals`

#### Tier 4 — Vite / Vitest
- `vite` 5 → 8 (rolldown bundler)
- `vitest` 1 → 4
- `@vitejs/plugin-vue` 5 → 6
- `@vitejs/plugin-vue-jsx` 4 → 5
- `vite-plugin-dts` 4 → 5 (renamed `outputDir` → `outDir`)
- `sass-loader` 14 → 16
- `@cypress/vite-dev-server` 5 → 7

#### Tier 5 — Storybook
- `storybook` and `@storybook/*` 8.6 → 10.3 (codemod auto-migration).
  `@storybook/manager-api` import path is now `storybook/manager-api`.

#### Tier 6 — Cypress
- `cypress` 13 → 15

### Internal

- **`defineModel` migration** — all 14 `v-model`-enabled components migrated
  to the Vue 3.4+ `defineModel<T>()` macro:
  `CCheckbox`, `CCreditCardInput`, `CDatetimeInput`, `CDocumentViewer`,
  `CDrawer`, `CDropdown`, `CInput`, `CModal`, `CPhoneInput`, `CRadio`,
  `CSelect`, `CSlider`, `CSwitch`, `CTextarea`. Public API unchanged
  (props/events identical for consumers); `modelValue` removed from
  `base-control-props.ts`. `useFormControl()` now accepts an optional 3rd
  `modelRef` argument so `hasValueOrPlaceholder` keeps working.
- `vite.config.ts` SCSS preprocessor migrated from `@import "./absolute/path"`
  to `loadPaths` + bare imports (mirrored in `.storybook/main.ts`).
- `tsconfig.app.json` extends the renamed `@vue/tsconfig/tsconfig.dom.json`.
  Added `ignoreDeprecations: "6.0"` for `baseUrl` / `moduleResolution: "node"`.
- `verbatimModuleSyntax` left disabled in the app tsconfig to avoid mass type-only
  import refactors.

### [5.16.1](https://github.com/creshpay/cresh-ui/compare/v5.16.0...v5.16.1) (2023-12-14)


### Bug Fixes

* build typings path ([#181](https://github.com/creshpay/cresh-ui/issues/181)) ([db23566](https://github.com/creshpay/cresh-ui/commit/db23566ef83992f7f738b8b0e2ebfb89d299c572))

## [5.16.0](https://github.com/creshpay/cresh-ui/compare/v5.15.0...v5.16.0) (2023-12-13)


### Features

* setup unit testings ([#161](https://github.com/creshpay/cresh-ui/issues/161)) ([3b91e30](https://github.com/creshpay/cresh-ui/commit/3b91e30d4f4bffb7c4b831859d61cc2af5f1a808))

## [5.15.0](https://github.com/creshpay/cresh-ui/compare/v5.14.2...v5.15.0) (2023-12-08)


### Features

* improve typings exports ([fdaddac](https://github.com/creshpay/cresh-ui/commit/fdaddacc7d34461d185c788e0ab69ac44072e362))


### Bug Fixes

* missing click event ([a9837e6](https://github.com/creshpay/cresh-ui/commit/a9837e61211ddb2d426081a76efae92a5ba4dec1))
* wrong color format ([a4e09b7](https://github.com/creshpay/cresh-ui/commit/a4e09b71672ee7581711bdf39a761bbed8801b17))

### [5.14.2](https://github.com/creshpay/cresh-ui/compare/v5.14.1...v5.14.2) (2023-11-09)


### Bug Fixes

* success icon color missing ([#173](https://github.com/creshpay/cresh-ui/issues/173)) ([b0791a2](https://github.com/creshpay/cresh-ui/commit/b0791a28102c05b8a5165cde71776fefa6963bcb))

### [5.14.1](https://github.com/creshpay/cresh-ui/compare/v5.14.0...v5.14.1) (2023-11-07)


### Bug Fixes

* c-select ios display bug ([#171](https://github.com/creshpay/cresh-ui/issues/171)) ([bc63420](https://github.com/creshpay/cresh-ui/commit/bc63420adea1fa44c193cbb98147a4de5f13c81b))

## [5.14.0](https://github.com/creshpay/cresh-ui/compare/v5.13.0...v5.14.0) (2023-10-26)


### Features

* add is_draft tag ([#168](https://github.com/creshpay/cresh-ui/issues/168)) ([2f2eec4](https://github.com/creshpay/cresh-ui/commit/2f2eec45ecb450a875b196dbf652229a68274316))

## [5.13.0](https://github.com/creshpay/cresh-ui/compare/v5.12.0...v5.13.0) (2023-10-18)


### Features

* center footer button & make doc page ([#162](https://github.com/creshpay/cresh-ui/issues/162)) ([e48c85a](https://github.com/creshpay/cresh-ui/commit/e48c85a400a1f6c10d0b38186b980b0cde5c4e10))

## [5.12.0](https://github.com/creshpay/cresh-ui/compare/v5.11.0...v5.12.0) (2023-08-10)


### Features

* setup camel/snake cases converter ([#157](https://github.com/creshpay/cresh-ui/issues/157)) ([b8efdcc](https://github.com/creshpay/cresh-ui/commit/b8efdcc67eb6ccd7e48ab63dffe5c158d3c82637))


### Bug Fixes

* datatable overflow ([#158](https://github.com/creshpay/cresh-ui/issues/158)) ([c10e53b](https://github.com/creshpay/cresh-ui/commit/c10e53b45a9640c6fc023130fe8de32167bd3bb7))

## [5.11.0](https://github.com/creshpay/cresh-ui/compare/v5.10.0...v5.11.0) (2023-07-24)


### Features

* remove vee-validate ([#154](https://github.com/creshpay/cresh-ui/issues/154)) ([b8c496a](https://github.com/creshpay/cresh-ui/commit/b8c496a67a242364a86c56b93cc0f5e77ce32c37))

## [5.10.0](https://github.com/creshpay/cresh-ui/compare/v5.9.2...v5.10.0) (2023-07-18)


### Features

* add yup helper ([#152](https://github.com/creshpay/cresh-ui/issues/152)) ([e2e64e5](https://github.com/creshpay/cresh-ui/commit/e2e64e5d095be2243cbb7aa576243f66f29070e8))

### [5.9.2](https://github.com/creshpay/cresh-ui/compare/v5.9.1...v5.9.2) (2023-06-27)

### [5.9.1](https://github.com/creshpay/cresh-ui/compare/v5.9.0...v5.9.1) (2023-06-15)

## [5.9.0](https://github.com/creshpay/cresh-ui/compare/v5.8.1...v5.9.0) (2023-06-12)


### Features

* add markers on slider ([#144](https://github.com/creshpay/cresh-ui/issues/144)) ([7d5a1bd](https://github.com/creshpay/cresh-ui/commit/7d5a1bd04df8c5f8d8653b27759631ebc867c43d))

### [5.8.1](https://github.com/creshpay/cresh-ui/compare/v5.8.0...v5.8.1) (2023-05-24)

## [5.8.0](https://github.com/creshpay/cresh-ui/compare/v5.7.1...v5.8.0) (2023-05-23)


### Features

* default opened accordion ([#136](https://github.com/creshpay/cresh-ui/issues/136)) ([a0c69ba](https://github.com/creshpay/cresh-ui/commit/a0c69ba7b54565018ab85a17ff7c519069b880cb))

### [5.7.1](https://github.com/creshpay/cresh-ui/compare/v5.7.0...v5.7.1) (2023-05-23)

## [5.7.0](https://github.com/creshpay/cresh-ui/compare/v5.6.2...v5.7.0) (2023-05-10)


### Features

* add c-file-input component ([#133](https://github.com/creshpay/cresh-ui/issues/133)) ([84cdb7f](https://github.com/creshpay/cresh-ui/commit/84cdb7fa6533ddd02722e6ab5d44b681c9618148))


### Bug Fixes

* checkbox css & document item tooltip ([#132](https://github.com/creshpay/cresh-ui/issues/132)) ([ac0f937](https://github.com/creshpay/cresh-ui/commit/ac0f9379c9e891e114c9b9eaf224d65903e4a5af))

### [5.6.2](https://github.com/creshpay/cresh-ui/compare/v5.6.1...v5.6.2) (2023-04-21)

### [5.6.1](https://github.com/creshpay/cresh-ui/compare/v5.6.0...v5.6.1) (2023-04-20)


### Bug Fixes

* c-tabs with if conditions ([#128](https://github.com/creshpay/cresh-ui/issues/128)) ([95108a5](https://github.com/creshpay/cresh-ui/commit/95108a537c07572fd054b61cd40f08464ff6c5ed))
* min/max slots ([#127](https://github.com/creshpay/cresh-ui/issues/127)) ([09432e1](https://github.com/creshpay/cresh-ui/commit/09432e136ff2afcfb4df45ceece31010b56f00f3))

## [5.6.0](https://github.com/creshpay/cresh-ui/compare/v5.5.3...v5.6.0) (2023-04-13)


### Features

* add objects compare helpers ([#124](https://github.com/creshpay/cresh-ui/issues/124)) ([473c38e](https://github.com/creshpay/cresh-ui/commit/473c38eeba995cd2ee79841a9bda64c51ffd1acf))


### Bug Fixes

* document item tooltips ([#123](https://github.com/creshpay/cresh-ui/issues/123)) ([41ffa5a](https://github.com/creshpay/cresh-ui/commit/41ffa5a6bede72c2c195cea1fa5845aeffe38e9c))

### [5.5.3](https://github.com/creshpay/cresh-ui/compare/v5.5.2...v5.5.3) (2023-03-22)

### [5.5.2](https://github.com/creshpay/cresh-ui/compare/v5.5.1...v5.5.2) (2023-03-20)


### Bug Fixes

* allow boolean & number type to CInput ([#114](https://github.com/creshpay/cresh-ui/issues/114)) ([f667755](https://github.com/creshpay/cresh-ui/commit/f667755f7cca3fd5918ee49e23346829d9f62c11))
* loading when outlined and with prefix && add button page ([#117](https://github.com/creshpay/cresh-ui/issues/117)) ([a80845a](https://github.com/creshpay/cresh-ui/commit/a80845a8436616f7783e6caaf6d662c828051ebf))
* missing c-step name in display ([#108](https://github.com/creshpay/cresh-ui/issues/108)) ([3a539da](https://github.com/creshpay/cresh-ui/commit/3a539da50ce3c2b5cf06de0ebfbfaa230f386279))
* set stpper index optional ([#113](https://github.com/creshpay/cresh-ui/issues/113)) ([57f6fce](https://github.com/creshpay/cresh-ui/commit/57f6fcef14ab3ef42a1dcbea55257efdbe5b6f64))

### [5.5.1](https://github.com/creshpay/cresh-ui/compare/v5.5.0...v5.5.1) (2023-03-02)


### Bug Fixes

* add left margin for sorting icon ([c4726b8](https://github.com/creshpay/cresh-ui/commit/c4726b8496595f44f9f4a45bb4b5adb3387d1897))
* c-datatable missing initial sorting ([4da67e4](https://github.com/creshpay/cresh-ui/commit/4da67e454a2ae9bacb66c3ee40a7cedcdefee9a3))

## [5.5.0](https://github.com/creshpay/cresh-ui/compare/v5.4.1...v5.5.0) (2023-03-02)


### Features

* add CVerticalStepperAlt ([#107](https://github.com/creshpay/cresh-ui/issues/107)) ([c29ab06](https://github.com/creshpay/cresh-ui/commit/c29ab068b36d1e58c5e629a6e4d963969cfc87a6))
* allow custom itemes per page in datatable ([#106](https://github.com/creshpay/cresh-ui/issues/106)) ([1990b75](https://github.com/creshpay/cresh-ui/commit/1990b75041e1b2d488ca073a036f7c9e33b0f452))

### [5.4.1](https://github.com/creshpay/cresh-ui/compare/v5.4.0...v5.4.1) (2023-02-06)


### Bug Fixes

* array validation && make Dropdown page ([#97](https://github.com/creshpay/cresh-ui/issues/97)) ([3189f63](https://github.com/creshpay/cresh-ui/commit/3189f63bc7612bfaaa25c36d494e2d2e079c96ad))
* clear all notifs ([#103](https://github.com/creshpay/cresh-ui/issues/103)) ([0d57bbd](https://github.com/creshpay/cresh-ui/commit/0d57bbdc4f4b96a73f71626c36708e319fab2563))
* update chart data ([#100](https://github.com/creshpay/cresh-ui/issues/100)) ([1216b81](https://github.com/creshpay/cresh-ui/commit/1216b81512fbdc3490e16e1073033175e2ecc03c))

## [5.4.0](https://github.com/creshpay/cresh-ui/compare/v5.3.0...v5.4.0) (2023-01-10)


### Features

* add money-hand-fill and dev-portal icons & refactor circle icons ([#87](https://github.com/creshpay/cresh-ui/issues/87)) ([b1ed179](https://github.com/creshpay/cresh-ui/commit/b1ed179d4e60fd34dafc8707162fcb959d47be9d))
* add slider component ([#69](https://github.com/creshpay/cresh-ui/issues/69)) ([a89d7c6](https://github.com/creshpay/cresh-ui/commit/a89d7c629a70ab4daff00d1ef5da377a5bf81bc5))


### Bug Fixes

* translations ([#91](https://github.com/creshpay/cresh-ui/issues/91)) ([b17776a](https://github.com/creshpay/cresh-ui/commit/b17776ab0cb7316931d023c4ce6d3f189627eb08)), closes [#92](https://github.com/creshpay/cresh-ui/issues/92) [#93](https://github.com/creshpay/cresh-ui/issues/93)

## [5.3.0](https://github.com/creshpay/cresh-ui/compare/v5.2.0...v5.3.0) (2022-12-20)


### Features

* add ressource icon ([#66](https://github.com/creshpay/cresh-ui/issues/66)) ([a85b16c](https://github.com/creshpay/cresh-ui/commit/a85b16c0f7ae14ca3b9e43a6bf71dd34fad077ea))


### Bug Fixes

* modal height ([#61](https://github.com/creshpay/cresh-ui/issues/61)) ([44df40b](https://github.com/creshpay/cresh-ui/commit/44df40b2828aac2ac0fee29480797698bd79ccff))
* stroke width ([#73](https://github.com/creshpay/cresh-ui/issues/73)) ([7b698d9](https://github.com/creshpay/cresh-ui/commit/7b698d910afe08731ef79ff57a6042995949f184))
* translations ([#75](https://github.com/creshpay/cresh-ui/issues/75)) ([1615f83](https://github.com/creshpay/cresh-ui/commit/1615f835f39e84bd0332a3c6b353e470dcc142ad))

## [5.2.0](https://github.com/creshpay/cresh-ui/compare/v5.1.1...v5.2.0) (2022-10-28)


### Features

* add tooltip directive ([76bd0e3](https://github.com/creshpay/cresh-ui/commit/76bd0e34e01fc62175b3e4dc370c6422a8cf7af8))
* use vue-router and multiples fixes ([0a6097a](https://github.com/creshpay/cresh-ui/commit/0a6097a9860044f6e6df87765c848983e4eef781))


### Bug Fixes

* add width on label ([#46](https://github.com/creshpay/cresh-ui/issues/46)) ([e45a4fb](https://github.com/creshpay/cresh-ui/commit/e45a4fb7f178d60fdbcabacbc1b5cd44a33e079c))
* allow v-for in c-tabs ([#48](https://github.com/creshpay/cresh-ui/issues/48)) ([3735966](https://github.com/creshpay/cresh-ui/commit/3735966361c5df11d8134b57e7848ca54ebebe3c))
* remove switch border ([#57](https://github.com/creshpay/cresh-ui/issues/57)) ([6841b95](https://github.com/creshpay/cresh-ui/commit/6841b957987dfb94a3eb0fb6e6e7a89e377e950c))
* typo snippet ([ba0e92b](https://github.com/creshpay/cresh-ui/commit/ba0e92b6cd3a0e7d9b4524af802445dfdb4cec05))

### [5.1.1](https://github.com/creshpay/cresh-ui/compare/v5.1.0...v5.1.1) (2022-09-29)


### Bug Fixes

* missing class on FAQs icons and stroke problem on refresh icon ([#40](https://github.com/creshpay/cresh-ui/issues/40)) ([9f6230f](https://github.com/creshpay/cresh-ui/commit/9f6230f439caecf3ca4992326a11644d95ca3f6e))

## [5.1.0](https://github.com/creshpay/cresh-ui/compare/v5.0.0...v5.1.0) (2022-09-29)


### Features

* add accordion component ([e14baed](https://github.com/creshpay/cresh-ui/commit/e14baed968304ffa63f7614e219c42ca2cdb2477))
* switch button ([a6de9ca](https://github.com/creshpay/cresh-ui/commit/a6de9caddd202de9ddf616c03a8c71249ad78ff9))


### Bug Fixes

* add index.d.ts in .gitignore ([fc5b056](https://github.com/creshpay/cresh-ui/commit/fc5b05628828b11a8ca9e274a3bed8882acf477b))
* after review ([60a71e9](https://github.com/creshpay/cresh-ui/commit/60a71e96961fc9291fa1729d991c7f36b32c81be))
* after review ([723129a](https://github.com/creshpay/cresh-ui/commit/723129a7fcf1ae7fed274c95a9db6a5aba9aeb0c))
* cursor pointer only on title ([13edaad](https://github.com/creshpay/cresh-ui/commit/13edaad241f81f1eb69ba3e400072a62e4dba47c))
* define scss lang ([612c006](https://github.com/creshpay/cresh-ui/commit/612c006ce961d88ccbf001b90ef98924a8a22a21))
* include *.d.ts for typing ([9c929e5](https://github.com/creshpay/cresh-ui/commit/9c929e567e5c735d6be293a08f1dbb3ec91fbd97))
* snippet format and remove useless scss ([3e61cff](https://github.com/creshpay/cresh-ui/commit/3e61cffa2882d77848d59a2feb0827499e197569))

## [5.0.0](https://github.com/creshpay/cresh-ui/compare/v3.3.0...v5.0.0) (2022-09-01)


### Features

* add component c-code ([566bf86](https://github.com/creshpay/cresh-ui/commit/566bf860058d19fc24e69ed005f57543755f92b1))
* setup with config parameters ([e815f33](https://github.com/creshpay/cresh-ui/commit/e815f33a78c962a3414a5cfbf0221d7d8ffc1515))


### Bug Fixes

* check-circle icon color ([4c184d4](https://github.com/creshpay/cresh-ui/commit/4c184d46f9d74d7177ba25c3e8b9ed72c246a5c7))
* enforce css variables ([357e916](https://github.com/creshpay/cresh-ui/commit/357e916891478e52c52bf397e0b87ad3f8458f72))
* typo ---color-tertiary ([e73a511](https://github.com/creshpay/cresh-ui/commit/e73a511a46af8a44925665eddc724db32b8e0cd2))
* use colors variables in c-steppers ([996045b](https://github.com/creshpay/cresh-ui/commit/996045ba6817e52411e46034b204e27f94d94c30))

## [5.0.0-rc.2](https://github.com/creshpay/cresh-ui/compare/v5.0.0-rc.1...v5.0.0-rc.2) (2022-06-09)

## [5.0.0-rc.1](https://github.com/creshpay/cresh-ui/compare/v5.0.0-rc.0...v5.0.0-rc.1) (2022-06-09)


### Bug Fixes

* filename typo ([46f7c83](https://github.com/creshpay/cresh-ui/commit/46f7c83dcc2c08d3b1fbe0fa1188ba3a8d111f85))

## [5.0.0-rc.0](https://github.com/creshpay/cresh-ui/compare/v4.0.0-beta.3...v5.0.0-rc.0) (2022-06-09)


### Features

* add faq icon ([8ba471b](https://github.com/creshpay/cresh-ui/commit/8ba471b7800d083351a9162f840144a6084a1f30))
* add shims-vue.d.ts ([11d8951](https://github.com/creshpay/cresh-ui/commit/11d8951db639a3af40dc5878b71d7a177e77306c))
* validate on blur ([4958199](https://github.com/creshpay/cresh-ui/commit/4958199e5fa82b61c8544766629d266b1ed89b71))


### Bug Fixes

* declarations files path ([844770b](https://github.com/creshpay/cresh-ui/commit/844770b554365f0b1ba91372f1d1dd5292bcf01b))
* icon dynamic loading ([351c2f3](https://github.com/creshpay/cresh-ui/commit/351c2f309ab82c89a118c3c939184f9c215744bd))
* remove base control setup ([4534944](https://github.com/creshpay/cresh-ui/commit/45349446457d9625ded10e7acc105b87fe37160e))
* ts check ([ae083a8](https://github.com/creshpay/cresh-ui/commit/ae083a849193e1cd6438990d2f1614d515cc2ad9))
* types checking in build ([c905a9a](https://github.com/creshpay/cresh-ui/commit/c905a9aa8abe2930372a33fa4016a5f0429dcac5))

## [4.0.0-beta.3](https://github.com/creshpay/cresh-ui/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2022-03-23)


### Features

* add component c-code ([b54b527](https://github.com/creshpay/cresh-ui/commit/b54b5272a6b1d62bed22b63a0dc96a82d2adfe36))
* setup with config parameters ([a1b3fc1](https://github.com/creshpay/cresh-ui/commit/a1b3fc1f576ed47c72f13f4c1585476effd52da5))

## [4.0.0-beta.2](https://github.com/creshpay/cresh-ui/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-03-23)


### Bug Fixes

* check-circle icon color ([e3d51f0](https://github.com/creshpay/cresh-ui/commit/e3d51f01b88933b67e29ea2c5d9fa63703dc6206))

## [4.0.0-beta.1](https://github.com/creshpay/cresh-ui/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-03-17)


### Bug Fixes

* enforce css variables ([fe80060](https://github.com/creshpay/cresh-ui/commit/fe800605dc363cca20ccc864bd61da1458db8885))

## [4.0.0-beta.0](https://github.com/creshpay/cresh-ui/compare/v3.3.0...v4.0.0-beta.0) (2022-03-16)


### Bug Fixes

* use colors variables in c-steppers ([ceb48a4](https://github.com/creshpay/cresh-ui/commit/ceb48a40163f27321f58d4efd4f354950f29c3ca))

## [3.3.0](https://github.com/creshpay/cresh-ui/compare/v3.2.1...v3.3.0) (2022-01-26)


### Features

* c-alert alternative style ([#3](https://github.com/creshpay/cresh-ui/issues/3)) ([eaaaa29](https://github.com/creshpay/cresh-ui/commit/eaaaa29e5c226520ea69072d62dd06758c0d1dfa))
* provide index in datatable ([55e9acb](https://github.com/creshpay/cresh-ui/commit/55e9acbdb7066e59322948c11be436a405a9808e))


### Bug Fixes

* icons base sizes ([0b7edfe](https://github.com/creshpay/cresh-ui/commit/0b7edfec2d388b4bdffa513e1af14b7c3585c3ae))

### [3.2.1](https://github.com/creshpay/cresh-ui/compare/v3.2.0...v3.2.1) (2021-11-08)


### Bug Fixes

* change name-string rule ([076070b](https://github.com/creshpay/cresh-ui/commit/076070b681bfefe8e2f157beb164264a6be16d76))

## [3.2.0](https://github.com/creshpay/cresh-ui/compare/v3.2.0-rc.3...v3.2.0) (2021-10-13)


### Features

* add c-divider ui component ([eace9d9](https://github.com/creshpay/cresh-ui/commit/eace9d98414e96ab07a6893bee9eef74304dcc59))
* add c-drawer-collapsible ([8925332](https://github.com/creshpay/cresh-ui/commit/892533264cb6a4dbb7b8836561252560abaf109e))
* add c-file-input ([2a863e6](https://github.com/creshpay/cresh-ui/commit/2a863e6ed376a611167413f6059c8b6777204d2c))
* add code-snippet component for website ([178ff97](https://github.com/creshpay/cresh-ui/commit/178ff979b8817244084ce28f02681416e8204cd3))
* add hat icon ([7e7b064](https://github.com/creshpay/cresh-ui/commit/7e7b0641193ebaacd7c0d82275dd4d787ce835c5))
* set default style for website ([88977e4](https://github.com/creshpay/cresh-ui/commit/88977e4507f5b2e51fc6db55cf43788a2eb302b1))
* update charts examples ([c899956](https://github.com/creshpay/cresh-ui/commit/c899956056ecb227ca2e81e3a54132039ace7253))
* update form controls code snippets ([ffcc963](https://github.com/creshpay/cresh-ui/commit/ffcc9633bc9fb1e16d87a9d03c54c4f45a8287c0))
* upgrade chartjs v2 to v3 ([10497f3](https://github.com/creshpay/cresh-ui/commit/10497f3848f7fc5258684122697946a01e637842))


### Bug Fixes

* c-datatable lite empty data style ([f99879d](https://github.com/creshpay/cresh-ui/commit/f99879d1bb0c76c2960b1818c8dadf114b743289))
* default values for form control ([0f59c11](https://github.com/creshpay/cresh-ui/commit/0f59c1130432975e795fd7841336cb42f2f39bc7))

## [3.2.0-rc.3](https://gitlab.com/cresh.io/cresh-ui/compare/v3.2.0-rc.2...v3.2.0-rc.3) (2021-07-26)


### Features

* allow custom options in c-select ([0cf9122](https://gitlab.com/cresh.io/cresh-ui/commit/0cf9122541c8c0897a6a2222d5ffde0538734109))

## [3.2.0-rc.2](https://gitlab.com/cresh.io/cresh-ui/compare/v3.2.0-rc.1...v3.2.0-rc.2) (2021-07-19)


### Features

* add phone-number rule ([ddfd93c](https://gitlab.com/cresh.io/cresh-ui/commit/ddfd93c0e90715f327ac792f49f64aaf9d8835a9))


### Bug Fixes

* debounce c-datatable page change ([2dca127](https://gitlab.com/cresh.io/cresh-ui/commit/2dca1272feef598b834d2b096c7028f19b3cbe49))

## [3.2.0-rc.1](https://gitlab.com/cresh.io/cresh-ui/compare/v3.2.0-rc.0...v3.2.0-rc.1) (2021-06-30)


### Features

* add default c-datatable hover color ([386556a](https://gitlab.com/cresh.io/cresh-ui/commit/386556ac81fb6213fe9bd7c0c91803c3d2c6063d))
* highlight c-daterange dates ([4a894ca](https://gitlab.com/cresh.io/cresh-ui/commit/4a894ca0c1c76478477ff75b8ef6928a34c6f340))
* improve c-datatable ([5b151c6](https://gitlab.com/cresh.io/cresh-ui/commit/5b151c678e2424eec354328cc5f9095ffbec5757))

## [3.2.0-rc.0](https://gitlab.com/cresh.io/cresh-ui/compare/v3.1.1...v3.2.0-rc.0) (2021-06-11)


### Features

* c-date-picker ([abeca40](https://gitlab.com/cresh.io/cresh-ui/commit/abeca4049e3dccfc12a7774268ef9a55ff87c9b5))
* date-range-picker ([1dc7387](https://gitlab.com/cresh.io/cresh-ui/commit/1dc73871d8874d5a0cff93245a36894883638dd6))

### [3.1.1](https://gitlab.com/cresh.io/cresh-ui/compare/v3.1.0...v3.1.1) (2021-06-09)


### Bug Fixes

* build type relative path ([ce5cace](https://gitlab.com/cresh.io/cresh-ui/commit/ce5cace396a4d4a3f4791c02cf830e6eaf327734))

## [3.1.0](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.1...v3.1.0) (2021-06-08)


### Features

* add c-progress-bar ([7ea7454](https://gitlab.com/cresh.io/cresh-ui/commit/7ea7454efa79a5bfcd3c5fccc2d129b5e4824636))
* add select placeholder ([405c1f6](https://gitlab.com/cresh.io/cresh-ui/commit/405c1f64dd74df878b42a725c971856f3c9c10ca))
* allow form controls custom error message ([76edcb5](https://gitlab.com/cresh.io/cresh-ui/commit/76edcb542a927a856f8116673c8cff220d1115ef))


### Bug Fixes

* accept more types for c-radio ([972b178](https://gitlab.com/cresh.io/cresh-ui/commit/972b178d3f9b3b31b3c15e38b54741cd7949431c))

### [3.0.1](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0...v3.0.1) (2021-06-02)


### Bug Fixes

* c-notify styles ([360809a](https://gitlab.com/cresh.io/cresh-ui/commit/360809a624a8e9a0463f34a898287b56068c96e7))

## [3.0.0](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.6...v3.0.0) (2021-05-24)


### Bug Fixes

* update c-notify styles ([ad3d460](https://gitlab.com/cresh.io/cresh-ui/commit/ad3d4601d074c64d4f39273058ca96f749c1f600))

## [3.0.0-rc.6](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.5...v3.0.0-rc.6) (2021-05-24)


### Features

* add c-empty ([19be076](https://gitlab.com/cresh.io/cresh-ui/commit/19be0763bc301f4e2aa239d2bfc4dff1427eb40d))
* add c-notify plugin ([965f66f](https://gitlab.com/cresh.io/cresh-ui/commit/965f66f1ec1781b05a40da0b544e5562d3772f6d))


### Bug Fixes

* remove title of icons ([eb1585f](https://gitlab.com/cresh.io/cresh-ui/commit/eb1585f18924e5f98ffb1421cd545db3a3989491))

## [3.0.0-rc.5](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.4...v3.0.0-rc.5) (2021-05-18)


### Features

* update components ([6238317](https://gitlab.com/cresh.io/cresh-ui/commit/6238317f25cad531a46a7663394a8fc89c55ebe5))

## [3.0.0-rc.4](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.3...v3.0.0-rc.4) (2021-04-30)

## [3.0.0-rc.3](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.2...v3.0.0-rc.3) (2021-04-22)


### Features

* add new icons ([dc99ca7](https://gitlab.com/cresh.io/cresh-ui/commit/dc99ca7a78a231284a49597c551bff931be2a321))
* update c-dropdown pre-selected-item ([eb2514d](https://gitlab.com/cresh.io/cresh-ui/commit/eb2514da29911969c9c6223f27edcbe78bb1325e))

## [3.0.0-rc.2](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.1...v3.0.0-rc.2) (2021-04-15)


### Features

* update c-dropdown ([22729ed](https://gitlab.com/cresh.io/cresh-ui/commit/22729edf49a0b5c8fdf65f5c4f684492fe9942f6))

## [3.0.0-rc.1](https://gitlab.com/cresh.io/cresh-ui/compare/v3.0.0-rc.0...v3.0.0-rc.1) (2021-04-15)


### Bug Fixes

* icons/CheckboxIcon renaming ([91eb27c](https://gitlab.com/cresh.io/cresh-ui/commit/91eb27cff8c4a1ec029090737c245dc09c347a22))

## [3.0.0-rc.0](https://gitlab.com/cresh.io/cresh-ui/compare/v2.0.0...v3.0.0-rc.0) (2021-04-14)


### Features

* add c-datatable lite style ([138ffc1](https://gitlab.com/cresh.io/cresh-ui/commit/138ffc173f5de567addcb6f28a324f5038253efb))
* add c-menu ([956f7d3](https://gitlab.com/cresh.io/cresh-ui/commit/956f7d31c451314fb0b06251f61d05ac2b113e48))
* add c-vertical-stepper ([cd6db77](https://gitlab.com/cresh.io/cresh-ui/commit/cd6db77f54320a70e9a7c7da7089902cd4741c57))
* update c-steps ([53156d2](https://gitlab.com/cresh.io/cresh-ui/commit/53156d27cf7a66e079322dccb94ba511a871bb72))
* update icons ([e9f5f15](https://gitlab.com/cresh.io/cresh-ui/commit/e9f5f15dc047f50c46aaa8db797540611eda33cd))

## [2.0.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.17...v2.0.0) (2021-04-12)


### Features

* disabled radio/checkbox ([53ade7d](https://gitlab.com/cresh.io/cresh-ui/commit/53ade7d04239a7c20bdcd7af6c158a8ac6c3dcb1))


### Bug Fixes

* datatable total page size ([5492fc9](https://gitlab.com/cresh.io/cresh-ui/commit/5492fc9b408535c5c78057e684f4a23a658e3017))

## [1.4.0-rc.17](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.16...v1.4.0-rc.17) (2021-04-01)


### Bug Fixes

* remove console.log ([d81e649](https://gitlab.com/cresh.io/cresh-ui/commit/d81e649d706b0d2f7aea9d9ea8cf9de8ae7c075c))

## [1.4.0-rc.16](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.15...v1.4.0-rc.16) (2021-04-01)


### Features

* add c-radio ([dcf9658](https://gitlab.com/cresh.io/cresh-ui/commit/dcf9658286737a94fc5e395bd834cf4870391ed2))
* update c-alerts ([6bd0fc0](https://gitlab.com/cresh.io/cresh-ui/commit/6bd0fc05ee33fb383b65a8e90b430cb41460ecbb))
* update c-checkbox ([500d916](https://gitlab.com/cresh.io/cresh-ui/commit/500d91649a95ab62178b2717930180f1e2e0a200))

## [1.4.0-rc.15](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.14...v1.4.0-rc.15) (2021-03-29)

## [1.4.0-rc.14](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.13...v1.4.0-rc.14) (2021-03-26)


### Features

* add c-input prefix/suffix icons ([d884c11](https://gitlab.com/cresh.io/cresh-ui/commit/d884c115f41e9b4767d78566c152c3c6ed8b6f49))


### Bug Fixes

* translation typo ([1330b15](https://gitlab.com/cresh.io/cresh-ui/commit/1330b1541c5790ac7970a25fc6c1cdd703bb900d))

## [1.4.0-rc.13](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.12...v1.4.0-rc.13) (2021-03-18)


### Features

* add c-datatable row click ([c332d22](https://gitlab.com/cresh.io/cresh-ui/commit/c332d22dbcc053f57da6aaa701fbe2487fb5e247))

## [1.4.0-rc.12](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.11...v1.4.0-rc.12) (2021-03-18)


### Features

* update c-datatable header sort-by ([665da92](https://gitlab.com/cresh.io/cresh-ui/commit/665da92f91305749828a3dfd202e2f20e3e25f19))


### Bug Fixes

* c-datatable on next/prev page via links ([062a5f2](https://gitlab.com/cresh.io/cresh-ui/commit/062a5f2773c7c7b642b7cd819e787ed33414adf9))
* c-datatable responsive ([c02ea7d](https://gitlab.com/cresh.io/cresh-ui/commit/c02ea7da725e690a2017945053cb47c781cbe5f0))

## [1.4.0-rc.11](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.10...v1.4.0-rc.11) (2021-03-17)


### Bug Fixes

* c-datatable slots check ([88aedd6](https://gitlab.com/cresh.io/cresh-ui/commit/88aedd6d388ddd7b32cdbcdc85bab2b195c347a4))

## [1.4.0-rc.10](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.9...v1.4.0-rc.10) (2021-03-17)


### Features

* update c-datatable ([a0e9f78](https://gitlab.com/cresh.io/cresh-ui/commit/a0e9f78182b8155b5235043a4656dac34cc09d3d))

## [1.4.0-rc.9](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.8...v1.4.0-rc.9) (2021-03-17)


### Features

* add c-datatable ([72a27b1](https://gitlab.com/cresh.io/cresh-ui/commit/72a27b14d1e6da511500936e27257a0f19d330ac))
* add datatables page demo ([a23d984](https://gitlab.com/cresh.io/cresh-ui/commit/a23d984f29f44da790d4514727560272215703c7))
* add table icon ([516a3f9](https://gitlab.com/cresh.io/cresh-ui/commit/516a3f95434c6b84ecc7f074426d190b227f4873))
* update button text style ([bc3018c](https://gitlab.com/cresh.io/cresh-ui/commit/bc3018c641ccf0214dbdf86f31365e543e65c630))


### Bug Fixes

* arrow icons ([2ffa61a](https://gitlab.com/cresh.io/cresh-ui/commit/2ffa61ac043fa8cb4330bb477a87171f40bc754b))
* typos ([7ac8b38](https://gitlab.com/cresh.io/cresh-ui/commit/7ac8b385bbe519142f535797db91b4e1d156b115))

## [1.4.0-rc.8](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.7...v1.4.0-rc.8) (2021-03-05)


### Features

* add chart mixin class ([2be4b81](https://gitlab.com/cresh.io/cresh-ui/commit/2be4b81afa5ebc187e7b9ebb9baeb429e35915ec))

## [1.4.0-rc.7](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.6...v1.4.0-rc.7) (2021-03-01)


### Features

* add new input validation rules ([b5494a3](https://gitlab.com/cresh.io/cresh-ui/commit/b5494a356d1de8b2c889e70ffc9d161240d1210d))

## [1.4.0-rc.6](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.5...v1.4.0-rc.6) (2021-03-01)


### Features

* add sanitize helper ([39bc79d](https://gitlab.com/cresh.io/cresh-ui/commit/39bc79da6d2367f42c779b901532c65ab8ced05f))
* sanitize string base inputs ([079c45b](https://gitlab.com/cresh.io/cresh-ui/commit/079c45bb3c87d75086ef85f60edc48139151feb3))
* update c-checkbox ([214c057](https://gitlab.com/cresh.io/cresh-ui/commit/214c057bda4dd3d603ce58798e1c2014b93426b6))

## [1.4.0-rc.5](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.4...v1.4.0-rc.5) (2021-02-08)


### Features

* add eye icon ([484378c](https://gitlab.com/cresh.io/cresh-ui/commit/484378c384e48f6e8e7a97dc33e51dd97d9c41f6))

## [1.4.0-rc.4](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.3...v1.4.0-rc.4) (2021-02-04)


### Features

* add new scss variables ([2466ef8](https://gitlab.com/cresh.io/cresh-ui/commit/2466ef892b73fca80ac45ba1a77a5d7844f7adf9))
* update drawer ([1be66c8](https://gitlab.com/cresh.io/cresh-ui/commit/1be66c8ee30910a03f837e226336fe8f61279d22))
* update icons ([2e3009b](https://gitlab.com/cresh.io/cresh-ui/commit/2e3009b85995cd86820778125ea0bf1d8d440090))
* update modal ([ca1c6b4](https://gitlab.com/cresh.io/cresh-ui/commit/ca1c6b4b9b2e1fcee1e3d85408a9e95a843ac5fa))

## [1.4.0-rc.3](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.2...v1.4.0-rc.3) (2021-02-02)


### Features

* add directives ([861a33e](https://gitlab.com/cresh.io/cresh-ui/commit/861a33e1384bb8001f91d2d83350125ae774d3e5))
* add filters ([a8c73ba](https://gitlab.com/cresh.io/cresh-ui/commit/a8c73babb7df7c0425bd35a83946596173d04c40))
* add location icon ([4e04277](https://gitlab.com/cresh.io/cresh-ui/commit/4e042775a55f89212844cbccc8c3a2faaaa45bba))

## [1.4.0-rc.2](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.1...v1.4.0-rc.2) (2021-01-22)


### Features

* add date validation rule ([caeb68f](https://gitlab.com/cresh.io/cresh-ui/commit/caeb68f0c6a8b6621f4c014508c106c7fbd6775e))


### Bug Fixes

* use uuid as id ([36d214e](https://gitlab.com/cresh.io/cresh-ui/commit/36d214ed5a541f47f487955b6264af1a9ddb220b))

## [1.4.0-rc.1](https://gitlab.com/cresh.io/cresh-ui/compare/v1.4.0-rc.0...v1.4.0-rc.1) (2021-01-21)


### Features

* update vee-validate setup ([3e5716c](https://gitlab.com/cresh.io/cresh-ui/commit/3e5716c824fac5d5d89717d35d3fae23e43991b7))

## [1.4.0-rc.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.3.0...v1.4.0-rc.0) (2021-01-14)


### Features

* initialize charts components ([cd32847](https://gitlab.com/cresh.io/cresh-ui/commit/cd32847adbfa9b1685b57708a332c24391679046))

## [1.3.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.3.0-rc.3...v1.3.0) (2021-01-12)


### Features

* add steps ([db1103d](https://gitlab.com/cresh.io/cresh-ui/commit/db1103d4603150a01adb344e3d02d6b977e43584))
* resolve dropdown position ([b356c2f](https://gitlab.com/cresh.io/cresh-ui/commit/b356c2f3f1b49c112f1bf94eb4e542903f2c04c6))
* update dropdown ([f9e3aa7](https://gitlab.com/cresh.io/cresh-ui/commit/f9e3aa7c426cdf2807e2ed13bdb4d2db26b853c8))

## [1.3.0-rc.3](https://gitlab.com/cresh.io/cresh-ui/compare/v1.3.0-rc.2...v1.3.0-rc.3) (2020-12-22)


### Bug Fixes

* selected tab index ([cf411e0](https://gitlab.com/cresh.io/cresh-ui/commit/cf411e0d28f6851a337ce8e17a40f0b72ecfc160))

## [1.3.0-rc.2](https://gitlab.com/cresh.io/cresh-ui/compare/v1.3.0-rc.1...v1.3.0-rc.2) (2020-12-22)


### Bug Fixes

* c-tabs pre-selected index ([14f35b1](https://gitlab.com/cresh.io/cresh-ui/commit/14f35b1d51ffb03b2b63bcd4509deb1a5e23077e))
* initial datetime input value ([7dcc447](https://gitlab.com/cresh.io/cresh-ui/commit/7dcc44739e1ac668d81b72c8a89c2f276748a9f7))
* input number blur ([2483d9c](https://gitlab.com/cresh.io/cresh-ui/commit/2483d9c8802f0d944e8b1d5d7a22be0aeeefe1ab))

## [1.3.0-rc.1](https://gitlab.com/cresh.io/cresh-ui/compare/v1.3.0-rc.0...v1.3.0-rc.1) (2020-12-17)


### Bug Fixes

* input number ([5ce5c24](https://gitlab.com/cresh.io/cresh-ui/commit/5ce5c24f7e4819882bfeaadc85764aae2435c07a))

## [1.3.0-rc.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0...v1.3.0-rc.0) (2020-12-14)


### Features

* add document site router ([3bbb0a1](https://gitlab.com/cresh.io/cresh-ui/commit/3bbb0a15f814ca638228018bf377a2b6195bf80f))
* add documents page ([3add1f5](https://gitlab.com/cresh.io/cresh-ui/commit/3add1f5045a7b19ec3a4fa508f51c1118a949308))
* update ui components ([8bd57ff](https://gitlab.com/cresh.io/cresh-ui/commit/8bd57ff85746a1b49ebe4ed9ae74729cb9b9732d))

## [1.2.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.8...v1.2.0) (2020-12-03)

## [1.2.0-rc.8](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.7...v1.2.0-rc.8) (2020-11-24)


### Bug Fixes

* package version ([9275035](https://gitlab.com/cresh.io/cresh-ui/commit/92750354cf024d6697c9996666847f690363d245))

## [1.2.0-rc.7](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.6...v1.2.0-rc.7) (2020-11-24)

## [1.2.0-rc.6](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.5...v1.2.0-rc.6) (2020-11-24)

## [1.2.0-rc.5](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.4...v1.2.0-rc.5) (2020-11-24)


### Features

* add new icons ([dc53d63](https://gitlab.com/cresh.io/cresh-ui/commit/dc53d637464e80de601338a9ed4ed5bdf3069732))


### Bug Fixes

* dropdown list ([1716816](https://gitlab.com/cresh.io/cresh-ui/commit/1716816438b60baf26a7b01f9d2114f29567f5ca))
* dropdown list item ([390f592](https://gitlab.com/cresh.io/cresh-ui/commit/390f592c6d5a8be07151c52bd726fa7bba68c64d))
* update build package ([033b399](https://gitlab.com/cresh.io/cresh-ui/commit/033b3997d48e688be06927c25ba7c19a842d14e1))
* update dropdown style ([043a7fe](https://gitlab.com/cresh.io/cresh-ui/commit/043a7fe4db211d5869bbf63fe937ee98dcb32c6e))

## [1.2.0-rc.4](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.2...v1.2.0-rc.4) (2020-11-23)


### Features

* add rotate flag to icons ([24cf680](https://gitlab.com/cresh.io/cresh-ui/commit/24cf68050edd8951357485574f9765b85d331dfa))
* update button loading ([a1f994e](https://gitlab.com/cresh.io/cresh-ui/commit/a1f994ea9f0759c5cb2b026482413e1303cb6b38))
* update declarations files ([c8de206](https://gitlab.com/cresh.io/cresh-ui/commit/c8de20649491c62fd8061fca31c41f09a4a96267))

## [1.2.0-rc.3](https://gitlab.com/cresh.io/cresh-ui/compare/v1.2.0-rc.2...v1.2.0-rc.3) (2020-11-23)

## [1.2.0-rc.2](https://gitlab.com/cresh.io/cresh-ui/compare/v1.0.0...v1.2.0-rc.2) (2020-11-23)


### Features

* add click-outside directive ([5b8ea4c](https://gitlab.com/cresh.io/cresh-ui/commit/5b8ea4c23656ba0f6706692a9f3776e27d1787ff))
* add currency format filter ([eb1caef](https://gitlab.com/cresh.io/cresh-ui/commit/eb1caeffb8e5d47ecd400e545223a65055494c89))
* add datetime input ([8f04f53](https://gitlab.com/cresh.io/cresh-ui/commit/8f04f534376672bee34ab2efb9127223c8e0f305))
* add exit icon ([f34e044](https://gitlab.com/cresh.io/cresh-ui/commit/f34e0448d541a9682051f7041f85e32b43c777e4))
* add icons ([4e54f4d](https://gitlab.com/cresh.io/cresh-ui/commit/4e54f4d6e0f4383441a94fba224c2f32660a50f2))
* add modal component ([87988e4](https://gitlab.com/cresh.io/cresh-ui/commit/87988e487d38c518eee6be8e79c5aafe5efdc7b8))
* add new icons ([f1d4586](https://gitlab.com/cresh.io/cresh-ui/commit/f1d4586758427e470bb35cb22bb210f78b7bd67f))
* build vue librairy package ([94126bf](https://gitlab.com/cresh.io/cresh-ui/commit/94126bf037ad762b1d6ef9bea516765213c5f1be))
* update [@types](https://gitlab.com/types) definitions ([eff36d8](https://gitlab.com/cresh.io/cresh-ui/commit/eff36d8795ac29a724273072f678df002b10e30b))
* update bordered input styles ([22db2ad](https://gitlab.com/cresh.io/cresh-ui/commit/22db2adae38c5eb9e081d743d39f3e4f871fce18))
* update components examples ([2a4e8cf](https://gitlab.com/cresh.io/cresh-ui/commit/2a4e8cf981cabfe59121cba77317bbe4ae656d8b))
* update form components ([ca31a0b](https://gitlab.com/cresh.io/cresh-ui/commit/ca31a0bad1a57260f68928eae75e81197feec334))
* update form controls ([032d2ec](https://gitlab.com/cresh.io/cresh-ui/commit/032d2ecbdb8ea8254a727a01c12b521ee827eb34))

## [1.1.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.0.0...v1.1.0) (2020-10-07)


### Features

* add currency format filter ([eb1caef](https://gitlab.com/cresh.io/cresh-ui/commit/eb1caeffb8e5d47ecd400e545223a65055494c89))
* add exit icon ([f34e044](https://gitlab.com/cresh.io/cresh-ui/commit/f34e0448d541a9682051f7041f85e32b43c777e4))
* add new icons ([f1d4586](https://gitlab.com/cresh.io/cresh-ui/commit/f1d4586758427e470bb35cb22bb210f78b7bd67f))
* build vue librairy package ([94126bf](https://gitlab.com/cresh.io/cresh-ui/commit/94126bf037ad762b1d6ef9bea516765213c5f1be))
* update bordered input styles ([22db2ad](https://gitlab.com/cresh.io/cresh-ui/commit/22db2adae38c5eb9e081d743d39f3e4f871fce18))
* update form components ([ca31a0b](https://gitlab.com/cresh.io/cresh-ui/commit/ca31a0bad1a57260f68928eae75e81197feec334))

## [1.0.0](https://gitlab.com/cresh.io/cresh-ui/compare/v1.0.0-rc.0...v1.0.0) (2020-09-03)

## 1.0.0-rc.0 (2020-09-02)


### Features

* add alert and spinner common components ([627ac4f](https://gitlab.com/cresh.io/cresh-ui/commit/627ac4fbea8be1e374bba99cd5a82655de8ae5d0))
* add base components ([8bc3602](https://gitlab.com/cresh.io/cresh-ui/commit/8bc360230c9d881c68a208b9729444a45cd8f44c))
* add card component ([9707ddc](https://gitlab.com/cresh.io/cresh-ui/commit/9707ddc21704bc7b01a133f3443313be7c56c444))
* add cookie helper ([4bd04f4](https://gitlab.com/cresh.io/cresh-ui/commit/4bd04f4f6b203bbdeaab3c4f217e74c532a5b4bb))
* add dropdown ui component ([9db9fc4](https://gitlab.com/cresh.io/cresh-ui/commit/9db9fc4e2d18565e933c262e30541a23b856f88b))
* add error message bloc ([a70408a](https://gitlab.com/cresh.io/cresh-ui/commit/a70408a2a1d5f56e3366764b7452917a9b2a07d1))
* add favicon ([38b9887](https://gitlab.com/cresh.io/cresh-ui/commit/38b988763856e138c9f56c64edee2c98a6618f8d))
* add helpers ([a126888](https://gitlab.com/cresh.io/cresh-ui/commit/a1268885b458a00a4c5ae5df99a782c0557f6972))
* add new icons ([4d76ab5](https://gitlab.com/cresh.io/cresh-ui/commit/4d76ab57416c081bb7e6e0cb879b92796e8b375e))
* add select option model ([fbba768](https://gitlab.com/cresh.io/cresh-ui/commit/fbba768e8c3cccccdeef3cf5956156eccd0437b6))
* add tabs component ([0f6fdb5](https://gitlab.com/cresh.io/cresh-ui/commit/0f6fdb51b3268b82b91ca9db41437f13fcf0c938))
* change disabled button opacity ([b8f7ca3](https://gitlab.com/cresh.io/cresh-ui/commit/b8f7ca3d018b374ea0a1a73a960aa7635a7c45fb))
* setup custom icons ([d9350f9](https://gitlab.com/cresh.io/cresh-ui/commit/d9350f9bbf9b4098e0d3cdf71507bc91d3545b02))
* setup project starter ([601152e](https://gitlab.com/cresh.io/cresh-ui/commit/601152e4426ab7b8bd24bcca57e3ba0088537ffd))
* update components ([9ddc446](https://gitlab.com/cresh.io/cresh-ui/commit/9ddc4469d0179c5a14d84b6c7abfe524ddd57186))
* update cookie helper ([75b1101](https://gitlab.com/cresh.io/cresh-ui/commit/75b110120d5404a72f0cad66b86b86cdc8d88dc8))


### Bug Fixes

* **deps:** upgrade vulnerabilities ([2fe5e78](https://gitlab.com/cresh.io/cresh-ui/commit/2fe5e78fb539de99d3ba8a5ba19db2da6f2da1da))
* **deps:** vulnerabilities & upgrade ([b54b61a](https://gitlab.com/cresh.io/cresh-ui/commit/b54b61a7e1fb024bf60b0d5f380282f4f7a7df0f))
* add missing KeyValue model ([5118012](https://gitlab.com/cresh.io/cresh-ui/commit/51180124b23f066fb27807dcdd7971226bda2093))
* eslint errors ([673ce0e](https://gitlab.com/cresh.io/cresh-ui/commit/673ce0e849750470853ba64d404b10b109122fa9))
* import select option model ([85afac5](https://gitlab.com/cresh.io/cresh-ui/commit/85afac585cbc244bed3f05683d97534c8a79099e))
