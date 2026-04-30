import {
  computed,
  getCurrentInstance,
  onMounted,
  useSlots,
  type ComputedRef,
} from 'vue'

export interface BaseFormControlProps {
  id?: string
  name: string
  modelValue?: unknown
  placeholder?: string
  required?: boolean
  errorMessage?: string
}

export interface UseFormControlReturn {
  /** Stable id for the input — uses `props.id` if provided, falls back to `${name}-${uid}`. */
  inputId: ComputedRef<string>
  /** id of the error message element, used for `aria-describedby`. */
  errorId: ComputedRef<string>
  /** True when an `errorMessage` prop is set. */
  hasError: ComputedRef<boolean>
  /** True when an `error` (or legacy `errors`) slot is provided. */
  hasErrorSlot: ComputedRef<boolean>
  /** True when the field has a value or a placeholder (used for floating label state). */
  hasValueOrPlaceholder: ComputedRef<boolean>
}

/**
 * Shared form-control logic used by CInput, CSelect, CTextarea, CRadio, CDatetimeInput,
 * CCheckbox, CPhoneInput…
 *
 * Centralises the duplicated `hasError` / `hasErrorSlot` / `hasValueOrPlaceholder` /
 * `inputId` / `errorId` computeds.
 */
export function useFormControl (
  props: BaseFormControlProps,
  fallbackName = 'control',
): UseFormControlReturn {
  const slots = useSlots()
  const instance = getCurrentInstance()

  const inputId = computed(
    () => props.id || `${props.name}-${instance?.uid ?? fallbackName}`,
  )

  const errorId = computed(() => `${inputId.value}-error`)

  const hasError = computed(() => !!props.errorMessage)

  // Accept both the canonical `error` slot and the legacy `errors` (plural) slot.
  const hasErrorSlot = computed(() => !!slots.error || !!slots.errors)

  // Dev-time deprecation warning for the legacy `errors` slot.
  if (process.env.NODE_ENV !== 'production') {
    onMounted(() => {
      if (slots.errors && !slots.error) {
        // eslint-disable-next-line no-console
        console.warn(
          `[cresh-ui] The "errors" slot on <${instance?.type.name ?? 'form-control'}> `
          + 'is deprecated and will be removed in a future major release. '
          + 'Please rename it to "error".',
        )
      }
    })
  }

  const hasValueOrPlaceholder = computed(
    () => !!props.modelValue || !!props.placeholder,
  )

  return {
    inputId,
    errorId,
    hasError,
    hasErrorSlot,
    hasValueOrPlaceholder,
  }
}

export default useFormControl
