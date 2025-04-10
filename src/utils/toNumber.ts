import { BadRequestException } from '@nestjs/common'

export function toNumber(value: string): number {
  if (typeof value === 'undefined') return undefined
  const number = parseFloat(value)

  if (isNaN(number) || number.toString() !== value.trim()) {
    throw new BadRequestException(`Invalid number: ${value}`)
  }

  return number
}
