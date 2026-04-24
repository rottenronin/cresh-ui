# Cresh UI - API Conventions Charter

This document defines consistent API conventions for all Cresh UI components to reduce learning curve and ensure predictable behavior across the library.

## 1. Form Input Components

Components that accept user input should follow Vue 3's v-model pattern.

### Pattern:
- **Prop**: `modelValue` (the current value)
- **Event**: `@update:modelValue` (emitted when value changes)
- **Usage**: `v-model="variable"`

### Components:
- CInput
- CTextarea
- CSelect
- CSwitch
- CSlider
- CCheckbox
- CDatetimeInput
- CFileInput

### Example:
```vue
<c-input v-model="email" label="Email" />
<c-switch v-model="enabled" label="Enable notifications" />
```

---

## 2. Overlay & Dialog Components

Components that control visibility should combine v-model for visibility with specific action events.

### Pattern:
- **Prop**: `modelValue` (boolean) - controls visibility
- **Event**: `@update:modelValue` - emitted when visibility changes
- **Additional Events**: Specific action events (`ok`, `cancel`, `prev`, `next`, etc.)

### Components:
- CModal
- CDocumentViewer

### Example:
```vue
<c-modal
  v-model="isOpen"
  @ok="handleSubmit"
  @cancel="handleCancel"
>
  Modal content
</c-modal>
```

---

## 3. File Upload Components

File upload components emit file data directly without v-model binding for the file itself.

### Pattern:
- **Event**: `@uploaded` - emitted with the uploaded File object
- **No v-model**: Files are not stored in a "value" model, only emitted as events

### Components:
- CFileUploadZone
- CFileInput

### Example:
```vue
<c-file-upload-zone
  @uploaded="handleFileUpload"
  :max-size="2048"
  :valid-file-extensions="['application/pdf', 'image/png']"
/>
```

---

## 4. Navigation & Action Components

Components that trigger navigation or selection actions should use consistent, descriptive event names.

### Pattern:
- **Events**: Use simple, present-tense verbs (`select`, `prev`, `next`, `close`, etc.)
- **Prefix**: Navigation events use directional names (`prev`, `next`)
- **Selection events**: Use `select` or specific action names

### Components:
- CDocumentViewer: `prev`, `next`
- CVerticalStepper: `select`
- CDropdown: `select`
- CAccordion: `accordion-change`

### Example:
```vue
<c-document-viewer
  @prev="previousDocument"
  @next="nextDocument"
/>

<c-vertical-stepper @select="handleStepSelect" />
```

---

## 5. Composite & Layout Components

Components that compose other components should follow appropriate sub-pattern conventions.

### Pattern:
- If contains form inputs: Use v-model for relevant properties
- If contains actions: Use specific event names
- If contains slots: Document slot scope and properties

### Components:
- CHeader
- CTable
- CCarousel

---

## 6. Event Naming Best Practices

### ✅ DO:
- Use lowercase, kebab-case event names: `@update:modelValue`, `@uploaded`, `@prev`
- Use past participle for actions that complete: `uploaded`, `selected`, `changed`
- Use present tense for navigation: `prev`, `next`
- Use specific names for dialog actions: `ok`, `cancel` (not generic `submit`/`close`)

### ❌ DON'T:
- Mix conventions: Don't use `switchState` when `update:modelValue` is available
- Use generic names: Avoid `@action` or `@change` alone
- Use camelCase in event names: Use `update:modelValue` not `updateModelValue`
- Use custom event names for v-model candidates

---

## 7. Implementation Checklist

When creating or updating a component, verify:

- [ ] **Form Input?** → Use `modelValue` + `@update:modelValue`
- [ ] **Overlay/Dialog?** → Use `modelValue` for visibility + specific action events
- [ ] **File Upload?** → Emit `@uploaded` with File object
- [ ] **Navigation?** → Use `@prev`, `@next`, or `@select`
- [ ] **Custom Events?** → Use past participle (`loaded`, `changed`) or present tense (`select`, `next`)
- [ ] **Documentation?** → Document props, events, and slots in Storybook argTypes
- [ ] **Tests?** → Test event emissions match the expected convention

---

## 8. Migration Guide

If updating existing components to follow conventions:

### ❌ Before (Inconsistent):
```typescript
// CSwitch - custom event
emit('switchState', checked)

// CFileUploadZone - no v-model
emit('uploaded', file)

// CAccordion - kebab-case custom event
emit('accordion-change', index)
```

### ✅ After (Consistent):
```typescript
// CSwitch - v-model support
emit('update:modelValue', checked)

// CFileUploadZone - consistent event naming
emit('uploaded', file)

// CAccordion - consistent action event naming (consider: emit('select', index))
emit('accordion-change', index)
```

---

## 9. Examples by Component Type

### Form Input (with v-model)
```vue
<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
const onChange = (e) => emit('update:modelValue', e.target.value)
</script>

<template>
  <input :value="modelValue" @change="onChange" />
</template>
```

### Overlay (v-model + actions)
```vue
<script setup>
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'ok', 'cancel'])
const handleOk = () => { emit('ok'); emit('update:modelValue', false) }
const handleCancel = () => { emit('cancel'); emit('update:modelValue', false) }
</script>

<template>
  <div v-if="modelValue">
    <button @click="handleOk">OK</button>
    <button @click="handleCancel">Cancel</button>
  </div>
</template>
```

### File Upload (event-driven)
```vue
<script setup>
const emit = defineEmits(['uploaded'])
const handleFileSelect = (file) => emit('uploaded', file)
</script>

<template>
  <input type="file" @change="e => handleFileSelect(e.target.files[0])" />
</template>
```

---

## 10. Notes

- **Vue 3 Compliance**: All conventions follow Vue 3 composition API best practices
- **Accessibility**: Event conventions should align with semantic HTML and ARIA patterns
- **Type Safety**: Use TypeScript generics with `defineEmits<{ (e: 'event-name', payload): void }>()` 
- **Backward Compatibility**: Mark breaking changes clearly when updating event names
