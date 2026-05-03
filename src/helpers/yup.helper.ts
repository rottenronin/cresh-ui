import { Ref } from 'vue'
import * as yup from 'yup'
import { ValidationError } from 'yup'

import uuidv4 from './uuid4'

export function getErrors(error: ValidationError) {
  const errors: Record<string, string> = {}

  for (let i = 0; i < error.inner.length; i += 1) {
    const errorItem = error.inner[i]
    errors[errorItem.path || ''] = errorItem.message
  }

  return errors
}

export function resetForm(
  form: Record<string, unknown>,
  initialValues: Record<string, unknown>,
) {
  Object.entries(form).forEach(([key]) => {
    const initialProp = initialValues[key]
    if (Array.isArray(initialProp)) {
      form[key] = [...initialProp]
    } else if (typeof initialProp === 'object') {
      resetForm(
        form[key] as Record<string, unknown>,
        initialProp as Record<string, unknown>,
      )
    } else {
      form[key] = initialProp
    }
  })
}

export const validate = async (options: {
  schema: yup.Schema
  fields: Ref<Record<string, unknown>>
  validationOptions?: yup.ValidateOptions
}) => {
  try {
    const { schema } = options
    const defaultOptions = {
      abortEarly: false,
    }
    const validationOptions = {
      ...(options.validationOptions ? options.validationOptions : {}),
      ...defaultOptions,
    }
    const values = await schema.validate(
      options.fields.value,
      validationOptions,
    )

    return {
      isValid: true,
      values,
    }
  } catch (err) {
    if (err && typeof err === 'object'
      && (err as Record<string, unknown>).inner) {
      const errors = getErrors(err as ValidationError)
      return {
        isValid: false,
        errors,
        yupValidationErrors: err as ValidationError,
      }
    }
    throw err
  }
}

export const useYupHelper = (options: {
  fields: Ref<Record<string, unknown>>
  schema: yup.Schema
  initialValues?: Record<string, unknown>
  validationOptions?: yup.ValidateOptions
}): {
  id: string
  reset: () => void
  validate: () => Promise<{
    isValid: boolean
    values?: Ref<Record<string, unknown>>
    errors?: Record<string, string>
    yupValidationErrors?: ValidationError
  }>
} => {
  const id = uuidv4()
  return {
    id,
    reset: () => {
      resetForm(options.fields.value, options.initialValues || {})
    },
    validate: async () => validate({
      schema: options.schema,
      fields: options.fields,
      validationOptions: options.validationOptions,
    }),
  }
}

export default useYupHelper
