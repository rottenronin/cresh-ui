 
 

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function deepCopy<T>(source: T): T {
  return (Array.isArray(source)
    ? source.map(item => deepCopy(item))
    : source instanceof Date
      ? new Date(source.getTime())
      : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
          Object.defineProperty(
            o,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)!,
          )
          o[prop] = deepCopy((source as { [key: string]: any })[prop])
          return o
        }, Object.create(Object.getPrototypeOf(source)))
        : source) as T
}
