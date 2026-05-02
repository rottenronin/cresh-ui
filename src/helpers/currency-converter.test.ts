import {
  describe,
  test,
  expect,
} from 'vitest'
import { faker } from '@faker-js/faker/locale/fr'

import currencyConverter from './currency-converter'

describe('currency-converter', () => {
  const randomNumber1 = faker.number.int({
    max: 1000,
  })
  const randomNumber2 = -faker.number.int({
    max: 1000,
  })
  test.each([[
    randomNumber1,
  ], [
    randomNumber2,
  ], [
    0,
  ]])('should divide %i by 100', (numberValue: number) => {
    const result = currencyConverter.divideBy100(numberValue)
    expect(result).to.equals(numberValue / 100)
  })

  test.each([[
    'abc',
  ], [
    null,
  ], [
    undefined,
  ], [
    [],
  ], [
    { test: true },
  ]])('should return undefined if passe a non number value', (value: unknown) => {
    const result = currencyConverter.divideBy100(value)
    expect(result).to.equals(undefined)
  })

  test.each([
    [10, '10,00 €'.replace(/\s/, String.fromCharCode(160))],
    [9.234567, '9,23 €'.replace(/\s/, String.fromCharCode(160))],
    [5.98856, '5,99 €'.replace(/\s/, String.fromCharCode(160))],
    [0, '0,00 €'.replace(/\s/, String.fromCharCode(160))],
  ])('should divide %i by 100', (numberValue: number, formattedValue: string) => {
    const result = currencyConverter.format(numberValue)
    expect(result).toMatch(formattedValue)
  })
})
