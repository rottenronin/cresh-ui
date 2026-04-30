import currencyConverter from './currency-converter'
import dateConverter from './date-converter'
import isObject from './is-object'

type ConvertSchema = {
  date?: Array<string>
  currency?: Array<string>
} & {[key: string] : unknown}

function convertValue(
  key: string,
  value: unknown,
  schema?: ConvertSchema,
): unknown {
  if (Array.isArray(value)) {
    return value.map(v => convertValue(key, v, schema))
  }
  if (schema?.date?.includes(key)) {
    return dateConverter.convert(value)
  }
  if (schema?.currency?.includes(key)) {
    return currencyConverter.divideBy100(value)
  }
  return value
}

function isObjectArray(obj: unknown) {
  return Array.isArray(obj) && obj.length > 0 && isObject(obj[0])
}

function doConvert(
  json: {[key: string]: unknown},
  schema?: ConvertSchema,
): unknown {
  const result = Object.keys(
    json,
  ).reduce((target: {[key: string]: unknown}, key) => {
    const current = json[key]
    // if object or array of objects
    if (isObject(current)) {
      target[key] = doConvert(current, schema)
    } else if (Array.isArray(current) && isObjectArray(current)) {
      target[key] = current.map(c => doConvert(
        c,
        schema,
      ))
    } else {
      target[key] = convertValue(key, current, schema)
    }
    return target
  }, {})
  return result
}

function convert<T>(
  json: unknown,
  schema?: ConvertSchema,
) {
  if (!isObject(json) && !isObjectArray(json)) {
    throw Error('not a valid object')
  }

  if (Array.isArray(json) && isObjectArray(json)) {
    return json.map(c => doConvert(c, schema)) as T
  }
  return doConvert(json as {[key: string]: unknown}, schema) as T
}

export default {
  convert,
}
