import { ToRef } from 'vue'
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
  form: ToRef<Record<string, unknown>>,
  initialValues: Record<string, unknown>,
) {
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === null) {
      form.value[key] = null
    } else if (typeof form.value[key] === 'undefined') {
      form.value[key] = undefined
    } else if (typeof form.value[key] === 'string') {
      form.value[key] = ''
    } else {
      form.value[key] = initialValues[key]
    }
  })
}

export const validate = async (options: {
  schema: yup.AnySchema
  fields: ToRef<Record<string, unknown>>
  validationOptions?: yup.ValidateOptions
}) => {
  try {
    const {
      schema,
      fields,
    } = options

    const defaultOptions = {
      abortEarly: false,
    }
    const validationOptions = {
      ...(options.validationOptions ? options.validationOptions : {}),
      ...defaultOptions,
    }
    const values = await schema.validate(
      fields.value,
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
  fields: ToRef<Record<string, unknown>>
  schema: yup.AnySchema
  initialValues?: Record<string, unknown>
  validationOptions?: yup.ValidateOptions
}): {
  id: string
  reset: () => void
  validate: () => Promise<{
    isValid: boolean
    values?: ToRef<Record<string, unknown>>
    errors?: Record<string, string>
    yupValidationErrors?: ValidationError
  }>
} => {
  const id = uuidv4()
  return {
    id,
    reset: () => {
      resetForm(options.fields, options.initialValues || {})
    },
    validate: async () => validate({
      schema: options.schema,
      fields: options.fields,
      validationOptions: options.validationOptions,
    }),
  }
}

export default useYupHelper
